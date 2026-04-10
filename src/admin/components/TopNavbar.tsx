import { useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";
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
      <div className="flex items-center gap-2">
        <User className="w-5 h-5 text-gray-600" />
        <span className="text-gray-800 font-medium">Welcome, {adminName}</span>
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
