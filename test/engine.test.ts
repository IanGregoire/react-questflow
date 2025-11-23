import { describe, it, expect } from "vitest";
import { QuestEngine } from "../src/engine";

describe("QuestEngine", () => {
  it("adds XP on quest completion", () => {
    const engine = new QuestEngine([
      { id: "1", title: "Test", description: "", xp: 100 }
    ]);

    engine.completeQuest("1");
    expect(engine.getXP()).toBe(100);
  });
});
