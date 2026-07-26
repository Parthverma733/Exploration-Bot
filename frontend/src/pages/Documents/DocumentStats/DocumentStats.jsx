import "./DocumentStats.css";
import {
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiHardDrive,
} from "react-icons/fi";

const DocumentStats = ({ documents }) => {
  const totalDocuments = documents.length;

  const processedDocuments = documents.filter(
    (doc) => doc.status === "completed"
  ).length;

  const processingDocuments = documents.filter(
    (doc) => doc.status === "processing"
  ).length;

  const totalStorage = documents.reduce(
    (total, doc) => total + Number(doc.file_size || 0),
    0
  );

  const formatStorage = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024)
      return `${(bytes / 1024).toFixed(1)} KB`;
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
    <div className="document-stats">
      {stats.map((item) => (
        <div className="stat-card" key={item.title}>
          <div className="stat-icon">{item.icon}</div>

          <div className="stat-content">
            <h3>{item.value}</h3>
            <p>{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentStats;