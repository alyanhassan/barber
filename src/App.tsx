import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Loader2 } from 'lucide-react';
import { CustomCursor } from './components/ui/CustomCursor';
import { ProtectedRoute } from './components/admin/ProtectedRoute';

// Lazy Loaded Pages
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Team = lazy(() => import('./pages/Team'));
const BarberDetail = lazy(() => import('./pages/BarberDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Admin Pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

// Loading Component
const PageLoader = () => (
  <div className="h-screen w-full flex flex-col items-center justify-center bg-background gap-4">
    <Loader2 className="animate-spin text-primary" size={48} />
    <span className="text-[10px] uppercase tracking-[0.5em] text-text-muted animate-pulse">Blade & Co.</span>
  </div>
);

// Scroll to Top Helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Scroll Progress Bar
const ScrollBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-primary z-[100] origin-left"
      style={{ scaleX }}
      animate={{
        boxShadow: [
          '0 0 15px rgba(201,168,76,0.5)',
          '0 0 30px rgba(201,168,76,0.9)',
          '0 0 15px rgba(201,168,76,0.5)'
        ]
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
  );
};


function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-background text-text-primary selection:bg-primary selection:text-background">
        <CustomCursor />
        <ScrollBar />
        <ScrollToTop />
        {!isAdmin && <Navbar />}

        <main id="main-content" className="outline-none" tabIndex={-1}>
          <AnimatePresence mode="wait">
            <Suspense fallback={<PageLoader />}>
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {/* Gold horizontal transition sweep */}
                <motion.div 
                  className="fixed inset-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#C9A84C] z-[200] pointer-events-none"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: [0, 1, 0], originX: [0, 0, 1] }}
                  transition={{ duration: 0.5, times: [0, 0.5, 1], ease: "easeInOut" }}
                />
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/barber/:id" element={<BarberDetail />} />
                  <Route path="/contact" element={<Contact />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route 
                    path="/admin/dashboard" 
                    element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    } 
                  />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </motion.div>
            </Suspense>
          </AnimatePresence>
        </main>

        {!isAdmin && <Footer />}
      </div>
    </HelmetProvider>
  );
}

export default App;
