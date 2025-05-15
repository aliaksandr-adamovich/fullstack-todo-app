'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';

interface Props {
    onAdd: (payload: { title: string; description?: string }) => void;
    onClose: () => void;
}

export function CreateTodoModal({ onAdd, onClose }: Props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        if (!title.trim()) return;
        onAdd({ title, description });
        setTitle('');
        setDescription('');
        onClose();
    };

    return (
        <Modal title="Новая задача" onConfirm={handleSubmit} onCancel={onClose} confirmText="Создать">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
                <input
                    placeholder="Заголовок"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Описание"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
        </Modal>
    );
}
