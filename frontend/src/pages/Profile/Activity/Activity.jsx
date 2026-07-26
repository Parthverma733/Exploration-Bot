import "./Activity.css";
import {
  FiLogIn,
  FiUpload,
  FiMessageSquare,
  FiFileText,
} from "react-icons/fi";

const activities = [
  {
    icon: <FiLogIn />,
    title: "Logged in",
    time: "Today • 09:15 AM",
  },
  {
    icon: <FiUpload />,
    title: "Uploaded Seismic_Report.pdf",
    time: "Yesterday • 04:20 PM",
  },
  {
    icon: <FiMessageSquare />,
    title: "Asked AI Assistant",
    time: "Yesterday • 03:42 PM",
  },
  {
    icon: <FiFileText />,
    title: "Generated Reservoir Report",
    time: "2 days ago",
  },
];

const Activity = () => {
  return (
    <div className="activity-section">

      <h2>Recent Activity</h2>

      <div className="activity-list">

        {activities.map((activity, index) => (
          <div className="activity-item" key={index}>

            <div className="activity-icon">
              {activity.icon}
            </div>

            <div className="activity-info">
              <h4>{activity.title}</h4>
              <p>{activity.time}</p>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Activity;