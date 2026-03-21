// ── home 사용 Footer ────────────────────────────────────────────────────────────────────
export function Footer({ isDark }: { isDark: boolean }) {
  const muted = isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)';
  return (
    <footer className="py-12 relative" style={{ background: isDark ? '#000' : '#f0f0f5' }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(168,85,247,0.3),transparent)' }} />
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col items-center gap-2">
        <span className="font-extrabold text-lg italic" style={{ letterSpacing: '-0.03em', color: muted }}>Learn-Time</span>
        <p className="text-xs" style={{ color: muted }}>© 2025 Learn-Time. All rights reserved.</p>
      </div>
    </footer>
  );
}