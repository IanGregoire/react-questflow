import React, { ReactNode, useMemo } from "react";
import { QuestFlowContext } from "./QuestFlowContext";
import { QuestEngine, Quest, Achievement } from "../engine";

interface Props {
  quests: Quest[];
  achievements?: Achievement[];
  children: ReactNode;
}

export const QuestFlowProvider = ({ quests, achievements = [], children }: Props) => {
  const engine = useMemo(
    () => new QuestEngine(quests, achievements),
    [quests, achievements]
  );

  return (
    <QuestFlowContext.Provider value={engine}>
      {children}
    </QuestFlowContext.Provider>
  );
};
