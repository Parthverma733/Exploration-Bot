import { FiSearch, FiBell, FiChevronDown, FiMenu } from "react-icons/fi";

const Topbar = ({ onMenuClick }) => {
  return (
    <header className="flex h-20 items-center justify-between border-b border-border bg-white px-4 md:px-8">
      <div className="flex flex-1 items-center gap-3 md:gap-4">
        <button
          type="button"
          aria-label="Open menu"
          className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-background text-xl lg:hidden"
          onClick={onMenuClick}
        >
          <FiMenu />
        </button>

        <div className="flex max-w-full flex-1 items-center rounded-[10px] border border-border bg-background px-4 py-3 md:max-w-xl lg:max-w-[520px]">
          <FiSearch className="shrink-0 text-text-light" />
          <input
            type="text"
            placeholder="Search documents..."
            className="ml-2.5 flex-1 border-0 bg-transparent text-[15px]"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-[18px]">
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-background transition-colors duration-200 hover:bg-[#EEF2F7]"
        >
          <FiBell className="text-xl" />
        </button>

        <div className="flex cursor-pointer items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
            P
          </div>

          <div className="hidden sm:block">
            <h4 className="text-[15px]">Parth</h4>
            <p className="text-[13px] text-text-light">Administrator</p>
          </div>

          <FiChevronDown className="hidden sm:block" />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
