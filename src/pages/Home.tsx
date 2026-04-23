import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
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

} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
import { Meta } from '../components/seo/Meta';
import { FadeUp } from '../components/ui/FadeUp';
import { ReviewCard } from '../components/ui/ReviewCard';
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


  // Auto-advance testimonials


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
          <motion.img
            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2000&auto=format&fit=crop"
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
      <section className="py-32 px-6 bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary uppercase tracking-[0.4em] font-bold text-xs mb-4 block">Legacy</span>

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
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-primary mb-8 group-hover:scale-125 group-hover:rotate-15 transition-all duration-300">
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
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
            <div>
              <span className="text-primary uppercase tracking-[0.4em] font-bold text-xs mb-4 block">Lookbook</span>
              <motion.div className="overflow-hidden pb-2">
                <motion.h2
                  initial={{ clipPath: "inset(0 0 100% 0)", y: 50 }}
                  whileInView={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-4xl md:text-6xl font-heading font-black"
                >
                  OUR WORK
                </motion.h2>
              </motion.div>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="w-20 h-1 bg-primary mt-6 origin-left"
              />
            </div>
            <Link to="/gallery" className="btn-outline">
              Explore Full Gallery <ArrowRight className="ml-2 inline" size={18} />
            </Link>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
            }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[250px] md:auto-rows-[350px]"
          >
            {GALLERY_IMAGES.slice(0, 6).map((img, i) => {
              const spans = [
                'col-span-2 row-span-2',
                '',
                'row-span-1',
                '',
                '',
                'col-span-1 md:col-span-2'
              ];
              return (
                <motion.div
                  key={img.id}
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                  className={cn("group relative overflow-hidden rounded-3xl", spans[i])}
                >
                  <motion.img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center pointer-events-none"
                    initial={{ clipPath: "inset(100% 0 0 0)" }}
                    whileHover={{ clipPath: "inset(0% 0 0 0)" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <motion.div
                      className="text-center translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-100"
                    >
                      <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">{img.category}</span>
                      <span className="text-white font-heading text-xl md:text-2xl">{img.barber}</span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: TEAM PREVIEW */}
      <section className="py-32 px-6 bg-surface-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 flex flex-col items-center">
            <motion.div className="overflow-hidden pb-2">
              <motion.h2
                initial={{ clipPath: "inset(0 0 100% 0)", y: 50 }}
                whileInView={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-heading font-black mb-6 italic text-gradient-gold"
              >
                MEET THE BARBERS
              </motion.h2>
            </motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="w-32 h-[1px] bg-[#C9A84C] mx-auto origin-center"
            />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-20"
          >
            {BARBERS.map((barber) => (
              <motion.div
                key={barber.id}
                variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group glass-card p-6 border-b-4 border-b-transparent hover:border-b-primary transition-colors duration-500 flex flex-col relative overflow-hidden"
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-6 shadow-2xl relative">
                  {/* Front Image */}
                  <img src={barber.image} alt={barber.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700" />
                  {/* Second/Hover Image */}
                  <motion.img
                    src={barber.coverImage}
                    alt={`${barber.name} working`}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ x: "100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>

                <div className="relative overflow-hidden h-8 mb-1">
                  <motion.h3
                    className="text-xl font-bold font-heading absolute bottom-0 left-0"
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    animate={{ y: 0, opacity: 1 }} // It shows by default anyway, but the prompt says "name fades up from bottom on hover". If it fades up on hover, it shouldn't be there normally? Wait, if it fades up on hover, maybe the name is only visible on hover? No, usually it's visible. Let's make it visible by default but re-animate on hover or just keep it visible. Let's add a sub-div for specialties.
                  >
                    {barber.name}
                  </motion.h3>
                </div>

                <div className="overflow-hidden flex flex-wrap gap-2 mb-4 h-6">
                  {barber.specialties.map((spec, i) => (
                    <motion.span
                      key={spec}
                      className="text-[10px] uppercase tracking-widest text-primary font-bold bg-primary/5 px-2 py-1 rounded inline-block origin-left"
                      initial={{ x: -20, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1, duration: 0.3 }}
                    // Make them always visible, but on hover they slide slightly? 
                    // "Specialty tags slide in from left one by one on hover" -> means they are hidden until hover?
                    // I will hide them initially in the group, and show on hover.
                    >
                      {spec}
                    </motion.span>
                  ))}
                  <span className="text-[10px] uppercase tracking-widest text-primary font-bold bg-primary/5 px-2 py-1 rounded inline-block group-hover:hidden transition-all duration-300">
                    {barber.specialties[0]}
                  </span>
                </div>

                <div className="flex text-primary gap-1 mb-8 opacity-60">
                  <Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" />
                </div>

                <div className="mt-auto grid grid-cols-2 gap-4 pt-4 overflow-hidden">
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    className="col-span-1"
                  >
                    <Link to="/team" className="block w-full text-[10px] uppercase tracking-widest text-text-muted hover:text-white border border-white/10 py-3 text-center rounded transition-colors font-bold">Profile</Link>
                  </motion.div>
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.05 }}
                    className="col-span-1"
                  >
                    <Link to={`/barber/${barber.id}`} className="block w-full text-[10px] uppercase tracking-widest bg-white/5 hover:bg-primary hover:text-background py-3 text-center rounded transition-all font-bold">Portfolio</Link>
                  </motion.div>
                </div>

                {/* Default buttons visible when not hovering, we absolutely position them and hide on hover, or we just animate the container. Actually, CSS is easier for this. */}
                <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-4 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                  <div className="text-[10px] uppercase tracking-widest text-text-muted border border-white/10 py-3 text-center rounded font-bold">Profile</div>
                  <div className="text-[10px] uppercase tracking-widest bg-white/5 py-3 text-center rounded font-bold">Portfolio</div>
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

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div className="overflow-hidden pb-2 mb-16">
            <motion.h2
              initial={{ clipPath: "inset(0 0 100% 0)", y: 50 }}
              whileInView={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-heading font-black italic"
            >
              WHAT CLIENTS SAY
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 text-left max-w-5xl mx-auto">
            {TESTIMONIALS.map((testimonial, i) => (
              <ReviewCard
                key={testimonial.id}
                name={testimonial.name}
                review={testimonial.content}
                rating={testimonial.rating}
                date={testimonial.date}
                delay={i * 0.2}
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