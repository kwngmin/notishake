"use client";
import { useEffect } from "react";
import { createPortal } from "react-dom";

const Portal = ({
  isOpen = false,
  onClickClose,
  children,
}: {
  isOpen?: boolean;
  onClickClose: () => void;
  children: React.ReactNode;
}) => {
  // 모달 창 열람 시 스크롤 비활성화
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // 스크롤 비활성화
    } else {
      document.body.style.overflow = ""; // 스크롤 복원
    }
    // 컴포넌트가 언마운트될 때 스크롤 복원
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // isOpen이 false일 경우 Portal 컴포넌트 비활성화
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed top-0 left-0 right-0 bottom-0 w-full min-h-dvh flex items-center justify-center backdrop-blur-md bg-black/30 z-20"
      onClick={onClickClose}
    >
      {/* <button
        onClick={onClickClose}
        className="absolute top-0 right-0 w-11 h-11 flex items-center justify-center"
      >
        <span className="material-symbols-rounded select-none text-white/50">
          close
        </span>
      </button> */}
      {children}
    </div>,
    document.body
  );
};

export default Portal;
