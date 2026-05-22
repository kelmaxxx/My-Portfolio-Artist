import { useState } from 'react';
import { tiers } from '../data/tiers.js';
import { status, contact } from '../data/status.js';

const TERMS = [
  'Prepare a clear reference before booking.',
  '50/50 payment — 50% after sketch approval, 50% before final delivery.',
  'I retain all rights to the artwork.',
  'Updates shared throughout the process — small detail changes are fine, larger changes incur a fee.',
  'Simple backgrounds only — anything more complex is quoted separately.',
  'Strictly no cancellations once payment is received.',
];

const ADDONS = [
  { name: 'Additional character', fee: '+50% – 100%' },
  { name: 'Commercial use', fee: '+50% – 200%' },
  { name: 'Detail / accessory changes', fee: 'small fee' },
];

export default function Commission({ mn, isDark }) {
  const [openTier, setOpenTier] = useState(null);
  const active = tiers.find(t => t.num === openTier);

  return (
    <section
      id="commission"
      className="k-section-pad"
      style={{ padding: '80px 56px 120px', position: 'relative' }}
    >
      <div
        className="k-commission-card"
        style={{
          background: mn.bgDeep,
          border: `1px solid ${mn.inkBorder}`,
          borderRadius: 24, padding: 64,
          position: 'relative', overflow: 'hidden',
          transition: 'background .35s',
        }}
      >
        <div style={{
          position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 600, borderRadius: '50%',
          background: `radial-gradient(circle, ${mn.accent}33, transparent 60%)`,
          pointerEvents: 'none',
        }} />

        <div
          className="k-commission-top"
          style={{
            display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 80,
            alignItems: 'start', position: 'relative', marginBottom: 56,
          }}
        >
          <div>
            <div style={{
              fontFamily: '"JetBrains Mono"', fontSize: 11, letterSpacing: '0.3em',
              textTransform: 'uppercase', color: mn.accent, marginBottom: 24,
            }}>§ II — Commissions · Open</div>
            <h2 style={{
              fontFamily: '"Fraunces", serif',
              fontSize: 'clamp(36px, 5.5vw, 64px)',
              fontWeight: 300, margin: 0, lineHeight: 1, letterSpacing: '-0.025em',
            }}>
              Three sizes.<br />
              <span style={{ fontStyle: 'italic', color: mn.accent }}>Pick the one that fits.</span>
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: mn.inkDim, marginTop: 24, maxWidth: 460 }}>
              Each piece is hand-drawn from scratch with you — no presets, no AI, no shortcuts. Slots open monthly, message me on socials to claim one.
            </p>
          </div>

          <div style={{
            background: mn.inkFaint, border: `1px solid ${mn.inkBorder}`,
            borderRadius: 16, padding: '24px 28px',
            fontFamily: '"JetBrains Mono"',
          }}>
            <div style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: mn.inkDim, marginBottom: 18 }}>Status board</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 28px' }}>
              <StatusCell mn={mn} label="Slots" big={String(status.open)} small={` / ${status.slots}`} note="open" highlight />
              <StatusCell mn={mn} label="Waitlist" big={String(status.waitlist)} small={` / ${status.waitlistMax}`} note="queued" />
              <StatusCell mn={mn} label="Turnaround" big={status.turnaround} note={status.turnaroundNote} italic />
              <StatusCell mn={mn} label="Payment" big={status.payment} note={status.paymentNote} italic />
            </div>
          </div>
        </div>

        <div
          className="k-tier-row"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, position: 'relative' }}
        >
          {tiers.map(t => {
            const isOpen = openTier === t.num;
            return (
              <button
                key={t.num}
                onClick={() => setOpenTier(isOpen ? null : t.num)}
                aria-expanded={isOpen}
                style={{
                  background: t.hot
                    ? (isDark ? 'rgba(243,197,68,0.08)' : 'rgba(200,133,26,0.10)')
                    : mn.inkFaint,
                  border: `1px solid ${isOpen ? mn.accent : (t.hot ? mn.accent + '60' : mn.inkBorder)}`,
                  borderRadius: 14, padding: '28px 28px 24px',
                  position: 'relative', display: 'flex', flexDirection: 'column',
                  cursor: 'pointer', textAlign: 'left',
                  color: 'inherit', fontFamily: 'inherit',
                  boxShadow: isOpen ? `0 12px 32px ${mn.accent}33, 0 0 0 1px ${mn.accent}` : 'none',
                  transform: isOpen ? 'translateY(-2px)' : 'translateY(0)',
                  transition: 'transform .3s cubic-bezier(.2,.7,.3,1), box-shadow .3s, border-color .25s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
                  <div style={{ fontFamily: '"JetBrains Mono"', fontSize: 11, color: mn.inkDim, letterSpacing: '0.2em' }}>№ {t.num}</div>
                  {t.hot && (
                    <span style={{
                      fontFamily: '"JetBrains Mono"', fontSize: 9, background: mn.accent, color: mn.ctaText,
                      padding: '4px 9px', borderRadius: 999, letterSpacing: '0.15em',
                      textTransform: 'uppercase', fontWeight: 700,
                    }}>Most chosen</span>
                  )}
                </div>
                <div style={{ fontFamily: '"Fraunces", serif', fontSize: 38, fontStyle: 'italic', lineHeight: 1 }}>{t.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 16 }}>
                  <span style={{ fontFamily: '"Fraunces", serif', fontSize: 52, color: t.hot ? mn.accent : mn.ink, lineHeight: 1 }}>{t.price}</span>
                  <span style={{ fontFamily: '"JetBrains Mono"', fontSize: 12, color: mn.inkDim, letterSpacing: '0.15em', fontWeight: 600 }}>PHP</span>
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.55, color: mn.inkDim, marginTop: 14, marginBottom: 18, flex: 1 }}>{t.desc}</p>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  paddingTop: 14, borderTop: `1px dashed ${mn.inkBorder}`,
                  fontFamily: '"JetBrains Mono"', fontSize: 10,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: isOpen ? mn.accent : mn.inkDim,
                  transition: 'color .2s',
                }}>
                  <span>{isOpen ? 'Hide sample' : 'View sample'}</span>
                  <span style={{
                    display: 'inline-block',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform .3s cubic-bezier(.2,.7,.3,1)',
                    fontSize: 14,
                  }}>↓</span>
                </div>
              </button>
            );
          })}
        </div>

        <div style={{
          maxHeight: openTier ? 720 : 0,
          marginTop: openTier ? 14 : 0,
          overflow: 'hidden',
          transition: 'max-height .55s cubic-bezier(.2,.7,.3,1), margin-top .35s ease',
          position: 'relative',
        }}>
          {active && (
            <div
              key={active.num}
              className="k-expand-grid"
              style={{
                background: mn.inkFaint,
                border: `1px solid ${mn.accent}40`,
                borderRadius: 14,
                padding: 0, overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                minHeight: 480,
                animation: 'kelma-fadein .45s cubic-bezier(.2,.7,.3,1) both',
              }}
            >
              <div
                className="k-expand-image"
                style={{
                  position: 'relative',
                  background: `url(${active.sample}.webp) ${active.sampleBg}/${active.sampleSize} no-repeat`,
                  backgroundColor: mn.bgDeep,
                  minHeight: 480,
                }}
              >
                <div style={{
                  position: 'absolute', top: 20, left: 20,
                  background: 'rgba(8,10,20,0.7)', backdropFilter: 'blur(8px)',
                  color: '#f3e1d4', padding: '8px 14px', borderRadius: 999,
                  fontFamily: '"JetBrains Mono"', fontSize: 10,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  border: '1px solid rgba(243,225,212,0.15)',
                }}>
                  Sample · {active.name}
                </div>
                {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(corner => {
                  const [v, h] = corner.split('-');
                  return (
                    <div key={corner} style={{
                      position: 'absolute',
                      [v]: 14, [h]: 14,
                      width: 16, height: 16,
                      borderTop: v === 'top' ? '1.5px solid #f3e1d4' : 'none',
                      borderBottom: v === 'bottom' ? '1.5px solid #f3e1d4' : 'none',
                      borderLeft: h === 'left' ? '1.5px solid #f3e1d4' : 'none',
                      borderRight: h === 'right' ? '1.5px solid #f3e1d4' : 'none',
                      opacity: 0.5,
                    }} />
                  );
                })}
              </div>

              <div style={{ padding: '40px 44px', display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <div style={{
                      fontFamily: '"JetBrains Mono"', fontSize: 10, color: mn.inkDim,
                      letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 6,
                    }}>№ {active.num} · Tier sample</div>
                    <div style={{ fontFamily: '"Fraunces", serif', fontSize: 48, fontStyle: 'italic', lineHeight: 1 }}>{active.name}</div>
                  </div>
                  <button
                    onClick={() => setOpenTier(null)}
                    aria-label="Close sample"
                    style={{
                      background: 'transparent', border: `1px solid ${mn.inkBorder}`,
                      width: 32, height: 32, borderRadius: '50%', cursor: 'pointer',
                      color: mn.inkDim, fontFamily: 'inherit', fontSize: 14,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >×</button>
                </div>

                <p style={{ fontSize: 14, lineHeight: 1.6, color: mn.inkDim, margin: 0 }}>{active.long}</p>

                <div>
                  <div style={{
                    fontFamily: '"JetBrains Mono"', fontSize: 10, color: mn.inkDim,
                    letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10,
                  }}>What's included</div>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {active.includes.map((item, i) => (
                      <li key={i} style={{ fontSize: 13, color: mn.ink, display: 'flex', gap: 10, alignItems: 'baseline' }}>
                        <span style={{ color: mn.accent, fontFamily: '"JetBrains Mono"', fontSize: 10 }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
                  paddingTop: 16, borderTop: `1px solid ${mn.inkBorder}`, marginTop: 'auto',
                }}>
                  <div>
                    <div style={{
                      fontFamily: '"JetBrains Mono"', fontSize: 10, color: mn.inkDim,
                      letterSpacing: '0.15em', textTransform: 'uppercase',
                    }}>Price</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
                      <span style={{ fontFamily: '"Fraunces", serif', fontSize: 36, color: mn.accent, lineHeight: 1 }}>{active.price}</span>
                      <span style={{ fontFamily: '"JetBrains Mono"', fontSize: 11, color: mn.inkDim, letterSpacing: '0.15em' }}>PHP</span>
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontFamily: '"JetBrains Mono"', fontSize: 10, color: mn.inkDim,
                      letterSpacing: '0.15em', textTransform: 'uppercase',
                    }}>Turnaround</div>
                    <div style={{ fontFamily: '"Fraunces", serif', fontSize: 22, color: mn.ink, lineHeight: 1, marginTop: 8, fontStyle: 'italic' }}>{active.tat}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <style>{`
          @keyframes kelma-fadein {
            from { opacity: 0; transform: translateY(-8px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        <div
          className="k-terms-row"
          style={{ marginTop: 56, display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56, position: 'relative' }}
        >
          <div>
            <SectionEyebrow mn={mn}>Terms & conditions</SectionEyebrow>
            <ol
              className="k-terms-list"
              style={{
                margin: 0, padding: 0, listStyle: 'none',
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 32px',
                fontSize: 14, lineHeight: 1.55,
              }}
            >
              {TERMS.map((rule, i) => (
                <li key={i} style={{ display: 'flex', gap: 14, color: mn.ink }}>
                  <span style={{
                    fontFamily: '"JetBrains Mono"', fontSize: 10, color: mn.inkDim,
                    letterSpacing: '0.1em', paddingTop: 4, flex: '0 0 24px',
                  }}>{String(i + 1).padStart(2, '0')}.</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <SectionEyebrow mn={mn}>Add-on fees</SectionEyebrow>
            <div style={{
              background: mn.inkFaint, border: `1px solid ${mn.inkBorder}`,
              borderRadius: 12, padding: '4px 0',
            }}>
              {ADDONS.map((a, i, arr) => (
                <div key={a.name} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                  padding: '14px 22px',
                  borderBottom: i < arr.length - 1 ? `1px solid ${mn.inkBorder}` : 'none',
                }}>
                  <span style={{ fontSize: 13, color: mn.ink }}>{a.name}</span>
                  <span style={{ fontFamily: '"JetBrains Mono"', fontSize: 12, color: mn.accent, letterSpacing: '0.05em' }}>{a.fee}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="k-cta-row"
          style={{
            marginTop: 48, display: 'flex', gap: 12, position: 'relative',
            flexWrap: 'wrap', alignItems: 'center',
          }}
        >
          <a
            href={contact.claimSlotMailto}
            style={{
              background: mn.accent, color: mn.ctaText, border: 'none',
              padding: '20px 36px', borderRadius: 999,
              fontSize: 13, fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', cursor: 'pointer', textDecoration: 'none',
              fontFamily: '"JetBrains Mono"',
              boxShadow: `0 8px 32px ${mn.accent}40`,
              display: 'inline-block',
            }}
          >
            Claim a slot →
          </a>
          <a
            href={contact.waitlistMailto}
            style={{
              background: 'transparent', color: mn.ink,
              border: `1px solid ${mn.inkLine}`,
              padding: '20px 32px', borderRadius: 999,
              fontSize: 13, fontWeight: 600, letterSpacing: '0.2em',
              textTransform: 'uppercase', cursor: 'pointer', textDecoration: 'none',
              fontFamily: '"JetBrains Mono"',
              display: 'inline-block',
            }}
          >
            Join the waitlist
          </a>
          <div style={{
            fontFamily: '"JetBrains Mono"', fontSize: 11, color: mn.inkDim,
            letterSpacing: '0.15em', textTransform: 'uppercase', marginLeft: 'auto',
          }}>
            By claiming a slot you agree to the terms above.
          </div>
        </div>
      </div>
    </section>
  );
}

function StatusCell({ mn, label, big, small, note, italic, highlight }) {
  return (
    <div>
      <div style={{ fontSize: 10, color: mn.inkDim, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{label}</div>
      <div style={{
        fontFamily: '"Fraunces", serif',
        fontSize: italic ? 22 : 32,
        color: highlight ? mn.accent : mn.ink,
        lineHeight: 1, marginTop: 6,
        fontStyle: italic ? 'italic' : 'normal',
      }}>
        {big}{small && <span style={{ color: mn.inkDim, fontSize: italic ? 16 : 22 }}>{small}</span>}
      </div>
      <div style={{ fontSize: 10, color: mn.inkDim, marginTop: 4, letterSpacing: '0.1em' }}>{note}</div>
    </div>
  );
}

function SectionEyebrow({ mn, children }) {
  return (
    <div style={{
      fontFamily: '"JetBrains Mono"', fontSize: 11, letterSpacing: '0.3em',
      textTransform: 'uppercase', color: mn.accent, marginBottom: 20,
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <span style={{ width: 24, height: 1, background: mn.accent }} />
      {children}
    </div>
  );
}
