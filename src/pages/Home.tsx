import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
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
  Maximize2
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
import { Meta } from '../components/seo/Meta';
import {
  BARBERS,
  SERVICES,
  TESTIMONIALS,
  SALON_INFO
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
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Blade & Co. Barbershop",
    "image": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2000&auto=format&fit=crop",
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
          <img
            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2000&auto=format&fit=crop"
            alt="Blade & Co Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0A0A0A]/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
          >
            <motion.h1
              variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              className="text-5xl md:text-8xl font-black font-heading mb-6 tracking-tighter leading-none"
            >
              WHERE STYLE MEETS <br />
              <span className="text-gradient-gold italic">PRECISION</span>
            </motion.h1>

            <motion.p
              variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              className="text-lg md:text-2xl text-text-primary/80 mb-10 max-w-2xl mx-auto font-light tracking-wide"
            >
              Premium grooming experience in the heart of the city
            </motion.p>

            <motion.div
              variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              className="flex flex-wrap justify-center gap-6"
            >
              <Link to="/contact" className="btn-primary px-10">
                Book Appointment
              </Link>
              <Link to="/gallery" className="btn-outline px-10">
                Explore Our Work
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* SECTION 2: ABOUT SNIPPET */}
      <section className="py-32 px-6 bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary uppercase tracking-[0.4em] font-bold text-xs mb-4 block">Legacy</span>
            <h2 className="text-4xl md:text-6xl font-heading font-black mb-8">OUR STORY</h2>
            <div className="w-20 h-1 bg-primary mb-8" />
            <p className="text-text-muted leading-relaxed text-lg mb-12">
              Born from a passion for traditional craftsmanship, Blade & Co. has stood as a bastion of grooming excellence for over a decade. We believe every cut is a signature, and every client is family.
            </p>

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
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2000&auto=format&fit=crop"
              alt="The Shop Atmosphere"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border-[20px] border-background/20 m-6 rounded-2xl" />
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: SERVICES PREVIEW */}
      <section className="py-32 px-6 bg-surface-100 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-heading font-black mb-6">WHAT WE OFFER</h2>
            <p className="text-text-muted uppercase tracking-[0.3em] text-xs">Curated Grooming Excellence</p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          >
            {SERVICES.slice(0, 3).map((svc) => (
              <motion.div
                key={svc.id}
                variants={{ hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                className="glass-card p-10 group hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                  <Scissors size={100} className="rotate-45" />
                </div>
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                  {svc.category === 'Haircuts' ? <Zap size={24} /> : <Shield size={24} />}
                </div>
                <h3 className="text-2xl font-bold mb-4 font-heading">{svc.name}</h3>
                <p className="text-text-muted text-sm leading-relaxed mb-8">
                  {svc.description.slice(0, 80)}...
                </p>
                <div className="flex items-center justify-between border-t border-white/5 pt-6">
                  <span className="text-primary font-bold">Starting {svc.price}</span>
                  <Link to="/services" className="text-xs uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2">
                    Book <ArrowRight size={14} />
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
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
            <div>
              <span className="text-primary uppercase tracking-[0.4em] font-bold text-xs mb-4 block">Lookbook</span>
              <h2 className="text-4xl md:text-6xl font-heading font-black">OUR WORK</h2>
            </div>
            <Link to="/gallery" className="btn-outline">
              Explore Full Gallery <ArrowRight className="ml-2 inline" size={18} />
            </Link>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[250px] md:auto-rows-[350px]"
          >
            {[
              { id: 1, url: 'https://images.unsplash.com/photo-1512690196160-7c96dc68e12d?q=80&w=800&auto=format&fit=crop', span: 'col-span-2 row-span-2' },
              { id: 2, url: 'https://images.unsplash.com/photo-1599351431247-f10bc135f306?q=80&w=800&auto=format&fit=crop', span: '' },
              { id: 3, url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop', span: 'row-span-1' },
              { id: 4, url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800&auto=format&fit=crop', span: '' },
              { id: 5, url: 'https://images.unsplash.com/photo-1503460293676-48cf00ae1f5d?q=80&w=800&auto=format&fit=crop', span: '' },
              { id: 6, url: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=800&auto=format&fit=crop', span: 'col-span-1 md:col-span-2' },
            ].map((img) => (
              <motion.div
                key={img.id}
                variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
                className={cn("group relative overflow-hidden rounded-3xl", img.span)}
              >
                <img
                  src={img.url}
                  alt={`Haircut transformation ${img.id}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <Maximize2 className="text-primary" size={32} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: TEAM PREVIEW */}
      <section className="py-32 px-6 bg-surface-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-heading font-black mb-6 italic text-gradient-gold">MEET THE BARBERS</h2>
            <div className="w-32 h-[1px] bg-white/10 mx-auto" />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-20"
          >
            {BARBERS.map((barber) => (
              <motion.div
                key={barber.id}
                variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                className="group glass-card p-6 border-b-4 border-b-transparent hover:border-b-primary transition-all duration-500"
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-6 shadow-2xl">
                  <img src={barber.image} alt={barber.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <h3 className="text-xl font-bold font-heading mb-1">{barber.name}</h3>
                <span className="text-[10px] uppercase tracking-widest text-primary font-bold bg-primary/5 px-2 py-1 rounded inline-block mb-4">
                  {barber.specialties[0]}
                </span>
                <div className="flex text-primary gap-1 mb-8 opacity-60">
                  <Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Link to="/team" className="text-[10px] uppercase tracking-widest text-text-muted hover:text-white border border-white/10 py-3 text-center rounded transition-colors font-bold">Profile</Link>
                  <Link to={`/barber/${barber.id}`} className="text-[10px] uppercase tracking-widest bg-white/5 hover:bg-primary hover:text-background py-3 text-center rounded transition-all font-bold">Portfolio</Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center">
            <Link to="/team" className="btn-primary">
              Meet Full Team <ArrowRight className="ml-2 inline" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: TESTIMONIALS */}
      <section className="py-32 px-6 bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-[0.02]">
          <Scissors size={400} />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-heading font-black mb-16 italic">WHAT CLIENTS SAY</h2>

          <div className="h-[300px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1, y: -20 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="flex justify-center text-primary gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={20} fill="currentColor" />)}
                </div>
                <blockquote className="text-2xl md:text-3xl font-heading italic text-text-primary leading-relaxed">
                  "{TESTIMONIALS[activeTestimonial].content}"
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-primary text-background rounded-full flex items-center justify-center font-black text-xl">
                    {TESTIMONIALS[activeTestimonial].name.charAt(0)}
                  </div>
                  <cite className="not-italic">
                    <span className="block text-white font-bold">{TESTIMONIALS[activeTestimonial].name}</span>
                    <span className="text-xs uppercase tracking-widest text-text-muted">{TESTIMONIALS[activeTestimonial].date}</span>
                  </cite>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-3 mt-12">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-500",
                  activeTestimonial === i ? "w-8 bg-primary" : "bg-white/20"
                )}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: CONTACT SNIPPET */}
      <section className="py-32 px-6">
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

              <div className="flex gap-6">
                <Link to="/contact" className="btn-primary text-xs flex-grow md:flex-grow-0">
                  Get Full Directions
                </Link>
                <Link to="/contact" className="btn-outline text-xs flex-grow md:flex-grow-0">
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
    </div>
  );
}

export default Home;