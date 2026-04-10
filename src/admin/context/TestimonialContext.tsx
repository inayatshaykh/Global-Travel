import { createContext, useContext, useState } from "react";
import { testimonials as initialTestimonials } from "@/data/testimonials";

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  avatar: string;
}

export interface TestimonialFormData {
  name: string;
  location: string;
  rating: number;
  review: string;
  avatar: string;
}

interface TestimonialContextValue {
  testimonials: Testimonial[];
  addTestimonial: (data: TestimonialFormData) => void;
  updateTestimonial: (id: string, data: TestimonialFormData) => void;
  deleteTestimonial: (id: string) => void;
}

const TestimonialContext = createContext<TestimonialContextValue | null>(null);

export function TestimonialProvider({ children }: { children: React.ReactNode }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);

  const addTestimonial = (data: TestimonialFormData) => {
    const newTestimonial: Testimonial = { 
      id: crypto.randomUUID(), 
      ...data 
    };
    setTestimonials((prev) => [...prev, newTestimonial]);
  };

  const updateTestimonial = (id: string, data: TestimonialFormData) => {
    setTestimonials((prev) =>
      prev.map((testimonial) => (testimonial.id === id ? { ...testimonial, ...data } : testimonial))
    );
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((testimonial) => testimonial.id !== id));
  };

  return (
    <TestimonialContext.Provider value={{ testimonials, addTestimonial, updateTestimonial, deleteTestimonial }}>
      {children}
    </TestimonialContext.Provider>
  );
}

export function useTestimonials(): TestimonialContextValue {
  const ctx = useContext(TestimonialContext);
  if (!ctx) {
    throw new Error("useTestimonials must be used within TestimonialProvider");
  }
  return ctx;
}
