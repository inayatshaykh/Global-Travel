import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PackageFormData } from '../types';

interface PackageFormProps {
  initialValues?: PackageFormData;
  onSubmit: (data: PackageFormData) => void;
  onCancel?: () => void;
}

interface FormErrors {
  title?: string;
  price?: string;
  durationDays?: string;
  durationNights?: string;
  description?: string;
  imageDataUrl?: string;
}

export default function PackageForm({ initialValues, onSubmit, onCancel }: PackageFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? '');
  const [price, setPrice] = useState<number | ''>(initialValues?.price ?? '');
  const [durationDays, setDurationDays] = useState<number | ''>(initialValues?.durationDays ?? '');
  const [durationNights, setDurationNights] = useState<number | ''>(initialValues?.durationNights ?? '');
  const [description, setDescription] = useState(initialValues?.description ?? '');
  const [imageDataUrl, setImageDataUrl] = useState(initialValues?.imageDataUrl ?? '');
  const [errors, setErrors] = useState<FormErrors>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageDataUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!title.trim()) errs.title = 'Title is required.';
    if (!price || (price as number) <= 0) errs.price = 'Price must be greater than 0.';
    if (!durationDays || (durationDays as number) <= 0) errs.durationDays = 'Duration days must be greater than 0.';
    if (!durationNights || (durationNights as number) <= 0) errs.durationNights = 'Duration nights must be greater than 0.';
    if (!description.trim()) errs.description = 'Description is required.';
    if (!imageDataUrl) errs.imageDataUrl = 'An image is required.';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    onSubmit({
      title: title.trim(),
      price: price as number,
      durationDays: durationDays as number,
      durationNights: durationNights as number,
      description: description.trim(),
      imageDataUrl,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-md p-6 w-full max-w-2xl mx-auto"
      noValidate
    >
      <div className="grid grid-cols-1 gap-5">
        {/* Title */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="pkg-title">Title</Label>
          <Input
            id="pkg-title"
            type="text"
            placeholder="Package title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Price */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="pkg-price">Price ($)</Label>
          <Input
            id="pkg-price"
            type="number"
            placeholder="0"
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>

        {/* Duration */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="pkg-days">Duration Days</Label>
            <Input
              id="pkg-days"
              type="number"
              placeholder="0"
              min={0}
              value={durationDays}
              onChange={(e) => setDurationDays(e.target.value === '' ? '' : Number(e.target.value))}
            />
            {errors.durationDays && <p className="text-red-500 text-sm mt-1">{errors.durationDays}</p>}
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="pkg-nights">Duration Nights</Label>
            <Input
              id="pkg-nights"
              type="number"
              placeholder="0"
              min={0}
              value={durationNights}
              onChange={(e) => setDurationNights(e.target.value === '' ? '' : Number(e.target.value))}
            />
            {errors.durationNights && <p className="text-red-500 text-sm mt-1">{errors.durationNights}</p>}
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="pkg-description">Description</Label>
          <Textarea
            id="pkg-description"
            placeholder="Describe the package..."
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Image */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="pkg-image">Package Image</Label>
          <Input
            id="pkg-image"
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            className="cursor-pointer"
          />
          {errors.imageDataUrl && <p className="text-red-500 text-sm mt-1">{errors.imageDataUrl}</p>}
          {imageDataUrl && (
            <img
              src={imageDataUrl}
              alt="Package preview"
              className="mt-3 rounded-lg object-cover w-full max-h-48 border border-gray-200"
            />
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <Button type="submit">Save Package</Button>
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
