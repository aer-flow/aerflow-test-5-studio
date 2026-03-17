import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import MagneticButton from '../ui/MagneticButton';
import { useCursorStore } from '@/store/useCursorStore';
import { isMobileViewport, shouldReduceMotion, shouldUseLiteEffects } from '@/utils/device';

gsap.registerPlugin(ScrollTrigger);

type WindowWithLenis = Window & {
  lenis?: {
    scrollTo: (target: number, options?: { duration?: number; easing?: (t: number) => number }) => void;
  } | null;
};

const closingTags = ['Atmosphere', 'Clarity', 'Performance'];

export default function FinalMonolith() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const setCursorVariant = useCursorStore((state) => state.setCursorVariant);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const boundsRef = useRef<DOMRect | null>(null);

  const updateBounds = () => {
    boundsRef.current = containerRef.current?.getBoundingClientRect() ?? null;
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!boundsRef.current || shouldUseLiteEffects()) return;
    mouseX.set(event.clientX - boundsRef.current.left);
    mouseY.set(event.clientY - boundsRef.current.top);
  };

  useEffect(() => {
    if (!containerRef.current || !textRef.current || !manifestoRef.current || !actionsRef.current) return;

    const ctx = gsap.context(() => {
      const isMobile = isMobileViewport();
      const reduceMotion = shouldReduceMotion();
      const scrubAmount = reduceMotion ? false : isMobile ? 1 : 0.7;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: isMobile ? 'bottom bottom' : '+=200%',
          pin: isMobile ? false : true,
          pinType: 'fixed',
          scrub: scrubAmount,
          invalidateOnRefresh: true,
        }
      });

      const textNode = textRef.current;
      if (!textNode) return;

      tl.fromTo(textNode.children,
        {
          opacity: 0,
          scale: 0.92,
          y: 34
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: reduceMotion ? 0.03 : 0.06,
          duration: reduceMotion ? 0.8 : 1.1,
          ease: 'power3.out',
        }
      )
      .fromTo(manifestoRef.current,
        { opacity: 0, y: 34 },
        { opacity: 1, y: 0, duration: reduceMotion ? 0.7 : 0.9, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(actionsRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: reduceMotion ? 0.7 : 0.9, ease: 'power3.out' },
        '-=0.45'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!containerRef.current || shouldUseLiteEffects()) return;

    updateBounds();
    window.addEventListener('resize', updateBounds, { passive: true });

    return () => {
      window.removeEventListener('resize', updateBounds);
    };
  }, []);

  const handleBackToTop = () => {
    if ((window as WindowWithLenis).lenis) {
      (window as WindowWithLenis).lenis?.scrollTo(0, {
        duration: 2,
        easing: (value: number) => Math.min(1, 1.001 - Math.pow(2, -10 * value)),
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const aerflowText = 'AERFLOW'.split('');

  return (
    <section
      ref={containerRef}
      onMouseEnter={updateBounds}
      onMouseMove={handleMouseMove}
      className="relative z-30 h-[220svh] w-full transition-colors duration-1000"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden px-4 py-4 md:px-8 md:py-8">
        {!shouldUseLiteEffects() && (
          <motion.div
            className="absolute top-0 left-0 rounded-full pointer-events-none"
            style={{
              width: '56vw',
              height: '56vw',
              background: 'radial-gradient(circle, rgba(215,255,107,0.11) 0%, rgba(0,0,0,0) 72%)',
              x: smoothX,
              y: smoothY,
              translateX: '-50%',
              translateY: '-50%',
              zIndex: 0
            }}
          />
        )}

        {!shouldUseLiteEffects() && (
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-[0.05]">
            <motion.div
              animate={{ x: [0, -1800] }}
              transition={{ repeat: Infinity, duration: 45, ease: 'linear' }}
              className="whitespace-nowrap text-[13vw] font-bold uppercase tracking-[-0.08em] text-white"
            >
              STORY • SIGNAL • SYSTEM • STORY • SIGNAL • SYSTEM •
            </motion.div>
          </div>
        )}

        <div className="story-frame story-grid relative z-10 flex h-full w-full flex-col overflow-hidden rounded-[2rem] px-6 py-6 md:rounded-[2.6rem] md:px-10 md:py-8">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="story-label">Final chapter / conversion moment</div>
            <div className="flex flex-wrap gap-3">
              {closingTags.map((tag) => (
                <div key={tag} className="rounded-full border border-white/10 bg-white/4 px-4 py-2 font-mono text-[10px] tracking-[0.22em] text-aerflow-light/70 uppercase">
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex flex-1 flex-col justify-between">
            <div className="grid gap-10 md:grid-cols-[0.52fr_0.48fr] md:items-start">
              <div className="space-y-6">
                <p className="max-w-md text-base leading-relaxed text-aerflow-light/70 md:text-lg">
                  Când povestea este bine construită, ultimul ecran nu mai cere atenție. O primește.
                </p>
                <div className="rounded-[1.4rem] border border-white/8 bg-white/3 px-5 py-5">
                  <div className="mb-2 font-mono text-[10px] tracking-[0.24em] text-aerflow-gray uppercase">
                    What remains
                  </div>
                  <p className="text-sm leading-relaxed text-aerflow-light/68">
                    O identitate digitală care se simte confidentă, fluidă și imposibil de confundat cu un template.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end">
                <h2
                  ref={textRef}
                  className="flex flex-wrap text-[clamp(3.1rem,14vw,14rem)] font-bold uppercase leading-[0.88] tracking-[-0.07em] text-aerflow-light md:justify-end"
                >
                  {aerflowText.map((letter, index) => (
                    <span key={`${letter}-${index}`} className="inline-block opacity-0">
                      {letter}
                    </span>
                  ))}
                </h2>
              </div>
            </div>

            <div ref={manifestoRef} className="mt-6 max-w-4xl md:mt-0">
              <p className="text-[clamp(2rem,4.5vw,4.5rem)] leading-[0.98] tracking-[-0.05em]">
                Brandul tău merită
                <span className="block font-serif text-aerflow-accent italic font-normal normal-case">
                  o intrare mai bună
                </span>
                decât încă un site corect.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-[0.5fr_0.5fr] md:items-end">
              <div className="space-y-4">
                <div className="font-mono text-[10px] tracking-[0.26em] text-aerflow-gray uppercase">
                  [ București / remote ]
                </div>
                <p className="max-w-md text-sm leading-relaxed text-aerflow-light/64 md:text-base">
                  Lucrăm cu branduri care vor un site viu, memorabil și performant, nu doar un asset publicat online.
                </p>
              </div>

              <div
                ref={actionsRef}
                className="flex flex-col items-start gap-4 md:items-end md:gap-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row">
                  <MagneticButton>
                    <Link
                      to="/contact"
                      className="story-button"
                      onMouseEnter={() => setCursorVariant('project', 'GO')}
                      onMouseLeave={() => setCursorVariant('default')}
                    >
                      Să începem
                    </Link>
                  </MagneticButton>

                  <MagneticButton>
                    <button
                      type="button"
                      onClick={handleBackToTop}
                      className="story-button story-button-ghost"
                      onMouseEnter={() => setCursorVariant('project', 'TOP')}
                      onMouseLeave={() => setCursorVariant('default')}
                    >
                      Înapoi sus
                    </button>
                  </MagneticButton>
                </div>

                <a
                  href="mailto:hello@aerflow.ro"
                  className="font-mono text-[10px] tracking-[0.26em] text-aerflow-light/64 uppercase transition-colors hover:text-aerflow-accent"
                  onMouseEnter={() => setCursorVariant('project', 'MAIL')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  hello@aerflow.ro
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
