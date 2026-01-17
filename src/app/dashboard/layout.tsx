import React from "react";

import { SidebarShell } from "./components/SidebarShell";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      
      <SidebarShell>
        <div className=" relative flex h-[400vh] flex-1 flex-col px-3">
          {children}
        </div>
      </SidebarShell>
    </div>
  );
};

export default layout;
