import React from 'react';

interface SidebarProps {
    title?: string;
    children?: React.ReactNode;
    onClose: () => void;
}

export function Sidebar({ title = '', children, onClose }: SidebarProps) {
    return (
        <div style={overlayStyle}>
            <div style={sidebarStyle}>
                <div style={headerStyle}>
                    <h3>{title}</h3>
                    <button onClick={onClose} style={closeButtonStyle}>✖</button>
                </div>
                <div>{children}</div>
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
    width: '350px',
    height: '100%',
    background: '#fff',
    padding: '1.5rem',
    boxShadow: '-4px 0 20px rgba(0,0,0,0.1)',
};

const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
};

const closeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    fontSize: '1.25rem',
    cursor: 'pointer',
};
