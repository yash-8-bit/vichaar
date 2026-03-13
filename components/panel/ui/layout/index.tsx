import React, { PropsWithChildren } from "react";
import CollapsibleSidebar from "../side-bar/collapsible-sidebar";

function LayoutPanel({ children }: PropsWithChildren) {
  return (
    <div className="flex">
      <CollapsibleSidebar />
      <div className="flex-1 p-8">
      {children}
      </div>
    </div>
  );
}

export default LayoutPanel;
