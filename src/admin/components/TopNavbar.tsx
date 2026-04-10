import { useNavigate } from "react-router-dom";
import { User, LogOut, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function TopNavbar() {
  const { adminName, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <header className="bg-white shadow flex flex-row items-center justify-between px-6 py-4">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 transition text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-gray-600" />
          <span className="text-gray-800 font-medium">Welcome, {adminName}</span>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-red-500 hover:text-red-700 transition"
      >
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </header>
  );
}
