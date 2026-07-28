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
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/45 p-4">
      <div className="w-full max-w-[520px] rounded-[18px] bg-white p-6 md:p-7">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl">Upload Document</h2>

          <button type="button" className="border-0 bg-transparent text-[22px]" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <label className="flex h-[240px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 transition-colors duration-200 hover:border-primary hover:bg-orange-50">
          <FiUploadCloud className="mb-4 text-[56px] text-primary" />

          <h3 className="text-xl">Drag & Drop PDF</h3>

          <p className="mt-2 text-text-light">or click to browse</p>

          <input type="file" accept=".pdf" hidden onChange={handleFileChange} />
        </label>

        {selectedFile && (
          <div className="mt-5 rounded-[10px] bg-background p-3.5 text-text">
            {selectedFile.name}
          </div>
        )}

        <div className="mt-6 flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <button
            type="button"
            className="rounded-[10px] border border-border bg-white px-[22px] py-3"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className="rounded-[10px] border-0 bg-primary px-[22px] py-3 text-white hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
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
