import { exponentialScaling, linearScaling } from "./scalingPresets";
import type { Quest, Achievement } from "./types";
import type { XPGrowthFn } from "./xpGrowth";

export class QuestEngine {
  quests: Quest[];
  achievements: Achievement[];
  xp: number = 0;
  level: number = 1;
  xpGrowthFn: XPGrowthFn;

  constructor(quests: Quest[] = [], achievements: Achievement[] = [], xpGrowthFn: XPGrowthFn) {
    this.quests = quests;
    this.achievements = achievements;
    this.xpGrowthFn = xpGrowthFn;
  }

  getQuests() {
    return this.quests;
  }

  completeQuest(id: string) {
  const quest = this.quests.find(q => q.id === id);
  if (!quest) return;

  // Prevent re-completion unless repeatable
  if (quest.status === "completed" && quest.repeatable === "none") {
    return;
  }

  // 🔄 Handle repeatable quests (reset if needed)
  if (quest.repeatable && quest.repeatable !== "none") {
    const now = Date.now();
    const last = quest.lastCompletedAt ?? 0;

    if (!this.isRepeatableAvailable(quest.repeatable, last, now)) {
      return; // can't complete again yet
    }
  }

  quest.status = "completed";
  quest.progress = 100;

  // Track completions
  quest.timesCompleted = (quest.timesCompleted ?? 0) + 1;
  quest.lastCompletedAt = Date.now();

  // 🔥 XP Scaling logic
  let rewardXP = quest.xp;

  if (quest.scaling?.enabled) {
    const t = quest.timesCompleted - 1; // times before this completion

    if (quest.scaling.strategy === "linear") {
      rewardXP = linearScaling(quest.xp, t);
    }
    else if (quest.scaling.strategy === "exponential") {
      rewardXP = exponentialScaling(quest.xp, t);
    }
    else if (quest.scaling.strategy === "custom" && quest.scaling.scaleFn) {
      rewardXP = quest.scaling.scaleFn(quest.xp, t);
    }
  }

  // Add XP to engine / adjusts levels automatically
  this.addXP(rewardXP);
}


  updateQuestProgress(id: string, progress: number) {
    const quest = this.quests.find(q => q.id === id);
    if (!quest) return;

    quest.progress = Math.min(100, Math.max(0, progress));

    if (quest.progress === 100) {
      this.completeQuest(id);
    }
  }

  unlockAchievement(id: string) {
    const a = this.achievements.find(a => a.id === id);
    if (!a) return;

    a.unlocked = true;
  }

  xpForNextLevel():number {
    return this.xpGrowthFn(this.level);
  }

  addXP(amount: number) {
    this.xp += amount;

    while(this.xp >= this.xpForNextLevel()) {
      this.xp -= this.xpForNextLevel();
      this.level++;
    }
  }

  getXP() {
    return this.xp;
  }

  getLevel() {
    return this.level;
  }

  getAchievements() {
    return this.achievements;
  }
  
  private isRepeatableAvailable(
  repeatable: "daily" | "weekly" | "monthly",
  last: number,
  now: number
) {
  const ONE_DAY = 1000 * 60 * 60 * 24;

  switch (repeatable) {
    case "daily":
      return now - last >= ONE_DAY;

    case "weekly":
      return now - last >= ONE_DAY * 7;

    case "monthly":
      const lastDate = new Date(last);
      const nowDate = new Date(now);
      return (
        nowDate.getFullYear() !== lastDate.getFullYear() ||
        nowDate.getMonth() !== lastDate.getMonth()
      );

    default:
      return true;
  }
}
}

