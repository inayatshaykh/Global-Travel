import { Plane, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => (
  <footer id="contact" className="bg-foreground text-primary-foreground py-16">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <a href="/" className="flex items-center gap-2 text-primary-foreground font-bold text-xl mb-4">
            <Plane className="h-6 w-6" /> Globe Trotter
          </a>
          <p className="text-primary-foreground/60 text-sm leading-relaxed">
            India's trusted travel partner since 2014. We craft unforgettable journeys across the globe — from the Himalayas to the Maldives and beyond.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/60">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" />
              <a href="mailto:info@globetrotter.in" className="hover:text-primary-foreground transition-colors">
                info@globetrotter.in
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              <a href="https://wa.me/917982045480" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">
                +91 79820 45480
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" />
              Connaught Place, New Delhi, India — 110001
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-4">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a key={i} href="/" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary/50 transition-colors">
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-sm text-primary-foreground/40">
        © 2026 Globe Trotter Travel. All rights reserved. | New Delhi, India
      </div>
    </div>
  </footer>
);

export default Footer;
