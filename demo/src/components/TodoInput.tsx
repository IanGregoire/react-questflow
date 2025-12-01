import { useState } from "react";
import { useQuestFlow } from "react-questflow"

interface Props {
    onAdd: (text: string) => void;
}

export function TodoInput({ onAdd }: Props) {
    const [text, setText] = useState("");
    const { completeQuest } = useQuestFlow();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;

        onAdd(text);
        completeQuest("create_task");
        setText("");
    };

    return (
        <form className="todo-input-row fade-in" onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Add a new task..." 
                value={text} 
                onChange={(e) => setText(e.target.value)}
            />
            <button className="button-primary" type="submit">Add</button>
        </form>
    );
}