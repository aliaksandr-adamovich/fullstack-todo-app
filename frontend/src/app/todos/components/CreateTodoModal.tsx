import {Modal} from '@/components/ui/Modal';
import {useState} from 'react';

type Props = {
    onAdd: (todo: { title: string; description: string }) => void;
    onClose: () => void;
};

export function CreateTodoModal({onAdd, onClose}: Props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        if (title.trim()) {
            onAdd({title, description});
            setTitle('');
            setDescription('');
            onClose();
        }
    };

    return (
        <Modal
            title="Новая задача"
            onCancel={onClose}
            footer={
                <div style={{display: 'flex', justifyContent: 'flex-end', gap: '0.5rem'}}>
                    <button onClick={onClose} style={cancelButtonStyle}>Отмена</button>
                    <button onClick={handleSubmit} style={confirmButtonStyle}>Создать</button>
                </div>
            }
        >
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <input
                    placeholder="Заголовок"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={inputStyle}
                />
                <textarea
                    placeholder="Описание"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={textareaStyle}
                />
            </div>
        </Modal>
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
    height: '80px',
    resize: 'none',
};

const cancelButtonStyle: React.CSSProperties = {
    padding: '10px 16px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#ccc',
    color: '#000',
    cursor: 'pointer',
};

const confirmButtonStyle: React.CSSProperties = {
    padding: '10px 16px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#0070f3',
    color: '#fff',
    cursor: 'pointer',
};
