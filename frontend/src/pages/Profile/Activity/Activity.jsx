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
    <div className="rounded-2xl border border-border bg-white p-6 md:p-8">
      <h2 className="mb-6 text-2xl">Recent Activity</h2>

      <div className="flex flex-col gap-[18px]">
        {activities.map((activity, index) => (
          <div
            className="flex items-center gap-[18px] rounded-xl border border-slate-100 p-4 transition hover:bg-background"
            key={index}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl text-primary">
              {activity.icon}
            </div>

            <div>
              <h4 className="mb-1 text-base">{activity.title}</h4>
              <p className="text-sm text-text-light">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;
