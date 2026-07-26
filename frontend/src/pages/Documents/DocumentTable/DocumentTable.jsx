import { FiFileText, FiEye, FiTrash2 } from "react-icons/fi";
import { deleteDocument } from "../../../api/documents";
import { useState } from "react";
import "./DocumentTable.css";
import toast from "react-hot-toast";
import ConfirmModal from "../../../components/ConfirmModal/ConfirmModal";

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
      <div className="document-table">
        <p style={{ padding: "40px", textAlign: "center" }}>
          Loading documents...
        </p>
      </div>
    );
  }

  return (
    <div className="document-table">
      <table>
        <thead>
          <tr>
            <th>Document</th>
            <th>Size</th>
            <th>Uploaded</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {documents.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "40px" }}>
                No documents uploaded.
              </td>
            </tr>
          ) : (
            documents.map((doc) => (
              <tr key={doc.id}>
                <td>
                  <div className="doc-name">
                    <FiFileText className="pdf-icon" />
                    <span>{doc.original_name}</span>
                  </div>
                </td>

                <td>{formatSize(doc.file_size)}</td>

                <td>{formatDate(doc.created_at)}</td>

                <td>
                  <span
                    className={`status ${
                      doc.status === "completed" ? "processed" : "processing"
                    }`}
                  >
                    {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                  </span>
                </td>

                <td>
                  <div className="actions">
                    <button
                      onClick={() => window.open(doc.file_path, "_blank")}
                    >
                      <FiEye />
                    </button>

                    <button
                      className="delete-btn"
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
