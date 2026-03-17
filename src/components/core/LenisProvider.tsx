import { useEffect } from 'react';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });
    ScrollTrigger.normalizeScroll(false);

    return () => {
      ScrollTrigger.clearScrollMemory();
    };
  }, []);

  return <>{children}</>;
}
