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

const SideNavBar = ({ sideNavWidth }: { sideNavWidth: number }) => {
  const path = usePathname();
  console.log(path);
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
          {menuList.map((menu) => (
            <div
              key={menu.title}
              className="flex items-center gap-1 rounded group hover:bg-indigo-50 *:transition-all  cursor-pointer"
            >
              {menu.title !== "profile" ? (
                <div className="size-12 flex items-center justify-center">
                  <span
                    className={`material-symbols-rounded flex size-10 items-center justify-center text-3xl font-light group-hover:font-normal transition-all ${
                      path === menu.path ? "material-fill text-indigo-700" : ""
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
                  <span className="size-7 bg-slate-200 rounded-full" />
                </div>
              )}
              <span className="text-md font-medium group-hover:text-lg group-hover:font-semibold">
                {menu.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;
