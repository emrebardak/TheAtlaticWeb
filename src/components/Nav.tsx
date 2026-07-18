import { useLanguage } from '../i18n/LanguageContext';
import { LOGO_IMAGE } from '../content/media';

export function Nav() {
  const { language, setLanguage, copy } = useLanguage();

  return (
    <nav className="fixed inset-x-0 top-4 z-50 flex items-center justify-between px-8 lg:px-16">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="liquid-glass flex h-12 w-12 items-center justify-center rounded-full"
      >
        <img src={LOGO_IMAGE} alt="The Atletic Base" className="h-full w-full object-cover" />
      </button>

      <div className="liquid-glass flex items-center rounded-full px-1.5 py-1.5">
        {copy.nav.items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="px-4 py-2 font-body text-sm font-medium text-white/90"
          >
            {item.label}
          </a>
        ))}
      </div>

      <div className="liquid-glass flex items-center gap-0.5 rounded-full p-1">
        <button
          type="button"
          onClick={() => setLanguage('tr')}
          className={`rounded-full px-2.5 py-1.5 font-body text-xs font-medium transition-colors ${
            language === 'tr' ? 'bg-white text-black' : 'text-white/70'
          }`}
        >
          TR
        </button>
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`rounded-full px-2.5 py-1.5 font-body text-xs font-medium transition-colors ${
            language === 'en' ? 'bg-white text-black' : 'text-white/70'
          }`}
        >
          EN
        </button>
      </div>
    </nav>
  );
}
