import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  Maximize2,
  ChevronRight as BreadcrumbRight
} from 'lucide-react';
import { Meta } from '../components/seo/Meta';
import { GALLERY_IMAGES } from '../data';
import type { FilterCategory } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const CATEGORIES: (FilterCategory | 'All')[] = ['All', 'Fades', 'Beard', 'Classic Cuts', 'Color', 'Texture'];

export function Gallery() {
  const [filter, setFilter] = useState<FilterCategory | 'All'>('All');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const filteredImages = filter === 'All'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.category === filter);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setSelectedImageIndex(null);
    document.body.style.overflow = 'unset';
  }, []);

  const nextImage = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredImages.length);
    }
  }, [selectedImageIndex, filteredImages.length]);

  const prevImage = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  }, [selectedImageIndex, filteredImages.length]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, closeLightbox, nextImage, prevImage]);

  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "image": GALLERY_IMAGES.map(img => ({
      "@type": "ImageObject",
      "url": img.url,
      "caption": img.alt
    }))
  };

  return (
    <div className="pt-20">
      <Meta
        title="Gallery | Blade & Co. — Haircut & Beard Work"
        description="Browse the Blade & Co. lookbook. Explore our master-crafted fades, classic cuts, and beard sculpting transformations in London."
      />

      <script type="application/ld+json">
        {JSON.stringify(gallerySchema)}
      </script>

      {/* PAGE HERO */}
      <section className="relative h-[40vh] flex items-center justify-center bg-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 text-center px-6">
          <nav className="flex justify-center items-center gap-2 text-xs uppercase tracking-widest text-text-muted mb-6">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <BreadcrumbRight size={12} />
            <span className="text-primary">Gallery</span>
          </nav>
          <motion.h1 
            initial={{ clipPath: "inset(0 0 100% 0)", y: 50 }}
            animate={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-black font-heading mb-4 italic"
          >
            OUR <span className="text-primary relative inline-block">WORK<span className="absolute bottom-2 left-0 w-full h-2 bg-primary/20 -z-10" /></span>
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="w-20 h-1 bg-primary mx-auto mb-6 origin-center" 
          />
          <p className="text-text-muted uppercase tracking-[0.4em] text-xs">Every cut tells a story</p>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="sticky top-20 z-30 bg-background/80 backdrop-blur-md border-b border-white/5 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all",
                filter === cat ? "bg-primary text-background" : "bg-white/5 text-text-muted hover:bg-white/10 hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* MASONRY GALLERY GRID */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((img, index) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="relative group cursor-pointer overflow-hidden rounded-2xl bg-surface-100 break-inside-avoid"
                  onClick={() => openLightbox(index)}
                  whileHover="hover"
                >
                  <motion.img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-auto object-cover"
                    variants={{
                      hover: { scale: 1.08, transition: { duration: 0.6, ease: "easeOut" } }
                    }}
                    loading="lazy"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-[#0A0A0A]/70 flex flex-col items-center justify-center p-6 text-center pointer-events-none"
                    initial={{ clipPath: "inset(100% 0 0 0)" }}
                    variants={{
                      hover: { clipPath: "inset(0% 0 0 0)", transition: { duration: 0.4, ease: "easeOut" } }
                    }}
                  >
                    <motion.div 
                      className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-100"
                    >
                      <Maximize2 className="text-primary mb-4 mx-auto" size={24} />
                      <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-2 block">{img.category}</span>
                      <p className="text-white font-heading italic text-lg">{img.barber}</p>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* BEFORE & AFTER SECTION */}
      <section className="py-32 px-6 bg-surface-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 flex flex-col items-center">
            <motion.div className="overflow-hidden pb-2 mb-6">
              <motion.h2 
                initial={{ clipPath: "inset(0 0 100% 0)", y: 50 }}
                whileInView={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-heading font-black italic tracking-tighter uppercase"
              >
                THE <span className="text-gradient-gold">TRANSFORMATION</span>
              </motion.h2>
            </motion.div>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="w-32 h-[1px] bg-[#C9A84C] mx-auto origin-center mb-6" 
            />
            <p className="text-text-muted uppercase tracking-[0.4em] text-xs">Visual proof of our craft</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group relative aspect-[3/4] rounded-3xl overflow-hidden glass shadow-2xl">
                {/* Before Image */}
                <img
                  src={`https://images.unsplash.com/photo-1593702295094-1725e7b8c340?q=80&w=800&auto=format&fit=crop&sig=before-${i}`}
                  alt="Before transformation"
                  className="absolute inset-0 w-full h-full object-cover grayscale"
                />

                {/* After Image with Clip Path */}
                <div className="absolute inset-0 w-full h-full overflow-hidden transition-all duration-500 group-hover:clip-path-reveal" style={{ clipPath: 'inset(0 0 0 100%)' }}>
                  <img
                    src={`https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800&auto=format&fit=crop&sig=after-${i}`}
                    alt="After transformation"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center z-10 pointer-events-none">
                  <span className="text-[8px] uppercase tracking-widest bg-black/50 backdrop-blur px-3 py-1 rounded-full text-white">Before</span>
                  <span className="text-[8px] uppercase tracking-widest bg-primary px-3 py-1 rounded-full text-background font-bold opacity-0 group-hover:opacity-100 transition-opacity">After</span>
                </div>

                {/* Visual Divider/Slider */}
                <div className="absolute top-0 bottom-0 left-full w-0.5 bg-primary group-hover:left-0 transition-all duration-500 z-20" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM STRIP */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
          <div>
            <h3 className="text-xl font-heading font-black italic mb-2 uppercase tracking-wide">STAY CONNECTED</h3>
            <p className="text-xs text-text-muted uppercase tracking-[0.3em]">Follow us @bladeandco</p>
          </div>
          <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-primary">
            <Camera size={24} />
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto px-6 no-scrollbar pb-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="flex-shrink-0 w-[200px] aspect-square rounded-2xl overflow-hidden glass group">
              <img
                src={`https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=400&auto=format&fit=crop&sig=ig-${i}`}
                className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0A0A0Ax] backdrop-blur-2xl flex items-center justify-center p-6 md:p-12"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]"
            >
              <X size={40} />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-primary transition-colors z-[110]"
            >
              <ChevronLeft size={60} />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-primary transition-colors z-[110]"
            >
              <ChevronRight size={60} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-6xl w-full h-full flex flex-col md:flex-row items-center gap-12 relative"
            >
              <div className="flex-grow h-[50vh] md:h-full w-full relative group">
                <img
                  src={filteredImages[selectedImageIndex].url}
                  alt={filteredImages[selectedImageIndex].alt}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="md:w-1/3 text-left space-y-6">
                <div>
                  <span className="text-primary uppercase tracking-[0.4em] font-bold text-xs mb-2 block">
                    {filteredImages[selectedImageIndex].category}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-heading font-black italic tracking-tighter">
                    {filteredImages[selectedImageIndex].barber}
                  </h3>
                </div>
                <div className="w-12 h-1 bg-primary" />
                <p className="text-text-primary/70 text-lg leading-relaxed">
                  {filteredImages[selectedImageIndex].description}
                </p>
                <Link
                  to="/contact"
                  onClick={closeLightbox}
                  className="btn-primary inline-block w-fit"
                >
                  Book with {filteredImages[selectedImageIndex].barber.split(' ')[0]}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

export default Gallery;