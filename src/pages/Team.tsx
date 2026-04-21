import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Star,
  Users,
  Trophy,
  Award,
  ChevronRight,
  TrendingUp,
  Heart,
  Briefcase
} from 'lucide-react';
import { Meta } from '../components/seo/Meta';
import { BARBERS } from '../data';

// --- CountUp Component ---
const CountUpStat = ({ value, suffix = "", label, icon: Icon }: { value: number; suffix?: string; label: string; icon: any }) => {
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
    <div ref={ref} className="flex flex-col items-center text-center p-8 border-x border-white/5 first:border-l-0 last:border-r-0">
      <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-primary mb-6">
        <Icon size={24} />
      </div>
      <h3 className="text-4xl md:text-5xl font-black font-heading mb-2 text-gradient-gold">
        {count}{suffix}
      </h3>
      <p className="text-[10px] uppercase tracking-[0.4em] text-text-muted font-bold">{label}</p>
    </div>
  );
};

export function Team() {
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
        "name": "Team",
        "item": "https://bladeandco.uk/team"
      }
    ]
  };

  return (
    <div className="pt-20">
      <Meta
        title="Our Barbers | Expert Team at Blade & Co."
        description="Meet the master craftsmen behind London's finest grooming experience. Our award-winning team specializes in classic rituals and modern aesthetics."
      />

      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      {/* PAGE HERO */}
      <section className="relative h-[45vh] flex items-center justify-center bg-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-10" />
          <img
            src="https://images.unsplash.com/photo-1599351431247-f10bc135f306?q=80&w=2000&auto=format&fit=crop"
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        <div className="relative z-20 text-center px-6">
          <nav className="flex justify-center items-center gap-2 text-xs uppercase tracking-widest text-text-muted mb-6">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-primary">Team</span>
          </nav>
          <h1 className="text-5xl md:text-7xl font-black font-heading text-white mb-4 italic tracking-tighter uppercase">
            THE ARTISTS BEHIND <br /> <span className="text-gradient-gold">THE CHAIR</span>
          </h1>
          <p className="text-text-muted uppercase tracking-[0.4em] text-xs">Meet our expert barbers</p>
        </div>
      </section>

      {/* TEAM INTRO */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl md:text-2xl text-text-primary/80 font-light leading-relaxed mb-12 italic">
            "We aren't just cutting hair; we're crafting identities. Our team is a collective of master artisans dedicated to the fine ritual of male grooming."
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Passionate', 'Experienced', 'Client-First'].map((val) => (
              <span key={val} className="px-6 py-2 glass rounded-full text-[10px] uppercase tracking-widest font-bold border border-primary/20 text-primary">
                {val}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* BARBERS GRID */}
      <section className="py-24 px-6 bg-surface-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            {BARBERS.map((barber) => (
              <motion.div
                key={barber.id}
                variants={{ hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                className="group glass-card overflow-hidden hover:border-primary/40 transition-all duration-500 shadow-3xl"
              >
                <div className="flex flex-col lg:flex-row h-full">
                  {/* Image Side */}
                  <div className="lg:w-2/5 aspect-[3/4] lg:aspect-auto overflow-hidden relative">
                    <img
                      src={barber.image}
                      alt={barber.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-6 left-6 z-10">
                      <span className="bg-primary text-background text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded shadow-lg">
                        {barber.yearsExp}+ Years Exp
                      </span>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="lg:w-3/5 p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-3xl font-heading font-black italic mb-1 group-hover:text-primary transition-colors leading-none">
                            {barber.name}
                          </h3>
                          <p className="text-text-muted text-xs uppercase tracking-widest font-bold">
                            {barber.role}
                          </p>
                        </div>
                        <div className="flex text-primary gap-0.5">
                          {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="currentColor" />)}
                        </div>
                      </div>

                      <p className="text-text-muted text-sm leading-relaxed mb-8 italic">
                        "{barber.bio}"
                      </p>

                      <div className="space-y-6">
                        <div className="flex flex-wrap gap-2">
                          {barber.specialties.map(spec => (
                            <span key={spec} className="text-[9px] uppercase tracking-wider font-bold bg-white/5 border border-white/5 px-3 py-1.5 rounded-lg group-hover:border-primary/20 transition-colors">
                              {spec}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-6 pt-6 border-t border-white/5">
                          <div className="flex items-center gap-2">
                            <Users size={16} className="text-primary opacity-60" />
                            <span className="text-[10px] uppercase font-bold text-text-muted">
                              {barber.clientsServed}+ Clients
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Award size={16} className="text-primary opacity-60" />
                            <span className="text-[10px] uppercase font-bold text-text-muted">
                              Certified Master
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-12">
                      <Link
                        to={`/barber/${barber.id}`}
                        className="btn-outline py-4 text-[10px]"
                      >
                        View Portfolio
                      </Link>
                      <Link
                        to="/contact"
                        className="btn-primary py-4 text-[10px]"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TEAM STATS BAR */}
      <section className="bg-background border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4">
          <CountUpStat value={40} suffix="+" label="Years Combined" icon={TrendingUp} />
          <CountUpStat value={4} label="Specialists" icon={Trophy} />
          <CountUpStat value={5000} suffix="+" label="Clients Served" icon={Users} />
          <CountUpStat value={20} suffix="+" label="Awards Won" icon={Award} />
        </div>
      </section>

      {/* JOIN US / HIRING SECTION */}
      <section className="py-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto glass rounded-[3rem] p-12 md:p-24 text-center border border-white/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
            <Briefcase size={200} />
          </div>

          <div className="relative z-10">
            <Heart size={48} className="text-primary mx-auto mb-8" />
            <h2 className="text-4xl md:text-6xl font-heading font-black mb-8 italic uppercase tracking-tighter">
              ARE YOU A <span className="text-gradient-gold">BARBER?</span>
            </h2>
            <p className="text-lg text-text-muted mb-12 max-w-2xl mx-auto leading-relaxed">
              We are always looking for passionate master craftsmen to join our elite team. If you live for the ritual of grooming and precision, we want to hear from you.
            </p>
            <Link to="/contact" className="btn-outline px-12 py-5 uppercase font-black tracking-widest text-sm inline-block">
              Apply Now
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default Team;