import type { Quest, Achievement } from "./types";

export class QuestEngine {
  quests: Quest[];
  achievements: Achievement[];
  xp: number = 0;
  level: number = 1;

  // XP curve
  baseXPForLevel = 100;
  xpGrowth = 1.2 

  constructor(quests: Quest[] = [], achievements: Achievement[] = []) {
    this.quests = quests;
    this.achievements = achievements;
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
    return Math.floor(this.baseXPForLevel * Math.pow(this.xpGrowth, this.level - 1));
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
