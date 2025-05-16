'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {
    useTodos,
    useAddTodo,
    useDeleteTodo,
    useUpdateTodo,
} from '@/lib/queries';
import {Modal} from '@/components/ui/Modal';
import {CreateTodoModal} from './components/CreateTodoModal';
import {SidebarEditor} from './components/SidebarEditor';
import {Todo} from '@/lib/types';
import {FiX} from 'react-icons/fi';

export default function TodosPage() {
    const router = useRouter();
    const {data: todos, error, isLoading} = useTodos();
    const addTodo = useAddTodo();
    const deleteTodo = useDeleteTodo();
    const updateTodo = useUpdateTodo();

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
    const [todoToDelete, setTodoToDelete] = useState<number | null>(null);

    useEffect(() => {
        if (error) router.push('/login');
    }, [error, router]);

    const confirmDelete = () => {
        if (todoToDelete !== null) {
            deleteTodo.mutate(todoToDelete);
            setTodoToDelete(null);
        }
    };

    return (
        <div style={{padding: '2rem', maxWidth: '700px', margin: '0 auto'}}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem',
                }}
            >
                <h2 style={{margin: 0}}>Ваши задачи</h2>

                <button
                    onClick={() => setShowCreateModal(true)}
                    style={{
                        padding: '10px 16px',
                        fontSize: '16px',
                        backgroundColor: '#0070f3',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                    }}
                >
                    ➕ Новая задача
                </button>

                {showCreateModal && (
                    <CreateTodoModal
                        onAdd={(data) => addTodo.mutate(data)}
                        onClose={() => setShowCreateModal(false)}
                    />
                )}
            </div>

            {todos?.length ? (
                <ul style={{listStyle: 'none', padding: 0}}>
                    {todos.map((todo: Todo) => (
                        <li
                            key={todo.id}
                            style={{
                                padding: '1rem',
                                marginBottom: '0.5rem',
                                backgroundColor: '#f0f0f0',
                                borderRadius: '8px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <div
                                onClick={() => setEditingTodo(todo)}
                                style={{cursor: 'pointer', flex: 1}}
                            >
                                <strong>{todo.title}</strong>
                                {todo.description && (
                                    <p style={{margin: 0, fontSize: '14px'}}>{todo.description}</p>
                                )}
                            </div>
                            <button
                                onClick={() => setTodoToDelete(todo.id)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    padding: '4px',
                                    cursor: 'pointer',
                                }}
                                title="Удалить задачу"
                            >
                                <FiX style={{fontSize: '18px', color: '#900'}}/>
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Нет задач</p>
            )}

            {todoToDelete !== null && (
                <Modal
                    title="Удалить задачу?"
                    onConfirm={confirmDelete}
                    onCancel={() => setTodoToDelete(null)}
                    confirmText="Удалить"
                    cancelText="Отмена"
                >
                    <p>Вы действительно хотите удалить задачу?</p>
                </Modal>
            )}

            {editingTodo && (
                <SidebarEditor
                    todo={editingTodo}
                    onClose={() => setEditingTodo(null)}
                    onUpdate={(updated) => updateTodo.mutate(updated)}
                />
            )}
        </div>
    );
}
