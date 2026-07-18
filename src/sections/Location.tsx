import { useLanguage } from '../i18n/LanguageContext';
import { MAP_EMBED_URL } from '../content/media';
import { LOCATION_ADDRESS } from '../content/contactInfo';

export function Location() {
  const { copy } = useLanguage();
  const location = copy.location;

  return (
    <section id="location" className="relative overflow-hidden bg-black/60">
      <div className="relative z-10 px-8 py-24 md:px-16 lg:px-20">
        <p className="mb-6 font-body text-sm text-white/80">{location.label}</p>
        <h2 className="font-heading text-5xl italic leading-[0.9] tracking-[-2px] text-white md:text-6xl lg:text-7xl">
          {location.heading.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="liquid-glass overflow-hidden rounded-[1.25rem] lg:col-span-2">
            <iframe
              src={MAP_EMBED_URL}
              title={location.mapTitle}
              className="h-[360px] w-full border-0 md:h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="liquid-glass flex flex-col justify-center rounded-[1.25rem] p-6">
            <h3 className="font-heading text-2xl italic tracking-[-1px] text-white">
              {location.addressTitle}
            </h3>
            <p className="mt-2 font-body text-sm font-light text-white/90">{LOCATION_ADDRESS}</p>
            <h3 className="mt-6 font-heading text-2xl italic tracking-[-1px] text-white">
              {location.hoursTitle}
            </h3>
            <p className="mt-2 font-body text-sm font-light text-white/90">{location.hours}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
