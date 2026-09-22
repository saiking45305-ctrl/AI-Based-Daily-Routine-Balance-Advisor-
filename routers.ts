import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { invokeLLM } from "./_core/llm";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

const textFromResponse = (content: unknown) => {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) return content.map((part) => typeof part === "string" ? part : (part as { text?: string }).text ?? "").join("\n").trim();
  return "";
};

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  advisor: router({
    coach: publicProcedure.input(z.object({
      date: z.string(),
      energy: z.number().min(0).max(100),
      sleep: z.number().min(0).max(24),
      mood: z.enum(["Low-key", "Steady", "Bright"]),
      balanceScore: z.number().min(0).max(100),
      tasks: z.array(z.object({ title: z.string(), time: z.string(), duration: z.number(), category: z.string(), detail: z.string(), done: z.boolean() })),
    })).mutation(async ({ input }) => {
      const response = await invokeLLM({
        messages: [
          {
            role: "system",
            content: "You are RoutineBalance, a warm and practical daily routine coach. Help a person make a doable day, not a perfect day. Explain the plan in plain English with a short heading and 2 or 3 short paragraphs. Mention energy, sleep, recovery, and focus. Protect the person's autonomy: do not diagnose, shame, prescribe treatment, or imply that productivity determines worth. If the day is full, suggest one small buffer. Be concise and encouraging.",
          },
          {
            role: "user",
            content: JSON.stringify(input),
          },
        ],
        max_tokens: 420,
      });
      const text = textFromResponse(response.choices?.[0]?.message?.content);
      if (!text) throw new Error("The coaching model returned no text");
      return text;
    }),
  }),
});

export type AppRouter = typeof appRouter;
