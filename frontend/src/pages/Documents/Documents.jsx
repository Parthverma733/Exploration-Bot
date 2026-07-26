import "./Documents.css";
import { useEffect, useState } from "react";

import SearchBar from "./SearchBar/SearchBar";
import DocumentTable from "./DocumentTable/DocumentTable";
import DocumentStats from "./DocumentStats/DocumentStats";
import UploadModal from "./UploadModal/UploadModal";
import Layout from "../../components/layout/Layout/Layout";

import { FiUpload } from "react-icons/fi";

import toast from "react-hot-toast";
import { getDocuments } from "../../api/documents";

const Documents = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);

      const response = await getDocuments();
      console.log(response.data.data);

      setDocuments(response.data.data);
    } catch (error) {
      toast.error("Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="documents-page">
      {/* Header */}
      <div className="documents-header">
        <div>
          <h1>Document Repository</h1>
          <p>Manage exploration reports and knowledge documents.</p>
        </div>

        <button className="upload-btn" onClick={() => setShowUploadModal(true)}>
          <FiUpload />
          Upload PDF
        </button>
      </div>

      {/* Search + Filters */}
      <SearchBar />
      <DocumentStats documents={documents} />

      <DocumentTable
        documents={documents}
        loading={loading}
        refreshDocuments={fetchDocuments}
      />

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          refreshDocuments={fetchDocuments}
        />
      )}
    </div>
  );
};

export default Documents;
