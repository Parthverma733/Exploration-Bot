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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/45 backdrop-blur-sm">
      <div
        className="w-full max-w-[90%] rounded-2xl bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.15)] sm:w-[420px]"
        style={{ animation: "confirm-dialog-fade 0.25s ease" }}
      >
        <div className="mb-5 flex items-center justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-[28px] text-amber-600">
            <FiAlertTriangle />
          </div>

          <button
            type="button"
            className="flex h-[38px] w-[38px] items-center justify-center rounded-lg border-0 bg-gray-100 transition-colors duration-200 hover:bg-gray-200"
            onClick={onCancel}
          >
            <FiX className="text-lg" />
          </button>
        </div>

        <h2 className="mb-3 text-2xl font-bold text-gray-900">{title}</h2>

        <p className="mb-7 leading-relaxed text-gray-500">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="rounded-[10px] bg-gray-100 px-[22px] py-3 text-[15px] font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </button>

          <button
            type="button"
            className="rounded-[10px] bg-red-600 px-[22px] py-3 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
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
