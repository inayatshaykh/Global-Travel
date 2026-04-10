import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DestinationCardProps {
  id: string;
  image: string;
  title: string;
  price: string;
  days: string;
  description: string;
}

const DestinationCard = ({ id, image, title, price, days, description }: DestinationCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/package/${id}`)}
      className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] cursor-pointer"
    >
      <div className="relative overflow-hidden h-60">
        <img
          src={image}
          alt={title}
          loading="lazy"
          width={640}
          height={800}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-accent text-accent-foreground text-sm font-bold px-3 py-1 rounded-full">
          {price}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-card-foreground mb-1 group-hover:text-primary transition-colors">{title}</h3>
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <Clock className="h-4 w-4" /> {days}
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
        <span className="inline-block mt-4 text-primary text-sm font-semibold group-hover:underline">
          View Details →
        </span>
      </div>
    </div>
  );
};

export default DestinationCard;
