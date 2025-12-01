import type { Quest } from "react-questflow";

export const todoQuests: Quest[] = [
  {
    id: "create_task",
    title: "Create your first task",
    description: "Add your first to-do item",
    xp: 10,
    status: "available",
    progress: 0,
  },
  {
    id: "complete_task",
    title: "Complete a task",
    description: "Complete any task",
    xp: 20,
    status: "available",
    progress: 0,
  },
  {
    id: "complete_5_tasks",
    title: "Complete 5 tasks",
    description: "Finish 5 tasks",
    xp: 50,
    status: "available",
    progress: 0,
  }
];
