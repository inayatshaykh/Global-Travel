export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Rahul Mehta",
    location: "Bali Trip — Mumbai",
    rating: 5,
    review: "Globe Trotter made our Bali trip absolutely seamless. From visa assistance to hotel bookings, everything was handled perfectly. Will definitely book again!",
    avatar: "RM",
  },
  {
    id: "2",
    name: "Ananya Sharma",
    location: "Swiss Alps Tour — Delhi",
    rating: 5,
    review: "Our honeymoon in Switzerland was a dream come true. The team at Globe Trotter went above and beyond to make every moment special. Highly recommended!",
    avatar: "AS",
  },
  {
    id: "3",
    name: "Vikram Nair",
    location: "Greece Getaway — Bangalore",
    rating: 5,
    review: "Santorini was breathtaking! Globe Trotter's package was the best value we found. No hidden charges, great hotels, and 24/7 support throughout the trip.",
    avatar: "VN",
  },
];
