const HERO_IMG = '/assets/kelma-02-sunset';

function CropMarks({ color }) {
  return ['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(corner => {
    const [v, h] = corner.split('-');
    return (
      <div key={corner} style={{
        position: 'absolute',
        [v]: 32, [h]: 32,
        width: 24, height: 24,
        borderTop: v === 'top' ? `1.5px solid ${color}` : 'none',
        borderBottom: v === 'bottom' ? `1.5px solid ${color}` : 'none',
        borderLeft: h === 'left' ? `1.5px solid ${color}` : 'none',
        borderRight: h === 'right' ? `1.5px solid ${color}` : 'none',
        opacity: 0.6,
      }} />
    );
  });
}

export default function Hero({ mn, isDark, grainBg }) {
  return (
    <section
      id="top"
      className="k-hero"
      style={{ position: 'relative', minHeight: 880, overflow: 'hidden' }}
    >
      <picture>
        <source srcSet={`${HERO_IMG}@mobile.webp`} media="(max-width: 720px)" type="image/webp" />
        <source srcSet={`${HERO_IMG}.webp`} type="image/webp" />
        <img
          src={`${HERO_IMG}.png`}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%',
            opacity: mn.artOpacity,
            filter: mn.artFilter,
            transition: 'opacity .35s, filter .35s',
          }}
        />
      </picture>

      <div style={{
        position: 'absolute', inset: 0,
        background:
          `linear-gradient(180deg, ${mn.vignetteBg} 0%, transparent 25%, transparent 60%, ${mn.vignetteSoft} 95%, ${mn.vignetteBg} 100%),
           linear-gradient(90deg, ${mn.vignetteEdge} 0%, transparent 35%, transparent 65%, ${mn.vignetteEdge} 100%)`,
      }} />
      <div style={{ position: 'absolute', inset: 0, ...grainBg, opacity: 0.4 }} />

      <CropMarks color={mn.ink} />

      <div
        className="k-hero-caption"
        style={{
          position: 'absolute', left: 'clamp(20px, 5vw, 56px)', bottom: 80, zIndex: 3,
          maxWidth: 700,
        }}
      >
        <div style={{
          fontFamily: '"JetBrains Mono"', fontSize: 11, letterSpacing: '0.3em',
          textTransform: 'uppercase', color: mn.accent, marginBottom: 24,
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <span style={{ width: 28, height: 1, background: mn.accent }} />
          Featured · 005 / Long way home
        </div>
        <h1 style={{
          fontFamily: '"Fraunces", "Instrument Serif", serif',
          fontSize: 'clamp(56px, 11vw, 144px)', lineHeight: 0.88, margin: 0, fontWeight: 300,
          letterSpacing: '-0.035em',
          color: mn.ink,
          textShadow: isDark ? `0 4px 40px ${mn.bg}` : `0 2px 24px ${mn.bg}cc`,
        }}>
          {isDark ? <>After hours,<br /></> : <>After noon,<br /></>}
          <span style={{ fontStyle: 'italic', color: mn.accent }}>still drawing.</span>
        </h1>
        <p style={{
          fontSize: 16, lineHeight: 1.55, color: mn.inkDim,
          maxWidth: 440, marginTop: 32,
        }}>
          Concept &amp; character art for stories told in {isDark ? 'low light' : 'warm light'}. Indie games, music covers, editorial. Studio open since 2021.
        </p>
      </div>

      <div
        className="k-hero-meta"
        style={{
          position: 'absolute', right: 'clamp(20px, 5vw, 56px)', top: 56, zIndex: 3,
          textAlign: 'right',
        }}
      >
        <div style={{
          fontFamily: '"JetBrains Mono"', fontSize: 10, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: mn.inkDim, marginBottom: 6,
        }}>Now Showing</div>
        <div style={{ fontFamily: '"Fraunces", serif', fontSize: 'clamp(18px, 2.4vw, 24px)', fontStyle: 'italic', lineHeight: 1.2 }}>
          48 works · 5 years<br />of {isDark ? 'late-night' : 'long-afternoon'} light.
        </div>
      </div>

      <div
        className="k-hero-scroll"
        style={{
          position: 'absolute', right: 56, bottom: 80, zIndex: 3,
          textAlign: 'right',
        }}
      >
        <div style={{
          fontFamily: '"JetBrains Mono"', fontSize: 10, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: mn.inkDim, marginBottom: 10,
        }}>Scroll the archive</div>
        <div style={{ fontSize: 32, color: mn.accent }}>↓</div>
      </div>
    </section>
  );
}
