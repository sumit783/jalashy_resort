// Basic core assets
import spa from "@/assets/spa.jpg";
import dining from "@/assets/dining.jpg";
import hero from "@/assets/hero.jpg";
import image020A6170Webp from "@/assets/020A6170.webp";
import slider5 from "@/assets/slider-5.webp";
import weddingLawn from "@/assets/wedding-lawn.webp";

// Room Images
import room1 from "@/assets/roomImages/020A6091.webp";
import room2 from "@/assets/roomImages/020A6097.webp";
import room3 from "@/assets/roomImages/020A6099.webp";
import room4 from "@/assets/roomImages/020A6152.webp";
import room5 from "@/assets/roomImages/020A6170.webp";

import roomImg1 from "@/assets/roomImages/JV_07938.jpg";
import roomImg2 from "@/assets/roomImages/JV_07939.jpg";
import roomImg3 from "@/assets/roomImages/JV_07995.jpg";
import roomImg4 from "@/assets/roomImages/JV_08023.jpg";
import roomImg5 from "@/assets/roomImages/JV_08050.jpg";
import roomImg6 from "@/assets/roomImages/JV_08056.jpg";
import roomImg7 from "@/assets/roomImages/JV_08059.jpg";

import cottageImg1 from "@/assets/couple-cottage-images/020A6516.jpg";
import cottageImg2 from "@/assets/couple-cottage-images/JV_07988 (1).jpg";
import cottageImg3 from "@/assets/couple-cottage-images/JV_07988.jpg";
import cottageImg4 from "@/assets/couple-cottage-images/JV_07994.jpg";
import cottageImg5 from "@/assets/couple-cottage-images/JV_07995 - Copy.jpg";

// Home Images
import home1 from "@/assets/home_images/020A5924.webp";
import home2 from "@/assets/home_images/020A5930.webp";
import home3 from "@/assets/home_images/020A5959.webp";
import home4 from "@/assets/home_images/020A6018.webp";
import home5 from "@/assets/home_images/020A6056.webp";
import home6 from "@/assets/home_images/020A6228.webp";
import home7 from "@/assets/home_images/020A6231.webp";
import home8 from "@/assets/home_images/020A6236.webp";
import home9 from "@/assets/home_images/020A6238.webp";

// Slider Images
import sliderImg1 from "@/assets/sliderImage/020A6063.webp";
import sliderImg2 from "@/assets/sliderImage/020A6071.webp";
import sliderImg3 from "@/assets/sliderImage/020A6269.webp";
import sliderImg4 from "@/assets/sliderImage/020A6307.webp";
import slider1 from "@/assets/sliderImage/slider-1.webp";
import slider2 from "@/assets/sliderImage/slider-2.webp";
import slider3 from "@/assets/sliderImage/slider-3.webp";
import slider4 from "@/assets/sliderImage/slider-4.webp";

export interface MediaItem {
  type: "image" | "video";
  src: any;
  alt: string;
}

export const galleryMedia: MediaItem[] = [
  // Videos from public folder
  { type: "video", src: "/Website_01.webm", alt: "Jalashay Lakeside View" },
  { type: "video", src: "/Website_04.webm", alt: "Lakeside Lawn Sunset" },
  { type: "video", src: "/hero_bg.mp4", alt: "Resort Walkthrough Video" },
  { type: "video", src: "/trees.webm", alt: "Grove Canopy Video" },
  { type: "video", src: "/Website_03.webm", alt: "Tranquil Water Vista" },
  { type: "video", src: "/Website_05.webm", alt: "Evening Lawn Celebrations" },
  { type: "video", src: "/Website_08.webm", alt: "Resort Pathways Walk" },
  { type: "video", src: "/Website_09.webm", alt: "Heritage Architecture Tour" },
  { type: "video", src: "/Website_010.webm", alt: "Lakeside Breeze Video" },
  { type: "video", src: "/Website_Video_02.webm", alt: "Resort drone aerial flight" },

  // Images
  { type: "image", src: spa, alt: "Wellness Spa Sanctuary" },
  { type: "image", src: dining, alt: "Lakeside Dining Restaurant" },
  { type: "image", src: hero, alt: "Resort Heritage Frontage" },
  { type: "image", src: weddingLawn, alt: "Wedding Lawn Setup" },
  { type: "image", src: image020A6170Webp, alt: "Resort Room Vista" },
  { type: "image", src: slider5, alt: "Resort Exterior View" },

  // Room Images
  { type: "image", src: room1, alt: "Lakeside Premium Room Interior" },
  { type: "image", src: room2, alt: "Backwater Heritage Cottage Interior" },
  { type: "image", src: room3, alt: "Royal Lakeview Suite Interior" },
  { type: "image", src: room4, alt: "Mango Canopy Villa Interior" },
  { type: "image", src: room5, alt: "Heritage Suite Washroom" },
  { type: "image", src: roomImg1, alt: "Resort Interior View" },
  { type: "image", src: roomImg2, alt: "Luxury Room Details" },
  { type: "image", src: roomImg3, alt: "Premium Resort Stay" },
  { type: "image", src: roomImg4, alt: "Cottage Interior Vista" },
  { type: "image", src: roomImg5, alt: "Elegant Room Setup" },
  { type: "image", src: roomImg6, alt: "Resort Bedroom Styling" },
  { type: "image", src: roomImg7, alt: "Luxurious Resort Details" },
  { type: "image", src: cottageImg1, alt: "Couple Cottage Interior" },
  { type: "image", src: cottageImg2, alt: "Couple Cottage Bed setup" },
  { type: "image", src: cottageImg3, alt: "Couple Cottage Living" },
  { type: "image", src: cottageImg4, alt: "Cottage Amenities" },
  { type: "image", src: cottageImg5, alt: "Couple Cottage Washroom" },

  // Home Images
  { type: "image", src: home1, alt: "Veranda and Lounge Area" },
  { type: "image", src: home2, alt: "Lobby Reception Entrance" },
  { type: "image", src: home3, alt: "Mango Grove Dining Setup" },
  { type: "image", src: home4, alt: "Poolside Lit Sunbeds" },
  { type: "image", src: home5, alt: "Tall Palm Shore Path" },
  { type: "image", src: home6, alt: "Waterfront Lounge Chairs" },
  { type: "image", src: home7, alt: "Evening Walkway Lanterns" },
  { type: "image", src: home8, alt: "Lounge Seating Corner" },
  { type: "image", src: home9, alt: "Cozy Garden Bench" },

  // Slider Images
  { type: "image", src: sliderImg1, alt: "Luxury Bed setup" },
  { type: "image", src: sliderImg2, alt: "Suite Private Pool" },
  { type: "image", src: sliderImg3, alt: "Spa Massage Room" },
  { type: "image", src: sliderImg4, alt: "Lakeside Sunset Deck View" },
  { type: "image", src: slider1, alt: "Main Lobby Entrance View" },
  { type: "image", src: slider2, alt: "Premium Villa Lounge" },
  { type: "image", src: slider3, alt: "Lakeside Garden Walkway" },
  { type: "image", src: slider4, alt: "Aamrai Mango grove canopy" },
];
