import { TodoInput } from "./components/TodoInput";
import { TodoItem } from "./components/TodoItem";
import { useTodos } from "./hooks/useTodos";
import "./styles/App.css";

function App() {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos();

  return (
    <div className="app-container">
      <h1>To-Do List</h1>
      <TodoInput onAdd={addTodo} />

      <div className="todo-list">
        {todos.length === 0 && (
          <p className="empty">No tasks yet. Add one!</p>
        )}

        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onRemove={removeTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
