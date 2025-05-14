import {useState} from 'react';

interface TodoFormProps {
    onAdd: (payload: { title: string; description?: string }) => void;
}

export function TodoForm({onAdd}: TodoFormProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        if (!title.trim()) return;
        onAdd({title, description});
        setTitle('');
        setDescription('');
    };

    return (
        <div>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Заголовок задачи"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Описание задачи"
            />
            <button onClick={handleSubmit}>Добавить</button>
        </div>
    );
}
