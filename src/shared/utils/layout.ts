// 사이드바 너비 계산 로직을 분리하여 재사용 가능하도록 만듦
// sidenav 256
// lg 1024
// xl 1280
// 2xl 1536
// max-w-screen-md 768
// max-w-screen-sm 640
export const calculateSidebarWidth = (windowWidth: number): number => {
  return windowWidth && windowWidth > 1024 ? (windowWidth - 1024) / 2 + 256 : 0;
};
