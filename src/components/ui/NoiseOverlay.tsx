export default function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] h-full w-full opacity-[0.018] mix-blend-soft-light"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '3px 3px, 3px 3px',
      }}
    />
  );
}
