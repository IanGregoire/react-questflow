import { Quest } from "../engine";

export const sampleQuests: Quest[] = [
  {
    id: "q1",
    title: "Create your first quest",
    description: "Set up a simple quest to get started.",
    xp: 50,
    status: "available",
    progress: 0
  },
  {
    id: "q2",
    title: "Implement XP system",
    description: "Track XP earned from quests.",
    xp: 100,
    status: "locked",
    progress: 0
  }
];
