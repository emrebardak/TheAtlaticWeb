export type Language = 'tr' | 'en';

export interface Copy {
  nav: {
    items: { label: string; href: string }[];
  };
  hero: {
    badgeNewLabel: string;
    badgeText: string;
    headline: string;
    subtext: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: { icon: 'clock' | 'globe'; value: string; label: string }[];
    trustBarText: string;
  };
  instagram: {
    label: string;
    heading: string[];
    handleLabel: string;
  };
  location: {
    label: string;
    heading: string[];
    addressTitle: string;
    hoursTitle: string;
    hours: string;
    mapTitle: string;
  };
  contact: {
    label: string;
    heading: string[];
    mailTitle: string;
    phoneTitle: string;
    footer: string;
    footerLinks: string[];
  };
}

export const translations: Record<Language, Copy> = {
  tr: {
    nav: {
      items: [
        { label: 'Konum', href: '#location' },
        { label: 'İletişim', href: '#contact' },
      ],
    },
    hero: {
      badgeNewLabel: 'Yeni',
      badgeText: 'Şimdi Açığız — Kurucu Üye Fiyatları Geçerli',
      headline: 'Beton Ve Çelikte Dövülen Ham Güç',
      subtext:
        'The Atletic Base, öne çıkanlar için kurulmuş endüstriyel standartlarda bir antrenman tesisi. Çıplak beton, puslu mavi ışık ve asla yorulmayan ekipmanlar — güç, kondisyon ve topluluk için inşa edildi.',
      ctaPrimary: 'Hemen Katıl',
      ctaSecondary: 'Mekanı İzle',
      stats: [
        { icon: 'clock', value: '7 Gün', label: 'Haftanın Her Günü Açığız' },
        { icon: 'globe', value: '500+', label: 'Her Hafta Güçlenen Üye Kitlesi' },
      ],
      trustBarText:
        'Şehrin dört bir yanındaki sporcuların, koçların ve azimli çalışanların güvendiği salon',
    },
    instagram: {
      label: '// Bizi Takip Edin',
      heading: ['Salon', 'zemininden'],
      handleLabel: '@theathleticbaseofficial.tr',
    },
    location: {
      label: '// Bizi Bulun',
      heading: ['Beton duvarlar,', 'bulması kolay'],
      addressTitle: 'Adres',
      hoursTitle: 'Çalışma Saatleri',
      hours: 'Hafta içi 08:00–23:00, hafta sonu 09:00–22:00',
      mapTitle: 'The Atletic Base konum haritası',
    },
    contact: {
      label: '// İletişim',
      heading: ['Bize', 'ulaşın'],
      mailTitle: 'E-posta',
      phoneTitle: 'Telefon',
      footer: '© 2026 The Atletic Base',
      footerLinks: ['Gizlilik Politikası', 'Çerez Politikası', 'Şartlar ve Koşullar'],
    },
  },
  en: {
    nav: {
      items: [
        { label: 'Location', href: '#location' },
        { label: 'Contact', href: '#contact' },
      ],
    },
    hero: {
      badgeNewLabel: 'New',
      badgeText: 'Now Open — Founding Member Rates Available',
      headline: 'Raw Strength Forged In Concrete And Steel',
      subtext:
        "The Atletic Base is an industrial-grade training facility built for those who show up. Exposed concrete, moody blue light, and equipment that doesn't quit — built for strength, conditioning, and community.",
      ctaPrimary: 'Join Now',
      ctaSecondary: 'Watch The Space',
      stats: [
        { icon: 'clock', value: '7 Days', label: 'Open Every Day Of The Week' },
        { icon: 'globe', value: '500+', label: 'Members Training Strong Every Week' },
      ],
      trustBarText: 'Trusted by athletes, coaches, and everyday grinders across the city',
    },
    instagram: {
      label: '// Follow Us',
      heading: ['From the', 'gym floor'],
      handleLabel: '@theathleticbaseofficial.tr',
    },
    location: {
      label: '// Find Us',
      heading: ['Concrete walls,', 'easy to find'],
      addressTitle: 'Address',
      hoursTitle: 'Hours',
      hours: 'Weekdays 08:00–23:00, weekends 09:00–22:00',
      mapTitle: 'The Atletic Base location map',
    },
    contact: {
      label: '// Contact',
      heading: ['Get in', 'touch'],
      mailTitle: 'Mail',
      phoneTitle: 'Phone',
      footer: '© 2026 The Atletic Base',
      footerLinks: ['Privacy Policy', 'Cookie Policy', 'Terms and Conditions'],
    },
  },
};
