import destBali from "@/assets/dest-bali.jpg";
import destSwitzerland from "@/assets/dest-switzerland.jpg";
import destGreece from "@/assets/dest-greece.jpg";
import destDubai from "@/assets/dest-dubai.jpg";
import destJapan from "@/assets/dest-japan.jpg";
import destPeru from "@/assets/dest-peru.jpg";

export interface Destination {
  id: string;
  image: string;
  title: string;
  price: string;
  days: string;
  description: string;
  fullDescription: string;
  features: { label: string; detail: string }[];
}

export const destinations: Destination[] = [
  {
    id: "bali",
    image: destBali,
    title: "Bali, Indonesia",
    price: "₹74,999",
    days: "7 Days / 6 Nights",
    description: "Explore lush rice terraces, ancient temples, and pristine beaches in this tropical paradise.",
    fullDescription: "Immerse yourself in the enchanting beauty of Bali — from the iconic Tegallalang rice terraces and sacred Uluwatu Temple to the vibrant arts scene of Ubud and the sun-kissed shores of Seminyak. This all-inclusive package covers guided tours, cultural experiences, and plenty of free time to explore at your own pace. Whether you're seeking adventure, relaxation, or cultural enrichment, Bali has it all.",
    features: [
      { label: "Hotel", detail: "4-star beachfront resort with pool" },
      { label: "Transport", detail: "Airport transfers & daily private car" },
      { label: "Meals", detail: "Daily breakfast + 3 special dinners" },
      { label: "Activities", detail: "Temple tours, rice terrace trek, snorkeling" },
      { label: "Guide", detail: "English-speaking local guide throughout" },
      { label: "Flights", detail: "Round-trip economy class included" },
    ],
  },
  {
    id: "switzerland",
    image: destSwitzerland,
    title: "Swiss Alps",
    price: "₹1,24,999",
    days: "5 Days / 4 Nights",
    description: "Experience majestic snow-capped mountains, charming villages, and breathtaking alpine scenery.",
    fullDescription: "Journey through the heart of the Swiss Alps, where snow-capped peaks meet emerald valleys. Visit the charming towns of Interlaken, Lucerne, and Zermatt, ride the legendary Glacier Express, and take in panoramic views from world-famous mountain summits. This premium package delivers a blend of adventure, nature, and Swiss hospitality that will leave you speechless.",
    features: [
      { label: "Hotel", detail: "Premium alpine chalets & boutique hotels" },
      { label: "Transport", detail: "Swiss Travel Pass & scenic train rides" },
      { label: "Meals", detail: "Daily breakfast + Swiss fondue dinner" },
      { label: "Activities", detail: "Glacier Express, Jungfraujoch, lake cruises" },
      { label: "Guide", detail: "Certified mountain guide for treks" },
      { label: "Flights", detail: "Round-trip economy class included" },
    ],
  },
  {
    id: "greece",
    image: destGreece,
    title: "Santorini, Greece",
    price: "₹99,999",
    days: "6 Days / 5 Nights",
    description: "Wander through iconic white-washed villages with stunning sunset views over the Aegean Sea.",
    fullDescription: "Discover the magic of Santorini — the crown jewel of the Greek islands. Explore the iconic blue-domed churches of Oia, soak in volcanic hot springs, sample exquisite local wines, and watch unforgettable sunsets over the caldera. With its labyrinthine streets, black-sand beaches, and rich history, Santorini offers a truly romantic and awe-inspiring escape.",
    features: [
      { label: "Hotel", detail: "Caldera-view boutique hotel with infinity pool" },
      { label: "Transport", detail: "Airport transfers & private island tour" },
      { label: "Meals", detail: "Daily breakfast + wine tasting dinner" },
      { label: "Activities", detail: "Volcano boat tour, Oia sunset walk, beach day" },
      { label: "Guide", detail: "Local cultural & history guide" },
      { label: "Flights", detail: "Round-trip economy class included" },
    ],
  },
  {
    id: "dubai",
    image: destDubai,
    title: "Dubai, UAE",
    price: "₹1,08,999",
    days: "5 Days / 4 Nights",
    description: "Discover luxury shopping, ultramodern architecture, and vibrant nightlife in the city of gold.",
    fullDescription: "Experience the dazzling city of Dubai, where futuristic skyscrapers meet golden desert dunes. Visit the iconic Burj Khalifa, shop at the world's largest mall, enjoy a thrilling desert safari, and cruise along the Dubai Marina. This package combines luxury, culture, and adventure in one of the world's most dynamic destinations.",
    features: [
      { label: "Hotel", detail: "5-star hotel near Dubai Marina" },
      { label: "Transport", detail: "Private luxury transfers & metro pass" },
      { label: "Meals", detail: "Daily breakfast + desert BBQ dinner" },
      { label: "Activities", detail: "Burj Khalifa, desert safari, dhow cruise" },
      { label: "Guide", detail: "Professional city tour guide" },
      { label: "Flights", detail: "Round-trip economy class included" },
    ],
  },
  {
    id: "japan",
    image: destJapan,
    title: "Kyoto, Japan",
    price: "₹1,16,999",
    days: "8 Days / 7 Nights",
    description: "Immerse yourself in traditional culture with cherry blossoms, zen gardens, and ancient temples.",
    fullDescription: "Step into the timeless elegance of Kyoto, Japan's cultural capital. Wander through bamboo groves, visit over a thousand years of temple history, participate in a traditional tea ceremony, and stroll through vibrant geisha districts. This carefully curated package also includes a day trip to Nara and Osaka for the complete Kansai experience.",
    features: [
      { label: "Hotel", detail: "Traditional ryokan + modern hotel mix" },
      { label: "Transport", detail: "Japan Rail Pass & local transit cards" },
      { label: "Meals", detail: "Daily breakfast + kaiseki dinner" },
      { label: "Activities", detail: "Temple tours, tea ceremony, bamboo grove" },
      { label: "Guide", detail: "Bilingual cultural guide" },
      { label: "Flights", detail: "Round-trip economy class included" },
    ],
  },
  {
    id: "peru",
    image: destPeru,
    title: "Machu Picchu, Peru",
    price: "₹91,999",
    days: "7 Days / 6 Nights",
    description: "Trek through the Andes to discover the legendary lost city of the Incas.",
    fullDescription: "Embark on the journey of a lifetime to Machu Picchu — the legendary Incan citadel nestled high in the Andes. Explore the Sacred Valley, wander through the cobblestone streets of Cusco, and hike along ancient trails to reach one of the New Seven Wonders of the World. This adventure-packed itinerary blends history, culture, and breathtaking natural beauty.",
    features: [
      { label: "Hotel", detail: "Boutique hotels in Cusco & Sacred Valley" },
      { label: "Transport", detail: "Train to Machu Picchu & private transfers" },
      { label: "Meals", detail: "Daily breakfast + Peruvian cuisine dinner" },
      { label: "Activities", detail: "Machu Picchu, Sacred Valley, Cusco city tour" },
      { label: "Guide", detail: "Expert archaeological guide" },
      { label: "Flights", detail: "Round-trip economy class included" },
    ],
  },
];
