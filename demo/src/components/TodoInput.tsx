import { useState } from "react";

interface Props {
    onAdd: (text: string) => void;
}

export function TodoInput({ onAdd }: Props) {
    const [text, setText] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;
        onAdd(text);
        setText("");
    };

    return (
        <form className="todo-input" onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Add a new task..." 
                value={text} 
                onChange={(e) => setText(e.target.value)}
            />
            <button>Add</button>
        </form>
    );
}