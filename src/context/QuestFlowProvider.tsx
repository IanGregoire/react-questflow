import { type ReactNode, useMemo, useState, useCallback } from "react";
import { QuestFlowContext } from "./QuestFlowContext";
import { QuestEngine } from "../engine/QuestEngine";
import type { Quest, Achievement } from "../engine/types";
import { defaultXPGrowth } from "../engine/xpGrowthConfig";
import type { XPGrowthFn } from "../engine/xpGrowth";

interface Props {
  quests?: Quest[];
  achievements?: Achievement[];
  xpGrowth?: XPGrowthFn;
  children: ReactNode;
}

export const QuestFlowProvider = ({
  quests = [],
  achievements = [],
  xpGrowth = defaultXPGrowth,
  children,
}: Props) => {
  // create engine once (but we will wrap its methods)
  const engine = useMemo(() => new QuestEngine(quests, achievements, xpGrowth), []);

  // simple state that forces re-render and holds snapshots
  const [xp, setXp] = useState<number>(engine.getXP());
  const [level, setLevel] = useState<number>(engine.getLevel());
  const [qSnapshot, setQSnapshot] = useState(() => engine.getQuests());
  const [aSnapshot, setASnapshot] = useState(() => engine.getAchievements());

  // helper to refresh snapshots from engine
  const refresh = useCallback(() => {
    setXp(engine.getXP());
    setLevel(engine.getLevel());
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
      level,
      quests: qSnapshot,
      achievements: aSnapshot,

      completeQuest,
      updateQuestProgress,
      unlockAchievement,

      getXP: () => engine.getXP(),
      getLevel: () => engine.getLevel(),
      getQuests: () => engine.getQuests(),
      getAchievements: () => engine.getAchievements(),

      engine,
    }),
    [xp, level, qSnapshot, aSnapshot, completeQuest, updateQuestProgress, unlockAchievement, engine]
  );

  return <QuestFlowContext.Provider value={api}>{children}</QuestFlowContext.Provider>;
};
