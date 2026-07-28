import { useState } from "react";

const AccountSettings = () => {
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("Asia/Kolkata");

  return (
    <div className="rounded-2xl border border-border bg-white p-6 md:p-8">
      <h2 className="mb-6 text-2xl">Account Settings</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-semibold">Language</label>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="h-12 rounded-[10px] border border-border bg-white px-4 text-[15px] focus:border-primary"
          >
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-sm font-semibold">Timezone</label>

          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="h-12 rounded-[10px] border border-border bg-white px-4 text-[15px] focus:border-primary"
          >
            <option>Asia/Kolkata</option>
            <option>UTC</option>
            <option>America/New_York</option>
          </select>
        </div>
      </div>

      <button
        type="button"
        className="mt-8 w-full rounded-[10px] border-0 bg-primary px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-primary-hover md:w-auto"
      >
        Save Changes
      </button>
    </div>
  );
};

export default AccountSettings;
