import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import MagneticButton from '../ui/MagneticButton';
import { useCursorStore, type CursorState } from '@/store/useCursorStore';

const links = [
  { title: "ACASĂ", path: "/" },
  { title: "PORTOFOLIU", path: "/portofoliu" },
  { title: "SERVICII", path: "/servicii" },
  { title: "CONTACT", path: "/contact" }
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const setCursorVariant = useCursorStore((state: CursorState) => state.setCursorVariant);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-[900] px-4 pt-4 md:px-8 md:pt-6">
        <div className="story-frame mx-auto flex max-w-[1440px] items-center justify-between gap-4 rounded-full px-4 py-3 md:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/4 font-mono text-[11px] tracking-[0.2em] text-aerflow-accent">
              AF
            </div>
            <div className="min-w-0">
              <div className="font-mono text-[10px] tracking-[0.24em] text-aerflow-gray uppercase">
                Digital narratives
              </div>
              <div className="text-sm font-bold uppercase tracking-[0.26em] text-aerflow-light md:text-base">
                Aerflow
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <div className="story-chip">Bucharest / Remote</div>
            <div className="font-mono text-[10px] tracking-[0.28em] text-aerflow-gray uppercase">
              {location.pathname === '/' ? 'Chapter One' : location.pathname.replace('/', '').toUpperCase()}
            </div>
          </div>

          <div 
            className="cursor-none"
            onMouseEnter={() => setCursorVariant('menu')}
            onMouseLeave={() => setCursorVariant('default')}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MagneticButton>
              <div className="rounded-full border border-white/10 bg-white/3 px-4 py-2 text-[11px] font-mono font-medium tracking-[0.24em] uppercase transition-colors hover:border-aerflow-accent/50 hover:text-aerflow-accent md:px-5">
                {menuOpen ? 'Close' : 'Menu'}
              </div>
            </MagneticButton>
          </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {menuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[800] bg-[#050505]/98 px-4 pt-28 pb-8 md:px-8 md:pt-32"
          >
            <div className="story-frame story-grid mx-auto flex h-full w-full max-w-[1440px] flex-col justify-between rounded-[2rem] px-6 py-8 md:px-10 md:py-10">
              <div className="grid gap-10 md:grid-cols-[1.4fr_0.8fr]">
                <div className="flex flex-col gap-3">
                  {links.map((link, i) => {
                    const isActive = location.pathname === link.path;

                    return (
                      <motion.div
                        key={link.path}
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: '0%', opacity: 1 }}
                        exit={{ y: '100%', opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.08 * i, ease: [0.76, 0, 0.24, 1] }}
                        className="overflow-hidden"
                      >
                        <Link
                          to={link.path}
                          onClick={() => setMenuOpen(false)}
                          onMouseEnter={() => setCursorVariant('project', 'GO')}
                          onMouseLeave={() => setCursorVariant('default')}
                          className="group flex items-end justify-between gap-4 border-b border-white/8 py-4 md:py-5"
                        >
                          <span className={`text-[clamp(2.8rem,8vw,7rem)] font-bold uppercase leading-none tracking-[-0.05em] transition-colors duration-500 ${isActive ? 'text-aerflow-accent' : 'text-aerflow-light group-hover:text-aerflow-accent'}`}>
                            {link.title}
                          </span>
                          <span className="pb-3 font-serif text-xl italic text-aerflow-gray transition-colors duration-500 group-hover:text-aerflow-light">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col justify-between gap-8"
                >
                  <div className="space-y-4">
                    <div className="story-label">Atmosphere / System</div>
                    <p className="max-w-md text-lg leading-relaxed text-aerflow-light/78">
                      Construim prezențe digitale care se simt orchestrate, nu doar publicate.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="story-chip">Disponibil pentru proiecte noi</div>
                    <div className="grid gap-4 text-sm text-aerflow-light/72 md:grid-cols-2">
                      <div>
                        <div className="mb-2 font-mono text-[10px] tracking-[0.24em] text-aerflow-gray uppercase">Email</div>
                        <a href="mailto:hello@aerflow.ro" className="hover:text-aerflow-accent transition-colors">
                          hello@aerflow.ro
                        </a>
                      </div>
                      <div>
                        <div className="mb-2 font-mono text-[10px] tracking-[0.24em] text-aerflow-gray uppercase">Focus</div>
                        <p>Brand worlds, interaction systems, immersive launches.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="ambient-divider" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
