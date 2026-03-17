import { useEffect } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { shouldUseLiteEffects } from '@/utils/device';

export default function AmbientBackdrop() {
  const isLiteMode = shouldUseLiteEffects();
  const { scrollYProgress } = useScroll();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 22, mass: 0.8 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 22, mass: 0.8 });

  const orbOneY = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const orbTwoY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const orbThreeX = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const lineShift = useTransform(scrollYProgress, [0, 1], [0, -120]);

  useEffect(() => {
    if (isLiteMode) {
      return;
    }

    const setInitialPosition = () => {
      pointerX.set(window.innerWidth * 0.5);
      pointerY.set(window.innerHeight * 0.28);
    };

    const handleMove = (event: MouseEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    };

    setInitialPosition();
    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('resize', setInitialPosition, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('resize', setInitialPosition);
    };
  }, [isLiteMode, pointerX, pointerY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_34%),linear-gradient(180deg,rgba(9,9,9,0.12),rgba(1,1,1,0.66))]" />

      {!isLiteMode && (
        <motion.div
          style={{ x: smoothX, y: smoothY }}
          className="absolute top-0 left-0 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(215,255,107,0.15),_rgba(215,255,107,0)_68%)] blur-3xl"
        />
      )}

      <motion.div
        style={isLiteMode ? undefined : { y: orbOneY }}
        className="absolute -top-20 left-[8%] h-[20rem] w-[20rem] rounded-full border border-white/8 opacity-30"
      />

      <motion.div
        style={isLiteMode ? undefined : { y: orbTwoY }}
        className="absolute bottom-[-10rem] right-[8%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,_rgba(115,132,255,0.11),_rgba(115,132,255,0)_70%)] blur-3xl"
      />

      <motion.div
        style={isLiteMode ? undefined : { x: orbThreeX }}
        className="absolute top-[30%] right-[20%] h-32 w-32 rounded-[2rem] border border-white/10 bg-white/4 shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
      />

      <motion.div
        style={isLiteMode ? undefined : { y: lineShift }}
        className="absolute inset-0 opacity-30 [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]"
      >
        <div className="story-grid absolute inset-0" />
      </motion.div>

      <div className="absolute inset-x-[8%] top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      <div className="absolute inset-x-[8%] bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute left-[7%] top-[12%] bottom-[12%] w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute right-[7%] top-[12%] bottom-[12%] w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
    </div>
  );
}
