import type { Barber, Service, Testimonial, GalleryImage } from '../types';

export interface SalonInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: { day: string; open: string; close: string }[];
}

export const SALON_INFO: SalonInfo = {
  name: "Blade & Co. Barbershop",
  address: "123 Precision Way, London, UK SE1 7PB",
  phone: "+44 (0) 20 7123 4567",
  email: "hello@bladeandco.uk",
  hours: [
    { day: "Monday - Friday", open: "9:00 AM", close: "8:00 PM" },
    { day: "Saturday", open: "10:00 AM", close: "6:00 PM" },
    { day: "Sunday", open: "Closed", close: "" },
  ]
};

export const BARBERS: Barber[] = [
  {
    id: 'marcus-vane',
    name: 'Marcus Vane',
    role: 'Founder & Master Barber',
    bio: 'With over 15 years in the craft, Marcus blends traditional techniques with modern aesthetic precision.',
    story: 'Marcus began his journey in a small traditional shop in East London. Over the years, he developed a unique philosophy: that every haircut is a signature on a living canvas. He founded Blade & Co to restore the ritual of the barbershop experience.',
    image: 'https://images.unsplash.com/photo-1503460293676-48cf00ae1f5d?q=80&w=800&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2000&auto=format&fit=crop',
    specialties: ['Classic Cut', 'Hot Towel Shave', 'Bespoke Grooming'],
    socials: { instagram: '@marcusvane' },
    yearsExp: 15,
    clientsServed: 1200,
    rating: 5.0,
    awards: 12,
    skills: [
      { name: 'Scissor Work', level: 98 },
      { name: 'Straight Razor', level: 100 },
      { name: 'Fade Precision', level: 95 },
      { name: 'Beard Artistry', level: 97 }
    ],
    timeline: [
      { year: '2008', role: 'Apprentice', place: 'Old East End Shop', description: 'Learned the roots of the craft under master Sicilian barbers.' },
      { year: '2015', role: 'Senior Barber', place: 'London Central', description: 'Refined modern aesthetics and high-volume precision.' },
      { year: '2020', role: 'Founder', place: 'Blade & Co.', description: 'Established our flagship shop to bring back the ritual.' }
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800&auto=format&fit=crop', category: 'Fades', description: 'Classic mid-skin fade.' },
      { url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop', category: 'Classic Cuts', description: 'Side part pompadour.' },
      { url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800&auto=format&fit=crop', category: 'Beard', description: 'Straight razor shave.' }
    ],
    testimonials: [
      { name: 'James T.', review: 'The best shave I have ever had. Marcus is a true gentleman and an artist.', rating: 5, date: 'Oct 2023' },
      { name: 'Sarah L.', review: 'Brought my partner here for his birthday. The experience was second to none.', rating: 5, date: 'Nov 2023' }
    ]
  },
  {
    id: 'elias-blair',
    name: 'Elias Blair',
    role: 'Senior Stylist',
    bio: 'Specializing in contemporary fades and texturing, Elias is the architect of sharp, modern profiles.',
    story: 'Elias believes that hair is the ultimate form of self-expression. His background in urban street style informs his precision work, making him the go-to for the modern London man.',
    image: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=800&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1512690196160-7c96dc68e12d?q=80&w=2000&auto=format&fit=crop',
    specialties: ['Skin Fade', 'Modern Quiff', 'Beard Sculpting'],
    socials: { instagram: '@eliasblair' },
    yearsExp: 8,
    clientsServed: 950,
    rating: 4.9,
    awards: 5,
    skills: [
      { name: 'Skin Tapers', level: 100 },
      { name: 'Texture Work', level: 92 },
      { name: 'Beard Lineups', level: 95 },
      { name: 'Blow Drying', level: 88 }
    ],
    timeline: [
      { year: '2016', role: 'Junior Stylist', place: 'Street Cut Studio', description: 'Mastered the art of the skin fade.' },
      { year: '2021', role: 'Senior Stylist', place: 'Blade & Co.', description: 'Brought urban precision to our premium environment.' }
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1512690196160-7c96dc68e12d?q=80&w=800&auto=format&fit=crop', category: 'Fades', description: 'High bald fade.' },
      { url: 'https://images.unsplash.com/photo-1599351431247-f10bc135f306?q=80&w=800&auto=format&fit=crop', category: 'Texture', description: 'Messy crop.' }
    ],
    testimonials: [
      { name: 'Tom H.', review: 'Elias does the cleanest fades in London. Guaranteed.', rating: 5, date: 'Dec 2023' }
    ]
  },
  {
    id: 'julian-ross',
    name: 'Julian Ross',
    role: 'Precision Expert',
    bio: 'A master of the straight razor and meticulous detailing, Julian ensures every edge is a masterpiece.',
    story: 'Julian\'s attention to detail is legendary. He views every client through a lens of geometry and balance, ensuring that your cut doesn\'t just look good, it complements your identity.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1593702295094-1725e7b8c340?q=80&w=2000&auto=format&fit=crop',
    specialties: ['Straight Razor Shave', 'Detailing', 'Head Shaves'],
    socials: { instagram: '@julianross' },
    yearsExp: 12,
    clientsServed: 1100,
    rating: 4.9,
    awards: 8,
    skills: [
      { name: 'Razor Precision', level: 100 },
      { name: 'Geometric Scissoring', level: 96 },
      { name: 'Head Mapping', level: 94 },
      { name: 'Hot Towel Ritual', level: 98 }
    ],
    timeline: [
      { year: '2012', role: 'Apprentice', place: 'Italian Master Shop', description: 'Learned the precision techniques of master razors.' },
      { year: '2018', role: 'Specialist', place: 'Blade & Co.', description: 'The detailing expert of our team.' }
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1593702295094-1725e7b8c340?q=80&w=800&auto=format&fit=crop', category: 'Beard', description: 'Sculpted beard.' }
    ],
    testimonials: [
      { name: 'David W.', review: 'Julian is a perfectionist. I wouldn\'t trust anyone else with my beard.', rating: 5, date: 'Jan 2024' }
    ]
  },
  {
    id: 'stefan-gray',
    name: 'Stefan Gray',
    role: 'Texture Specialist',
    bio: 'Stefan brings a creative eye to natural textures and long-form men’s styling.',
    story: 'With a background in fashion editorial work, Stefan understands movement. He specializes in longer styles and natural curls, giving his clients a look that grows in perfectly.',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1582897243242-d698f244fac1?q=80&w=2000&auto=format&fit=crop',
    specialties: ['Natural Texture', 'Long Layering', 'Beard Conditioning'],
    socials: { instagram: '@stefangray', tiktok: '@stefan_styles' },
    yearsExp: 6,
    clientsServed: 780,
    rating: 4.8,
    awards: 3,
    skills: [
      { name: 'Long Layering', level: 97 },
      { name: 'Dry Cutting', level: 95 },
      { name: 'Natural Curls', level: 94 },
      { name: 'Styling Products', level: 98 }
    ],
    timeline: [
      { year: '2018', role: 'Showroom Barber', place: 'Fashion Studio', description: 'Styled models for high-end runways and editorials.' },
      { year: '2022', role: 'Stylist', place: 'Blade & Co.', description: 'Our specialist for natural movement and length.' }
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1582897243242-d698f244fac1?q=80&w=800&auto=format&fit=crop', category: 'Color', description: 'Long layered color.' }
    ],
    testimonials: [
      { name: 'Michael R.', review: 'Stefan really understood what I wanted for my curly hair. Brilliant.', rating: 5, date: 'Feb 2024' }
    ]
  }
];

export const SERVICES: Service[] = [
  {
    id: 'classic-cut',
    name: 'The Classic Cut',
    description: 'Precision shear cut combined with clipper work, finished with a straight razor neck shave.',
    price: '$55',
    duration: '45 min',
    category: 'Haircuts'
  },
  {
    id: 'blade-signature',
    name: 'Blade Signature',
    description: 'Our premier service: Custom cut, hot towel ritual, and a tailored beard trim.',
    price: '$95',
    duration: '75 min',
    category: 'Treatments'
  },
  {
    id: 'hot-towel-shave',
    name: 'Hot Towel Shave',
    description: 'Traditional multi-step straight razor shave with premium essential oils and hot lather.',
    price: '$65',
    duration: '45 min',
    category: 'Beard'
  },
  {
    id: 'beard-sculpting',
    name: 'Beard Sculpting',
    description: 'Architecture for the face. Precision trimming and shaping with a sharp line finish.',
    price: '$45',
    duration: '30 min',
    category: 'Beard'
  },
  {
    id: 'skin-fade',
    name: 'Executive Skin Fade',
    description: 'Zero taper fade on sides and back with precision styling on top.',
    price: '$60',
    duration: '60 min',
    category: 'Haircuts'
  },
  {
    id: 'buzz-cut',
    name: 'The Clean Buzz',
    description: 'Single grade all over, tapered edges, and straight razor neck clean up.',
    price: '$35',
    duration: '30 min',
    category: 'Haircuts'
  },
  {
    id: 'gray-blending',
    name: 'Gray Blending',
    description: 'Subtle gray reduction for a natural, rejuvenated look. Quick and discreet.',
    price: '$70',
    duration: '45 min',
    category: 'Color'
  },
  {
    id: 'full-color',
    name: 'Full Color Treatment',
    description: 'Permanent color change or root touch up using premium organic dyes.',
    price: '$120',
    duration: '90 min',
    category: 'Color'
  },
  {
    id: 'scalp-detox',
    name: 'Scalp Detox Ritual',
    description: 'Deep exfoliating treatment with tea tree oil and head massage.',
    price: '$40',
    duration: '30 min',
    category: 'Treatments'
  },
  {
    id: 'young-gent',
    name: 'Young Gentleman',
    description: 'Full precision cut for the next generation (Ages 12 and under).',
    price: '$30',
    duration: '30 min',
    category: 'Haircuts'
  },
  {
    id: 'line-up',
    name: 'Precision Line-Up',
    description: 'Refining the hairline and around the ears with a straight razor.',
    price: '$25',
    duration: '20 min',
    category: 'Beard'
  },
  {
    id: 'charcoal-mask',
    name: 'Charcoal Face Mask',
    description: 'Pore-refining treatment while you get your cut. Deep cleansing.',
    price: '$25',
    duration: '15 min',
    category: 'Treatments'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'James Harrison',
    content: 'The atmosphere at Blade & Co. is unmatched. Marcus is a true craftsman who understands the geometry of a perfect cut.',
    rating: 5,
    date: 'Oct 2023'
  },
  {
    id: '2',
    name: 'Robert Miller',
    content: 'Best straight razor shave in the city. The attention to detail and the hot towel ritual is incredibly relaxing.',
    rating: 5,
    date: 'Nov 2023'
  }
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 'g1', url: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800&auto=format&fit=crop', alt: 'Precision skin fade', category: 'Fades', barber: 'Marcus Vane', description: 'A sharp, clean mid-skin fade with a textured top.' },
  { id: 'g2', url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop', alt: 'Gentleman classic cut', category: 'Classic Cuts', barber: 'Elias Blair', description: 'Traditional scissor cut with natural flow and side part.' },
  { id: 'g3', url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800&auto=format&fit=crop', alt: 'Full beard grooming', category: 'Beard', barber: 'Julian Ross', description: 'Sculpted beard with sharp razor lines and conditioning ritual.' },
  { id: 'g4', url: 'https://images.unsplash.com/photo-1599351431247-f10bc135f306?q=80&w=800&auto=format&fit=crop', alt: 'Textured quiff', category: 'Texture', barber: 'Stefan Gray', description: 'Modern voluminous quiff focusing on natural texture and movement.' },
  { id: 'g5', url: 'https://images.unsplash.com/photo-1605497746444-ac966376f803?q=80&w=800&auto=format&fit=crop', alt: 'Platinum gray blend', category: 'Color', barber: 'Elias Blair', description: 'Seamless gray blending for a natural silver aesthetic.' },
  { id: 'g6', url: 'https://images.unsplash.com/photo-1512690196160-7c96dc68e12d?q=80&w=800&auto=format&fit=crop', alt: 'High drop fade', category: 'Fades', barber: 'Marcus Vane', description: 'Crisp drop fade with a sharp lineup.' },
  { id: 'g7', url: 'https://images.unsplash.com/photo-1593702295094-1725e7b8c340?q=80&w=800&auto=format&fit=crop', alt: 'Beard and skin fade combo', category: 'Beard', barber: 'Julian Ross', description: 'Total transformation: Low fade transitioning into a sculpted beard.' },
  { id: 'g8', url: 'https://images.unsplash.com/photo-1532710093739-9470acff878f?q=80&w=800&auto=format&fit=crop', alt: 'Classic side part', category: 'Classic Cuts', barber: 'Marcus Vane', description: 'Timeless professional style with a clean taper.' },
  { id: 'g9', url: 'https://images.unsplash.com/photo-1582897243242-d698f244fac1?q=80&w=800&auto=format&fit=crop', alt: 'Bold indigo color', category: 'Color', barber: 'Stefan Gray', description: 'Creative full color treatment with deep vibrancy.' },
  { id: 'g10', url: 'https://images.unsplash.com/photo-1517865330663-875f68bba636?q=80&w=800&auto=format&fit=crop', alt: 'Pompadour texture', category: 'Texture', barber: 'Julian Ross', description: 'Classic pomp updated with contemporary texture.' },
  { id: 'g11', url: 'https://images.unsplash.com/photo-1592647425447-db8118179c14?q=80&w=800&auto=format&fit=crop', alt: 'Low skin fade', category: 'Fades', barber: 'Elias Blair', description: 'Meticulous low skin taper for a clean finish.' },
  { id: 'g12', url: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=800&auto=format&fit=crop', alt: 'Long trim classic', category: 'Classic Cuts', barber: 'Stefan Gray', description: 'Shear-only long length maintenance for natural flow.' },
  { id: 'g13', url: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=800&auto=format&fit=crop', alt: 'Short beard trim', category: 'Beard', barber: 'Marcus Vane', description: 'Keeping it professional: Short stubble sculpt and edge.' },
  { id: 'g14', url: 'https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=800&auto=format&fit=crop', alt: 'Messy crop texture', category: 'Texture', barber: 'Julian Ross', description: 'Effortless morning look with heavy texturing.' },
  { id: 'g15', url: 'https://images.unsplash.com/photo-1493106819501-66d381c466f1?q=80&w=800&auto=format&fit=crop', alt: 'Tapered classic', category: 'Classic Cuts', barber: 'Elias Blair', description: 'Modern take on a 1950s classic taper.' },
  { id: 'g16', url: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=800&auto=format&fit=crop', alt: 'High bald fade', category: 'Fades', barber: 'Julian Ross', description: 'Zero-effort high fade for maximum cleanliness.' },
  { id: 'g17', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop', alt: 'Vibrant highlight', category: 'Color', barber: 'Stefan Gray', description: 'Sun-kissed effect with precision foil highlights.' },
  { id: 'g18', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop', alt: 'Beard ritual detail', category: 'Beard', barber: 'Marcus Vane', description: 'Traditional straight razor detailing on full beard.' },
  { id: 'g19', url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop', alt: 'Spiky texture', category: 'Texture', barber: 'Elias Blair', description: 'Sharp spikes with high-hold finish.' },
  { id: 'g20', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop', alt: 'Business classic', category: 'Classic Cuts', barber: 'Julian Ross', description: 'The executive: conservative but perfectly finished.' },
];

export const FAQS = [
  {
    question: "Do I need to book in advance?",
    answer: "While we do accept walk-ins based on availability, we highly recommend booking in advance to guarantee a slot with your preferred master barber."
  },
  {
    question: "How long does a standard cut take?",
    answer: "A classic cut typically takes 45 minutes. More complex services like our Blade Signature or full color treatments can take anywhere from 60 to 90 minutes."
  },
  {
    question: "What products do you use?",
    answer: "We exclusively use premium, organic grooming products from heritage brands. We also have a curated selection available for purchase in-shop."
  },
  {
    question: "Is there parking available?",
    answer: "Yes, there is metered street parking available directly outside the shop, and a multi-story car park just 2 minutes' walk away."
  },
  {
    question: "Can I cancel my appointment?",
    answer: "We request at least 24 hours' notice for cancellations. This allows us to offer the slot to another client on our waitlist."
  },
  {
    question: "Do you offer gift vouchers?",
    answer: "Absolutely. We offer physical and digital gift cards that can be used for any service or product in-shop. They make the perfect gift for the modern gentleman."
  }
];

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Team', path: '/team' },
  { name: 'Contact Us', path: '/contact' },
];

export const FOOTER_QUICK_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Team', path: '/team' },
  { label: 'Contact', path: '/contact' },
];

export const FOOTER_SERVICES: string[] = [
  'The Classic Cut',
  'Blade Signature',
  'Hot Towel Shave',
  'Beard Sculpting',
];
