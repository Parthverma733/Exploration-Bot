import "./UploadModal.css";
import { FiUploadCloud, FiX } from "react-icons/fi";
import { useState } from "react";
import toast from "react-hot-toast";
import { uploadDocument } from "../../../api/documents";

const UploadModal = ({ onClose, refreshDocuments }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed.");
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("document", selectedFile);

    const loadingToast = toast.loading("Uploading document...");

    try {
      await uploadDocument(formData);

      toast.success("Document uploaded successfully!", {
        id: loadingToast,
      });

      refreshDocuments();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed.", {
        id: loadingToast,
      });
    }
  };

  return (
    <div className="upload-overlay">
      <div className="upload-modal">
        <div className="upload-header">
          <h2>Upload Document</h2>

          <button onClick={onClose}>
            <FiX />
          </button>
        </div>

        <label className="upload-box">
          <FiUploadCloud />

          <h3>Drag & Drop PDF</h3>

          <p>or click to browse</p>

          <input type="file" accept=".pdf" hidden onChange={handleFileChange} />
        </label>

        {selectedFile && (
          <div className="selected-file">{selectedFile.name}</div>
        )}

        <div className="upload-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button
            className="upload-btn"
            onClick={handleUpload}
            disabled={!selectedFile}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
