import room1 from "@/assets/roomImages/020A6091.webp";
import room2 from "@/assets/couple-cottage-images/JV_07988 (1).jpg";
import room3 from "@/assets/roomImages/JV_08056.jpg";
import room4 from "@/assets/roomImages/020A6152.webp";
import room5 from "@/assets/roomImages/020A6170.webp";
import room6 from "@/assets/roomImages/JV_07938.jpg";
import room7 from "@/assets/roomImages/JV_07939.jpg";
import room8 from "@/assets/roomImages/JV_07995.jpg";
import room9 from "@/assets/roomImages/JV_08023.jpg";
import room10 from "@/assets/roomImages/JV_08050.jpg";
import room11 from "@/assets/roomImages/JV_08059.jpg";
import room12 from "@/assets/roomImages/020A6097.webp";
import room13 from "@/assets/roomImages/020A6099.webp";

// Couple Cottage specific images
import cc1 from "@/assets/couple-cottage-images/020A6516.jpg";
import cc2 from "@/assets/couple-cottage-images/JV_07988 (1).jpg";
import cc3 from "@/assets/couple-cottage-images/JV_07994.jpg";
import cc4 from "@/assets/couple-cottage-images/JV_07995 - Copy.jpg";

const sharedGallery = [room6, room7, room8, room9, room10, room11, room12, room13, room5];

export interface RoomData {
  slug: string;
  name: string;
  price: string;
  desc: string;
  tag: string;
  mainImage: any;
  longDesc: string;
  size: string;
  occupancy: string;
  amenities: string[];
  gallery: any[];
}

export const roomsData: Record<string, RoomData> = {
  "couple-cottage": {
    slug: "couple-cottage",
    name: "Couple Cottage",
    price: "₹7,500",
    desc: "Tariff per night for 2 adults",
    tag: "Balcony · Lake View",
    mainImage: room1,
    longDesc: "Elegantly finished with local teak and featuring a private balcony that opens directly to views of Lake Suvarna. This room blends quiet comfort with all modern luxury essentials.",
    size: "450 sq ft",
    occupancy: "2 Adults + 1 Child",
    amenities: [
      "Private Balcony with Lake View",
      "King-size Posturepedic Bed",
      "High-speed Wi-Fi",
      "Flat-screen TV with streaming",
      "Mini Bar & Gourmet Coffee Maker",
      "Air Conditioning with Climate Control",
      "Premium bath amenities & rain shower",
      "In-room Electronic Safe",
    ],
    gallery: [
      room1, cc1, cc2, cc3, cc4
    ],
  },
  "duplex": {
    slug: "duplex",
    name: "Duplex",
    price: "₹8,500",
    desc: "Tariff per night for 2 adults",
    tag: "Private Sitout · Garden View",
    mainImage: room2,
    longDesc: "Styled with traditional architectures and nestled inside our lush gardens. Features a cozy private sitout where you can enjoy early morning filter coffee while listening to bird calls.",
    size: "580 sq ft",
    occupancy: "2 Adults + 1 Child",
    amenities: [
      "Private Sitout leading into the garden",
      "Traditional wooden swings / seating",
      "King-size Heritage Canopy Bed",
      "High-speed Wi-Fi",
      "Air Conditioning",
      "Mini Bar & Electric Kettle",
      "Spacious semi-open luxury shower",
      "Premium organic bath toiletries",
    ],
    gallery: [room2, ...sharedGallery],
  },
  "family-room": {
    slug: "family-room",
    name: "Family Room",
    price: "₹9,000",
    desc: "Tariff per night for 2 adults",
    tag: "Plunge Pool · Panoramic Lake View",
    mainImage: room3,
    longDesc: "Our premier suite featuring a private temperature-controlled plunge pool overlooking the grand lake. Large floor-to-ceiling windows ensure panoramic waterfront vistas from every corner.",
    size: "820 sq ft",
    occupancy: "3 Adults or 2 Adults + 2 Children",
    amenities: [
      "Private Plunge Pool (temperature controlled)",
      "Panoramic Lake View floor-to-ceiling windows",
      "Separate Living Room & Dining space",
      "King-size bed with Egyptian cotton sheets",
      "Double vanity bathroom with deep soaking tub",
      "Nespresso coffee machine & premium snack bar",
      "24/7 dedicated butler call service",
      "High-speed Wi-Fi & Smart TV",
    ],
    gallery: [room3, ...sharedGallery],
  },
  "suite": {
    slug: "suite",
    name: "Suite",
    price: "₹10,000",
    desc: "Tariff per night for 2 adults",
    tag: "Bathtub · Private Garden",
    mainImage: room4,
    longDesc: "Completely secluded villas nestled underneath mature mango trees in our signature Aamrai grove. Perfect for honeymoons or families seeking unmatched privacy and natural tranquility.",
    size: "1,100 sq ft",
    occupancy: "4 Adults or 2 Adults + 3 Children",
    amenities: [
      "Sprawling private garden & sun loungers",
      "Outdoor luxury bathtub under a mango canopy",
      "Grand master bedroom and living area",
      "Walk-in wardrobe and dressing space",
      "Premium sound system & Smart TV",
      "Complimentary chef-curated evening treats",
      "Espresso machine & fully stocked mini bar",
      "Valet and laundry services",
    ],
    gallery: [room4, ...sharedGallery],
  },
};
