import { useState } from 'react';
import { MN_DARK, MN_LIGHT, makeGrain } from './theme.js';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Archive from './components/Archive.jsx';
import Commission from './components/Commission.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const mn = isDark ? MN_DARK : MN_LIGHT;
  const grainBg = makeGrain(mn, isDark);

  return (
    <div style={{
      width: '100%', minHeight: '100%',
      background: mn.bg,
      fontFamily: '"Geist", "Inter Tight", system-ui, sans-serif',
      color: mn.ink, position: 'relative', overflow: 'hidden',
      transition: 'background .35s ease, color .35s ease',
    }}>
      <div style={{ position: 'absolute', inset: 0, ...grainBg, pointerEvents: 'none', opacity: 0.9 }} />
      <Header mn={mn} isDark={isDark} setIsDark={setIsDark} />
      <Hero mn={mn} isDark={isDark} grainBg={grainBg} />
      <Archive mn={mn} isDark={isDark} grainBg={grainBg} />
      <Commission mn={mn} isDark={isDark} />
      <Footer mn={mn} />
    </div>
  );
}
