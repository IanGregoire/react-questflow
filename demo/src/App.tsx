import { TodoInput } from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";
import { useQuestFlow } from "react-questflow";
import "./styles/App.css";
import GamificationPanel from "./components/GamificationPanel";

function App() {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos();
  const qf = useQuestFlow();

  if (!qf) {
    return <div>Loading QuestFlow...</div>;
  }

  const { completeQuest, updateQuestProgress } = qf;

  // wrapper around toggle to add quest progress updates
  const handleToggle = (id: string) => {
    // find todo before change
    const beforeCompletedCount = todos.filter((t) => t.completed).length;
    toggleTodo(id);
    // after toggle, compute new completed count (optimistic)
    const afterCompleted = beforeCompletedCount + (todos.find(t => t.id === id)?.completed ? -1 : 1);

    // Update progress for complete_5_tasks (percentage)
    const progress = Math.min(100, (afterCompleted / 5) * 100);
    updateQuestProgress("complete_5_tasks", progress);

    // If this toggle completed a task, call simple quest
    // Note: TodoItem also calls completeQuest when it detects the transition. That is fine; engine guards double-completion.
    // However to be safe, you can check prev state too and call only on completion:
    const wasCompletedBefore = todos.find((t) => t.id === id)?.completed ?? false;
    if (!wasCompletedBefore) {
      // award XP via completing quest (QuestEngine adds xp based on quest.xp)
      completeQuest("complete_task");
    }
  };

  return (
    <div className="app-container">
      <h1>To-Do List</h1>
      <GamificationPanel />

      <TodoInput onAdd={(text) => {
        addTodo(text);
        // when creating a task, complete the quest for creating a task
        qf.completeQuest("create_task");
      }} />

      <TodoList todos={todos} onToggle={handleToggle} onRemove={removeTodo} />
    </div>
  );
}

export default App;
