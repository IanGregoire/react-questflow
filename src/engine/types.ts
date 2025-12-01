export type QuestStatus = "locked" | "available" | "completed";

export interface Quest {
  id: string;
  title: string;
  description: string;
  xp: number;
  status?: QuestStatus;
  progress?: number; // 0–100
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  xpBonus?: number;
  unlocked: boolean;
}
