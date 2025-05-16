'use client';

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {useLogin} from '@/lib/queries';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const router = useRouter();
    const login = useLogin();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login.mutateAsync({email, password});
            router.push('/todos');
        } catch {
            alert('Ошибка входа');
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
                onSubmit={handleLogin}
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
                    Вход
                </h2>

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
                        cursor: 'pointer',
                    }}
                />

                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <label
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '14px',
                            color: '#333',
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                            style={{marginRight: '6px'}}
                        />

                        Запомнить меня
                    </label>
                    <a href="#" style={{fontSize: '14px', color: '#0070f3', textDecoration: 'none'}}>
                        Забыли пароль?
                    </a>
                </div>

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
                    Войти
                </button>

                <p style={{fontSize: '14px', textAlign: 'center', color: '#444'}}>
                    Нет аккаунта?{' '}
                    <a href="/register" style={{color: '#0056b3', textDecoration: 'none'}}>
                        Зарегистрироваться
                    </a>
                </p>
            </form>
        </div>
    );
}
