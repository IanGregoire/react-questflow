import type { Todo } from '../types/Todo';

interface Props {
    todo: Todo;
    onToggle: (id: string) => void;
    onRemove: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onRemove }: Props) {
    return (
        <div className='todo-item'>
            <label>
                <input
                    type='checkbox'
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                />
                <span className={todo.completed ? "compelted" : ""}>{todo.text}</span>
            </label>

            <button className='delete' onClick={() => onRemove(todo.id)}>
                ✕
            </button>
        </div>
    )
}