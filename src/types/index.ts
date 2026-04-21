export interface Barber {
  id: string;
  name: string;
  role: string;
  bio: string;
  story: string;
  image: string;
  coverImage: string;
  specialties: string[];
  socials: { 
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
  yearsExp: number;
  clientsServed: number;
  rating: number;
  awards: number;
  skills: { name: string; level: number }[];
  timeline: { year: string; role: string; place: string; description: string }[];
  gallery: { url: string; category: string; description: string }[];
  testimonials: { name: string; review: string; rating: number; date: string }[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  category: 'Haircuts' | 'Beard' | 'Treatments' | 'Color';
}

export interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  date: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  category: FilterCategory;
  barber: string;
  description?: string;
}

export type FilterCategory = 'Fades' | 'Beard' | 'Classic Cuts' | 'Color' | 'Texture';

export interface NavLink {
  name: string;
  path: string;
}

export interface FooterLink {
  label: string;
  path: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
