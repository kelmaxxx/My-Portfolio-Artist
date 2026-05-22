import ThemeToggle from './ThemeToggle.jsx';
import { status } from '../data/status.js';

const NAV = [
  { label: 'Work', href: '#work' },
  { label: 'Commission', href: '#commission' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Header({ mn, isDark, setIsDark }) {
  return (
    <header
      className="k-header"
      style={{
        position: 'relative', zIndex: 4,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '28px clamp(20px, 5vw, 56px)',
        borderBottom: `1px solid ${mn.inkLine}`,
      }}
    >
      <a
        href="#top"
        style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none', color: 'inherit' }}
      >
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: `radial-gradient(circle at 35% 35%, ${mn.accent}, ${mn.rose} 70%, transparent)`,
          boxShadow: `0 0 24px ${mn.accent}66`,
        }} />
        <div>
          <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1 }}>KELMA</div>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
            letterSpacing: '0.3em', color: mn.inkDim, marginTop: 4,
          }}>
            {isDark ? 'NIGHT · STUDIO' : 'DAY · STUDIO'}
          </div>
        </div>
      </a>

      <nav
        className="k-nav"
        style={{
          display: 'flex', gap: 4,
          background: mn.inkFaint,
          padding: 4, borderRadius: 999,
          border: `1px solid ${mn.inkBorder}`,
        }}
      >
        {NAV.map((item, i) => (
          <a
            key={item.label}
            href={item.href}
            style={{
              color: i === 0 ? mn.bg : mn.ink, textDecoration: 'none',
              padding: '9px 18px', borderRadius: 999, fontSize: 13, fontWeight: 500,
              background: i === 0 ? mn.ink : 'transparent',
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {status.takingWork && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            fontFamily: '"JetBrains Mono"', fontSize: 11,
            letterSpacing: '0.15em', textTransform: 'uppercase', color: mn.ink,
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%', background: mn.accent,
              boxShadow: `0 0 12px ${mn.accent}`,
              animation: 'kelma-pulse 2s infinite',
            }} />
            <span className="k-status-text">Taking work</span>
          </div>
        )}
        <ThemeToggle isDark={isDark} setIsDark={setIsDark} mn={mn} />
      </div>

      <style>{`
        @keyframes kelma-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </header>
  );
}
