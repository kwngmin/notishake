"use client";

import { useGetWindowWidth } from "@/shared/hooks/useGetWidth";
import { calculateSidebarWidth } from "@/shared/utils/layout";
import DockBar from "@/widgets/dock-bar/ui/DockBar";
import SideNavBar from "@/widgets/side-nav-bar/ui/SideNavBar";
import { useEffect, useState } from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const windowWidth = useGetWindowWidth();
  const [sideNavWidth, setSideNavWidth] = useState(0);

  useEffect(() => {
    if (windowWidth > 1280) {
      setTimeout(() => {
        setSideNavWidth(calculateSidebarWidth(windowWidth));
      }, 0);
    }
  }, [windowWidth]);

  if (sideNavWidth === 0) return null;

  return (
    <div className="h-dvh max-h-dvh w-full overflow-hidden flex">
      <SideNavBar sideNavWidth={sideNavWidth} />
      <div className="w-full flex overflow-y-auto">
        <main className="w-full max-w-screen-md mx-auto lg:mx-0 px-4 sm:px-6 md:px-10">
          {children}
        </main>
        <DockBar />
      </div>
    </div>
  );
};

export default MainLayout;
