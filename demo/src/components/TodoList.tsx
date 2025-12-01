import type { Todo } from "../types/Todo";
import { TodoItem } from "./TodoItem";

interface Props {
  todos: Todo[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function TodoList({ todos, onToggle, onRemove }: Props) {
  return (
    <div>
      {todos.length === 0 ? (
        <p className="empty">No tasks yet. Add one!</p>
      ) : (
        <div className="todo-list">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onRemove={onRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
}
