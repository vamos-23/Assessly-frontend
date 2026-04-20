import DashboardNavBar from "./DashboardNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen scroll-auto bg-[#0B1120] text-white relative overflow-hidden">
      <div
        className="absolute inset-0 
        bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),
             linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)]
        bg-size-[40px_40px]"
      />
      <div
        className="absolute -top-24 -left-24 w-100 h-100 
        bg-blue-500/10 rounded-full blur-3xl"
      />
      <div
        className="absolute -bottom-24 -right-24 w-100 h-100
        bg-indigo-500/10 rounded-full blur-3xl"
      />
      <div className="relative">
        <DashboardNavBar />

        <div className="p-6 max-w-7xl mx-auto">{children}</div>
      </div>
    </div>
  );
}
