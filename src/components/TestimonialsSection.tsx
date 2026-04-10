import { Star } from "lucide-react";

const testimonials = [
  { name: "Sarah Mitchell", location: "Bali Trip", rating: 5, review: "An absolutely magical experience! Every detail was perfectly planned. The rice terrace tour was a highlight I'll never forget.", avatar: "SM" },
  { name: "James Cooper", location: "Swiss Alps Tour", rating: 5, review: "Breathtaking scenery and top-notch service. Wanderlust made our honeymoon truly unforgettable. Highly recommend!", avatar: "JC" },
  { name: "Priya Sharma", location: "Greece Getaway", rating: 5, review: "Santorini sunsets, delicious food, and seamless logistics. This was the stress-free vacation I always dreamed of.", avatar: "PS" },
];

const TestimonialsSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">Testimonials</span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">What Our Travelers Say</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t) => (
          <div key={t.name} className="bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
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

export default TestimonialsSection;
