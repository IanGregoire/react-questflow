import { useQuestFlow } from "../hooks";

export const QuestList = () => {
  const engine = useQuestFlow();
  const quests = engine.getQuests();

  return (
    <div>
      <h3>Quests</h3>
      <ul>
        {quests.map(q => (
          <li key={q.id}>
            <strong>{q.title}</strong> — {q.progress ?? 0}%
          </li>
        ))}
      </ul>
    </div>
  );
};
