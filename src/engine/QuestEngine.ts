import type { Quest, Achievement } from "./types";

export class QuestEngine {
  quests: Quest[];
  achievements: Achievement[];
  xp: number = 0;

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

    this.xp += quest.xp;
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

  getXP() {
    return this.xp;
  }

  getAchievements() {
    return this.achievements;
  }
}
