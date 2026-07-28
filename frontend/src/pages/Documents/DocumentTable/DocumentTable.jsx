import { FiFileText, FiEye, FiTrash2 } from "react-icons/fi";
import { deleteDocument } from "../../../api/documents";
import { useState } from "react";
import toast from "react-hot-toast";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";
import Skeleton from "react-loading-skeleton";

const DocumentTable = ({ documents, loading, refreshDocuments }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;

    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleDelete = async () => {
    if (!selectedDocument) return;

    setDeleting(true);

    const loadingToast = toast.loading("Deleting document...");

    try {
      await deleteDocument(selectedDocument.id);

      toast.success("Document deleted successfully!", {
        id: loadingToast,
      });

      refreshDocuments();

      setShowDeleteModal(false);
      setSelectedDocument(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed", {
        id: loadingToast,
      });
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="overflow-hidden rounded-xl border border-border bg-white ">
        <tbody>
          {[...Array(9)].map((_, i) => (
            <tr key={i}>
              <td>
                <Skeleton height = {40} width={240} className="mr-1" />
              </td>
              <td>
                <Skeleton height = {40} width={240} className="mr-1"  />
              </td>
              <td>
                <Skeleton height = {40} width={240} className="mr-1"  />
              </td>
              <td>
                <Skeleton height = {40} width={240} className="mr-1"  />
              </td>
              <td>
                <Skeleton height = {40} width={240} />
              </td>
            </tr>
          ))}
        </tbody>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse">
          <thead className="bg-background">
            <tr>
              <th className="p-4 text-left text-[15px] text-text md:p-[18px]">
                Document
              </th>
              <th className="p-4 text-left text-[15px] text-text md:p-[18px]">
                Size
              </th>
              <th className="p-4 text-left text-[15px] text-text md:p-[18px]">
                Uploaded
              </th>
              <th className="p-4 text-left text-[15px] text-text md:p-[18px]">
                Status
              </th>
              <th className="p-4 text-left text-[15px] text-text md:p-[18px]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {documents.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-10 text-center">
                  No documents uploaded.
                </td>
              </tr>
            ) : (
              documents.map((doc) => (
                <tr key={doc.id}>
                  <td className="border-t border-border p-4 md:p-[18px]">
                    <div className="flex items-center gap-3">
                      <FiFileText className="text-[22px] text-[#E53935]" />
                      <span className="break-all">{doc.original_name}</span>
                    </div>
                  </td>

                  <td className="border-t border-border p-4 md:p-[18px]">
                    {formatSize(doc.file_size)}
                  </td>

                  <td className="border-t border-border p-4 md:p-[18px]">
                    {formatDate(doc.created_at)}
                  </td>

                  <td className="border-t border-border p-4 md:p-[18px]">
                    <span
                      className={[
                        "rounded-full px-3 py-1.5 text-[13px] font-semibold",
                        doc.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800",
                      ].join(" ")}
                    >
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </span>
                  </td>

                  <td className="border-t border-border p-4 md:p-[18px]">
                    <div className="flex gap-2.5">
                      <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border-0 bg-slate-100 transition-colors duration-200 hover:bg-slate-200"
                        onClick={() => window.open(doc.file_path, "_blank")}
                      >
                        <FiEye />
                      </button>

                      <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border-0 bg-slate-100 text-red-600 transition-colors duration-200 hover:bg-slate-200"
                        onClick={() => {
                          setSelectedDocument(doc);
                          setShowDeleteModal(true);
                        }}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showDeleteModal && (
        <ConfirmModal
          title="Delete Document"
          message={`Are you sure you want to delete "${selectedDocument?.original_name}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          loading={deleting}
          onConfirm={handleDelete}
          onCancel={() => {
            setShowDeleteModal(false);
            setSelectedDocument(null);
          }}
        />
      )}
    </div>
  );
};

export default DocumentTable;
