// Commission status — edit these numbers as your slot situation changes.
// They show up in the "Status board" inside the Commissions section.

export const status = {
  open: 0,
  slots: 4,
  waitlist: 0,
  waitlistMax: 2,
  turnaround: '3–12 days',
  turnaroundNote: 'after sketch approval',
  payment: 'GCash · 50/50',
  paymentNote: 'down + final',
  takingWork: true,
};

// Where the CTAs send people. Use mailto: or a socials link.
export const contact = {
  email: 'hello@kelma.studio',
  claimSlotMailto:
    'mailto:hello@kelma.studio?subject=Commission%20slot%20request&body=Hi%20Kelma%2C%20I%27d%20like%20to%20claim%20a%20commission%20slot.%20Tier%3A%20%5BHeadshot%20%2F%20Bust%20Up%20%2F%20Halfbody%5D%0A%0AReference%3A%20%5Battach%20or%20link%5D%0A',
  waitlistMailto:
    'mailto:hello@kelma.studio?subject=Waitlist%20%E2%80%94%20commission&body=Hi%20Kelma%2C%20please%20add%20me%20to%20the%20waitlist.%0A',
};

export const socials = [
  { label: 'Instagram', href: 'https://instagram.com/' },
  { label: 'Twitter', href: 'https://twitter.com/' },
  { label: 'Bluesky', href: 'https://bsky.app/' },
];

export const galleries = [
  { label: 'Behance', href: 'https://behance.net/' },
  { label: 'ArtStation', href: 'https://artstation.com/' },
  { label: 'Cara', href: 'https://cara.app/' },
];

export const shop = [
  { label: 'Prints', href: '#' },
  { label: 'Originals', href: '#' },
  { label: 'Zines', href: '#' },
];
