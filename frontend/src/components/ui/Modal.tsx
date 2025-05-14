import React from 'react';

interface ModalProps {
    title?: string;
    children?: React.ReactNode;
    onConfirm?: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
}

export function Modal({
                          title = 'Подтверждение',
                          children,
                          onConfirm,
                          onCancel,
                          confirmText = 'Подтвердить',
                          cancelText = 'Отмена',
                      }: ModalProps) {
    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <h3 style={{ marginBottom: '1rem' }}>{title}</h3>
                <div>{children}</div>
                <div style={actionsStyle}>
                    {onCancel && <button onClick={onCancel}>{cancelText}</button>}
                    {onConfirm && <button onClick={onConfirm}>{confirmText}</button>}
                </div>
            </div>
        </div>
    );
}

const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
    background: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    minWidth: '300px',
    maxWidth: '90%',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
};

const actionsStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.5rem',
    marginTop: '1.5rem',
};
