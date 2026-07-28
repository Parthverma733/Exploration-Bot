import { FiLock } from "react-icons/fi";

const Security = () => {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 md:p-8">
      <h2 className="mb-6 text-2xl">Security</h2>

      <div className="grid grid-cols-1 gap-[22px] md:grid-cols-2">
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-semibold">Current Password</label>
          <input
            type="password"
            placeholder="Enter current password"
            className="h-12 rounded-[10px] border border-border px-4 text-[15px] transition focus:border-primary"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-sm font-semibold">New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            className="h-12 rounded-[10px] border border-border px-4 text-[15px] transition focus:border-primary"
          />
        </div>

        <div className="flex flex-col md:col-span-2">
          <label className="mb-2 text-sm font-semibold">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            className="h-12 rounded-[10px] border border-border px-4 text-[15px] transition focus:border-primary"
          />
        </div>
      </div>

      <button
        type="button"
        className="mt-8 flex w-full items-center justify-center gap-2.5 rounded-[10px] border-0 bg-primary px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-primary-hover md:w-auto md:justify-start"
      >
        <FiLock />
        Change Password
      </button>
    </div>
  );
};

export default Security;
