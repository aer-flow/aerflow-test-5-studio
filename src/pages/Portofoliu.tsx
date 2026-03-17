import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import PageTransition from '@/components/core/PageTransition';
import { useCursorStore, type CursorState } from '@/store/useCursorStore';

const works = [
  {
    title: 'NEXUS',
    client: 'FINTECH',
    year: '2024',
    desc: 'Platformă cu ritm cinematic și trasee clare de conversie.',
    img: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2564'
  },
  {
    title: 'AURA',
    client: 'LIFESTYLE',
    year: '2023',
    desc: 'Editorial commerce cu materialitate, lumină și micro-mișcare.',
    img: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2564'
  },
  {
    title: 'KINETIC',
    client: 'AUTO',
    year: '2023',
    desc: 'Lansare digitală construită ca teaser de brand, nu ca broșură web.',
    img: 'https://images.unsplash.com/photo-1503376712341-ea4dfb4c7302?q=80&w=2564'
  },
  {
    title: 'SYLVA',
    client: 'ARHITECTURĂ',
    year: '2022',
    desc: 'Spațiu, volum și ritm transpuse într-o experiență narativă online.',
    img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2564'
  }
];

export default function Portofoliu() {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const setCursorVariant = useCursorStore((state: CursorState) => state.setCursorVariant);

  const activeWork = works[hoveredIndex] ?? works[0];

  return (
    <PageTransition>
      <div className="min-h-screen w-full px-4 pt-32 pb-16 md:px-8 md:pt-40 md:pb-24">
        <div className="section-shell">
          <div className="grid gap-6 md:grid-cols-[0.34fr_0.66fr] md:items-end">
            <div className="story-label">Selected work</div>
            <h1 className="text-[clamp(3rem,8vw,8rem)] font-bold uppercase leading-[0.92] tracking-[-0.06em]">
              Proiecte care intră
              <span className="block font-serif text-aerflow-accent italic font-normal normal-case">
                în scenă cu intenție
              </span>
            </h1>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-[0.46fr_0.54fr]">
            <div className="story-frame hidden overflow-hidden rounded-[2rem] md:sticky md:top-28 md:block md:h-[70vh]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeWork.title}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="relative h-full w-full"
                >
                  <img src={activeWork.img} alt={activeWork.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1),rgba(0,0,0,0.68))]" />
                  <div className="absolute inset-x-6 top-6 flex items-center justify-between">
                    <div className="rounded-full border border-white/10 bg-black/25 px-3 py-2 font-mono text-[10px] tracking-[0.22em] text-white/72 uppercase">
                      {activeWork.client} / {activeWork.year}
                    </div>
                    <div className="font-mono text-[10px] tracking-[0.24em] text-white/58 uppercase">
                      Preview
                    </div>
                  </div>
                  <div className="absolute inset-x-6 bottom-6">
                    <h2 className="mb-3 text-[clamp(2.6rem,5vw,4.8rem)] font-bold uppercase tracking-[-0.06em] text-white">
                      {activeWork.title}
                    </h2>
                    <p className="max-w-md text-base leading-relaxed text-white/74">{activeWork.desc}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="story-frame story-grid rounded-[2rem] px-5 py-4 md:px-6 md:py-5">
              {works.map((work, index) => (
                <div
                  key={work.title}
                  onMouseEnter={() => {
                    setHoveredIndex(index);
                    setCursorVariant('project', 'VIEW');
                  }}
                  onMouseLeave={() => setCursorVariant('default')}
                  className={`group border-b border-white/8 py-5 transition-opacity duration-500 last:border-b-0 ${hoveredIndex !== index ? 'opacity-55 hover:opacity-100' : 'opacity-100'}`}
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                      <div className="mb-2 font-mono text-[10px] tracking-[0.24em] text-aerflow-gray uppercase">
                        {work.client} / {work.year}
                      </div>
                      <h2 className="text-[clamp(2.2rem,5vw,5rem)] font-bold uppercase leading-[0.92] tracking-[-0.05em]">
                        {work.title}
                      </h2>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-aerflow-light/68 md:text-base">
                        {work.desc}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 self-start pt-2 md:self-end">
                      <div className="rounded-full border border-white/8 px-3 py-2 font-mono text-[10px] tracking-[0.22em] text-aerflow-light/64 uppercase">
                        Chapter 0{index + 1}
                      </div>
                      <ArrowUpRight className="text-aerflow-accent transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>

                  <div className="story-frame mt-4 overflow-hidden rounded-[1.3rem] md:hidden">
                    <img src={work.img} alt={work.title} className="h-56 w-full object-cover" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
