import { useState } from "react";

const toggleTrack =
  "absolute inset-0 cursor-pointer rounded-full bg-slate-300 transition peer-checked:bg-primary before:absolute before:left-[3px] before:top-[3px] before:h-[22px] before:w-[22px] before:rounded-full before:bg-white before:transition before:content-[''] peer-checked:before:translate-x-6";

const Preferences = () => {
  const [model, setModel] = useState("Mistral");
  const [responseLength, setResponseLength] = useState("Detailed");
  const [citations, setCitations] = useState(true);
  const [basin, setBasin] = useState("All Basins");

  return (
    <div className="rounded-2xl border border-border bg-white p-6 md:p-8">
      <h2 className="mb-6 text-2xl">AI Preferences</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col">
          <label className="mb-2 text-sm font-semibold">Default AI Model</label>

          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="h-12 rounded-[10px] border border-border bg-white px-4 text-[15px] focus:border-primary"
          >
            <option>Mistral</option>
            <option>Llama 3</option>
            <option>Gemma</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-sm font-semibold">Response Length</label>

          <select
            value={responseLength}
            onChange={(e) => setResponseLength(e.target.value)}
            className="h-12 rounded-[10px] border border-border bg-white px-4 text-[15px] focus:border-primary"
          >
            <option>Short</option>
            <option>Detailed</option>
            <option>Comprehensive</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-sm font-semibold">Default Basin</label>

          <select
            value={basin}
            onChange={(e) => setBasin(e.target.value)}
            className="h-12 rounded-[10px] border border-border bg-white px-4 text-[15px] focus:border-primary"
          >
            <option>All Basins</option>
            <option>Krishna-Godavari</option>
            <option>Mumbai Offshore</option>
            <option>Cambay</option>
            <option>Cauvery</option>
          </select>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-slate-100 p-[18px] md:flex-row md:items-center">
          <div>
            <h4 className="mb-1 text-base">Show Citations</h4>
            <p className="text-sm text-text-light">
              Display document references in AI responses.
            </p>
          </div>

          <label className="relative inline-block h-7 w-[52px] shrink-0">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={citations}
              onChange={() => setCitations(!citations)}
            />
            <span className={toggleTrack} />
          </label>
        </div>
      </div>

      <button
        type="button"
        className="mt-8 w-full rounded-[10px] border-0 bg-primary px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-primary-hover md:w-auto"
      >
        Save Preferences
      </button>
    </div>
  );
};

export default Preferences;
