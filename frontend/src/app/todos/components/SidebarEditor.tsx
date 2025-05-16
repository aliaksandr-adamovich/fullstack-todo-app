import {Sidebar} from '@/components/ui/Sidebar';
import React, {useEffect, useState} from "react";
import {Todo} from "@/lib/types";

interface SidebarEditorProps {
    todo: Todo;
    onUpdate: (updated: Todo) => void;
    onClose: () => void;
}

export function SidebarEditor({todo, onUpdate, onClose}: SidebarEditorProps) {
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description || '');

    useEffect(() => {
        const timeout = setTimeout(() => {
            onUpdate({...todo, title, description});
        }, 500);
        return () => clearTimeout(timeout);
    }, [title, description]);

    return (
        <Sidebar title="Редактирование" onClose={onClose}>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Заголовок"
                style={inputStyle}
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Описание"
                style={textareaStyle}
            />
        </Sidebar>
    );


}
const inputStyle: React.CSSProperties = {
    padding: '12px',
    fontSize: '15px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
    backgroundColor: '#fff',
    color: '#000',
    fontFamily: 'sans-serif',
};

const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    height: '100px',
    resize: 'none',
};
