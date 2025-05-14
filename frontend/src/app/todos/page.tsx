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
import {Sidebar} from '@/components/ui/Sidebar';
import {Todo} from '@/lib/types';
import {FiX} from 'react-icons/fi';


export default function TodosPage() {
    const router = useRouter();
    const {data: todos, error, isLoading} = useTodos();
    const addTodo = useAddTodo();
    const deleteTodo = useDeleteTodo();
    const updateTodo = useUpdateTodo();

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
    const [tempTitle, setTempTitle] = useState('');
    const [tempDesc, setTempDesc] = useState('');

    const [todoToDelete, setTodoToDelete] = useState<number | null>(null);

    useEffect(() => {
        if (error) router.push('/login');
    }, [error, router]);

    const handleAdd = () => {
        if (!title.trim()) return;
        addTodo.mutate({title, description: desc});
        setTitle('');
        setDesc('');
    };

    const confirmDelete = () => {
        if (todoToDelete !== null) {
            deleteTodo.mutate(todoToDelete);
            setTodoToDelete(null);
        }
    };

    const openSidebar = (todo: Todo) => {
        setEditingTodo(todo);
        setTempTitle(todo.title);
        setTempDesc(todo.description || '');
    };

    const saveEdit = () => {
        if (editingTodo) {
            updateTodo.mutate({
                id: editingTodo.id,
                title: tempTitle,
                description: tempDesc,
            });
            setEditingTodo(null);
        }
    };

    if (isLoading) return <p style={{textAlign: 'center'}}>Загрузка...</p>;

    return (
        <div style={{padding: '2rem', maxWidth: '700px', margin: '0 auto'}}>
            <h2 style={{textAlign: 'center', marginBottom: '1.5rem'}}>Ваши задачи</h2>


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
                            <div onClick={() => openSidebar(todo)} style={{cursor: 'pointer', flex: 1}}>
                                <strong>{todo.title}</strong>
                                {todo.description && (
                                    <p style={{margin: 0, fontSize: '14px'}}>{todo.description}</p>
                                )}
                            </div>
                            <button onClick={() => setTodoToDelete(todo.id)}
                                    style={{background: 'none', border: 'none'}}>
                                <FiX style={{fontSize: '18px', color: '#900', cursor: 'pointer'}}>✖</FiX>
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
                <Sidebar title="Редактирование" onClose={() => setEditingTodo(null)}>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                        <input
                            value={tempTitle}
                            onChange={(e) => setTempTitle(e.target.value)}
                            placeholder="Заголовок"
                        />
                        <textarea
                            value={tempDesc}
                            onChange={(e) => setTempDesc(e.target.value)}
                            placeholder="Описание"
                        />
                        <button onClick={saveEdit}>Сохранить</button>
                    </div>
                </Sidebar>
            )}
        </div>
    );
}
