import { contact, socials, galleries, shop } from '../data/status.js';

const COLS = [
  { h: 'Socials', items: socials },
  { h: 'Galleries', items: galleries },
  { h: 'Shop', items: shop },
];

export default function Footer({ mn }) {
  return (
    <footer
      id="contact"
      className="k-section-pad"
      style={{
        padding: '80px 56px 40px',
        borderTop: `1px solid ${mn.inkLine}`,
        position: 'relative',
      }}
    >
      <div style={{
        fontFamily: '"Fraunces", serif',
        fontSize: 'clamp(56px, 11vw, 120px)',
        fontWeight: 300,
        letterSpacing: '-0.04em', lineHeight: 0.95, color: mn.ink,
      }}>
        <span style={{ fontStyle: 'italic' }}>let's</span> make<br />
        something <span style={{ fontStyle: 'italic', color: mn.accent }}>luminous.</span>
      </div>

      <div
        className="k-footer-cols"
        style={{
          marginTop: 64,
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40,
          paddingTop: 40,
          borderTop: `1px solid ${mn.inkLine}`,
        }}
      >
        <div>
          <ColumnLabel mn={mn}>Direct</ColumnLabel>
          <a
            href={`mailto:${contact.email}`}
            style={{
              color: mn.ink, fontSize: 22, fontFamily: '"Fraunces", serif',
              fontStyle: 'italic', textDecoration: 'none',
            }}
          >
            {contact.email}
          </a>
        </div>
        {COLS.map(col => (
          <div key={col.h}>
            <ColumnLabel mn={mn}>{col.h}</ColumnLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {col.items.map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{ color: mn.ink, fontSize: 14, textDecoration: 'none' }}
                >
                  {item.label} →
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        className="k-footer-bottom"
        style={{
          marginTop: 48, paddingTop: 24,
          borderTop: `1px solid ${mn.inkLine}`,
          display: 'flex', justifyContent: 'space-between',
          fontFamily: '"JetBrains Mono"', fontSize: 10, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: mn.inkDim,
        }}
      >
        <div>© KELMA · MMXXVI · MANILA</div>
        <div>Drawn by hand · Always</div>
      </div>
    </footer>
  );
}

function ColumnLabel({ mn, children }) {
  return (
    <div style={{
      fontFamily: '"JetBrains Mono"', fontSize: 10,
      letterSpacing: '0.2em', textTransform: 'uppercase',
      color: mn.inkDim, marginBottom: 10,
    }}>{children}</div>
  );
}
