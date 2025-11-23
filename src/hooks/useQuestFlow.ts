import { useContext } from "react";
import { QuestFlowContext } from "../context/QuestFlowContext";

export const useQuestFlow = () => {
  const ctx = useContext(QuestFlowContext);
  if (!ctx) throw new Error("useQuestFlow must be used inside <QuestFlowProvider>");
  return ctx;
};
