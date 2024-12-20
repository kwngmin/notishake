import Link from "next/link";
import { usePathname } from "next/navigation";

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

const DockBar = ({
  onWriteModalOpen,
}: {
  onWriteModalOpen: (isOpen: boolean) => void;
}) => {
  const path = usePathname();

  return (
    <div className="fixed lg:hidden bottom-0 sm:bottom-7 left-1/2 -translate-x-1/2 w-full sm:max-w-lg sm:px-4 sm:rounded-full overflow-hidden h-16 bg-white/30 backdrop-blur-xl border-t border-neutral-100 sm:border-none sm:outline sm:outline-1 sm:outline-neutral-100 lg:outline-none grid grid-cols-5">
      {menuList.map((menu) => {
        if (menu.title === "write") {
          return (
            <button
              key={menu.title}
              onClick={() => onWriteModalOpen(true)}
              className="flex flex-col items-center rounded"
            >
              <div className="size-10 flex items-center justify-center">
                <span className="mt-1 material-symbols-rounded flex size-8 items-center justify-center text-3xl font-light scale-95">
                  {menu.icon}
                </span>
              </div>
              <span className="text-xs">{menu.name}</span>
            </button>
          );
        }
        return (
          <Link
            key={menu.title}
            href={menu.path}
            className="flex flex-col items-center rounded"
          >
            {menu.title !== "profile" ? (
              <div className="size-10 flex items-center justify-center">
                <span
                  className={`mt-1 material-symbols-rounded flex size-8 items-center justify-center text-3xl font-light group-hover:font-normal transition-all ${
                    path === menu.path ? "material-fill text-indigo-700" : ""
                  } ${
                    menu.title === "home"
                      ? "scale-110 group-hover:scale-115"
                      : menu.title === "favorite"
                      ? "scale-100 group-hover:scale-110"
                      : "scale-100 group-hover:scale-105"
                  }`}
                >
                  {menu.icon}
                </span>
              </div>
            ) : (
              <div className="size-10 flex items-center justify-center">
                <span
                  className="mt-1 size-7 bg-slate-200 rounded-full bg-center bg-cover"
                  // style={
                  //   {
                  //       backgroundImage: `url(${photoUrl})`,
                  //   }
                  // }
                />
              </div>
            )}
            <span className="text-xs">{menu.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default DockBar;
