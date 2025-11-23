import { createContext } from "react";
import { QuestEngine } from "../engine";

export const QuestFlowContext = createContext<QuestEngine | null>(null);
