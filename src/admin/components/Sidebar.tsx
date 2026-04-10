import { NavLink } from "react-router-dom";
import { Globe, LayoutDashboard, PlusCircle, Package, MessageSquare, MessageSquarePlus, X } from "lucide-react";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/add-package", label: "Add Package", icon: PlusCircle },
  { to: "/admin/manage-packages", label: "Manage Packages", icon: Package },
  { to: "/admin/add-testimonial", label: "Add Testimonial", icon: MessageSquarePlus },
  { to: "/admin/manage-testimonials", label: "Manage Testimonials", icon: MessageSquare },
];

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  return (
    <aside className="w-64 h-full bg-slate-900 flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Globe className="text-white w-7 h-7 shrink-0" />
          <span className="text-white font-semibold text-lg tracking-wide">Globe Trotter</span>
        </div>
        {/* Close button for mobile */}
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden text-white/70 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                isActive
                  ? "bg-white/10 text-white font-semibold"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <Icon className="w-5 h-5 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
