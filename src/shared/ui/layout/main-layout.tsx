const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-dvh w-full overflow-hidden flex">
      <div className="hidden lg:block shrink-0 w-64 bg-white h-dvh bg-slate-200">
        side
      </div>
      <div className="w-full flex">
        <main className="w-full max-w-screen-sm mx-auto">{children}</main>
        <div className="lg:hidden fixed bottom-0 left-1/2 -translate-x-1/2 w-full md:w-96 h-16 bg-slate-200">
          dock
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
