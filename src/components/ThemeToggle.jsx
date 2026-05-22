export default function ThemeToggle({ isDark, setIsDark, mn }) {
  return (
    <button
      onClick={() => setIsDark(!isDark)}
      style={{
        display: 'flex', alignItems: 'center', gap: 4,
        background: mn.inkFaint,
        border: `1px solid ${mn.inkBorder}`,
        borderRadius: 999,
        padding: 4,
        cursor: 'pointer',
        fontFamily: 'inherit',
      }}
      aria-label={isDark ? 'Switch to day studio' : 'Switch to night studio'}
    >
      <span style={{
        width: 28, height: 28, borderRadius: '50%',
        background: isDark ? mn.ink : 'transparent',
        color: isDark ? mn.bg : mn.inkDim,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all .2s',
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>
      <span style={{
        width: 28, height: 28, borderRadius: '50%',
        background: !isDark ? mn.ink : 'transparent',
        color: !isDark ? mn.bg : mn.inkDim,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all .2s',
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      </span>
    </button>
  );
}
