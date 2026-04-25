import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star,
  Users,
  Trophy,
  Award,
  ArrowLeft,
  Scissors,

  Zap,

  Camera,
  Share2
} from 'lucide-react';
import { Meta } from '../components/seo/Meta';
import { BARBERS } from '../data';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ReviewCard } from '../components/ui/ReviewCard';

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
    <div ref={ref} className="flex items-center gap-4">
      <div className="w-10 h-10 glass rounded-full flex items-center justify-center text-primary"><Icon size={18} /></div>
      <div><p className="text-lg font-bold font-heading">{count}{suffix}</p><p className="text-[9px] uppercase tracking-widest text-text-muted">{label}</p></div>
    </div>
  );
};

const SkillBar = ({ name, level }: { name: string; level: number }) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end">
        <span className="text-xs uppercase tracking-widest font-bold text-text-primary">{name}</span>
        <span className="text-xs font-mono text-primary">{level}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="h-full bg-primary"
        />
      </div>
    </div>
  );
};

export function BarberDetail() {
  const { id } = useParams();

  const barber = BARBERS.find(b => b.id === id);
  const otherBarbers = BARBERS.filter(b => b.id !== id).slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!barber) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-background p-6 text-center">
        <h2 className="text-3xl font-heading mb-6">Barber Not Found</h2>
        <Link to="/team" className="btn-primary">Back to Team</Link>
      </div>
    );
  }

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": barber.name,
    "jobTitle": barber.role,
    "worksFor": {
      "@type": "BarberShop",
      "name": "Blade & Co."
    },
    "description": barber.bio,
    "image": barber.image
  };

  return (
    <div className="bg-background">
      <Meta
        title={`${barber.name} | Expert Barber at Blade & Co.`}
        description={`Meet ${barber.name}, ${barber.role} specializing in ${barber.specialties.join(', ')}. Book your professional grooming session today.`}
        image={barber.image}
      />

      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>

      {/* SECTION 1: HERO */}
      <section className="relative h-[80vh] w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={barber.coverImage} className="w-full h-full object-cover" alt="Portfolio Cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-32 md:pt-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/team" className="flex items-center gap-2 text-primary text-xs uppercase tracking-widest font-bold mb-12 hover:gap-4 transition-all">
              <ArrowLeft size={16} /> Back to Team
            </Link>

            <div className="flex flex-col md:flex-row items-center md:items-end gap-10 mb-12">
              <div className="relative w-40 h-40 md:w-56 md:h-56 flex-shrink-0 group">
                <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none z-10" viewBox="0 0 100 100">
                  <motion.circle
                    cx="50" cy="50" r="48"
                    fill="none" stroke="#C9A84C" strokeWidth="2"
                    strokeDasharray="301"
                    initial={{ strokeDashoffset: 301 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                </svg>
                <div className="w-full h-full rounded-full overflow-hidden shadow-3xl p-1.5 bg-background">
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    <img src={barber.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={barber.name} />
                  </div>
                </div>
              </div>
              <div className="text-center md:text-left">
                <span className="bg-primary text-background text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-4 inline-block shadow-xl">
                  {barber.role}
                </span>
                <h1 className="text-4xl md:text-8xl font-black font-heading mb-6 italic tracking-tighter leading-tight md:leading-none flex flex-wrap justify-center md:justify-start">
                  {barber.name.split('').map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-8">
                  {barber.specialties.map((spec, index) => (
                    <motion.span
                      key={spec}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      className="glass px-4 py-1.5 rounded-lg text-[10px] uppercase font-bold text-text-muted border border-white/5"
                    >
                      {spec}
                    </motion.span>
                  ))}
                </div>
                <div className="flex justify-center md:justify-start">
                  <Link to="/contact" className="btn-primary px-8 py-3 text-xs w-full md:w-auto text-center">
                    Book {barber.name.split(' ')[0]} Now
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl border-t border-white/10 pt-10">
              <CountUpStat value={barber.clientsServed} suffix="+" label="Clients" icon={Users} />
              <CountUpStat value={barber.yearsExp} label="Years Exp" icon={Award} />
              <CountUpStat value={barber.rating} label="Rating" icon={Star} />
              <CountUpStat value={barber.awards} label="Awards" icon={Trophy} />
            </div>

            <div className="mt-12 flex justify-center md:justify-start">
              <Link to="/contact" className="btn-primary px-12 py-5 text-sm">Book Appointment with {barber.name.split(' ')[0]}</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: ABOUT & STORY */}
      <section className="py-10 md:py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[3rem] overflow-hidden shadow-2xl glass aspect-[3/4]"
          >
            <img src={barber.image} className="w-full h-full object-cover" alt="Story Visual" />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div>
              <span className="text-primary text-[10px] uppercase font-bold tracking-[0.4em] mb-4 block">Identity</span>
              <motion.div className="overflow-hidden pb-2">
                <motion.h2
                  initial={{ clipPath: "inset(0 0 100% 0)", y: 50 }}
                  whileInView={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-4xl md:text-6xl font-heading font-black italic uppercase tracking-tighter"
                >
                  MY STORY
                </motion.h2>
              </motion.div>
            </div>
            <p className="text-lg text-text-muted leading-relaxed font-light italic">
              {barber.story}
            </p>
            <div className="border-l-4 border-primary pl-8 py-2 bg-gradient-to-r from-primary/5 to-transparent">
              <p className="text-xl md:text-2xl font-heading italic text-white leading-relaxed">
                "I view every client through a lens of geometry and balance. A haircut isn’t just a look—it’s an extension of who you are."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: SPECIALTIES & SKILLS */}
      <section className="py-10 md:py-20 px-6 bg-surface-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <h3 className="text-xl font-heading font-black italic mb-10 uppercase tracking-widest text-primary">SPECIALTIES</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {barber.specialties.map((s, i) => (
                <div key={s} className="glass-card p-8 group flex items-center gap-6 hover:bg-primary transition-all duration-500">
                  <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-primary group-hover:text-background transition-colors">
                    {i % 2 === 0 ? <Scissors size={24} /> : <Zap size={24} />}
                  </div>
                  <span className="text-sm font-bold uppercase tracking-widest group-hover:text-background transition-colors">{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-heading font-black italic mb-10 uppercase tracking-widest text-primary text-right">TECHNICAL RATIO</h3>
            <div className="space-y-8">
              {barber.skills.map(skill => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CAREER TIMELINE */}
      <section className="py-10 md:py-20 px-6">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-heading font-black italic mb-6 tracking-tighter uppercase">CAREER JOURNEY</h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2" />

          <div className="space-y-20">
            {barber.timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row items-center gap-10 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full shadow-[0_0_20px_rgba(201,168,76,0.6)] z-10 -translate-x-1/2 border-4 border-background" />

                <div className="w-full md:w-1/2 text-left pl-12 md:px-12">
                  <div className={i % 2 === 0 ? 'md:text-left' : 'md:text-right'}>
                    <p className="text-primary font-black text-3xl font-heading mb-2">{item.year}</p>
                    <h4 className="text-xl font-bold uppercase tracking-widest mb-1">{item.role}</h4>
                    <p className="text-text-muted text-xs font-bold mb-4">{item.place}</p>
                    <p className="text-sm text-text-muted leading-relaxed max-w-md mx-auto md:mx-0">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: PERSONAL GALLERY */}
      <section className="py-10 md:py-20 px-6 bg-surface-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-heading font-black italic mb-6 tracking-tighter uppercase">{barber.name.split(' ')[0]}'S WORK</h2>
            <p className="text-text-muted uppercase tracking-[0.4em] text-xs">A selection of recent master-crafted looks</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {barber.gallery.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-[3/4] rounded-3xl overflow-hidden glass shadow-xl"
              >
                <img src={img.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={img.description} />
                <div className="absolute inset-0 bg-[#0A0A0A]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-8 text-center">
                  <span className="bg-primary text-background text-[8px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded mb-4">{img.category}</span>
                  <p className="text-sm text-text-primary italic leading-relaxed">{img.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: CLIENT REVIEWS */}
      <section className="py-10 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 flex flex-col items-center">
            <motion.div className="overflow-hidden pb-2 mb-6">
              <motion.h2
                initial={{ clipPath: "inset(0 0 100% 0)", y: 50 }}
                whileInView={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-heading font-black italic tracking-tighter uppercase text-gradient-gold"
              >
                CLIENT ECHOES
              </motion.h2>
            </motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="w-20 h-[1px] bg-white/10 mx-auto origin-center"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {barber.testimonials.map((t, i) => (
              <ReviewCard
                key={i}
                name={t.name}
                review={t.review}
                rating={t.rating}
                date={t.date}
                delay={i * 0.2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: BOOKING CTA */}
      <section className="px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto relative overflow-hidden rounded-3xl md:rounded-[4rem] bg-gradient-to-br from-primary via-primary/80 to-primary p-8 md:p-32 text-center shadow-3xl text-background group"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-white/5 animate-pulse" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-8xl font-heading font-black mb-6 md:mb-10 italic uppercase tracking-tighter leading-tight md:leading-none">
              READY TO SIT IN <br /> {barber.name.split(' ')[0]}'S CHAIR?
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <Link to="/contact" className="bg-background text-primary px-16 py-6 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-background transition-all shadow-2xl">
                Book Appointment
              </Link>
              <div className="flex gap-6">
                <a href={`https://instagram.com/${barber.socials.instagram?.replace('@', '')}`} target="_blank" className="w-16 h-16 bg-background/10 hover:bg-background/20 rounded-full flex items-center justify-center transition-colors">
                  <Camera size={24} />
                </a>
                <div className="w-16 h-16 bg-background/10 hover:bg-background/20 rounded-full flex items-center justify-center transition-colors">
                  <Share2 size={24} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 8: OTHER BARBERS */}
      <section className="py-10 md:py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-20">
            <h2 className="text-3xl font-heading font-black italic uppercase italic tracking-tighter">MEET THE REST OF THE TEAM</h2>
            <Link to="/team" className="text-xs uppercase tracking-widest text-primary font-bold transition-all border-b border-primary hover:pb-2">View All Barbers</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {otherBarbers.map((b) => (
              <Link key={b.id} to={`/barber/${b.id}`} className="group glass-card p-6 block hover:border-primary/40 transition-all duration-500">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-6 relative">
                  <img src={b.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700" alt={b.name} />
                  <motion.img
                    src={b.coverImage}
                    alt={`${b.name} working`}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ x: "100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <h4 className="text-xl font-heading font-black italic mb-1 group-hover:text-primary transition-colors uppercase">{b.name}</h4>
                <p className="text-[10px] uppercase font-bold text-text-muted tracking-widest">{b.role}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default BarberDetail;