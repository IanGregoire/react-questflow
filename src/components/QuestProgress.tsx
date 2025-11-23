import { useQuestFlow } from "../hooks";

export const QuestProgress = () => {
  const engine = useQuestFlow();
  const xp = engine.getXP();

  return (
    <div>
      <h3>Total XP: {xp}</h3>
      <progress max={1000} value={xp}></progress>
    </div>
  );
};
