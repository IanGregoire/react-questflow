import { type ReactNode, useMemo, useState, useCallback } from "react";
import { QuestFlowContext } from "./QuestFlowContext";
import { QuestEngine } from "../engine/QuestEngine";
import type { Quest, Achievement } from "../engine/types";

interface Props {
  quests?: Quest[];
  achievements?: Achievement[];
  children: ReactNode;
}

export const QuestFlowProvider = ({
  quests = [],
  achievements = [],
  children,
}: Props) => {
  // create engine once (but we will wrap its methods)
  const engine = useMemo(() => new QuestEngine(quests, achievements), []);

  // simple state that forces re-render and holds snapshots
  const [xp, setXp] = useState<number>(engine.getXP());
  const [qSnapshot, setQSnapshot] = useState(() => engine.getQuests());
  const [aSnapshot, setASnapshot] = useState(() => engine.getAchievements());

  // helper to refresh snapshots from engine
  const refresh = useCallback(() => {
    setXp(engine.getXP());
    setQSnapshot([...engine.getQuests()]); // shallow copy to change identity
    setASnapshot([...engine.getAchievements()]);
  }, [engine]);

  // Wrapped actions — call engine, then refresh snapshots
  const completeQuest = useCallback(
    (id: string) => {
      engine.completeQuest(id);
      refresh();
    },
    [engine, refresh]
  );

  const updateQuestProgress = useCallback(
    (id: string, progress: number) => {
      engine.updateQuestProgress(id, progress);
      refresh();
    },
    [engine, refresh]
  );

  const unlockAchievement = useCallback(
    (id: string) => {
      engine.unlockAchievement(id);
      refresh();
    },
    [engine, refresh]
  );

  const api = useMemo(
    () => ({
      xp,
      quests: qSnapshot,
      achievements: aSnapshot,

      completeQuest,
      updateQuestProgress,
      unlockAchievement,

      getXP: () => engine.getXP(),
      getQuests: () => engine.getQuests(),
      getAchievements: () => engine.getAchievements(),

      engine,
    }),
    [xp, qSnapshot, aSnapshot, completeQuest, updateQuestProgress, unlockAchievement, engine]
  );

  return <QuestFlowContext.Provider value={api}>{children}</QuestFlowContext.Provider>;
};
