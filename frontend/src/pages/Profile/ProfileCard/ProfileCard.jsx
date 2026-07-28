import { FiCamera } from "react-icons/fi";
import profileImage from "../../../assets/logo/ongc-logo.png";

const ProfileCard = () => {
  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-white p-6 md:flex-row md:items-center md:gap-8 md:p-8 md:text-left">
      <div className="relative">
        <img
          src={profileImage}
          alt="Profile"
          className="h-[120px] w-[120px] rounded-full border-4 border-slate-100 object-cover"
        />

        <button
          type="button"
          className="absolute bottom-0 right-0 flex h-[38px] w-[38px] items-center justify-center rounded-full border-0 bg-primary text-white"
        >
          <FiCamera />
        </button>
      </div>

      <div className="flex flex-col items-center gap-2.5 md:items-start">
        <h2 className="text-2xl text-text md:text-[28px]">Parth Verma</h2>

        <p className="text-base text-text-light">parth.verma@ongc.co.in</p>

        <div className="mt-2 flex flex-wrap justify-center gap-3 md:justify-start">
          <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
            Software Intern
          </span>
          <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
            GEOPIC
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
