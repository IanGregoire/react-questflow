# React QuestFlow

Gamify any React app with quests, XP, achievements, and progress systems.

## Installation

npm install react-questflow

## Usage

```tsx
import { QuestFlowProvider, QuestList } from "react-questflow";
import { sampleQuests } from "react-questflow/example";

export default function App() {
  return (
    <QuestFlowProvider quests={sampleQuests}>
      <QuestList />
    </QuestFlowProvider>
  );
}
```
