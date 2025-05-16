import React from 'react';

interface SidebarProps {
    title?: string;
    children?: React.ReactNode;
    onClose: () => void;
}

export function Sidebar({title = '', children, onClose}: SidebarProps) {
    return (
        <div style={overlayStyle} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div style={sidebarStyle}>
                <div style={headerStyle}>
                    <h3 style={{margin: 0}}>{title}</h3>
                    <button onClick={onClose} style={closeButtonStyle}>✖</button>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                    {children}
                </div>
            </div>
        </div>
    );
}

const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    display: 'flex',
    justifyContent: 'flex-end',
    zIndex: 1000,
};

const sidebarStyle: React.CSSProperties = {
    width: '360px',
    height: '100%',
    background: '#fff',
    padding: '1.5rem',
    boxShadow: '-4px 0 20px rgba(0,0,0,0.15)',
    animation: 'slideIn 0.3s ease forwards',
};

const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const closeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    fontSize: '1.25rem',
    cursor: 'pointer',
    color: '#888',
};
