'use client';

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {useRegister} from '@/lib/queries';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [agree, setAgree] = useState(false);
    const router = useRouter();
    const register = useRegister();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!agree) {
            alert('Вы должны согласиться с условиями');
            return;
        }

        if (password !== confirm) {
            alert('Пароли не совпадают');
            return;
        }

        try {
            await register.mutateAsync({name, email, password});
            router.push('/todos');
        } catch (err: any) {
            const message = err?.response?.data?.message;
            alert(Array.isArray(message) ? message.join('\n') : message || 'Ошибка регистрации');
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                minHeight: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f9f9f9',
                padding: '1rem',
            }}
        >
            <form
                onSubmit={handleRegister}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    padding: '2rem',
                    border: '1px solid #ccc',
                    borderRadius: '12px',
                    background: '#fff',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    maxWidth: '400px',
                }}
            >
                <h2 style={{textAlign: 'center', marginBottom: '0.5rem', color: '#111', fontSize: '24px'}}>
                    Регистрация
                </h2>
                <input
                    type="text"
                    placeholder="Имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{
                        padding: '14px',
                        fontSize: '16px',
                        borderRadius: '6px',
                        border: '1px solid #ccc',
                        backgroundColor: '#fff',
                        color: '#000',
                        width: '100%',
                    }}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                        padding: '14px',
                        fontSize: '16px',
                        borderRadius: '6px',
                        border: '1px solid #ccc',
                        backgroundColor: '#fff',
                        color: '#000',
                        width: '100%',
                    }}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                        padding: '14px',
                        fontSize: '16px',
                        borderRadius: '6px',
                        border: '1px solid #ccc',
                        backgroundColor: '#fff',
                        color: '#000',
                        width: '100%',
                    }}
                />
                <input
                    type="password"
                    placeholder="Повторите пароль"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                    style={{
                        padding: '14px',
                        fontSize: '16px',
                        borderRadius: '6px',
                        border: '1px solid #ccc',
                        backgroundColor: '#fff',
                        color: '#000',
                        width: '100%',
                    }}
                />

                <label
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '14px',
                        color: '#333',
                        cursor: 'pointer',
                    }}
                >
                    <input
                        type="checkbox"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                        style={{
                            marginRight: '6px',
                            width: '16px',
                            height: '16px',
                            cursor: 'pointer',
                        }}
                    />
                    Согласен с условиями
                </label>

                <button
                    type="submit"
                    style={{
                        padding: '14px',
                        fontSize: '16px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: '#0070f3',
                        color: '#fff',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease',
                        width: '100%',
                    }}
                >
                    Зарегистрироваться
                </button>

                <p style={{fontSize: '14px', textAlign: 'center', color: '#444'}}>
                    Уже есть аккаунт?{' '}
                    <a href="/login" style={{color: '#0056b3', textDecoration: 'none'}}>
                        Войти
                    </a>
                </p>
            </form>
        </div>
    );
}
