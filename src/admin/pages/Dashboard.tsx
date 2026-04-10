import { Link } from 'react-router-dom';
import { Package, PlusCircle, LayoutDashboard, TrendingUp } from 'lucide-react';
import { usePackages } from '../context/PackageContext';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { packages } = usePackages();
  const { adminName } = useAuth();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <LayoutDashboard className="text-blue-600" size={28} />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 text-sm">Welcome back, {adminName}</p>
        </div>
      </div>

      {/* Stats Card */}
      <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 max-w-xs">
        <div className="bg-blue-100 text-blue-600 rounded-full p-3">
          <Package size={24} />
        </div>
        <div>
          <p className="text-gray-500 text-sm">Total Packages</p>
          <p className="text-3xl font-bold text-gray-800">{packages.length}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="text-gray-500" size={18} />
          <h2 className="text-lg font-semibold text-gray-700">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/admin/add-package"
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 hover:shadow-lg transition cursor-pointer flex items-center gap-4"
          >
            <PlusCircle size={32} />
            <div>
              <p className="font-semibold text-lg">Add New Package</p>
              <p className="text-blue-100 text-sm">Create a new travel package</p>
            </div>
          </Link>

          <Link
            to="/admin/manage-packages"
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl p-6 hover:shadow-lg transition cursor-pointer flex items-center gap-4"
          >
            <Package size={32} />
            <div>
              <p className="font-semibold text-lg">Manage Packages</p>
              <p className="text-emerald-100 text-sm">View, edit or delete packages</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
