import { useState } from "react";

import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-[999] bg-slate-900/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        open={sidebarOpen}
        onNavigate={() => setSidebarOpen(false)}
      />

      <div className="flex min-h-screen w-full flex-col lg:ml-[250px] lg:w-[calc(100%-250px)]">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-0">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
