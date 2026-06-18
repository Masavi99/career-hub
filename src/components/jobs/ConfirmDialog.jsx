import Modal from "./Modal";

export default function ConfirmDialog({
  title,
  message,
  confirmLabel = "Confirm",
  onConfirm,
  onCancel,
}) {
  return (
    <Modal onClose={onCancel} className="confirm-dialog">
      <h3>{title}</h3>
      <p>{message}</p>

      <div className="job-actions">
        <button className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>

        <button className="btn-delete" onClick={onConfirm}>
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
