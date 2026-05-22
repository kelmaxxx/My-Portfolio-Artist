// Theme tokens for Midnight Studio (dark) and Daylight Studio (light).
// Colors pulled from Kelma's paintings — auburn / warm cream for day,
// deep midnight blue with sunflower accent for night.

export const MN_DARK = {
  bg: '#0e1220',
  bgDeep: '#080a14',
  ink: '#f3e1d4',
  inkDim: '#8a8290',
  inkSoft: 'rgba(243,225,212,0.08)',
  inkLine: 'rgba(243,225,212,0.08)',
  inkFaint: 'rgba(243,225,212,0.05)',
  inkBorder: 'rgba(243,225,212,0.06)',
  accent: '#f3c544',
  rose: '#e26a52',
  navy: '#1c2545',
  vignetteBg: 'rgba(14,18,32,1)',
  vignetteSoft: 'rgba(14,18,32,0.92)',
  vignetteEdge: 'rgba(14,18,32,0.8)',
  artOpacity: 0.55,
  artFilter: 'saturate(1.1) contrast(1.05)',
  ctaText: '#0e1220',
};

export const MN_LIGHT = {
  bg: '#f3e4d5',
  bgDeep: '#ead0b8',
  ink: '#2a1410',
  inkDim: '#8c6f60',
  inkSoft: 'rgba(42,20,16,0.08)',
  inkLine: 'rgba(42,20,16,0.12)',
  inkFaint: 'rgba(42,20,16,0.04)',
  inkBorder: 'rgba(42,20,16,0.10)',
  accent: '#c8851a',
  rose: '#b94426',
  navy: '#2c3e5a',
  vignetteBg: 'rgba(243,228,213,1)',
  vignetteSoft: 'rgba(243,228,213,0.85)',
  vignetteEdge: 'rgba(243,228,213,0.7)',
  artOpacity: 0.85,
  artFilter: 'saturate(1.05) contrast(1.0)',
  ctaText: '#fdf6ef',
};

export function makeGrain(_mn, isDark) {
  if (isDark) {
    return {
      backgroundImage:
        'radial-gradient(circle at 30% 20%, rgba(243,197,68,0.08), transparent 50%),' +
        'radial-gradient(circle at 80% 80%, rgba(226,106,82,0.06), transparent 45%),' +
        'radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1.5px)',
      backgroundSize: 'auto, auto, 4px 4px',
    };
  }
  return {
    backgroundImage:
      'radial-gradient(circle at 30% 20%, rgba(200,133,26,0.10), transparent 50%),' +
      'radial-gradient(circle at 80% 80%, rgba(185,68,38,0.07), transparent 45%),' +
      'radial-gradient(circle, rgba(42,20,16,0.04) 1px, transparent 1.5px)',
    backgroundSize: 'auto, auto, 4px 4px',
  };
}
