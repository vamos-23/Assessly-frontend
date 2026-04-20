import DashboardNavBar from "./DashboardNavbar"; 

export default function DashboardLayout({ 
  children, 
}: { 
  children: React.ReactNode; 
}) { 
  return ( 
    <div className="min-h-screen bg-[#0B1120] text-white relative overflow-y-auto"> 
      <div className="fixed -top-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" /> 
      <div className="fixed -bottom-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" /> 
      <div className="relative"> 
        <DashboardNavBar /> 
        <main className="p-6 max-w-7xl mx-auto">
          {children}
        </main> 
      </div> 
    </div> 
  ); 
}
