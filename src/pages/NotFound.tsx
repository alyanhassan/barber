import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scissors, AlertTriangle, ArrowRight } from 'lucide-react';
import { Meta } from '../components/seo/Meta';

export function NotFound() {
  return (
    <div className="h-screen w-full bg-background flex items-center justify-center relative overflow-hidden">
      <Meta
        title="404 - Page Not Found | Blade & Co."
        description="The page you are looking for does not exist."
      />

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none">
        <Scissors size={800} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center px-6 max-w-2xl mx-auto"
      >
        <div className="w-24 h-24 glass rounded-full flex items-center justify-center text-primary mx-auto mb-8 shadow-2xl border border-primary/20">
          <AlertTriangle size={40} />
        </div>

        <h1 className="text-6xl md:text-8xl font-heading font-black italic tracking-tighter mb-4">
          <span className="text-primary">404</span>
        </h1>

        <h2 className="text-3xl md:text-5xl font-heading font-black mb-6 uppercase tracking-tighter">
          Looks like this cut <br /> <span className="text-gradient-gold">went wrong.</span>
        </h2>

        <p className="text-text-muted text-lg mb-12 max-w-md mx-auto leading-relaxed">
          The page you're looking for has been trimmed off or doesn't exist. Let's get you back to the chair.
        </p>

        <Link to="/" className="btn-primary inline-flex items-center gap-3 px-10 py-5">
          Go Back Home <ArrowRight size={18} />
        </Link>
      </motion.div>
    </div>
  );
}

export default NotFound;