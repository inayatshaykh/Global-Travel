import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Mehta",
    location: "Bali Trip — Mumbai",
    rating: 5,
    review: "Globe Trotter made our Bali trip absolutely seamless. From visa assistance to hotel bookings, everything was handled perfectly. Will definitely book again!",
    avatar: "RM",
  },
  {
    name: "Ananya Sharma",
    location: "Swiss Alps Tour — Delhi",
    rating: 5,
    review: "Our honeymoon in Switzerland was a dream come true. The team at Globe Trotter went above and beyond to make every moment special. Highly recommended!",
    avatar: "AS",
  },
  {
    name: "Vikram Nair",
    location: "Greece Getaway — Bangalore",
    rating: 5,
    review: "Santorini was breathtaking! Globe Trotter's package was the best value we found. No hidden charges, great hotels, and 24/7 support throughout the trip.",
    avatar: "VN",
  },
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
