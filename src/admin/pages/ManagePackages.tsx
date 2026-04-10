import { useState } from 'react';
import { Settings2 } from 'lucide-react';
import { usePackages } from '../context/PackageContext';
import PackageTable from '../components/PackageTable';
import PackageForm from '../components/PackageForm';
import type { Package, PackageFormData } from '../types';

export default function ManagePackages() {
  const { packages, updatePackage, deletePackage } = usePackages();
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg);
  };

  const handleDelete = (id: string) => {
    deletePackage(id);
  };

  const handleEditSubmit = (data: PackageFormData) => {
    if (!editingPackage) return;
    updatePackage(editingPackage.id, data);
    setEditingPackage(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Settings2 className="text-blue-600" size={28} />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Manage Packages</h1>
            <p className="text-gray-500 text-sm">View, edit or delete your travel packages</p>
          </div>
        </div>
        <span className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
          {packages.length} package{packages.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Content */}
      {editingPackage ? (
        <PackageForm
          initialValues={editingPackage}
          onSubmit={handleEditSubmit}
          onCancel={() => setEditingPackage(null)}
        />
      ) : (
        <PackageTable
          packages={packages}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
