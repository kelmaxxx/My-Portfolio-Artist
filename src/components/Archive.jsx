import { works } from '../data/works.js';

const FILTERS = ['ALL', 'PORTRAIT', 'CONCEPT', 'STUDY'];

export default function Archive({ mn, isDark, grainBg }) {
  return (
    <section
      id="work"
      className="k-section-pad"
      style={{ padding: '120px 56px 80px', position: 'relative', zIndex: 2 }}
    >
      <div
        className="k-archive-header"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 56 }}
      >
        <div>
          <div style={{
            fontFamily: '"JetBrains Mono"', fontSize: 11, letterSpacing: '0.3em',
            textTransform: 'uppercase', color: mn.accent, marginBottom: 16,
          }}>§ I — THE ARCHIVE</div>
          <h2 style={{
            fontFamily: '"Fraunces", serif',
            fontSize: 'clamp(40px, 7vw, 80px)',
            fontWeight: 300, margin: 0, letterSpacing: '-0.03em', lineHeight: 0.95,
          }}>
            {works.length === 1 ? 'One' : works.length} <span style={{ fontStyle: 'italic', color: mn.accent }}>
              {works.length === 1 ? 'piece' : 'pieces'}
            </span>,<br />
            lit one at a time.
          </h2>
        </div>
        <div style={{
          display: 'flex', gap: 4,
          background: mn.inkFaint,
          padding: 4, borderRadius: 12,
          border: `1px solid ${mn.inkBorder}`,
          alignSelf: 'flex-end',
        }}>
          {FILTERS.map((t, i) => (
            <span key={t} style={{
              padding: '8px 14px', borderRadius: 8, fontSize: 11,
              fontFamily: '"JetBrains Mono"', letterSpacing: '0.15em',
              background: i === 0 ? mn.ink : 'transparent',
              color: i === 0 ? mn.bg : mn.inkDim,
              fontWeight: 600,
            }}>{t}</span>
          ))}
        </div>
      </div>

      <div
        className="k-archive-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gridAutoRows: '120px',
          gap: 16,
        }}
      >
        {works.map(p => (
          <article
            key={p.n}
            style={{
              gridRow: p.span.rows,
              gridColumn: p.span.cols,
              position: 'relative',
              border: `1px solid ${mn.inkBorder}`,
              overflow: 'hidden',
              background: mn.bgDeep,
            }}
          >
            <picture>
              <source srcSet={`${p.img}.webp`} type="image/webp" />
              <img
                src={`${p.img}.png`}
                alt={p.title}
                loading="lazy"
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'center',
                  transition: 'transform .6s cubic-bezier(.2,.7,.3,1)',
                }}
              />
            </picture>
            <div style={{ position: 'absolute', inset: 0, ...grainBg, opacity: 0.3, pointerEvents: 'none' }} />
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: isDark
                ? 'linear-gradient(180deg, transparent 50%, rgba(8,10,20,0.85))'
                : 'linear-gradient(180deg, transparent 50%, rgba(42,20,16,0.55))',
            }} />
            <div style={{
              position: 'absolute', top: 14, left: 14,
              fontFamily: '"JetBrains Mono"', fontSize: 9,
              letterSpacing: '0.2em', color: '#f3e1d4', opacity: 0.85,
            }}>№ {p.n}</div>
            <div style={{
              position: 'absolute', bottom: 14, left: 16, right: 16,
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              color: '#f3e1d4',
            }}>
              <div style={{ fontFamily: '"Fraunces", serif', fontSize: 18, fontStyle: 'italic' }}>{p.title}</div>
              <div style={{ fontFamily: '"JetBrains Mono"', fontSize: 10, opacity: 0.7 }}>{p.year} →</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
