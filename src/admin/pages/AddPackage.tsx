import { useState } from 'react';
import { PlusCircle, CheckCircle } from 'lucide-react';
import { usePackages } from '../context/PackageContext';
import PackageForm from '../components/PackageForm';
import type { PackageFormData } from '../types';

export default function AddPackage() {
  const { addPackage } = usePackages();
  const [formKey, setFormKey] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (data: PackageFormData) => {
    addPackage(data);
    setFormKey((k) => k + 1);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Page header */}
      <div className="flex items-center gap-3 mb-2">
        <PlusCircle className="w-7 h-7 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">Add New Package</h1>
      </div>
      <p className="text-gray-500 mb-6">Fill in the details to create a new travel package</p>

      {/* Success message */}
      {showSuccess && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 mb-6">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span>Package added successfully!</span>
        </div>
      )}

      <PackageForm key={formKey} onSubmit={handleSubmit} />
    </div>
  );
}
