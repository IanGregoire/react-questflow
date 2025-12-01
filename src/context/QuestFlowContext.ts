import { createContext } from "react";
import type { Quest, Achievement } from "../engine/types";
import type { QuestEngine } from "../engine/QuestEngine";

export type QuestFlowPlayer = {
  xp: number;
  level: number;
  quests: Quest[];
  achievements: Achievement[];
};

export type QuestFlowAPI = {
  // snapshot values (reactive)
  xp: number;
  level: number;
  quests: Quest[];
  achievements: Achievement[];

  // actions (wrap QuestEngine methods and cause re-renders)
  completeQuest: (id: string) => void;
  updateQuestProgress: (id: string, progress: number) => void;
  unlockAchievement: (id: string) => void;

  // raw getters if needed
  getXP: () => number;
  getLevel: () => number;
  getQuests: () => Quest[];
  getAchievements: () => Achievement[];

  // engine (optional — the underlying engine instance)
  engine?: QuestEngine;
};

export const QuestFlowContext = createContext<QuestFlowAPI | null>(null);
