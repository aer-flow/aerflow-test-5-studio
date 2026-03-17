export default function AmbientBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(215,255,107,0.08),transparent_24%),radial-gradient(circle_at_82%_10%,rgba(120,132,255,0.08),transparent_22%),linear-gradient(180deg,rgba(9,9,9,0.1),rgba(1,1,1,0.66))]" />
      <div className="absolute -top-24 left-[8%] h-[16rem] w-[16rem] rounded-full border border-white/6 opacity-28" />
      <div className="absolute bottom-[-7rem] right-[8%] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,_rgba(115,132,255,0.08),_rgba(115,132,255,0)_70%)]" />
      <div className="absolute top-[32%] right-[18%] h-24 w-24 rounded-[1.6rem] border border-white/8 bg-white/3 shadow-[0_20px_50px_rgba(0,0,0,0.22)]" />
      <div className="absolute inset-0 opacity-18 [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]">
        <div className="story-grid absolute inset-0" />
      </div>
      <div className="absolute inset-x-[8%] top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      <div className="absolute inset-x-[8%] bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute left-[7%] top-[12%] bottom-[12%] w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute right-[7%] top-[12%] bottom-[12%] w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
    </div>
  );
}
