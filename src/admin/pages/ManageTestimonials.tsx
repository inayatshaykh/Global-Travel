import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, PlusCircle } from 'lucide-react';
import { useTestimonials, Testimonial } from '../context/TestimonialContext';
import TestimonialTable from '../components/TestimonialTable';
import TestimonialForm from '../components/TestimonialForm';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function ManageTestimonials() {
  const { testimonials, updateTestimonial, deleteTestimonial } = useTestimonials();
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
  };

  const handleUpdate = (data: {
    name: string;
    location: string;
    rating: number;
    review: string;
    avatar: string;
  }) => {
    if (editingTestimonial) {
      updateTestimonial(editingTestimonial.id, data);
      setEditingTestimonial(null);
      toast.success('Testimonial updated successfully!');
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      deleteTestimonial(id);
      toast.success('Testimonial deleted successfully!');
    }
  };

  const handleCancelEdit = () => {
    setEditingTestimonial(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare className="text-blue-600" size={28} />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Manage Testimonials</h1>
            <p className="text-gray-500 text-sm">View, edit, or delete testimonials</p>
          </div>
        </div>
        <Link to="/admin/add-testimonial">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
            <PlusCircle size={18} />
            Add New
          </Button>
        </Link>
      </div>

      {/* Edit Form (if editing) */}
      {editingTestimonial && (
        <div className="border-2 border-blue-200 rounded-xl p-4 bg-blue-50">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Edit Testimonial</h2>
          <TestimonialForm
            onSubmit={handleUpdate}
            onCancel={handleCancelEdit}
            initialData={editingTestimonial}
            submitLabel="Update Testimonial"
          />
        </div>
      )}

      {/* Table */}
      <TestimonialTable
        testimonials={testimonials}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
