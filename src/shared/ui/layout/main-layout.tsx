"use client";

import { useGetWindowWidth } from "@/shared/hooks/useGetWidth";
import { calculateSidebarWidth } from "@/shared/utils/layout";
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
    <div className="min-h-dvh w-full overflow-hidden flex">
      <SideNavBar sideNavWidth={sideNavWidth} />
      <div className="w-full flex">
        <main className="w-full max-w-screen-md mx-auto lg:mx-0 px-10">
          {children}
        </main>
        <div className="lg:hidden fixed bottom-0 left-1/2 -translate-x-1/2 w-full md:w-96 h-16 bg-slate-200">
          dock
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
