import PageTransition from '@/components/core/PageTransition';

const methodBlocks = [
  {
    id: '01',
    title: 'Analiză & arhitectură',
    desc: 'Începem cu structura: cum circulă atenția, unde apare tensiunea și cum se transformă interesul în acțiune.',
  },
  {
    id: '02',
    title: 'Direcție de artă',
    desc: 'Definim atmosfera, tipografia, materialitatea și micro-detaliile care transformă un brand într-o experiență recognoscibilă.',
  },
  {
    id: '03',
    title: 'Interacțiune & motion',
    desc: 'Folosim mișcare subtilă și gesturi controlate pentru a lega secțiunile și a crea ritm fără zgomot gratuit.',
  },
  {
    id: '04',
    title: 'Implementare & lansare',
    desc: 'Experiența rămâne elegantă și în cod: performanță, responsivitate și stabilitate în producție.',
  }
];

export default function Despre() {
  return (
    <PageTransition>
      <div className="min-h-screen w-full px-4 pt-32 pb-16 md:px-8 md:pt-40 md:pb-24">
        <div className="section-shell">
          <div className="grid gap-6 md:grid-cols-[0.36fr_0.64fr] md:items-end">
            <div className="story-label">About / methodology</div>
            <h1 className="text-[clamp(3rem,8vw,8rem)] font-bold uppercase leading-[0.92] tracking-[-0.06em]">
              Nu lucrăm cu
              <span className="block font-serif text-aerflow-accent italic font-normal normal-case">
                pagini izolate,
              </span>
              ci cu lumi digitale coerente.
            </h1>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-[0.42fr_0.58fr]">
            <div className="story-frame rounded-[2rem] px-6 py-8 md:px-8 md:py-10">
              <div className="mb-4 font-mono text-[10px] tracking-[0.26em] text-aerflow-gray uppercase">
                Manifest
              </div>
              <p className="text-lg leading-relaxed text-aerflow-light/76">
                Aerflow combină art direction, structură și tehnologie pentru a crea experiențe care se simt premium din primul scroll până în ultimul click.
              </p>
              <div className="ambient-divider my-6" />
              <p className="text-sm leading-relaxed text-aerflow-light/64">
                Nu căutăm efecte pentru efecte. Căutăm acele mici decizii de design care schimbă percepția și dau greutate reală unui brand online.
              </p>
            </div>

            <div className="story-frame story-grid rounded-[2rem] px-6 py-8 md:px-8 md:py-10">
              <div className="grid gap-4 md:grid-cols-2">
                {methodBlocks.map((block) => (
                  <article key={block.id} className="rounded-[1.5rem] border border-white/8 bg-white/3 px-5 py-5">
                    <div className="mb-3 font-mono text-[10px] tracking-[0.24em] text-aerflow-gray uppercase">
                      {block.id}
                    </div>
                    <h2 className="mb-3 text-2xl font-bold uppercase tracking-[-0.04em]">{block.title}</h2>
                    <p className="text-sm leading-relaxed text-aerflow-light/70">{block.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
