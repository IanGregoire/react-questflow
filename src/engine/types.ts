export type Repeatability = "none" | "daily" | "weekly" | "monthly";
export type QuestStatus = "locked" | "available" | "in_progress" | "completed";

export interface ScalingConfig {
  enabled: boolean;
  strategy?: "linear" | "exponential" | "custom";
  scaleFn?: (baseXP: number, completions: number) => number;
}

export interface Quest {
  id: string;
  title: string;
  description?: string;

  // XP Rewards
  xp: number;
  scaling?: ScalingConfig;

  // Repeatability rules
  repeatable?: Repeatability;
  lastCompletedAt?: number;
  timesCompleted?: number;

  //Progress and Status
  target?: number; // Multi-step quests
  status?: QuestStatus;
  progress?: number; // 0–100
}

export interface Achievement {
  id: string;
  title: string;
  description?: string;

  unlocked: boolean;
  xpBonus?: number;
  
  condition: {
    type: "xp" | "quest_complete" | "quest_streak" | "multi";
    xpRequired?: number;
    questId?: string;
    streakLength?: number;
    conditions?: Achievement["condition"][];
  }
}
