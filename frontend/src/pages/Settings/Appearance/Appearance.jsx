import { useState } from "react";

const toggleTrack =
  "absolute inset-0 cursor-pointer rounded-full bg-slate-300 transition peer-checked:bg-primary before:absolute before:left-[3px] before:top-[3px] before:h-[22px] before:w-[22px] before:rounded-full before:bg-white before:transition before:content-[''] peer-checked:before:translate-x-6";

const Appearance = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [compactMode, setCompactMode] = useState(false);

  return (
    <div className="rounded-2xl border border-border bg-white p-6 md:p-8">
      <h2 className="mb-6 text-2xl">Appearance</h2>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-slate-100 p-[18px] md:flex-row md:items-center">
          <div>
            <h4 className="mb-1 text-base">Dark Mode</h4>
            <p className="text-sm text-text-light">
              Enable dark theme for the application.
            </p>
          </div>

          <label className="relative inline-block h-7 w-[52px] shrink-0">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className={toggleTrack} />
          </label>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-slate-100 p-[18px] md:flex-row md:items-center">
          <div>
            <h4 className="mb-1 text-base">Compact Layout</h4>
            <p className="text-sm text-text-light">
              Reduce spacing for a denser interface.
            </p>
          </div>

          <label className="relative inline-block h-7 w-[52px] shrink-0">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={compactMode}
              onChange={() => setCompactMode(!compactMode)}
            />
            <span className={toggleTrack} />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Appearance;
