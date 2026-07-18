import { useLanguage } from '../i18n/LanguageContext';
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from '../content/contactInfo';

export function Contact() {
  const { copy } = useLanguage();
  const contact = copy.contact;

  return (
    <section id="contact" className="relative overflow-hidden bg-black/60">
      <div className="relative z-10 flex flex-col px-8 pb-10 pt-24 md:px-16 lg:px-20">
        <p className="mb-6 font-body text-sm text-white/80">{contact.label}</p>
        <h2 className="font-heading text-5xl italic leading-[0.9] tracking-[-2px] text-white md:text-6xl lg:text-7xl">
          {contact.heading.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        <div className="mt-12 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
          <a href={`mailto:${CONTACT_EMAIL}`} className="liquid-glass rounded-[1.25rem] p-6">
            <h3 className="font-heading text-2xl italic tracking-[-1px] text-white">
              {contact.mailTitle}
            </h3>
            <p className="mt-2 font-body text-sm font-light text-white/90">{CONTACT_EMAIL}</p>
          </a>
          <a href={`tel:${CONTACT_PHONE_TEL}`} className="liquid-glass rounded-[1.25rem] p-6">
            <h3 className="font-heading text-2xl italic tracking-[-1px] text-white">
              {contact.phoneTitle}
            </h3>
            <p className="mt-2 font-body text-sm font-light text-white/90">
              {CONTACT_PHONE_DISPLAY}
            </p>
          </a>
        </div>

        <div className="mt-16 flex flex-col items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {contact.footerLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="font-body text-sm font-medium text-white/80 hover:text-white"
              >
                {link}
              </a>
            ))}
          </div>
          <p className="text-center font-body text-xs text-white/60">{contact.footer}</p>
        </div>
      </div>
    </section>
  );
}
