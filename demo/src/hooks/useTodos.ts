import { useEffect, useState } from "react";
import type { Todo } from "../types/Todo";

const STORAGE_KEY = "demo_todos";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      completedBefore: 0,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              // increment completedBefore when switching from false -> true
              completedBefore: !todo.completed ? (todo.completedBefore ?? 0) + 1 : todo.completedBefore ?? 0,
            }
          : todo
      )
    );
  };

  const removeTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const completedCount = todos.filter(t => t.completed).length;
  
  return { todos, addTodo, toggleTodo, removeTodo, completedCount };
}
