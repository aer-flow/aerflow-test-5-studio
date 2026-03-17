import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import CustomCursor from './components/core/CustomCursor';
import LenisProvider from './components/core/LenisProvider';
import AmbientBackdrop from './components/ui/AmbientBackdrop';
import NoiseOverlay from './components/ui/NoiseOverlay';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

const Home = lazy(() => import('./pages/Home'));
const Portofoliu = lazy(() => import('./pages/Portofoliu'));
const Despre = lazy(() => import('./pages/Despre'));
const Contact = lazy(() => import('./pages/Contact'));

function RouteFallback() {
  return <div className="min-h-screen w-full bg-aerflow-dark" />;
}

function App() {
  const location = useLocation();

  return (
    <LenisProvider>
      <div className="page-shell min-h-screen bg-aerflow-dark text-aerflow-light">
        <AmbientBackdrop />
        <NoiseOverlay />
        <CustomCursor />
        <Navbar />
        <main className="relative z-10">
          <AnimatePresence mode="wait">
            <Suspense fallback={<RouteFallback />}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/portofoliu" element={<Portofoliu />} />
                <Route path="/despre" element={<Despre />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/servicii" element={<Despre />} />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </LenisProvider>
  );
}

export default App;
