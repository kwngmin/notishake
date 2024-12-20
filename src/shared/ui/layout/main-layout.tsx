"use client";

import WriteModal from "@/features/write/ui/WriteModal";
import { useGetWindowWidth } from "@/shared/hooks/useGetWidth";
import { calculateSidebarWidth } from "@/shared/utils/layout";
import DockBar from "@/widgets/dock-bar/ui/DockBar";
import SideNavBar from "@/widgets/side-nav-bar/ui/SideNavBar";
import { useEffect, useState } from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const windowWidth = useGetWindowWidth();
  const [sideNavWidth, setSideNavWidth] = useState<number | null>(null);
  const [modalState, setModalState] = useState<{ isOpen: boolean }>({
    isOpen: false,
  });

  useEffect(() => {
    // if (windowWidth > 1280) {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        setSideNavWidth(calculateSidebarWidth(windowWidth));
      }, 0);
    }
  }, [windowWidth]);

  if (sideNavWidth === null) return null;

  const handleWriteModalOpenChange = (isOpen: boolean) => {
    setModalState({ isOpen });
  };

  console.log(modalState, "modalState");

  return (
    <div className="h-dvh max-h-dvh w-full overflow-hidden flex">
      <SideNavBar
        sideNavWidth={sideNavWidth}
        onWriteModalOpen={handleWriteModalOpenChange}
      />
      <div className="w-full flex overflow-y-auto">
        <main className="w-full max-w-screen-sm mx-auto lg:mx-0 px-4 sm:px-6 md:px-10">
          {children}
        </main>
        <DockBar onWriteModalOpen={handleWriteModalOpenChange} />
      </div>
      {modalState.isOpen && (
        <WriteModal onOpenChange={handleWriteModalOpenChange} />
      )}
    </div>
  );
};

export default MainLayout;
