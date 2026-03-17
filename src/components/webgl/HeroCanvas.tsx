export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 animate-[ambientPulse_10s_ease-in-out_infinite] bg-[radial-gradient(circle_at_18%_18%,rgba(215,255,107,0.18),transparent_24%),radial-gradient(circle_at_78%_14%,rgba(108,122,255,0.14),transparent_24%),linear-gradient(135deg,#050505_10%,#0d0d0d_50%,#040404_100%)]" />
      <div className="absolute inset-[8%] rounded-[2.4rem] border border-white/8 opacity-50" />
      <div className="absolute left-[8%] top-[14%] h-[24rem] w-[24rem] rounded-full border border-white/6 opacity-20 animate-[ambientFloat_9s_ease-in-out_infinite]" />
      <div className="absolute right-[10%] bottom-[12%] h-28 w-28 rounded-[2rem] border border-white/8 bg-white/3 shadow-[0_20px_60px_rgba(0,0,0,0.22)] animate-[ambientDrift_12s_ease-in-out_infinite]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,0.35)_72%),linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.38))]" />
    </div>
  );
}
