// The Archive — your real paintings. Add new pieces here as you finish them.
// `span` controls how the tile sits in the desktop 6-col grid (cols × rows).
// `img` should point at a file in /public/assets/.

export const works = [
  {
    n: '001',
    title: 'Stairway, Sunday',
    year: 2024,
    img: '/assets/kelma-01',
    span: { cols: 'span 3', rows: 'span 5' },
  },
  {
    n: '003',
    title: 'Afternoon, alone',
    year: 2024,
    img: '/assets/kelma-03-portrait',
    span: { cols: 'span 3', rows: 'span 5' },
  },
  {
    n: '005',
    title: 'Long way home',
    year: 2024,
    img: '/assets/kelma-02-sunset',
    span: { cols: 'span 6', rows: 'span 4' },
  },
];
