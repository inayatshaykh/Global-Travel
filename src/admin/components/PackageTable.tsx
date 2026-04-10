import { Package as PackageIcon, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Package } from '../types';

interface PackageTableProps {
  packages: Package[];
  onEdit: (pkg: Package) => void;
  onDelete: (id: string) => void;
}

export default function PackageTable({ packages, onEdit, onDelete }: PackageTableProps) {
  if (packages.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <PackageIcon className="w-12 h-12 mb-3" />
          <p className="text-base">No packages yet. Add your first package!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Desktop table */}
      <table className="hidden md:table w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Image</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Title</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Price</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Duration</th>
            <th className="px-4 py-3 text-right font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg) => (
            <tr key={pkg.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3">
                <img
                  src={pkg.imageDataUrl}
                  alt={pkg.title}
                  className="w-[60px] h-[60px] rounded-lg object-cover"
                />
              </td>
              <td className="px-4 py-3 font-medium text-gray-800">{pkg.title}</td>
              <td className="px-4 py-3 text-gray-700">
                ₹{pkg.price.toLocaleString('en-IN')}
              </td>
              <td className="px-4 py-3 text-gray-700">
                {pkg.durationDays}D / {pkg.durationNights}N
              </td>
              <td className="px-4 py-3 text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => onEdit(pkg)}
                  aria-label="Edit package"
                >
                  <Pencil />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => onDelete(pkg.id)}
                  aria-label="Delete package"
                >
                  <Trash2 />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-gray-100">
        {packages.map((pkg) => (
          <div key={pkg.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
            <img
              src={pkg.imageDataUrl}
              alt={pkg.title}
              className="w-[60px] h-[60px] rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800 truncate">{pkg.title}</p>
              <p className="text-sm text-gray-600">₹{pkg.price.toLocaleString('en-IN')}</p>
              <p className="text-sm text-gray-500">{pkg.durationDays}D / {pkg.durationNights}N</p>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-500 hover:text-blue-700"
                onClick={() => onEdit(pkg)}
                aria-label="Edit package"
              >
                <Pencil />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-700"
                onClick={() => onDelete(pkg.id)}
                aria-label="Delete package"
              >
                <Trash2 />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
