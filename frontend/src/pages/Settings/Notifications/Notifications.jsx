import { useState } from "react";

const toggleTrack =
  "absolute inset-0 cursor-pointer rounded-full bg-slate-300 transition peer-checked:bg-primary before:absolute before:left-[3px] before:top-[3px] before:h-[22px] before:w-[22px] before:rounded-full before:bg-white before:transition before:content-[''] peer-checked:before:translate-x-6";

const Notifications = () => {
  const [settings, setSettings] = useState({
    email: true,
    ai: true,
    processing: false,
    system: true,
  });

  const toggle = (key) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    });
  };

  const items = [
    {
      key: "email",
      title: "Email Notifications",
      description: "Receive important updates via email.",
    },
    {
      key: "ai",
      title: "AI Assistant Notifications",
      description: "Notify when AI tasks are completed.",
    },
    {
      key: "processing",
      title: "Document Processing",
      description: "Get notified when uploaded PDFs are processed.",
    },
    {
      key: "system",
      title: "System Notifications",
      description: "Receive maintenance and security alerts.",
    },
  ];

  return (
    <div className="rounded-2xl border border-border bg-white p-6 md:p-8">
      <h2 className="mb-6 text-2xl">Notifications</h2>

      <div className="flex flex-col gap-5">
        {items.map((item) => (
          <div
            key={item.key}
            className="flex flex-col items-start justify-between gap-4 rounded-xl border border-slate-100 p-[18px] md:flex-row md:items-center"
          >
            <div>
              <h4 className="mb-1 text-base">{item.title}</h4>
              <p className="text-sm text-text-light">{item.description}</p>
            </div>

            <label className="relative inline-block h-7 w-[52px] shrink-0">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={settings[item.key]}
                onChange={() => toggle(item.key)}
              />
              <span className={toggleTrack} />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
