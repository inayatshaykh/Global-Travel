import heroBg from "@/assets/hero-bg.jpg";
import { MapPin } from "lucide-react";

const WA_LINK = "https://wa.me/917982045480?text=Hi!%20I%20want%20to%20book%20a%20trip";

const HeroSection = () => (
  <section
    id="home"
    className="relative min-h-screen flex items-center justify-center overflow-hidden"
  >
    <img
      src={heroBg}
      alt="Tropical beach paradise aerial view"
      className="absolute inset-0 w-full h-full object-cover"
      width={1920}
      height={1080}
    />
    <div className="absolute inset-0" style={{ background: "var(--gradient-hero-overlay)" }} />
    <div className="relative z-10 text-center px-6 max-w-3xl animate-fade-in">
      <span className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm text-primary-foreground text-sm font-medium px-4 py-1.5 rounded-full mb-6">
        <MapPin className="h-4 w-4" /> India's Trusted Travel Partner
      </span>
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-primary-foreground leading-tight mb-6">
        Explore the World <br className="hidden sm:block" />
        <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-ocean)" }}>
          with Globe Trotter
        </span>
      </h1>
      <p className="text-primary-foreground/80 text-lg md:text-xl max-w-xl mx-auto mb-8">
        Discover breathtaking destinations and unforgettable experiences. Premium travel packages tailored just for you — from India to the world.
      </p>
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 gradient-ocean text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform shadow-lg"
      >
        Book Now on WhatsApp
      </a>
    </div>
  </section>
);

export default HeroSection;
