import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursorStore } from '@/store/useCursorStore';
import { shouldUseLiteEffects } from '@/utils/device';

export default function CustomCursor() {
  const { variant, text } = useCursorStore();
  const isMobile = shouldUseLiteEffects();
  const [isVisible, setIsVisible] = useState(!isMobile);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 20, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (isMobile) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isMobile]);

  if (isMobile) return null;

  const ringVariants = {
    default: {
      width: 44,
      height: 44,
      borderColor: 'rgba(245,242,235,0.45)',
      backgroundColor: 'rgba(255,255,255,0.03)',
      scale: 1,
      opacity: 1,
    },
    project: {
      width: 128,
      height: 128,
      borderColor: 'rgba(215,255,107,0.7)',
      backgroundColor: 'rgba(215,255,107,0.12)',
      scale: 1,
      opacity: 1,
    },
    menu: {
      width: 86,
      height: 86,
      borderColor: 'rgba(245,242,235,0.6)',
      backgroundColor: 'rgba(255,255,255,0.08)',
      scale: 1,
      opacity: 1,
    },
    hidden: {
      width: 24,
      height: 24,
      scale: 0.2,
      opacity: 0,
    }
  };

  const coreVariants = {
    default: {
      width: 6,
      height: 6,
      backgroundColor: '#F5F2EB',
      opacity: 1,
    },
    project: {
      width: 10,
      height: 10,
      backgroundColor: '#D7FF6B',
      opacity: 1,
    },
    menu: {
      width: 8,
      height: 8,
      backgroundColor: '#F5F2EB',
      opacity: 1,
    },
    hidden: {
      width: 0,
      height: 0,
      opacity: 0,
    },
  };

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{
        left: smoothX,
        top: smoothY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        className="absolute rounded-full border"
        initial="hidden"
        animate={isVisible ? variant : 'hidden'}
        variants={ringVariants}
        transition={{ type: 'spring', stiffness: 260, damping: 22, mass: 0.8 }}
        style={{ boxShadow: '0 0 18px rgba(0,0,0,0.12)' }}
      />
      <motion.div
        className="absolute rounded-full"
        initial="hidden"
        animate={isVisible ? variant : 'hidden'}
        variants={coreVariants}
        transition={{ type: 'spring', stiffness: 320, damping: 26, mass: 0.7 }}
      />
      <motion.span
        initial={{ opacity: 0, scale: 0.8, y: 8 }}
        animate={
          variant === 'project' || variant === 'menu'
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.84, y: 8 }
        }
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="absolute rounded-full border border-white/10 bg-black/55 px-3 py-1 font-mono text-[10px] tracking-[0.24em] text-aerflow-light uppercase"
      >
        {text || (variant === 'menu' ? 'OPEN' : 'VIEW')}
      </motion.span>
    </motion.div>
  );
}
