"use client";
import { getUserAvatarUrl } from "@/entities/user/model/getUserAvatarUrl";
import WriteModal from "@/features/write/ui/WriteModal";
import { useDisclosure } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const menuList = [
  {
    title: "home", //
    name: "홈",
    path: "/main",
    icon: "home",
  },
  {
    title: "favorite",
    name: "좋아요",
    path: "/favorite",
    icon: "favorite",
  },
  {
    title: "write",
    name: "글쓰기",
    path: "/write",
    icon: "edit_square",
  },
  {
    title: "inbox",
    name: "구독함",
    path: "/inbox",
    icon: "inbox",
  },
  {
    title: "profile",
    name: "프로필",
    path: "/profile",
    icon: "",
  },
];

const SideNavBar = ({ sideNavWidth }: { sideNavWidth: number }) => {
  const path = usePathname();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvatar = async () => {
      const url = await getUserAvatarUrl();
      setPhotoUrl(url); // 가져온 URL을 상태로 설정
    };
    fetchAvatar(); // 컴포넌트가 마운트될 때 아바타 URL을 가져옴
  }, []);

  console.log(photoUrl, "photoUrl");

  return (
    <div
      className="hidden lg:flex justify-end shrink-0"
      style={{ width: sideNavWidth }}
    >
      <div className=" shrink-0 w-64 h-dvh border-r border-slate-200">
        <div className="text-3xl font-bold tracking-tight text-indigo-500 h-16 flex items-center px-6">
          notishake
        </div>
        <div className="p-2 flex flex-col gap-2">
          {menuList.map((menu) => {
            if (menu.title === "write") {
              return (
                <button
                  key={menu.title}
                  onClick={onOpen}
                  className="flex items-center gap-1 rounded group hover:bg-indigo-50 *:transition-all  cursor-pointer"
                >
                  <div className="size-12 flex items-center justify-center">
                    <span className="material-symbols-rounded flex size-10 items-center justify-center text-3xl font-light group-hover:font-normal transition-all scale-100 group-hover:scale-105">
                      {menu.icon}
                    </span>
                  </div>
                  <span className="text-md font-medium group-hover:text-lg group-hover:font-semibold">
                    {menu.name}
                  </span>
                </button>
              );
            }
            return (
              <Link
                key={menu.title}
                href={menu.path}
                className="flex items-center gap-1 rounded group hover:bg-indigo-50 *:transition-all  cursor-pointer"
              >
                {menu.title !== "profile" ? (
                  <div className="size-12 flex items-center justify-center">
                    <span
                      className={`material-symbols-rounded flex size-10 items-center justify-center text-3xl font-light group-hover:font-normal transition-all ${
                        path === menu.path
                          ? "material-fill text-indigo-700"
                          : ""
                      } ${
                        menu.title === "home"
                          ? "scale-110 group-hover:scale-115"
                          : menu.title === "favorite"
                          ? "scale-105 group-hover:scale-110"
                          : "scale-100 group-hover:scale-105"
                      }`}
                    >
                      {menu.icon}
                    </span>
                  </div>
                ) : (
                  <div className="size-12 flex items-center justify-center">
                    <span
                      className="size-7 bg-slate-200 rounded-full bg-center bg-cover"
                      style={{
                        backgroundImage: `url(${photoUrl})`,
                      }}
                    />
                  </div>
                )}
                <span className="text-md font-medium group-hover:text-lg group-hover:font-semibold">
                  {menu.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      <WriteModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
};

export default SideNavBar;
