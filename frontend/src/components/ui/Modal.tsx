import React from 'react';

interface ModalProps {
    title?: string;
    children?: React.ReactNode;
    onConfirm?: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
    footer?: React.ReactNode;
}

export function Modal({
                          title = 'Подтверждение',
                          children,
                          onConfirm,
                          onCancel,
                          confirmText = 'Подтвердить',
                          cancelText = 'Отмена',
                          footer,
                      }: ModalProps) {
    const hasFooter = onConfirm || onCancel;

    return (
        <div style={overlayStyle} onClick={(e) => e.target === e.currentTarget && onCancel?.()}>
            <div style={modalStyle}>
                {title && <h3 style={titleStyle}>{title}</h3>}
                <div>{children}</div>
                {footer !== undefined ? (
                    <div style={actionsStyle}>{footer}</div>
                ) : hasFooter && (
                    <div style={actionsStyle}>
                        {onCancel && (
                            <button style={cancelButtonStyle} onClick={onCancel}>
                                {cancelText}
                            </button>
                        )}
                        {onConfirm && (
                            <button style={confirmButtonStyle} onClick={onConfirm}>
                                {confirmText}
                            </button>
                        )}
                    </div>
                )}
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
    borderRadius: '12px',
    minWidth: '300px',
    maxWidth: '90%',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
};

const titleStyle: React.CSSProperties = {
    marginBottom: '1rem',
    fontSize: '20px',
};

const actionsStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.5rem',
    marginTop: '1.5rem',
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
