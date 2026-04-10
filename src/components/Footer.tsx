import { Plane, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => (
  <footer id="contact" className="bg-foreground text-primary-foreground py-16">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <a href="#" className="flex items-center gap-2 text-primary-foreground font-bold text-xl mb-4">
            <Plane className="h-6 w-6" /> Wanderlust
          </a>
          <p className="text-primary-foreground/60 text-sm leading-relaxed">
            Making dream vacations a reality since 2014. Your trusted partner for unforgettable travel experiences around the globe.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/60">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@wanderlust.travel</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +1 (234) 567-890</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> 123 Travel Street, Adventure City</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-4">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary/50 transition-colors">
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-sm text-primary-foreground/40">
        © 2026 Wanderlust. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
