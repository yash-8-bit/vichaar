import LayoutPanel from "@/components/panel/ui/layout";
import React, { PropsWithChildren } from "react";

function layout({ children }: PropsWithChildren) {
  return <LayoutPanel>{children}</LayoutPanel>;
}

export default layout;
