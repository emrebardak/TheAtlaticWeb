import { ArrowUpRight } from './icons';
import { NAV_LINKS, HERO_NAV_CTA_TEXT, HERO_LOGO_INITIALS } from '../content/copy';

export function Nav() {
  return (
    <nav className="fixed inset-x-0 top-4 z-50 flex items-center justify-between px-8 lg:px-16">
      <div className="liquid-glass flex h-12 w-12 items-center justify-center rounded-full">
        <span className="font-heading text-2xl italic">{HERO_LOGO_INITIALS}</span>
      </div>

      <div className="liquid-glass hidden items-center rounded-full px-1.5 py-1.5 md:flex">
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href={link === 'Programs' ? '#programs' : '#'}
            className="px-3 py-2 font-body text-sm font-medium text-white/90"
          >
            {link}
          </a>
        ))}
        <button
          type="button"
          className="flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-medium text-black"
        >
          {HERO_NAV_CTA_TEXT}
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>

      <div className="hidden h-12 w-12 md:block" />
    </nav>
  );
}
