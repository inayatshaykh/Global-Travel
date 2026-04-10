import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Testimonial } from '../context/TestimonialContext';

interface TestimonialFormProps {
  onSubmit: (data: {
    name: string;
    location: string;
    rating: number;
    review: string;
    avatar: string;
  }) => void;
  onCancel?: () => void;
  initialData?: Testimonial;
  submitLabel?: string;
}

export default function TestimonialForm({ onSubmit, onCancel, initialData, submitLabel = 'Add Testimonial' }: TestimonialFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [location, setLocation] = useState(initialData?.location || '');
  const [rating, setRating] = useState<number | ''>(initialData?.rating || 5);
  const [review, setReview] = useState(initialData?.review || '');
  const [avatar, setAvatar] = useState(initialData?.avatar || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setLocation(initialData.location);
      setRating(initialData.rating);
      setReview(initialData.review);
      setAvatar(initialData.avatar);
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!location.trim()) newErrors.location = 'Location is required';
    if (!rating || rating < 1 || rating > 5) newErrors.rating = 'Rating must be between 1 and 5';
    if (!review.trim()) newErrors.review = 'Review is required';
    if (!avatar.trim()) newErrors.avatar = 'Avatar initials are required';
    if (avatar.trim().length > 3) newErrors.avatar = 'Avatar should be 2-3 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        name: name.trim(),
        location: location.trim(),
        rating: Number(rating),
        review: review.trim(),
        avatar: avatar.trim().toUpperCase(),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="testimonial-name">Name</Label>
          <Input
            id="testimonial-name"
            type="text"
            placeholder="Customer name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Location */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="testimonial-location">Location</Label>
          <Input
            id="testimonial-location"
            type="text"
            placeholder="e.g., Bali Trip — Mumbai"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
        </div>

        {/* Rating */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="testimonial-rating">Rating (1-5)</Label>
          <Input
            id="testimonial-rating"
            type="number"
            placeholder="5"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(e.target.value === '' ? '' : Number(e.target.value))}
          />
          {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
        </div>

        {/* Avatar */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="testimonial-avatar">Avatar Initials</Label>
          <Input
            id="testimonial-avatar"
            type="text"
            placeholder="e.g., RM"
            maxLength={3}
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
          {errors.avatar && <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>}
        </div>
      </div>

      {/* Review */}
      <div className="flex flex-col gap-1">
        <Label htmlFor="testimonial-review">Review</Label>
        <Textarea
          id="testimonial-review"
          placeholder="Customer review..."
          rows={4}
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        {errors.review && <p className="text-red-500 text-sm mt-1">{errors.review}</p>}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
          {submitLabel}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
