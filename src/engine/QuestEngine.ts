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
    if (!quest || quest.status === "completed") return;

    quest.status = "completed";
    quest.progress = 100;

    this.addXP(quest.xp);
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
}
