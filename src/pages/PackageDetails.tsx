import { useParams, useNavigate } from "react-router-dom";
import { destinations } from "@/data/destinations";
import { ArrowLeft, Clock, MessageCircle, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const PackageDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const pkg = destinations.find((d) => d.id === id);

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Package not found</h2>
          <button onClick={() => navigate("/")} className="text-primary font-semibold hover:underline">
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Banner */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero-overlay)" }} />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 pb-12">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground text-sm font-medium mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-3">{pkg.title}</h1>
            <div className="flex flex-wrap gap-4 items-center">
              <span className="inline-flex items-center gap-1 bg-accent text-accent-foreground px-4 py-1.5 rounded-full font-bold text-lg">
                {pkg.price}
              </span>
              <span className="inline-flex items-center gap-1 text-primary-foreground/80 text-sm">
                <Clock className="h-4 w-4" /> {pkg.days}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Description */}
          <ScrollReveal className="lg:col-span-2">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">About This Package</h2>
              <p className="text-muted-foreground leading-relaxed text-base">{pkg.fullDescription}</p>
            </div>
          </ScrollReveal>

          {/* Sidebar */}
          <ScrollReveal delay={150}>
            <div className="bg-card rounded-2xl shadow-card p-8 lg:sticky lg:top-28">
              <h3 className="text-lg font-bold text-card-foreground mb-6">What's Included</h3>
              <ul className="space-y-4">
                {pkg.features.map((f) => (
                  <li key={f.label} className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full gradient-ocean flex items-center justify-center mt-0.5">
                      <Check className="h-3.5 w-3.5 text-primary-foreground" />
                    </div>
                    <div>
                      <span className="text-card-foreground font-semibold text-sm">{f.label}</span>
                      <p className="text-muted-foreground text-sm">{f.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/1234567890?text=Hi!%20I'm%20interested%20in%20the%20${encodeURIComponent(pkg.title)}%20package%20(${pkg.price})`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full inline-flex items-center justify-center gap-2 gradient-ocean text-primary-foreground px-6 py-4 rounded-full text-base font-semibold hover:scale-105 transition-transform shadow-lg"
              >
                <MessageCircle className="h-5 w-5" /> Book on WhatsApp
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PackageDetails;
