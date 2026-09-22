import { beforeEach, describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";

const { invokeLLMMock } = vi.hoisted(() => ({ invokeLLMMock: vi.fn() }));
vi.mock("./_core/llm", () => ({ invokeLLM: invokeLLMMock }));

describe("advisor.coach", () => {
  beforeEach(() => {
    invokeLLMMock.mockReset();
    invokeLLMMock.mockResolvedValue({ choices: [{ message: { content: "## A doable day\nProtect your focus and leave room to breathe." } }] });
  });

  it("sends daily context to the server-side model and returns coaching text", async () => {
    const caller = appRouter.createCaller({ user: null, req: {} as never, res: {} as never });
    const result = await caller.advisor.coach({
      date: "Tuesday, September 22",
      energy: 76,
      sleep: 7.4,
      mood: "Steady",
      balanceScore: 82,
      tasks: [{ title: "Deep work", time: "09:00", duration: 90, category: "focus", detail: "One outcome", done: false }],
    });
    expect(result).toContain("doable day");
    expect(invokeLLMMock).toHaveBeenCalledTimes(1);
    expect(invokeLLMMock.mock.calls[0]?.[0]).toMatchObject({ max_tokens: 420 });
  });

  it("rejects invalid energy values before calling the model", async () => {
    const caller = appRouter.createCaller({ user: null, req: {} as never, res: {} as never });
    await expect(caller.advisor.coach({ date: "Today", energy: 140, sleep: 7, mood: "Steady", balanceScore: 80, tasks: [] } as never)).rejects.toThrow();
    expect(invokeLLMMock).not.toHaveBeenCalled();
  });
});
