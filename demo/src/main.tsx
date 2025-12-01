import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { QuestFlowProvider } from 'react-questflow'
import { demoAchievements } from './questflow/achievements.ts'
import { todoQuests } from './questflow/todoQuests.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QuestFlowProvider quests={todoQuests} achievements={demoAchievements}>
      <App />
    </QuestFlowProvider>
  </StrictMode>,
)
