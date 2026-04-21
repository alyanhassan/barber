import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Share2, Camera, Music2 } from "lucide-react";
import { FOOTER_QUICK_LINKS, FOOTER_SERVICES } from '../../data';

export function Footer() {
  return (
    <footer className="bg-[#111111] border-t border-white/5 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24 mb-24"
        >
          {/* Column 1: Brand & Socials */}
          <div className="space-y-8">
            <div>
              <Link to="/" className="flex flex-col group">
                <span className="font-heading text-3xl font-black tracking-[0.2em] text-primary leading-tight">
                  BLADE <span className="text-white">&</span> CO.
                </span>
                <span className="text-[10px] uppercase tracking-[0.5em] text-text-muted">
                  Est. 2024 London
                </span>
              </Link>
            </div>
            <p className="text-text-muted text-sm leading-relaxed max-w-sm">
              The pinnacle of brotherhood and craft. We redefine the modern grooming experience through precision, atmosphere, and tradition.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Camera, label: "Instagram" },
                { icon: Share2, label: "Facebook" },
                { icon: Music2, label: "TikTok" }
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-12 h-12 glass rounded-full flex items-center justify-center text-white/50 hover:text-primary hover:border-primary transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links & Services */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-8">Navigation</h4>
              <ul className="space-y-4">
                {FOOTER_QUICK_LINKS.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-text-muted hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-8">Services</h4>
              <ul className="space-y-4 text-sm text-text-muted">
                {FOOTER_SERVICES.map((svc) => (
                  <li key={svc}>{svc}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Contact & Info */}
          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-8">Visit The Studio</h4>
            <div className="space-y-6">
              <div className="flex gap-4">
                <span className="w-8 h-[1px] bg-primary mt-3" />
                <div>
                  <p className="text-white font-medium mb-1">Central Studio</p>
                  <p className="text-sm text-text-muted leading-relaxed">
                    123 Precision Way<br />
                    London, UK SE1 7PB
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="w-8 h-[1px] bg-primary mt-3" />
                <div>
                  <p className="text-white font-medium mb-1">Get In Touch</p>
                  <p className="text-sm text-text-muted">
                    +44 (0) 20 7123 4567<br />
                    hello@bladeandco.uk
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p className="text-xs text-text-muted uppercase tracking-[0.2em]">
              © 2024 Blade & Co. Barbershop
            </p>
            <span className="hidden md:block w-1 h-1 rounded-full bg-white/20" />
            <p className="text-[10px] text-primary uppercase tracking-[0.4em] font-bold">
              Crafted with precision
            </p>
          </div>

          <div className="flex gap-6 text-[10px] uppercase tracking-[0.2em] text-text-muted">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
