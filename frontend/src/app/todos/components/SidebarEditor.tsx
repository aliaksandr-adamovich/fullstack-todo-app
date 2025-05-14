import {useEffect, useState} from 'react';

interface Todo {
    id: number;
    title: string;
    description?: string;
}

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
        <div style={wrapperStyle}>
            <div style={sidebarStyle}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h3>Редактирование</h3>
                    <button onClick={onClose}>✖</button>
                </div>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Заголовок"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Описание"
                    style={{marginTop: '1rem'}}
                />
            </div>
        </div>
    );
}

const wrapperStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    display: 'flex',
    justifyContent: 'flex-end',
    zIndex: 1000,
};

const sidebarStyle: React.CSSProperties = {
    background: '#fff',
    width: '350px',
    height: '100%',
    padding: '1.5rem',
    boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
};
