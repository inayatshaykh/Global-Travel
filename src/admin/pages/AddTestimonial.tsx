import { useNavigate } from 'react-router-dom';
import { MessageSquarePlus } from 'lucide-react';
import { useTestimonials } from '../context/TestimonialContext';
import TestimonialForm from '../components/TestimonialForm';
import { toast } from 'sonner';

export default function AddTestimonial() {
  const navigate = useNavigate();
  const { addTestimonial } = useTestimonials();

  const handleSubmit = (data: {
    name: string;
    location: string;
    rating: number;
    review: string;
    avatar: string;
  }) => {
    addTestimonial(data);
    toast.success('Testimonial added successfully!');
    navigate('/admin/manage-testimonials');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <MessageSquarePlus className="text-blue-600" size={28} />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add New Testimonial</h1>
          <p className="text-gray-500 text-sm">Create a new customer testimonial</p>
        </div>
      </div>

      {/* Form */}
      <TestimonialForm
        onSubmit={handleSubmit}
        onCancel={() => navigate('/admin/manage-testimonials')}
        submitLabel="Add Testimonial"
      />
    </div>
  );
}
