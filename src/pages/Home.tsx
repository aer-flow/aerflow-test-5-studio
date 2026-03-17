import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import PageTransition from '@/components/core/PageTransition';
import MagneticButton from '@/components/ui/MagneticButton';
import ParallaxText from '@/components/ui/ParallaxText';
import { useCursorStore, type CursorState } from '@/store/useCursorStore';
import { shouldUseLiteEffects } from '@/utils/device';

gsap.registerPlugin(ScrollTrigger);

const HeroCanvas = lazy(() => import('@/components/webgl/HeroCanvas'));
const ServicesStack = lazy(() => import('@/components/layout/ServicesStack'));
const FinalMonolith = lazy(() => import('@/components/layout/FinalMonolith'));

const projects = [
  {
    id: 1,
    title: 'Nexus Orbit',
    client: 'Fintech / 2024',
    note: 'Lansare digitală cu ritm cinematic și interacțiuni de conversie.',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Aura House',
    client: 'Lifestyle / 2023',
    note: 'Editorial commerce cu atmosferă tactilă și mișcare controlată.',
    img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Kinetic Roads',
    client: 'Auto / 2023',
    note: 'O experiență construită ca teaser de lansare, nu ca simplă prezentare.',
    img: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Sylva District',
    client: 'Arhitectură / 2022',
    note: 'Spațiu, lumină și materialitate traduse într-un website narativ.',
    img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop',
  }
];

const chapterSignals = [
  {
    title: 'Arrival',
    text: 'Prima secțiune trebuie să seteze tensiune, atmosferă și direcție înainte să explice.',
  },
  {
    title: 'Flow',
    text: 'Tranzițiile și accentele fac capitolele să pară legate între ele, nu doar stivuite.',
  },
  {
    title: 'Memory',
    text: 'Fiecare zonă are un mic twist: un framing, o lumină, un gest de interacțiune memorabil.',
  },
];

const manifestoNotes = [
  'Sistem vizual coerent între toate paginile.',
  'Mișcare subtilă care susține ierarhia, nu o distrage.',
  'Poveste spusă prin ritm, spacing și atmosferă.',
];

const structureCards = [
  {
    id: '01',
    title: 'Intro ca scenă de intrare',
    desc: 'Hero-ul trebuie să creeze expectație și să ofere un prim contact care pare regizat.',
  },
  {
    id: '02',
    title: 'Secțiuni conectate vizual',
    desc: 'Fiecare capitol moștenește urme din cel anterior prin lumină, grile și compoziție.',
  },
  {
    id: '03',
    title: 'Micro-detalii cu intenție',
    desc: 'Cursor, cadre, hover-uri, marcaje și copy scurt care dau senzația de obiect premium.',
  },
];

function HeroFallback() {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[#060606] via-[#0d0d0d] to-[#050505]" />
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}

function DeferredSection({
  children,
  fallback,
  minHeight,
  rootMargin = '400px',
}: {
  children: ReactNode;
  fallback: ReactNode;
  minHeight: string;
  rootMargin?: string;
}) {
  const [shouldRender, setShouldRender] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldRender) return;
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return (
    <div ref={sectionRef} style={{ minHeight }}>
      {shouldRender ? <Suspense fallback={fallback}>{children}</Suspense> : fallback}
    </div>
  );
}

