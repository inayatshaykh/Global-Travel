import { Star } from "lucide-react";
import { useTestimonials } from "@/admin/context/TestimonialContext";

const TestimonialsSection = () => {
  const { testimonials } = useTestimonials();

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">What Our Travelers Say</h2>
        </div>
        <div className="flex flex-col gap-6 max-w-3xl mx-auto">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">"{t.review}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-ocean flex items-center justify-center text-primary-foreground text-sm font-bold">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-card-foreground font-semibold text-sm">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
