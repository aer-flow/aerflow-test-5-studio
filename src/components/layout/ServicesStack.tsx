import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { isMobileViewport, shouldReduceMotion } from '@/utils/device';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: '01',
    title: 'Prezență',
    accent: 'regizată',
    desc: 'Construim intrări în brand care par montate și iluminate cu intenție. Hero-uri, cadre, ritm și copy care te fac să simți că ai ajuns undeva, nu doar pe o pagină.',
    caption: 'Framing / atmosphere / first impact',
    tags: ['Hero systems', 'Narrative layouts', 'Brand launch'],
    surface: 'linear-gradient(180deg, rgba(12,12,12,0.95), rgba(6,6,6,0.98))',
    border: 'rgba(255,255,255,0.1)',
    accentColor: '#F5F2EB',
  },
  {
    id: '02',
    title: 'Narațiune',
    accent: 'vizuală',
    desc: 'Folosim tipografie, ritm și mișcare ca să controlăm atenția. Fiecare secțiune are propriul gest, dar toate vorbesc aceeași limbă și construiesc o singură experiență.',
    caption: 'Flow / transition / emotional pacing',
    tags: ['Editorial rhythm', 'Scroll choreography', 'Micro interactions'],
    surface: 'linear-gradient(180deg, rgba(15,18,10,0.95), rgba(9,10,7,0.98))',
    border: 'rgba(215,255,107,0.16)',
    accentColor: '#D7FF6B',
  },
  {
    id: '03',
    title: 'Sisteme',
    accent: 'care convertesc',
    desc: 'Dincolo de art direction, fiecare detaliu susține un scop: claritate, reacție și conversie. Site-ul rămâne memorabil, dar și util, rapid și orientat spre rezultat.',
    caption: 'Structure / confidence / conversion',
    tags: ['Conversion paths', 'Performance', 'Scalable delivery'],
    surface: 'linear-gradient(180deg, rgba(242,239,232,0.98), rgba(226,223,216,0.96))',
    border: 'rgba(5,5,5,0.15)',
    accentColor: '#050505',
  }
];

export default function ServicesStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const innerCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const descRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = isMobileViewport();
      const reduceMotion = shouldReduceMotion();
      if (reduceMotion) return;

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const innerCard = innerCardsRef.current[index];
        const label = labelRefs.current[index];
        const title = titleRefs.current[index];
        const desc = descRefs.current[index];
        const shouldPinCard = index < services.length - 1;
        if (!innerCard) return;

        gsap.fromTo(innerCard, {
          yPercent: isMobile ? 4 : 7,
        }, {
          yPercent: isMobile ? -4 : -7,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: isMobile ? 0.26 : 0.56,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
        });

        if (label) {
          gsap.fromTo(label, {
            yPercent: isMobile ? 10 : 14,
          }, {
            yPercent: isMobile ? -10 : -14,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: isMobile ? 0.2 : 0.46,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
            },
          });
        }

        if (title) {
          gsap.fromTo(title, {
            yPercent: isMobile ? 22 : 28,
          }, {
            yPercent: isMobile ? -22 : -28,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: isMobile ? 0.24 : 0.6,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
            },
          });
        }

        if (desc) {
          gsap.fromTo(desc, {
            yPercent: isMobile ? 15 : 18,
          }, {
            yPercent: isMobile ? -15 : -18,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: isMobile ? 0.24 : 0.55,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
            },
          });
        }

        if (!isMobile && shouldPinCard) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: 'top top',
              end: '+=100%',
              pin: true,
              pinSpacing: false,
              scrub: 0.45,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              pinType: 'fixed',
            }
          });

          tl.to(innerCard, {
            scale: 0.94,
            opacity: 0.42,
            transformOrigin: 'top center',
            ease: 'none'
          }, 0);
        }
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-transparent pb-[12vh] pt-10" id="servicii">
      <div className="section-shell mb-8 md:mb-10">
        <div className="grid gap-5 md:grid-cols-[0.34fr_0.66fr] md:items-end">
          <div className="story-label">Narrative system</div>
          <h2 className="text-[clamp(2.4rem,6vw,6rem)] font-bold uppercase leading-[0.94] tracking-[-0.05em] text-aerflow-light">
            Trei capitole care
            <span className="block font-serif text-aerflow-accent italic font-normal normal-case">
              dau site-ului greutate
            </span>
          </h2>
        </div>
      </div>

      <div className="relative w-full">
        {services.map((service, index) => {
          const isLightCard = index === services.length - 1;

          return (
            <div
              key={service.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`${index < services.length - 1 ? 'sticky top-0' : 'relative'} min-h-[100svh] w-full`}
            >
              <div className="section-shell flex min-h-[100svh] items-center py-6 md:py-8">
                <div
                  ref={(el) => { innerCardsRef.current[index] = el; }}
                  className="relative w-full overflow-hidden rounded-[2rem] border px-5 py-24 shadow-[0_30px_80px_rgba(0,0,0,0.34)] md:rounded-[2.6rem] md:px-10 md:py-12"
                  style={{
                    background: service.surface,
                    borderColor: service.border,
                    color: isLightCard ? '#050505' : '#F5F2EB',
                  }}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:120px_120px] opacity-30" />

                  <div className="relative z-10 flex flex-col gap-10">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <span
                        ref={(el) => { labelRefs.current[index] = el; }}
                        className="inline-flex w-fit items-center gap-3 font-mono text-[11px] tracking-[0.28em] uppercase"
                      >
                        {service.id}
                        <span className="h-px w-10 bg-current/35" />
                        {service.caption}
                      </span>

                      <div className={`w-fit rounded-full border px-4 py-2 font-mono text-[10px] tracking-[0.24em] uppercase ${isLightCard ? 'border-black/10 bg-black/4' : 'border-white/10 bg-white/5'}`}>
                        Scroll chapter {index + 1}
                      </div>
                    </div>

                    <div className="grid gap-10 md:grid-cols-[0.58fr_0.42fr] md:gap-8">
                      <div className="space-y-6">
                        <h3
                          ref={(el) => { titleRefs.current[index] = el; }}
                          className="text-[clamp(3rem,10vw,10rem)] font-bold uppercase leading-[0.88] tracking-[-0.06em]"
                        >
                          <span className="block">{service.title}</span>
                          <span
                            className="block font-serif text-[0.78em] italic font-normal normal-case"
                            style={{ color: service.accentColor }}
                          >
                            {service.accent}
                          </span>
                        </h3>
                      </div>

                      <div className="flex flex-col justify-between gap-8">
                        <p
                          ref={(el) => { descRefs.current[index] = el; }}
                          className={`max-w-md text-base leading-relaxed md:text-lg ${isLightCard ? 'text-black/72' : 'text-white/74'}`}
                        >
                          {service.desc}
                        </p>

                        <div className="grid gap-3">
                          {service.tags.map((tag) => (
                            <div
                              key={tag}
                              className={`rounded-[1.2rem] border px-4 py-4 font-mono text-[10px] tracking-[0.24em] uppercase ${isLightCard ? 'border-black/10 bg-black/4 text-black/72' : 'border-white/8 bg-white/4 text-white/68'}`}
                            >
                              {tag}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
