import DestinationCard from "./DestinationCard";
import { destinations } from "@/data/destinations";

const DestinationsSection = () => (
  <section id="destinations" className="py-24 bg-muted/50">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">Popular Destinations</span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Where Would You Like to Go?</h2>
        <p className="text-muted-foreground mt-4 max-w-lg mx-auto">Handpicked destinations with curated experiences for every kind of traveler.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((d) => (
          <DestinationCard key={d.id} {...d} />
        ))}
      </div>
    </div>
  </section>
);

export default DestinationsSection;
