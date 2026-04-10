import { useState } from "react";
import { Menu, X, Plane } from "lucide-react";

const WA_LINK = "https://wa.me/917982045480?text=Hi!%20I%20want%20to%20book%20a%20trip";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const links = ["Home", "Packages", "About", "Contact"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2 text-primary font-bold text-xl">
          <Plane className="h-6 w-6" />
          <span>Globe Trotter</span>
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                {l}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 gradient-ocean text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Book Now
        </a>
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-background border-t border-border px-6 pb-6 animate-fade-in">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="block py-3 text-muted-foreground hover:text-primary transition-colors" onClick={() => setOpen(false)}>
              {l}
            </a>
          ))}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex gradient-ocean text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold"
          >
            Book Now
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
