import "./ConfirmModal.css";
import { FiAlertTriangle, FiX } from "react-icons/fi";

const ConfirmModal = ({
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}) => {
  return (
    <div className="confirm-dialog-overlay">
      <div className="confirm-dialog-modal">
        <div className="confirm-dialog-header">
          <div className="confirm-dialog-icon">
            <FiAlertTriangle />
          </div>

          <button
            className="confirm-dialog-close-btn"
            onClick={onCancel}
          >
            <FiX />
          </button>
        </div>

        <h2 className="confirm-dialog-title">
          {title}
        </h2>

        <p className="confirm-dialog-message">
          {message}
        </p>

        <div className="confirm-dialog-actions">
          <button
            className="confirm-dialog-cancel-btn"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </button>

          <button
            className="confirm-dialog-delete-btn"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;