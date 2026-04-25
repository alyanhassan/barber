import { useState, useEffect, useRef, useCallback } from 'react';
import { useInView, useScroll, useTransform } from 'framer-motion';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  ArrowRight,
  Star,
  MapPin,
  Phone,
  Clock,
  Scissors,
  Zap,
  Shield,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
import { Meta } from '../components/seo/Meta';
import { FadeUp } from '../components/ui/FadeUp';
import { ShuffleCards } from '../components/ui/TestimonialCards';
import {
  BARBERS,
  SERVICES,
  GALLERY_IMAGES,
  SALON_INFO,
  TESTIMONIALS
} from '../data';

// --- CountUp Logic ---
const StatCounter = ({ value, label, suffix = "" }: { value: number, label: string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">
        {count}{suffix}
      </h3>
      <p className="text-[10px] uppercase tracking-[0.4em] text-text-muted">{label}</p>
    </div>
  );
};

export function Home() {
  // --- Bidirectional Antigravity Scroll Animation ---
  const setupScrollReveal = useCallback(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-up, .slide-left, .slide-right')
      .forEach(el => observer.observe(el));

    const barberObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.barber-block')
      .forEach(block => barberObserver.observe(block));

    return () => {
      observer.disconnect();
      barberObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const cleanup = setupScrollReveal();
    return cleanup;
  }, [setupScrollReveal]);




  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Blade & Co. Barbershop",
    "image": "/images/cover.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Precision Way",
      "addressLocality": "London",
      "postalCode": "SE1 7PB",
      "addressCountry": "UK"
    },
    "telephone": "+44 20 7123 4567",
    "priceRange": "$$",
    "openingHours": "Mo-Fr 09:00-20:00, Sa 10:00-18:00"
  };

  return (
    <div id="main-content">
      <Meta
        title="Blade & Co. | Premium Barbershop Experience"
        description="Experience the pinnacle of brotherhood and craft. Precision cuts, traditional shaves, and an atmosphere second to none in London."
      />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* SECTION 1: HERO */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img
            src="/images/cover.png"
            alt="Blade & Co Interior"
            className="w-full h-full object-cover"
            animate={{ scale: [1.0, 1.08, 1.0] }}
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 bg-[#0A0A0A]/70" />
          {/* Animated Gold Grain Overlay */}
          <div
            className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
              backgroundSize: '150px 150px'
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center mt-12">
          <div className="overflow-hidden mb-6 flex flex-wrap justify-center gap-4">
            {["WHERE", "STYLE", "MEETS"].map((word, i) => (
              <motion.span
                key={word}
                initial={{ clipPath: "inset(0 0 100% 0)", y: 50 }}
                animate={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                className="text-5xl md:text-8xl font-black font-heading tracking-tighter leading-none inline-block"
              >
                {word}
              </motion.span>
            ))}
            <br className="hidden md:block" />
            <motion.span
              initial={{ clipPath: "inset(0 0 100% 0)", y: 50 }}
              animate={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="text-5xl md:text-8xl font-black font-heading tracking-tighter leading-none text-gradient-gold italic inline-block"
            >
              PRECISION
            </motion.span>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-2xl text-text-primary/80 mb-10 max-w-2xl mx-auto font-light tracking-wide"
          >
            Premium grooming experience in the heart of the city
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 1.2 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <Link to="/contact" className="btn-primary px-10">
              Book Appointment
            </Link>
            <Link to="/gallery" className="btn-outline px-10">
              Explore Our Work
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="mt-16 inline-block border border-[#C9A84C]/30 px-6 py-2 rounded-full uppercase tracking-[0.3em] text-xs font-bold text-[#C9A84C]"
          >
            Est. 2012
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary cursor-pointer z-10"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* SECTION 2: ABOUT SNIPPET */}
      <section className="py-10 md:py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary uppercase tracking-[0.4em] font-bold text-sm md:text-base mb-4 block">Legacy</span>

            <motion.div className="overflow-hidden">
              <motion.h2
                initial={{ clipPath: "inset(0 0 100% 0)", y: 50 }}
                whileInView={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-heading font-black mb-8"
              >
                OUR STORY
              </motion.h2>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="w-20 h-1 bg-primary mb-8 origin-left"
            />

            <FadeUp delay={0.4}>
              <p className="text-text-muted leading-relaxed text-lg mb-12">
                Born from a passion for traditional craftsmanship, Blade & Co. has stood as a bastion of grooming excellence for over a decade. We believe every cut is a signature, and every client is family.
              </p>
            </FadeUp>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/5">
              <StatCounter value={10} label="Years" suffix="+" />
              <StatCounter value={4} label="Barbers" />
              <StatCounter value={5000} label="Clients" suffix="+" />
              <StatCounter value={4.9} label="Rating" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative rounded-[2rem] overflow-hidden shadow-3xl aspect-[4/5] lg:aspect-auto lg:h-[600px]"
          >
            <img
              src="/images/cover.png"
              alt="The Shop Atmosphere"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border-[20px] border-background/20 m-6 rounded-2xl" />
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: SERVICES PREVIEW */}
      <section className="py-10 md:py-20 px-6 bg-surface-100 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 flex flex-col items-center">
            <motion.div className="overflow-hidden pb-2">
              <motion.h2
                initial={{ clipPath: "inset(0 0 100% 0)", y: 50 }}
                whileInView={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-heading font-black mb-6"
              >
                WHAT WE OFFER
              </motion.h2>
            </motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="w-20 h-1 bg-primary mb-6 origin-center"
            />
            <p className="text-text-muted uppercase tracking-[0.3em] text-xs">Curated Grooming Excellence</p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          >
            {SERVICES.slice(0, 3).map((svc) => (
              <motion.div
                key={svc.id}
                variants={{ hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                className="glass-card p-10 group hover:border-[#C9A84C] hover:shadow-[0_0_30px_rgba(201,168,76,0.2)] transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                  <Scissors size={100} className="rotate-45" />
                </div>
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-primary mb-8 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                  {svc.category === 'Haircuts' ? <Zap size={24} /> : <Shield size={24} />}
                </div>
                <h3 className="text-2xl font-bold mb-4 font-heading relative z-10">{svc.name}</h3>
                <p className="text-text-muted text-sm leading-relaxed mb-8 relative z-10">
                  {svc.description.slice(0, 80)}...
                </p>
                <div className="flex items-center justify-between border-t border-white/5 pt-6 relative z-10">
                  <span className="text-primary font-bold group-hover:animate-pulse transition-all">Starting {svc.price}</span>
                  <Link to="/services" className="text-xs uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2 relative overflow-hidden group/btn">
                    Book <ArrowRight size={14} />
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center">
            <Link to="/services" className="btn-outline">
              View All Services <ArrowRight className="ml-2 inline" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: GALLERY PREVIEW */}
      <section className="py-10 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2
              className="text-4xl md:text-6xl font-heading font-black fade-up"
              style={{ transitionDelay: '0s' }}
            >
              A Legacy of Style
            </h2>
            <p
              className="text-text-muted text-sm md:text-base mt-6 max-w-2xl mx-auto fade-up"
              style={{ transitionDelay: '0.2s' }}
            >
              A visual journey through our finest cuts and premium atmosphere.
            </p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {GALLERY_IMAGES.slice(0, 6).map((img, i) => {
              const isAnimated = [0, 2, 4].includes(i);
              const delay = `${(i + 1) * 0.1}s`;

              if (isAnimated) {
                return (
                  <motion.div
                    key={img.id}
                    className="break-inside-avoid relative overflow-hidden rounded-2xl group fade-up cursor-pointer"
                    style={{ transitionDelay: delay }}
                  >
                    <motion.img
                      src={img.url}
                      alt={img.alt}
                      className="w-full h-auto object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.06]"
                    />

                    {/* Animated Overlay */}
                    <motion.div
                      initial={{ clipPath: "inset(100% 0 0 0)" }}
                      whileHover={{ clipPath: "inset(0% 0 0 0)" }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-6"
                    >
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      >
                        <p className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase mb-1">
                          {img.category}
                        </p>
                        <h3 className="text-2xl font-heading font-bold text-white italic">
                          {img.barber}
                        </h3>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                );
              }

              return (
                <div
                  key={img.id}
                  className="break-inside-avoid relative overflow-hidden rounded-2xl group fade-up cursor-pointer"
                  style={{ transitionDelay: delay }}
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: TEAM */}
      <section className="py-10 md:py-20 bg-[#0A0A0A] overflow-hidden">
        <div className="text-center mb-16 px-6 fade-up">
          <h2 className="text-4xl md:text-6xl font-heading font-black italic text-gradient-gold">
            OUR MASTER TEAM
          </h2>
          <div className="w-32 h-[1px] bg-[#C9A84C] mt-6 mx-auto fade-up" style={{ transitionDelay: '0.15s' }} />
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col gap-12">
          {BARBERS.map((barber) => (
            <div key={barber.id} className="w-full barber-block">
              <div className="flex flex-col md:flex-row min-h-[520px]">
                {/* LEFT: B&W Photo */}
                <div className="w-full md:w-[42%] relative overflow-hidden bg-[#000000] photo-side">
                  <img
                    src={barber.image}
                    alt={barber.name}
                    className="w-full h-[350px] md:h-full object-cover grayscale"
                  />
                </div>
                {/* MIDDLE: Info Card */}
                <div className="w-full md:w-[38%] bg-[#F5F0E8] p-8 md:p-12 flex flex-col justify-center content-side">
                  <h3 className="text-2xl md:text-3xl font-heading font-black text-[#C9A84C] uppercase tracking-wide mb-2">
                    {barber.name}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#1A1A1A] font-bold mb-6">
                    {barber.role}
                  </p>
                  <p className="text-[#444] text-sm leading-relaxed mb-8">
                    {barber.bio}
                  </p>
                  <div className="flex flex-col gap-3 max-w-[220px]">
                    <a
                      href="https://wa.me/1234567890"
                      className="bg-[#1A1A1A] text-white text-[10px] font-bold uppercase tracking-widest px-6 py-3 text-center hover:bg-black transition-colors"
                    >
                      Book on WhatsApp
                    </a>
                    <Link
                      to={`/barber/${barber.id}`}
                      className="border-2 border-[#1A1A1A] text-[#1A1A1A] text-[10px] font-bold uppercase tracking-widest px-6 py-3 text-center hover:bg-[#1A1A1A] hover:text-white transition-colors"
                    >
                      Profile
                    </Link>
                  </div>
                </div>
                {/* FAR RIGHT: Decorative Chevrons */}
                <div className="hidden md:flex w-[20%] bg-[#000000] items-center justify-center gap-4 chevron-side">
                  <svg width="40" height="160" viewBox="0 0 30 120" fill="none"><path d="M0 0 L30 60 L0 120" stroke="rgba(255,255,255,0.8)" strokeWidth="4" fill="none" /></svg>
                  <svg width="40" height="160" viewBox="0 0 30 120" fill="none"><path d="M0 0 L30 60 L0 120" stroke="rgba(255,255,255,0.5)" strokeWidth="4" fill="none" /></svg>
                  <svg width="40" height="160" viewBox="0 0 30 120" fill="none"><path d="M0 0 L30 60 L0 120" stroke="rgba(255,255,255,0.3)" strokeWidth="4" fill="none" /></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: REVIEWS */}
      <section className="py-10 md:py-20 px-6 bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-[0.02]">
          <Scissors size={400} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ clipPath: "inset(0 0 100% 0)", y: 50 }}
              whileInView={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-heading font-black italic mb-6"
            >
              WHAT CLIENTS SAY
            </motion.h2>
            <p className="text-text-muted uppercase tracking-[0.4em] text-xs">
              Drag the card to shuffle
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20">

            {/* LEFT: Shuffle Cards */}
            <div className="w-full lg:w-1/2 flex items-center justify-center relative">
              <ShuffleCards testimonials={[
                {
                  id: 1,
                  testimonial: "The atmosphere at Blade & Co. is unlike anything in London. Marcus understood exactly what I wanted and delivered perfection.",
                  author: "James Harrison — Verified Client"
                },
                {
                  id: 2,
                  testimonial: "Best straight razor shave I have ever had. The hot towel ritual is incredibly relaxing. I leave feeling like a new man every time.",
                  author: "Robert Miller — Verified Client"
                },
                {
                  id: 3,
                  testimonial: "Elias gave me the cleanest fade of my life. The attention to detail is second to none. Truly a cut above the rest.",
                  author: "Thomas Webb — Verified Client"
                }
              ]} />
            </div>

            {/* RIGHT: Stats */}
            <div className="w-full lg:w-1/2 space-y-10 text-center lg:text-left">
              <div>
                <p className="text-6xl font-black font-heading text-primary">
                  4.9
                </p>
                <p className="text-xs uppercase tracking-widest 
                  text-text-muted mt-2">Average Rating</p>
              </div>
              <div className="w-px h-16 bg-white/10 mx-auto 
                lg:mx-0 hidden lg:block" />
              <div>
                <p className="text-6xl font-black font-heading text-white">
                  1000+
                </p>
                <p className="text-xs uppercase tracking-widest 
                  text-text-muted mt-2">Verified Reviews</p>
              </div>
              <div className="w-px h-16 bg-white/10 mx-auto 
                lg:mx-0 hidden lg:block" />
              <div>
                <p className="text-4xl font-black font-heading 
                  text-primary italic">
                  "Drag to shuffle"
                </p>
                <p className="text-xs uppercase tracking-widest 
                  text-text-muted mt-2">Interactive Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: CONTACT SNIPPET */}
      <section className="py-10 md:py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-heading font-black mb-12 italic tracking-tighter">FIND US</h2>

            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <h4 className="flex items-center gap-3 text-primary text-xs uppercase tracking-[0.4em] font-bold">
                    <MapPin size={16} /> Location
                  </h4>
                  <p className="text-sm text-text-muted leading-relaxed">
                    123 Precision Way<br />
                    London, UK SE1 7PB
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="flex items-center gap-3 text-primary text-xs uppercase tracking-[0.4em] font-bold">
                    <Phone size={16} /> Communication
                  </h4>
                  <p className="text-sm text-text-muted leading-relaxed">
                    +44 (0) 20 7123 4567<br />
                    hello@bladeandco.uk
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="flex items-center gap-3 text-primary text-xs uppercase tracking-[0.4em] font-bold">
                  <Clock size={16} /> Working Hours
                </h4>
                <div className="glass-card overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <tbody>
                      {SALON_INFO.hours.map((row) => (
                        <tr key={row.day} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                          <td className="py-4 px-6 text-white font-medium">{row.day}</td>
                          <td className="py-4 px-6 text-text-muted text-right">
                            {row.open}{row.close ? ` — ${row.close}` : ''}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <Link to="/contact" className="btn-primary text-xs w-full md:w-auto text-center">
                  Get Full Directions
                </Link>
                <Link to="/contact" className="btn-outline text-xs w-full md:w-auto text-center">
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] lg:h-auto rounded-[3rem] overflow-hidden glass shadow-3xl"
          >
            <div className="absolute inset-0 bg-white/5 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center flex-col gap-4 text-center p-10">
              <div className="w-16 h-16 glass rounded-full flex items-center justify-center text-primary mb-4 p-4">
                <MapPin size={40} className="animate-bounce" />
              </div>
              <h3 className="text-2xl font-heading font-black">INTERACTIVE MAP</h3>
              <p className="text-text-muted text-sm max-w-xs">Map display is suspended in this environment. Click "Get Directions" for full navigation.</p>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Antigravity Scroll Reveal Styles */}
      <style>{`
        .fade-up {
          opacity: 0;
          transform: translateY(70px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .fade-up.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .slide-left {
          opacity: 0;
          transform: translateX(-60px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .slide-left.is-visible {
          opacity: 1;
          transform: translateX(0);
        }
        .slide-right {
          opacity: 0;
          transform: translateX(60px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .slide-right.is-visible {
          opacity: 1;
          transform: translateX(0);
        }

        .barber-block .photo-side {
          opacity: 0;
          transform: translateX(-80px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .barber-block .content-side {
          opacity: 0;
          transform: translateX(80px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .barber-block .chevron-side {
          opacity: 0;
          transition: opacity 0.9s ease 0.3s;
        }
        .barber-block.is-visible .photo-side {
          opacity: 1;
          transform: translateX(0);
        }
        .barber-block.is-visible .content-side {
          opacity: 1;
          transform: translateX(0);
        }
        .barber-block.is-visible .chevron-side {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

export default Home;