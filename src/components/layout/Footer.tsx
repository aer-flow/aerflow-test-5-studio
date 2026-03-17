import MagneticButton from '../ui/MagneticButton';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative z-20 px-4 pb-4 pt-20 md:px-8 md:pb-8 md:pt-28">
      <div className="story-frame section-shell story-grid rounded-[2rem] px-6 py-10 md:px-10 md:py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:gap-16">
          <div className="space-y-8">
            <div className="story-label">Next chapter</div>
            <div>
              <p className="mb-4 max-w-xl text-lg leading-relaxed text-aerflow-light/72">
                Aerflow transformă branduri în experiențe care rămân în minte după ce scroll-ul s-a terminat.
              </p>
              <h2 className="text-[clamp(2.8rem,8vw,7.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.05em]">
                Let the next
                <span className="block font-serif text-aerflow-accent italic font-normal normal-case">
                  digital chapter
                </span>
                begin.
              </h2>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <MagneticButton>
                <Link to="/contact" className="story-button">
                  Start a project
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link to="/portofoliu" className="story-button story-button-ghost">
                  View work
                </Link>
              </MagneticButton>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 md:gap-6">
            <div>
              <div className="mb-3 font-mono text-[10px] tracking-[0.26em] text-aerflow-gray uppercase">Contact</div>
              <div className="space-y-2 text-sm leading-relaxed text-aerflow-light/76">
                <a href="mailto:hello@aerflow.ro" className="block hover:text-aerflow-accent transition-colors">
                  hello@aerflow.ro
                </a>
                <p>București, România</p>
                <p>Disponibil pentru proiecte selectate.</p>
              </div>
            </div>

            <div>
              <div className="mb-3 font-mono text-[10px] tracking-[0.26em] text-aerflow-gray uppercase">Navigation</div>
              <div className="space-y-2 text-sm uppercase tracking-[0.16em] text-aerflow-light/76">
                <Link to="/" className="block hover:text-aerflow-accent transition-colors">Acasă</Link>
                <Link to="/despre" className="block hover:text-aerflow-accent transition-colors">Despre</Link>
                <Link to="/portofoliu" className="block hover:text-aerflow-accent transition-colors">Portofoliu</Link>
                <Link to="/contact" className="block hover:text-aerflow-accent transition-colors">Contact</Link>
              </div>
            </div>

            <div>
              <div className="mb-3 font-mono text-[10px] tracking-[0.26em] text-aerflow-gray uppercase">Social</div>
              <div className="space-y-2 text-sm text-aerflow-light/76">
                <a href="#" className="block hover:text-aerflow-accent transition-colors">Instagram</a>
                <a href="#" className="block hover:text-aerflow-accent transition-colors">LinkedIn</a>
                <a href="#" className="block hover:text-aerflow-accent transition-colors">Behance</a>
              </div>
            </div>

            <div>
              <div className="mb-3 font-mono text-[10px] tracking-[0.26em] text-aerflow-gray uppercase">Signature</div>
              <p className="text-sm leading-relaxed text-aerflow-light/60">
                Design editorial, interacțiune controlată, performanță reală.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
