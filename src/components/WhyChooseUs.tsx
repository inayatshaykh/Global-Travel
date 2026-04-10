import { DollarSign, ShieldCheck, Headphones, Heart } from "lucide-react";

const features = [
  { icon: DollarSign, title: "Best Price Guarantee", desc: "Competitive pricing with no hidden charges. We match any lower quote from a verified Indian travel agency." },
  { icon: ShieldCheck, title: "Trusted Since 2014", desc: "Over 10 years of experience serving Indian travellers with 5000+ happy customers across India." },
  { icon: Headphones, title: "24/7 WhatsApp Support", desc: "Reach us anytime on WhatsApp at +91 79820 45480 — before, during, and after your trip." },
  { icon: Heart, title: "Customised Packages", desc: "Every itinerary is tailored to your budget, preferences, and travel dates. No one-size-fits-all here." },
];

const WhyChooseUs = () => (
  <section id="about" className="py-24">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Travel with Confidence</h2>
        <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-sm">Trusted by thousands of Indian travellers for international and domestic holiday packages.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="text-center group p-8 bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-ocean text-primary-foreground mb-6 group-hover:scale-110 transition-transform">
              <Icon className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold text-card-foreground mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
