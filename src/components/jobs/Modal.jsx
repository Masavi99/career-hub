export default function Modal({ onClose, children, className = "" }) {
  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-content ${className}`} onClick={stopPropagation}>
        {children}
      </div>
    </div>
  );
}
