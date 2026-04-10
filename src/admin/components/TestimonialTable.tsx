import { MessageSquare, Pencil, Trash2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Testimonial } from '../context/TestimonialContext';

interface TestimonialTableProps {
  testimonials: Testimonial[];
  onEdit: (testimonial: Testimonial) => void;
  onDelete: (id: string) => void;
}

export default function TestimonialTable({ testimonials, onEdit, onDelete }: TestimonialTableProps) {
  if (testimonials.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <MessageSquare className="w-12 h-12 mb-3" />
          <p className="text-base">No testimonials yet. Add your first testimonial!</p>
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
            <th className="px-4 py-3 text-left font-medium text-gray-600">Name</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Location</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Rating</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Review</th>
            <th className="px-4 py-3 text-right font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map((testimonial) => (
            <tr key={testimonial.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                    {testimonial.avatar}
                  </div>
                  <span className="font-medium text-gray-800">{testimonial.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-gray-700">{testimonial.location}</td>
              <td className="px-4 py-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </td>
              <td className="px-4 py-3 text-gray-700 max-w-md truncate">{testimonial.review}</td>
              <td className="px-4 py-3 text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => onEdit(testimonial)}
                  aria-label="Edit testimonial"
                >
                  <Pencil />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => onDelete(testimonial.id)}
                  aria-label="Delete testimonial"
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
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{testimonial.name}</p>
                  <p className="text-xs text-gray-500">{testimonial.location}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-blue-500 hover:text-blue-700 h-8 w-8"
                  onClick={() => onEdit(testimonial)}
                  aria-label="Edit testimonial"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700 h-8 w-8"
                  onClick={() => onDelete(testimonial.id)}
                  aria-label="Delete testimonial"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-gray-700">{testimonial.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