export default function Home() {
  const manifestoRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const scrollWrapperRef = useRef<HTMLElement>(null);
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const useLiteShowcase = shouldUseLiteEffects();
  const setCursorVariant = useCursorStore((state: CursorState) => state.setCursorVariant);

  useEffect(() => {
    const isLiteMode = shouldUseLiteEffects();

    const ctx = gsap.context(() => {
      if (textRef.current && manifestoRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { color: '#4b4b48' },
          {
            color: '#F5F2EB',
            stagger: isLiteMode ? 0.03 : 0.07,
            scrollTrigger: {
              trigger: manifestoRef.current,
              start: 'top 72%',
              end: 'bottom 56%',
              scrub: isLiteMode ? 0.2 : 0.5,
            },
          }
        );
      }
    });

    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 250);

    return () => {
      window.clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (
      useLiteShowcase ||
      !scrollWrapperRef.current ||
      !scrollViewportRef.current ||
      !scrollTrackRef.current
    ) {
      return;
    }

    const section = scrollWrapperRef.current;
    const viewport = scrollViewportRef.current;
    const track = scrollTrackRef.current;
    const ctx = gsap.context(() => {
      const horizontalTween = gsap.to(track, {
        x: () => -Math.max(track.scrollWidth - viewport.clientWidth, 0),
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          invalidateOnRefresh: true,
          onRefresh: () => {
            const viewportHeight = viewport.clientHeight || window.innerHeight;
            const scrollDistance = Math.max(track.scrollWidth - viewport.clientWidth, 0);
            section.style.height = `${viewportHeight + scrollDistance}px`;
            viewport.style.height = `${viewportHeight}px`;
          },
        },
      });

      ScrollTrigger.refresh();

      return () => {
        horizontalTween.kill();
      };
    }, section);

    return () => {
      ctx.revert();
      section.style.height = '';
      viewport.style.height = '';
      gsap.set(track, { clearProps: 'transform' });
    };
  }, [useLiteShowcase]);

  return (
    <PageTransition>
      <div className="relative w-full overflow-hidden">
        <section className="relative flex min-h-[100svh] items-end overflow-hidden pt-28 pb-4 md:items-center md:pt-32 md:pb-8">
          <Suspense fallback={<HeroFallback />}>
            <HeroCanvas />
          </Suspense>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,4,4,0.35),rgba(4,4,4,0.72)_58%,rgba(4,4,4,0.96))]" />

          <div className="section-shell relative z-10 w-full">
            <div className="story-frame story-grid rounded-[2rem] px-5 py-6 md:rounded-[2.6rem] md:px-10 md:py-10">
              <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:gap-12">
                <div className="space-y-8">
                  <div className="flex flex-wrap gap-3">
                    <div className="story-chip">Chapter 01 / Arrival</div>
                    <div className="rounded-full border border-white/10 px-4 py-2 font-mono text-[10px] tracking-[0.22em] text-aerflow-light/70 uppercase">
                      Immersive brand systems
                    </div>
                  </div>

                  <div className="max-w-4xl">
                    <h1 className="text-[clamp(3.25rem,9vw,10rem)] font-bold uppercase leading-[0.88] tracking-[-0.06em] text-aerflow-light">
                      <motion.span
                        initial={{ y: 110, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                        className="block"
                      >
                        Nu lansăm doar
                      </motion.span>
                      <motion.span
                        initial={{ y: 110, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.95, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                        className="block font-serif text-aerflow-accent italic font-normal normal-case"
                      >
                        site-uri.
                      </motion.span>
                      <motion.span
                        initial={{ y: 110, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.95, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                        className="block"
                      >
                        Regizăm intrări în brand.
                      </motion.span>
                    </h1>
                  </div>

                  <div className="ambient-divider max-w-xl" />

                  <p className="max-w-xl text-base leading-relaxed text-aerflow-light/74 md:text-lg">
                    Aerflow construiește experiențe digitale care par orchestrate: cu atmosferă,
                    claritate și micro-detalii care transformă fiecare scroll într-o secvență
                    memorabilă.
                  </p>
                </div>

                <div className="flex flex-col justify-between gap-8">
                  <div className="space-y-4 md:pt-8">
                    <div className="story-label">Designed like a journey</div>
                    <p className="max-w-md text-lg leading-relaxed text-aerflow-light/78">
                      De la primul cadru până la ultimul CTA, fiecare secțiune trebuie să surprindă,
                      să ghideze și să dea senzația unui obiect digital făcut cu intenție.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="story-frame rounded-[1.6rem] px-5 py-5">
                      <div className="mb-2 font-mono text-[10px] tracking-[0.24em] text-aerflow-gray uppercase">
                        Atmosphere
                      </div>
                      <p className="text-sm leading-relaxed text-aerflow-light/74">
                        Fundal viu, lumină, textură și profunzime în locul unui canvas plat.
                      </p>
                    </div>
                    <div className="story-frame rounded-[1.6rem] px-5 py-5">
                      <div className="mb-2 font-mono text-[10px] tracking-[0.24em] text-aerflow-gray uppercase">
                        Motion
                      </div>
                      <p className="text-sm leading-relaxed text-aerflow-light/74">
                        Tranziții care conectează capitolele fără să afecteze claritatea și ritmul.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row">
                    <MagneticButton>
                      <Link
                        to="/contact"
                        className="story-button"
                        onMouseEnter={() => setCursorVariant('project', 'START')}
                        onMouseLeave={() => setCursorVariant('default')}
                      >
                        Start a project
                      </Link>
                    </MagneticButton>
                    <MagneticButton>
                      <Link
                        to="/portofoliu"
                        className="story-button story-button-ghost"
                        onMouseEnter={() => setCursorVariant('project', 'VIEW')}
                        onMouseLeave={() => setCursorVariant('default')}
                      >
                        Explore the work
                      </Link>
                    </MagneticButton>
                  </div>
                </div>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {chapterSignals.map((signal, index) => (
                  <motion.div
                    key={signal.title}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, delay: 0.22 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="story-frame rounded-[1.5rem] px-5 py-5"
                  >
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <div className="font-mono text-[10px] tracking-[0.22em] text-aerflow-gray uppercase">
                        0{index + 1}
                      </div>
                      <div className="h-px flex-1 bg-white/8" />
                    </div>
                    <h2 className="mb-3 text-2xl font-bold uppercase tracking-[-0.04em]">{signal.title}</h2>
                    <p className="text-sm leading-relaxed text-aerflow-light/70">{signal.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 right-8 z-10 hidden font-mono text-[10px] tracking-[0.3em] text-aerflow-light/52 uppercase md:block">
            [ scroll to enter ]
          </div>
        </section>

        <section ref={manifestoRef} className="relative py-16 md:py-24">
          <div className="section-shell">
            <div className="grid gap-6 md:grid-cols-[0.42fr_0.58fr]">
              <div className="story-frame flex h-fit flex-col gap-8 rounded-[2rem] px-6 py-8 md:sticky md:top-28 md:px-7">
                <div className="space-y-4">
                  <div className="story-label">Manifest / Direction</div>
                  <p className="text-base leading-relaxed text-aerflow-light/76">
                    Site-ul trebuie să se simtă ca o experiență premium în mișcare, nu ca o listă
                    de servicii frumos ordonată.
                  </p>
                </div>

                <div className="ambient-divider" />

                <div className="space-y-4">
                  {manifestoNotes.map((note) => (
                    <div key={note} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-aerflow-accent shadow-[0_0_18px_rgba(215,255,107,0.65)]" />
                      <p className="text-sm leading-relaxed text-aerflow-light/68">{note}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-[1.4rem] border border-white/8 bg-white/3 px-4 py-4">
                  <div className="mb-2 font-mono text-[10px] tracking-[0.24em] text-aerflow-gray uppercase">
                    Story pacing
                  </div>
                  <p className="text-sm leading-relaxed text-aerflow-light/70">
                    Intrare. Tensiune. Clarificare. Demonstrație. Final memorabil.
                  </p>
                </div>
              </div>

              <div className="story-frame rounded-[2rem] px-6 py-8 md:px-10 md:py-10">
                <ParallaxText baseVelocity={-180} className="mb-8 opacity-18" enableOnMobile>
                  <span className="text-[12vw] font-bold uppercase leading-none tracking-[-0.05em]">
                    Aerflow • Story • Motion • Atmosphere •
                  </span>
                </ParallaxText>

                <h2
                  ref={textRef}
                  className="text-[clamp(2.2rem,5vw,5.3rem)] leading-[1.04] font-bold tracking-[-0.05em]"
                >
                  {'Construim prezențe digitale care se simt precum un trailer pentru brandul tău: atent montate, vizual distincte și imposibil de confundat cu un template.'.split(
                    ' '
                  ).map((word, index) => (
                    <span key={`${word}-${index}`} className="mr-3 inline-block">
                      {word}
                    </span>
                  ))}
                </h2>

                <div className="mt-10 grid gap-4 md:grid-cols-3">
                  {structureCards.map((card) => (
                    <div key={card.id} className="rounded-[1.5rem] border border-white/8 bg-white/3 px-5 py-5">
                      <div className="mb-3 font-mono text-[10px] tracking-[0.24em] text-aerflow-gray uppercase">
                        {card.id}
                      </div>
                      <h3 className="mb-2 text-xl font-bold uppercase tracking-[-0.04em]">{card.title}</h3>
                      <p className="text-sm leading-relaxed text-aerflow-light/70">{card.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="relative z-10">
          <Suspense fallback={<div className="min-h-[320vh] w-full bg-aerflow-dark" />}>
            <ServicesStack />
          </Suspense>
        </div>

        <section className="relative z-20 py-16 md:py-24">
          <div className="section-shell mb-8 md:mb-10">
            <div className="grid gap-5 md:grid-cols-[0.35fr_0.65fr] md:items-end">
              <div className="story-label">Selected worlds</div>
              <div>
                <h2 className="text-[clamp(2.6rem,6vw,6rem)] font-bold uppercase leading-[0.94] tracking-[-0.05em]">
                  Proiecte gândite ca
                  <span className="block font-serif text-aerflow-accent italic font-normal normal-case">
                    experiențe de intrare
                  </span>
                </h2>
              </div>
            </div>
          </div>

          {useLiteShowcase ? (
            <div className="section-shell">
              <div
                data-lenis-prevent-touch
                className="overflow-x-auto overflow-y-hidden touch-pan-x overscroll-x-contain [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
              >
                <div className="flex w-max snap-x snap-mandatory gap-4 pb-4">
                  {projects.map((proj) => (
                    <div key={proj.id} className="story-frame relative h-[58vh] w-[86vw] min-w-[86vw] flex-shrink-0 snap-center rounded-[1.8rem]">
                      <img src={proj.img} alt={proj.title} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.62))]" />
                      <div className="absolute inset-x-4 bottom-4">
                        <div className="mb-2 font-mono text-[10px] tracking-[0.24em] text-white/70 uppercase">
                          {proj.client}
                        </div>
                        <h3 className="mb-2 text-3xl font-bold uppercase tracking-[-0.05em]">{proj.title}</h3>
                        <p className="max-w-sm text-sm leading-relaxed text-white/76">{proj.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <section ref={scrollWrapperRef} className="relative min-h-[100svh] w-full">
              <div ref={scrollViewportRef} className="sticky top-0 h-[100svh] w-full overflow-hidden">
                <div
                  ref={scrollTrackRef}
                  className="absolute top-0 left-0 flex h-full w-max items-center gap-8 px-[7vw] will-change-transform md:gap-12 md:px-[10vw]"
                >
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      onMouseEnter={() => setCursorVariant('project', 'VIEW')}
                      onMouseLeave={() => setCursorVariant('default')}
                      className="story-frame group relative h-[68vh] w-[74vw] flex-shrink-0 overflow-hidden rounded-[2rem] md:w-[58vw]"
                    >
                      <img
                        src={proj.img}
                        alt={proj.title}
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-[1.5s] ease-awwwards group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.74))]" />
                      <div className="absolute inset-x-6 top-6 flex items-center justify-between gap-4">
                        <div className="rounded-full border border-white/10 bg-black/25 px-3 py-2 font-mono text-[10px] tracking-[0.22em] text-white/72 uppercase">
                          {proj.client}
                        </div>
                        <div className="font-mono text-[10px] tracking-[0.26em] text-white/58 uppercase">
                          Chapter 0{proj.id}
                        </div>
                      </div>
                      <div className="absolute inset-x-6 bottom-6 max-w-lg">
                        <h3 className="mb-3 text-[clamp(2rem,4vw,4.4rem)] font-bold uppercase leading-[0.92] tracking-[-0.05em] text-white">
                          {proj.title}
                        </h3>
                        <p className="max-w-md text-base leading-relaxed text-white/74">{proj.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </section>

        <DeferredSection
          minHeight="100vh"
          rootMargin="0px"
          fallback={<div className="h-[100svh] md:h-screen w-full bg-[#020202]" />}
        >
          <FinalMonolith />
        </DeferredSection>
      </div>
    </PageTransition>
  );
}
