import { useEffect, useRef } from "react";
import type { Todo } from "../types/Todo";
import { useQuestFlow } from "react-questflow";
import { useTodos } from "../hooks/useTodos";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onRemove }: Props) {
  const { completedCount } = useTodos();
  const { completeQuest, updateQuestProgress } = useQuestFlow();

  // track previous completed to prevent double-firing across renders
  const prevCompleted = useRef<boolean>(todo.completed);

  useEffect(() => {
    // fire only when toggled from false -> true
    if (!prevCompleted.current && todo.completed) {
      // award quest completions
      completeQuest("complete_task"); // single task quest
      updateQuestProgress("complete_5_tasks", completedCount / 5 * 100);
      // because TodoItem doesn't know total tasks. App will update progress after toggle.
    }
    prevCompleted.current = todo.completed;
  }, [todo.completed]);

  return (
    <div className="todo-item">
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className={todo.completed ? "completed" : ""}>{todo.text}</span>
      </label>

      <button className="delete" onClick={() => onRemove(todo.id)}>
        ✕
      </button>
    </div>
  );
}
