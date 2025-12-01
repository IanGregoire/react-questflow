import { useQuestFlow } from "react-questflow";

export default function GamificationPanel() {
  const { getXP, getAchievements, getQuests } = useQuestFlow();

  const xp = getXP();
  const achievements = getAchievements();
  const quests = getQuests();

  return (
    <div className="gamification-panel fade-in">
      <h2 style={{ marginBottom: "0.8rem" }}>Gamification</h2>

      {/* XP Display */}
      <div className="xp-section">
        {/* <p style={{ marginBottom: "0.3rem" }}>Level {level}</p> */}

        <div className="xp-bar-container">
          <div
            className="xp-bar-fill"
            style={{ width: `${xp}%` }}
          />
        </div>
      </div>

      {/* Quests */}
      <h3 style={{ marginTop: "1.2rem" }}>Quests</h3>
      {quests.map((q) => (
        <div key={q.id} className="quest-item fade-in">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{q.title}</span>
            <span>{q.progress}%</span>
          </div>

          <div className="quest-progress">
            <div
              className="quest-progress-fill"
              style={{ width: `${q.progress}%` }}
            />
          </div>
        </div>
      ))}

      {/* Achievements */}
      {achievements.length > 0 && (
        <>
          <h3 style={{ marginTop: "1rem" }}>Achievements</h3>
          <ul style={{ paddingLeft: "1rem" }}>
            {achievements.map((a) => (
              <li key={a.id}>{a.title}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
