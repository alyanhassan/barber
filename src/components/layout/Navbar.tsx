import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { NAV_LINKS } from '../../data';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    // Only update body overflow
    document.body.style.overflow = 'unset';
  }, [location]);

  // Keep state sync separate from effect to avoid cascade render
  if (isMobileMenuOpen && document.body.style.overflow === 'unset') {
    setIsMobileMenuOpen(false);
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'unset';
  };

  return (
    <>
      {/* Skip to Content */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-background focus:px-4 focus:py-2 focus:rounded-md transition-all"
      >
        Skip to main content
      </a>

      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        aria-label="Main Navigation"
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-8"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="group flex flex-col"
            aria-label="Blade & Co. Home"
          >
            <span className="font-heading text-2xl md:text-3xl font-black tracking-[0.2em] text-primary leading-tight">
              BLADE <span className="text-white">&</span> CO.
            </span>
            <span className="text-[8px] uppercase tracking-[0.5em] text-text-muted group-hover:text-primary transition-colors">
              Premium Grooming Parlor
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            <div className="flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link 
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "text-xs font-semibold uppercase tracking-[0.2em] transition-all relative py-2 group overflow-hidden",
                      isActive ? "text-primary" : "text-white/70 hover:text-white"
                    )}
                  >
                    {link.name}
                    {/* Active Underline Indicator */}
                    <span className={cn(
                      "absolute bottom-0 left-0 h-[1.5px] bg-primary transition-all duration-500",
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    )} />
                  </Link>
                );
              })}
            </div>

            {/* CTA Button */}
            <Link 
              to="/contact" 
              className="px-8 py-3 bg-transparent border border-primary text-primary text-[10px] font-bold uppercase tracking-[0.3em] overflow-hidden relative group transition-all duration-500"
            >
              <span className="relative z-10 group-hover:text-background transition-colors duration-500">Book Now</span>
              <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            type="button"
            className="lg:hidden relative z-50 p-2 text-white hover:text-primary transition-colors"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "100vh" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[40] bg-[#0A0A0A] flex flex-col pt-32 px-10 lg:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (i * 0.1) }}
                >
                  <Link 
                    to={link.path}
                    className={cn(
                      "text-4xl md:text-6xl font-heading font-black italic uppercase tracking-wider transition-colors",
                      location.pathname === link.path ? "text-primary" : "text-white/30 hover:text-primary"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-auto mb-20 space-y-6"
            >
              <Link to="/contact" className="btn-primary w-full py-6 text-xl">
                Book Appointment
              </Link>
              <div className="flex flex-col gap-2">
                <p className="text-[10px] uppercase tracking-[0.5em] text-text-muted">Studio Hours</p>
                <p className="text-sm font-medium">Mon - Sat: 9:00 AM — 8:00 PM</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
