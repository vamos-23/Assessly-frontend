import { useNavigate } from "react-router-dom";
import { clearToken } from "../../utils/auth";

export default function DashboardNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate("/");
  };

  return (
    <div
      className="h-17.5 flex items-center justify-between px-6 
                    border-b border-white/10 bg-[#0B1120]/80 backdrop-blur-md"
    >
      <div className="flex items-center gap-2">
        <img src="/assessly_icon_192.png" alt="assessly" className="w-8 h-8" />
        <h1 className="text-xl font-semibold tracking-wide text-white">
          Assessly
        </h1>
      </div>

      <button
        onClick={handleLogout}
        className="px-4 py-2 text-sm rounded-lg 
                   bg-white/10 hover:bg-red-700
                   transition text-white font-medium"
      >
        Logout
      </button>
    </div>
  );
}
