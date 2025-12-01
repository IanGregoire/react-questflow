import { useQuestFlow } from "react-questflow";
import "./GamificationPanel.css";

export default function GamificationPanel() {
  const { getXP, getAchievements, getQuests } = useQuestFlow();

  const xp = getXP();
  const achievements = getAchievements();
  const quests = getQuests();

  return (
    <div className="gamification-panel">
      <h2>Gamification</h2>

      {/* XP Display */}
      <div className="xp-box">
        <strong>XP:</strong> {xp}
      </div>

      {/* Quests */}
      <div className="section">
        <h3>Active Quests</h3>

        {quests.map((q) => (
          <div key={q.id} className="quest-item">
            <div className="quest-title">
              {q.title} 
              {q.status === "completed" && <span className="badge completed">✓</span>}
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${q.progress}%` }}
              />
            </div>

            <small>{q.progress}%</small>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="section">
        <h3>Achievements</h3>
        {achievements.length === 0 && <p>No achievements yet.</p>}

        {achievements.map((a) => (
          <div key={a.id} className="achievement-item">
            <span>{a.title}</span>
            {a.unlocked ? (
              <span className="badge unlocked">Unlocked</span>
            ) : (
              <span className="badge locked">Locked</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
