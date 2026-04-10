import DestinationCard from "./DestinationCard";
import { usePackages } from "@/admin/context/PackageContext";

const DestinationsSection = () => {
  const { packages } = usePackages();

  return (
    <section id="destinations" className="py-24 bg-muted/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Popular Destinations</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Where Would You Like to Go?</h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">Handpicked destinations with curated experiences for every kind of traveler.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <DestinationCard
              key={pkg.id}
              id={pkg.id}
              image={pkg.imageDataUrl}
              title={pkg.title}
              price={`$${pkg.price.toLocaleString("en-US")}`}
              days={`${pkg.durationDays} Days / ${pkg.durationNights} Nights`}
              description={pkg.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
