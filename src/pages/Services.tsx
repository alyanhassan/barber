import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Scissors,
  Clock,
  Calendar,
  Shield,
  Coffee,
  CheckCircle2,
  
  ChevronRight,
  Zap
} from 'lucide-react';
import { Meta } from '../components/seo/Meta';
import { SERVICES } from '../data';

const CATEGORIES = ['All', 'Haircuts', 'Beard', 'Color', 'Treatments'];

const PROCESS_STEPS = [
  {
    id: 1,
    title: 'Book Online',
    icon: <Calendar size={24} />,
    desc: 'Select your preferred barber and time slot via our seamless booking system.'
  },
  {
    id: 2,
    title: 'Arrive & Relax',
    icon: <Coffee size={24} />,
    desc: 'Join us for a complimentary drink and soak in the premium atmosphere.'
  },
  {
    id: 3,
    title: 'Get Styled',
    icon: <Scissors size={24} />,
    desc: 'Consult with our master craftsmen and experience precision grooming.'
  },
  {
    id: 4,
    title: 'Leave Fresh',
    icon: <CheckCircle2 size={24} />,
    desc: 'Walk out with confidence and the sharpest look in the city.'
  }
];

export function Services() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredServices = activeCategory === 'All'
    ? SERVICES
    : SERVICES.filter(s => s.category === activeCategory);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://bladeandco.uk/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://bladeandco.uk/services"
      }
    ]
  };

  return (
    <div className="pt-20">
      <Meta
        title="Services & Pricing | Blade & Co. Barbershop"
        description="Explore our full menu of precision haircuts, beard sculpting, and premium grooming treatments. London's best barbershop pricing and rituals."
      />

      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      {/* PAGE HERO */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#0A0A0A] to-transparent z-10" />
          <img
            src="/images/cover.png"
            alt="Services Backdrop"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 text-center px-6">
          <nav className="flex justify-center items-center gap-2 text-xs uppercase tracking-widest text-text-muted mb-6">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-primary">Services</span>
          </nav>
          <motion.h1 
            initial={{ clipPath: "inset(0 0 100% 0)", y: 50 }}
            animate={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-black font-heading text-gradient-gold mb-6 uppercase tracking-tighter"
          >
            OUR SERVICES
          </motion.h1>
          <p className="text-lg text-text-primary/70 font-light tracking-wide max-w-xl mx-auto">
            Crafted with precision, tailored for you. Explore our full menu of grooming rituals.
          </p>
        </div>
      </section>

      {/* SERVICES GRID & FILTER */}
      <section className="py-10 md:py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-20">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all relative overflow-hidden ${activeCategory === cat ? 'text-background' : 'text-text-muted hover:text-white border border-white/10'
                  }`}
              >
                <span className="relative z-10">{cat}</span>
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((svc, i) => (
                <motion.div
                  key={svc.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="glass-card hover:glass-hover p-8 group flex flex-col h-full"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      {svc.category === 'Haircuts' ? <Scissors size={24} /> : svc.category === 'Beard' ? <Shield size={24} /> : <Zap size={24} />}
                    </div>
                    <span className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-text-muted bg-white/5 px-3 py-1.5 rounded-full">
                      <Clock size={12} className="text-primary" /> {svc.duration}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-4 font-heading group-hover:text-primary transition-colors">{svc.name}</h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-8 flex-grow">
                    {svc.description}
                  </p>

                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                    <span className="text-2xl font-bold text-primary font-heading">{svc.price}</span>
                    <Link to="/contact" className="px-6 py-2 bg-transparent border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-primary hover:text-background hover:border-primary transition-all duration-300 relative overflow-hidden group/btn">
                      Book Now
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* PRICING TABLE SECTION */}
          <div className="mt-32">
            <div className="mb-12">
              <motion.div className="overflow-hidden pb-2 mb-4">
                <motion.h2 
                  initial={{ clipPath: "inset(0 0 100% 0)", y: 50 }}
                  whileInView={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-3xl font-heading font-black italic uppercase"
                >
                  PRICING OVERVIEW
                </motion.h2>
              </motion.div>
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="w-20 h-1 bg-primary origin-left" 
              />
            </div>

            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                  <thead>
                    <tr className="bg-primary/10 border-b border-primary/20">
                      <th className="py-6 px-8 text-xs uppercase tracking-[0.3em] font-bold text-primary">Service</th>
                      <th className="py-6 px-8 text-xs uppercase tracking-[0.3em] font-bold text-primary">Duration</th>
                      <th className="py-6 px-8 text-xs uppercase tracking-[0.3em] font-bold text-primary">Investment</th>
                      <th className="py-6 px-8 text-xs uppercase tracking-[0.3em] font-bold text-primary text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SERVICES.map((svc, i) => (
                      <tr
                        key={svc.id}
                        className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-[#111111]' : 'bg-[#1A1A1A]'} hover:bg-white/[0.03] transition-colors`}
                      >
                        <td className="py-6 px-8 font-medium">{svc.name}</td>
                        <td className="py-6 px-8 text-text-muted text-sm">{svc.duration}</td>
                        <td className="py-6 px-8 text-primary font-bold">{svc.price}</td>
                        <td className="py-6 px-8 text-right">
                          <Link to="/contact" className="text-[10px] uppercase font-bold tracking-widest hover:text-primary transition-colors underline underline-offset-8">
                            Reserve Seat
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION: HOW IT WORKS */}
      <section className="py-10 md:py-20 px-6 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 flex flex-col items-center">
            <motion.div className="overflow-hidden pb-2 mb-6">
              <motion.h2 
                initial={{ clipPath: "inset(0 0 100% 0)", y: 50 }}
                whileInView={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-heading font-black italic tracking-tighter"
              >
                THE EXPERIENCE
              </motion.h2>
            </motion.div>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="w-32 h-[1px] bg-[#C9A84C] mx-auto origin-center mb-6" 
            />
            <p className="text-text-muted uppercase tracking-[0.4em] text-xs">Four Steps to Perfection</p>
          </div>

          <div className="relative">
            {/* Timeline Line (Desktop) */}
            <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="flex flex-col items-center text-center relative z-10 group"
                >
                  <div className="w-20 h-20 glass rounded-[2rem] flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform duration-500 shadow-xl border border-white/10 group-hover:border-primary/40 relative">
                    {step.icon}
                    <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-background text-xs font-black flex items-center justify-center shadow-lg">
                      {step.id}
                    </span>
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-4 italic">{step.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed max-w-[250px]">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING CTA BANNER */}
      <section className="px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#1A1A1A] to-[#111111] p-12 md:p-24 text-center border border-primary/20 shadow-3xl"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-primary/5 opacity-20 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-heading font-black mb-8 italic tracking-tighter uppercase leading-none">
              READY FOR A <span className="text-gradient-gold">FRESH LOOK?</span>
            </h2>
            <p className="text-lg text-text-muted mb-12 max-w-xl mx-auto leading-relaxed">
              Don't leave your grooming to chance. Join the waitlist or secure your preferred craftsman today.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/contact" className="btn-primary px-12 py-5 text-sm">
                Book Your Appointment
              </Link>
              <Link to="/team" className="btn-outline px-12 py-5 text-sm">
                Meet The Craftsmen
              </Link>
            </div>
          </div>

          {/* Decoration */}
          <Scissors className="absolute -bottom-20 -left-20 text-white/[0.02] rotate-12" size={400} />
          <Zap className="absolute -top-10 -right-10 text-primary/[0.03]" size={300} />
        </motion.div>
      </section>
    </div>
  );
}

export default Services;