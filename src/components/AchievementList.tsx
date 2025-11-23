import { useQuestFlow } from "../hooks";

export const AchievementList = () => {
  const engine = useQuestFlow();
  const list = engine.getAchievements();

  return (
    <div>
      <h3>Achievements</h3>
      <ul>
        {list.map(a => (
          <li key={a.id}>
            {a.unlocked ? "🏆" : "🔒"} {a.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
