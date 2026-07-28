const PersonalInfo = () => {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 md:p-8">
      <h2 className="mb-6 text-2xl">Personal Information</h2>

      <div className="grid grid-cols-1 gap-[22px] md:grid-cols-2">
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-semibold text-text">Full Name</label>
          <input
            type="text"
            defaultValue="Parth Verma"
            className="h-12 rounded-[10px] border border-border px-4 text-[15px] transition focus:border-primary"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-sm font-semibold text-text">Email</label>
          <input
            type="email"
            defaultValue="parth.verma@ongc.co.in"
            className="h-12 rounded-[10px] border border-border px-4 text-[15px] transition focus:border-primary"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-sm font-semibold text-text">Phone</label>
          <input
            type="text"
            defaultValue="+91 9876543210"
            className="h-12 rounded-[10px] border border-border px-4 text-[15px] transition focus:border-primary"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-sm font-semibold text-text">Department</label>
          <input
            type="text"
            defaultValue="GEOPIC"
            className="h-12 rounded-[10px] border border-border px-4 text-[15px] transition focus:border-primary"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-sm font-semibold text-text">Designation</label>
          <input
            type="text"
            defaultValue="Software Intern"
            className="h-12 rounded-[10px] border border-border px-4 text-[15px] transition focus:border-primary"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-sm font-semibold text-text">Employee ID</label>
          <input
            type="text"
            defaultValue="ONGC001"
            className="h-12 rounded-[10px] border border-border px-4 text-[15px] transition focus:border-primary"
          />
        </div>
      </div>

      <button
        type="button"
        className="mt-8 rounded-[10px] border-0 bg-primary px-[26px] py-3 text-[15px] font-semibold text-white transition hover:bg-primary-hover md:w-auto w-full"
      >
        Save Changes
      </button>
    </div>
  );
};

export default PersonalInfo;
