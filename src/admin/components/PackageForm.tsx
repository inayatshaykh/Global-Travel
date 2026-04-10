import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';
import type { PackageFormData, PackageFeature } from '../types';

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

const DEFAULT_FEATURE_LABELS = ['Hotel', 'Transport', 'Meals', 'Activities', 'Guide', 'Flights'];

const emptyFeatures = (): PackageFeature[] =>
  DEFAULT_FEATURE_LABELS.map((label) => ({ label, detail: '' }));

export default function PackageForm({ initialValues, onSubmit, onCancel }: PackageFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? '');
  const [price, setPrice] = useState<number | ''>(initialValues?.price ?? '');
  const [durationDays, setDurationDays] = useState<number | ''>(initialValues?.durationDays ?? '');
  const [durationNights, setDurationNights] = useState<number | ''>(initialValues?.durationNights ?? '');
  const [description, setDescription] = useState(initialValues?.description ?? '');
  const [imageDataUrl, setImageDataUrl] = useState(initialValues?.imageDataUrl ?? '');
  const [features, setFeatures] = useState<PackageFeature[]>(
    initialValues?.features?.length
      ? initialValues.features
      : [{ label: '', detail: '' }]
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageDataUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleFeatureChange = (index: number, field: 'label' | 'detail', value: string) => {
    setFeatures((prev) => prev.map((f, i) => (i === index ? { ...f, [field]: value } : f)));
  };

  const addFeature = () => setFeatures((prev) => [...prev, { label: '', detail: '' }]);

  const removeFeature = (index: number) =>
    setFeatures((prev) => prev.filter((_, i) => i !== index));

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
      features: features.filter((f) => f.detail.trim() !== ''),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 w-full max-w-2xl mx-auto" noValidate>
      <div className="grid grid-cols-1 gap-5">

        {/* Title */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="pkg-title">Title</Label>
          <Input id="pkg-title" type="text" placeholder="Package title" value={title} onChange={(e) => setTitle(e.target.value)} />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Price */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="pkg-price">Price (₹)</Label>
          <Input id="pkg-price" type="number" placeholder="0" min={0} value={price} onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))} />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>

        {/* Duration */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="pkg-days">Duration Days</Label>
            <Input id="pkg-days" type="number" placeholder="0" min={0} value={durationDays} onChange={(e) => setDurationDays(e.target.value === '' ? '' : Number(e.target.value))} />
            {errors.durationDays && <p className="text-red-500 text-sm mt-1">{errors.durationDays}</p>}
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="pkg-nights">Duration Nights</Label>
            <Input id="pkg-nights" type="number" placeholder="0" min={0} value={durationNights} onChange={(e) => setDurationNights(e.target.value === '' ? '' : Number(e.target.value))} />
            {errors.durationNights && <p className="text-red-500 text-sm mt-1">{errors.durationNights}</p>}
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="pkg-description">Description</Label>
          <Textarea id="pkg-description" placeholder="Describe the package..." rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* What's Included */}
        <div className="flex flex-col gap-3">
          <div>
            <p className="font-semibold text-gray-800 text-sm">What's Included</p>
            <p className="text-gray-400 text-xs mt-0.5">Add features like Hotel, Transport, Meals, etc.</p>
          </div>
          <div className="flex flex-col gap-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Label (e.g. Hotel)"
                  value={feature.label}
                  onChange={(e) => handleFeatureChange(index, 'label', e.target.value)}
                  className="w-36 shrink-0"
                />
                <Input
                  type="text"
                  placeholder="Detail (e.g. 4-star beachfront resort)"
                  value={feature.detail}
                  onChange={(e) => handleFeatureChange(index, 'detail', e.target.value)}
                  className="flex-1"
                />
                {features.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-red-400 hover:text-red-600 shrink-0"
                    onClick={() => removeFeature(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-fit flex items-center gap-2"
            onClick={addFeature}
          >
            <Plus className="w-4 h-4" />
            Add Item
          </Button>
        </div>

        {/* Image */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="pkg-image">Package Image</Label>
          <Input id="pkg-image" ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageChange} className="cursor-pointer" />
          {errors.imageDataUrl && <p className="text-red-500 text-sm mt-1">{errors.imageDataUrl}</p>}
          {imageDataUrl && (
            <img src={imageDataUrl} alt="Package preview" className="mt-3 rounded-lg object-cover w-full max-h-48 border border-gray-200" />
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <Button type="submit">Save Package</Button>
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          )}
        </div>

      </div>
    </form>
  );
}
