import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  CheckCircle2,
  Loader2,
  Plus,
  Minus,
  Camera,
  Share2,
  X
} from 'lucide-react';
import { Meta } from '../components/seo/Meta';
import { SALON_INFO, FAQS, SERVICES } from '../data';

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export function Contact() {
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone) newErrors.phone = 'Phone Number is required';
    if (!formData.service) newErrors.service = 'Please select a service';
    if (!formData.date) newErrors.date = 'Preferred date is required';
    if (!formData.message) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  const seoSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Blade & Co.",
      "description": "Get in touch with Blade & Co. Barbershop for bookings and inquiries."
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Blade & Co. Barbershop",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Precision Way",
        "addressLocality": "London",
        "postalCode": "SE1 7PB",
        "addressCountry": "UK"
      },
      "telephone": "+44 20 7123 4567",
      "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": "Monday-Friday", "opens": "09:00", "closes": "20:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "08:00", "closes": "21:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": "Sunday", "opens": "10:00", "closes": "18:00" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bladeandco.uk/" },
        { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://bladeandco.uk/contact" }
      ]
    }
  ];

  return (
    <div className="pt-20">
      <Meta
        title="Contact Us | Blade & Co. Barbershop"
        description="Book your chair or reach out for inquiries. Contact London's premier barbershop today for the ultimate grooming experience."
      />

      <script type="application/ld+json">
        {JSON.stringify(seoSchemas)}
      </script>

      {/* PAGE HERO */}
      <section className="relative h-[40vh] flex items-center justify-center bg-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1517865330663-875f68bba636?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 text-center px-6">
          <nav className="flex justify-center items-center gap-2 text-xs uppercase tracking-widest text-text-muted mb-6">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-primary">Contact</span>
          </nav>
          <motion.h1 
            initial={{ clipPath: "inset(0 0 100% 0)", y: 50 }}
            animate={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-black font-heading mb-4 italic uppercase tracking-tighter"
          >
            GET IN <span className="text-primary">TOUCH</span>
          </motion.h1>
          <p className="text-text-muted uppercase tracking-[0.4em] text-xs">We'd love to hear from you</p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">

          {/* LEFT: FORM */}
          <div>
            <motion.div className="overflow-hidden pb-2 mb-12">
              <motion.h2 
                initial={{ clipPath: "inset(0 0 100% 0)", y: 50 }}
                whileInView={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-3xl font-heading font-black italic uppercase tracking-tighter"
              >
                SEND US A MESSAGE
              </motion.h2>
            </motion.div>

            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card p-20 text-center flex flex-col items-center justify-center h-full"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                    className="w-24 h-24 bg-primary text-background rounded-full flex items-center justify-center mb-8"
                  >
                    <CheckCircle2 size={48} />
                  </motion.div>
                  <h3 className="text-3xl font-heading font-black italic mb-4">MESSAGE RECEIVED!</h3>
                  <p className="text-text-muted">One of our master barbers will reach out to you shortly.</p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-12 text-xs uppercase tracking-widest text-primary border-b border-primary pb-1"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } },
                    hidden: {}
                  }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-text-muted ml-1">Full Name</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                        className={`w-full bg-[#111] border ${errors.fullName ? 'border-red-500' : 'border-white/10'} focus:border-primary px-6 py-4 rounded-xl transition-all outline-none text-sm`}
                        placeholder="John Doe"
                      />
                      {errors.fullName && <p className="text-red-500 text-[10px] uppercase ml-1">{errors.fullName}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-text-muted ml-1">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full bg-[#111] border ${errors.email ? 'border-red-500' : 'border-white/10'} focus:border-primary px-6 py-4 rounded-xl transition-all outline-none text-sm`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-[10px] uppercase ml-1">{errors.email}</p>}
                    </div>
                  </motion.div>

                  <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-text-muted ml-1">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full bg-[#111] border ${errors.phone ? 'border-red-500' : 'border-white/10'} focus:border-primary px-6 py-4 rounded-xl transition-all outline-none text-sm`}
                        placeholder="+44 7123 456789"
                      />
                      {errors.phone && <p className="text-red-500 text-[10px] uppercase ml-1">{errors.phone}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-text-muted ml-1">Service Interest</label>
                      <select
                        value={formData.service}
                        onChange={e => setFormData({ ...formData, service: e.target.value })}
                        className={`w-full bg-[#111] border ${errors.service ? 'border-red-500' : 'border-white/10'} focus:border-primary px-6 py-4 rounded-xl transition-all outline-none text-sm appearance-none cursor-pointer`}
                      >
                        <option value="">Select Service</option>
                        {SERVICES.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                      </select>
                      {errors.service && <p className="text-red-500 text-[10px] uppercase ml-1">{errors.service}</p>}
                    </div>
                  </motion.div>

                  <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-text-muted ml-1">Preferred Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={e => setFormData({ ...formData, date: e.target.value })}
                      className={`w-full bg-[#111] border ${errors.date ? 'border-red-500' : 'border-white/10'} focus:border-primary px-6 py-4 rounded-xl transition-all outline-none text-sm inverted-calendar`}
                    />
                    {errors.date && <p className="text-red-500 text-[10px] uppercase ml-1">{errors.date}</p>}
                  </motion.div>

                  <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-text-muted ml-1">Your Message</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full bg-[#111] border ${errors.message ? 'border-red-500' : 'border-white/10'} focus:border-primary px-6 py-4 rounded-xl transition-all outline-none text-sm resize-none`}
                      placeholder="How can we help you?"
                    />
                    {errors.message && <p className="text-red-500 text-[10px] uppercase ml-1">{errors.message}</p>}
                  </motion.div>

                  <motion.button
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary py-5 rounded-2xl flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isSubmitting ? <><Loader2 className="animate-spin" size={20} /> Processing...</> : 'Send Message'}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: INFO */}
          <div className="space-y-16">
            <div className="space-y-10">
              <motion.div className="overflow-hidden pb-2">
                <motion.h2 
                  initial={{ clipPath: "inset(0 0 100% 0)", y: 50 }}
                  whileInView={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-3xl font-heading font-black italic uppercase tracking-tighter"
                >
                  VISIT US
                </motion.h2>
              </motion.div>
              <div className="space-y-8">
                <a href="#map" className="flex items-start gap-6 group">
                  <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-text-muted mb-1 tracking-widest">Our Studio</p>
                    <p className="text-white group-hover:text-primary transition-colors">123 Precision Way, London, UK SE1 7PB</p>
                  </div>
                </a>
                <a href="tel:+442071234567" className="flex items-start gap-6 group">
                  <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-text-muted mb-1 tracking-widest">Communication</p>
                    <p className="text-white group-hover:text-primary transition-colors">+44 (0) 20 7123 4567</p>
                  </div>
                </a>
                <a href="mailto:hello@bladeandco.uk" className="flex items-start gap-6 group">
                  <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-text-muted mb-1 tracking-widest">General Inquiries</p>
                    <p className="text-white group-hover:text-primary transition-colors">hello@bladeandco.uk</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="space-y-10">
              <motion.div className="overflow-hidden pb-2">
                <motion.h2 
                  initial={{ clipPath: "inset(0 0 100% 0)", y: 50 }}
                  whileInView={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-3xl font-heading font-black italic uppercase tracking-tighter"
                >
                  OPENING HOURS
                </motion.h2>
              </motion.div>
              <div className="glass-card overflow-hidden">
                <table className="w-full text-left">
                  <tbody>
                    {SALON_INFO.hours.map(row => (
                      <tr key={row.day} className={`border-b border-white/5 last:border-0 ${row.day === currentDay ? 'bg-primary/5 text-primary' : ''}`}>
                        <td className="py-5 px-8 font-bold text-sm italic">{row.day}</td>
                        <td className="py-5 px-8 text-right text-sm">
                          {row.open}{row.close ? ` — ${row.close}` : ''}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex gap-4">
              {[Camera, Share2, X].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 glass rounded-full flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/40 transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section id="map" className="px-6 py-20 bg-surface-100">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto rounded-[3rem] overflow-hidden glass h-[500px] relative"
        >
          <div className="absolute inset-0 z-0">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1343%2C51.4981%2C-0.1043%2C51.5181&layer=mapnik&marker=51.5081%2C-0.1193"
              style={{ filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }}
            />
          </div>
          <div className="absolute bottom-10 left-10 z-10 glass p-8 rounded-3xl max-w-xs shadow-3xl border border-primary/20">
            <h4 className="flex items-center gap-2 text-primary text-xs uppercase tracking-[0.4em] font-bold mb-4">
              <MapPin size={16} /> BLADE & CO HQ
            </h4>
            <p className="text-sm text-text-primary/80 leading-relaxed font-light">
              123 Precision Way, South Bank, London SE1 7PB
            </p>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24 flex flex-col items-center">
            <motion.div className="overflow-hidden pb-2 mb-6">
              <motion.h2 
                initial={{ clipPath: "inset(0 0 100% 0)", y: 50 }}
                whileInView={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-heading font-black italic tracking-tighter uppercase leading-none"
              >
                FREQUENTLY ASKED <span className="text-gradient-gold text-white">QUESTIONS</span>
              </motion.h2>
            </motion.div>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="w-24 h-1 bg-primary mx-auto origin-center" 
            />
          </div>

          <div className="space-y-6">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className={`glass-card overflow-hidden transition-all duration-300 ${openFaq === i ? 'border-primary/40 shadow-[0_0_40px_rgba(201,168,76,0.1)]' : 'border-white/5'}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-8 flex items-center justify-between text-left group"
                >
                  <span className={`text-lg font-bold font-heading italic transition-colors ${openFaq === i ? 'text-primary' : 'text-white group-hover:text-primary'}`}>
                    {faq.question}
                  </span>
                  <div className={`transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-primary' : 'text-text-muted group-hover:text-white'}`}>
                    {openFaq === i ? <Minus size={24} /> : <Plus size={24} />}
                  </div>
                </button>

                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-8 pb-8 text-text-muted leading-relaxed text-sm max-w-2xl">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .inverted-calendar::-webkit-calendar-picker-indicator {
          filter: invert(1);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export default Contact;