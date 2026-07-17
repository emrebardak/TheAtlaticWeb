export const NAV_LINKS = ['Programs', 'Coaches', 'Facility', 'Membership', 'Contact'] as const;

export const HERO_BADGE_TEXT = 'Now Open — Founding Member Rates Available';

export const HERO_HEADLINE = 'Raw Strength Forged In Concrete And Steel';

export const HERO_SUBTEXT =
  "The Atletic Base is an industrial-grade training facility built for those who show up. Exposed concrete, moody blue light, and equipment that doesn't quit — built for strength, conditioning, and community.";

export const HERO_STATS = [
  { icon: 'clock', value: '24/7', label: 'Round-The-Clock Facility Access' },
  { icon: 'globe', value: '500+', label: 'Members Training Strong Every Week' },
] as const;

export const TRUST_BAR_TEXT =
  'Trusted by athletes, coaches, and everyday grinders across the city';

export const TRUST_STATS = ['Est. 2019', '12 Coaches', '500+ Members', '5.0 Rated', '24/7 Access'];

export const PROGRAMS_LABEL = '// Programs';

export const PROGRAMS_HEADING = ['Concrete floors,', 'real results'];

export const PROGRAM_CARDS = [
  {
    icon: 'image',
    title: 'Strength',
    tags: ['Free Weights', 'Powerlifting', 'Progressive Overload', '1-on-1 Spotting'],
    body: 'Barbells, plates, and concrete platforms built for serious lifting. Progressive programs for beginners through competitive powerlifters.',
  },
  {
    icon: 'movie',
    title: 'Conditioning',
    tags: ['HIIT', 'Group Classes', 'Small Group', 'All Levels'],
    body: 'High-energy group sessions under the blue lights. Conditioning work that builds community as much as capacity.',
  },
  {
    icon: 'lightbulb',
    title: 'Coaching',
    tags: ['1-on-1', 'Nutrition', 'Program Design', 'Accountability'],
    body: "Dedicated coaches build a plan around your goals, your schedule, and your body — then hold you to it.",
  },
] as const;
