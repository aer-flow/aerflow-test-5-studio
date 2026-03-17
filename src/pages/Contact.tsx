import PageTransition from '@/components/core/PageTransition';
import MagneticButton from '@/components/ui/MagneticButton';
import { useCursorStore, type CursorState } from '@/store/useCursorStore';

export default function Contact() {
  const setCursorVariant = useCursorStore((state: CursorState) => state.setCursorVariant);

  return (
    <PageTransition>
      <div className="flex min-h-screen w-full items-center px-4 pt-32 pb-16 md:px-8 md:pt-40 md:pb-24">
        <div className="section-shell">
          <div className="story-frame story-grid rounded-[2rem] px-6 py-8 md:rounded-[2.6rem] md:px-10 md:py-10">
            <div className="grid gap-10 md:grid-cols-[0.36fr_0.64fr] md:items-end">
              <div className="space-y-6">
                <div className="story-label">Contact / start a project</div>
                <p className="text-base leading-relaxed text-aerflow-light/70 md:text-lg">
                  Dacă vrei un site care să se simtă ca o intrare memorabilă în brand, aici începe conversația.
                </p>

                <div className="rounded-[1.5rem] border border-white/8 bg-white/4 px-5 py-5">
                  <div className="mb-2 font-mono text-[10px] tracking-[0.24em] text-aerflow-gray uppercase">
                    Availability
                  </div>
                  <p className="text-sm leading-relaxed text-aerflow-light/68">
                    Luăm proiecte selectate, cu ambiție vizuală și cerințe reale de calitate.
                  </p>
                </div>
              </div>

              <div>
                <h1 className="text-[clamp(3rem,8vw,8rem)] font-bold uppercase leading-[0.92] tracking-[-0.06em]">
                  Spune-ne ce
                  <span className="block font-serif text-aerflow-accent italic font-normal normal-case">
                    vrei să simtă
                  </span>
                  primul vizitator.
                </h1>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <MagneticButton>
                    <a
                      href="mailto:hello@aerflow.ro"
                      className="story-button"
                      onMouseEnter={() => setCursorVariant('project', 'MAIL')}
                      onMouseLeave={() => setCursorVariant('default')}
                    >
                      hello@aerflow.ro
                    </a>
                  </MagneticButton>
                  <div className="font-mono text-[10px] tracking-[0.24em] text-aerflow-light/58 uppercase">
                    București / Remote / Disponibil pentru proiecte noi
                  </div>
                </div>

                <div className="mt-10 grid gap-4 md:grid-cols-2">
                  <div className="rounded-[1.4rem] border border-white/8 bg-white/3 px-5 py-5">
                    <div className="mb-2 font-mono text-[10px] tracking-[0.24em] text-aerflow-gray uppercase">
                      Ce ne trimiți
                    </div>
                    <p className="text-sm leading-relaxed text-aerflow-light/68">
                      Context, obiectiv, timeline și unde simți că brandul tău încă nu are impactul dorit.
                    </p>
                  </div>
                  <div className="rounded-[1.4rem] border border-white/8 bg-white/3 px-5 py-5">
                    <div className="mb-2 font-mono text-[10px] tracking-[0.24em] text-aerflow-gray uppercase">
                      Ce construim
                    </div>
                    <p className="text-sm leading-relaxed text-aerflow-light/68">
                      Un răspuns digital care arată bine, se mișcă bine și spune povestea brandului cu mai multă forță.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
