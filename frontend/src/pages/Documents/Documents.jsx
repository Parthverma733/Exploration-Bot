import { useEffect, useState } from "react";
import {
  FiUpload,
  FiSearch,
  FiGrid,
  FiList,
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiHardDrive,
} from "react-icons/fi";

import DocumentTable from "./DocumentTable/DocumentTable";
import UploadModal from "./UploadModal/UploadModal";

import toast from "react-hot-toast";
import { getDocuments } from "../../api/documents";

const DocumentsSearchBar = () => {
  const [view, setView] = useState("grid");

  return (
    <div className="grid grid-cols-1 items-center gap-4 xl:grid-cols-[2fr_180px_140px_160px_auto]">
      <div className="flex h-[52px] items-center gap-3 rounded-xl border border-border bg-white px-4">
        <FiSearch className="text-lg text-slate-400" />
        <input
          type="text"
          placeholder="Search documents..."
          className="flex-1 border-0 bg-transparent text-[15px]"
        />
      </div>

      <select className="h-[52px] cursor-pointer rounded-xl border border-border bg-white px-4 text-sm">
        <option>All Basins</option>
        <option>Krishna-Godavari</option>
        <option>Cambay</option>
        <option>Mumbai Offshore</option>
      </select>

      <select className="h-[52px] cursor-pointer rounded-xl border border-border bg-white px-4 text-sm">
        <option>All Years</option>
        <option>2026</option>
        <option>2025</option>
        <option>2024</option>
      </select>

      <select className="h-[52px] cursor-pointer rounded-xl border border-border bg-white px-4 text-sm">
        <option>All Types</option>
        <option>Seismic</option>
        <option>Well Log</option>
        <option>Reservoir</option>
      </select>

      <div className="flex w-max overflow-hidden rounded-xl border border-border">
        <button
          type="button"
          className={[
            "flex h-[52px] w-[52px] items-center justify-center border-0 text-lg transition-colors duration-200",
            view === "grid"
              ? "bg-primary text-white"
              : "bg-white hover:bg-background",
          ].join(" ")}
          onClick={() => setView("grid")}
        >
          <FiGrid />
        </button>

        <button
          type="button"
          className={[
            "flex h-[52px] w-[52px] items-center justify-center border-0 text-lg transition-colors duration-200",
            view === "list"
              ? "bg-primary text-white"
              : "bg-white hover:bg-background",
          ].join(" ")}
          onClick={() => setView("list")}
        >
          <FiList />
        </button>
      </div>
    </div>
  );
};

const DocumentsStats = ({ documents }) => {
  const totalDocuments = documents.length;

  const processedDocuments = documents.filter(
    (doc) => doc.status === "completed",
  ).length;

  const processingDocuments = documents.filter(
    (doc) => doc.status === "processing",
  ).length;

  const totalStorage = documents.reduce(
    (total, doc) => total + Number(doc.file_size || 0),
    0,
  );

  const formatStorage = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024)
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  const stats = [
    {
      title: "Total Documents",
      value: totalDocuments,
      icon: <FiFileText />,
    },
    {
      title: "Processed",
      value: processedDocuments,
      icon: <FiCheckCircle />,
    },
    {
      title: "Processing",
      value: processingDocuments,
      icon: <FiClock />,
    },
    {
      title: "Storage Used",
      value: formatStorage(totalStorage),
      icon: <FiHardDrive />,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <div
          className="flex items-center gap-[18px] rounded-xl border border-border bg-white p-[22px] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
          key={item.title}
        >
          <div className="flex h-[55px] w-[55px] items-center justify-center rounded-xl bg-primary/10 text-2xl text-primary">
            {item.icon}
          </div>

          <div>
            <h3 className="text-[26px] font-bold text-text">{item.value}</h3>
            <p className="mt-1 text-sm text-text-light">{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

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
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-text md:text-[32px]">
            Document Repository
          </h1>
          <p className="mt-1.5 text-text-light">
            Manage exploration reports and knowledge documents.
          </p>
        </div>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-2.5 rounded-[10px] bg-primary px-[22px] py-3.5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-primary-hover md:w-auto"
          onClick={() => setShowUploadModal(true)}
        >
          <FiUpload />
          Upload PDF
        </button>
      </div>

      <DocumentsSearchBar />
      <DocumentsStats documents={documents} />

      <DocumentTable
        documents={documents}
        loading={loading}
        refreshDocuments={fetchDocuments}
      />

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
