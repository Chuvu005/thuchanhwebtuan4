import { Heart, Trash2, CheckCircle, Info } from 'lucide-react';

export function Toast({ toasts }) {
  if (!toasts || toasts.length === 0) return null;

  const renderIcon = (type) => {
    switch (type) {
      case 'add':
        return <Heart size={18} style={{ color: 'var(--heart-red)', fill: 'var(--heart-red)' }} />;
      case 'remove':
        return <Trash2 size={18} style={{ color: 'var(--warning)' }} />;
      case 'clear':
        return <CheckCircle size={18} style={{ color: 'var(--brand-primary-light)' }} />;
      default:
        return <Info size={18} style={{ color: 'var(--price-color)' }} />;
    }
  };

  return (
    <div className="toast-container" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          <div className="toast-icon">{renderIcon(toast.type)}</div>
          <div className="toast-message">{toast.message}</div>
        </div>
      ))}
    </div>
  );
}
