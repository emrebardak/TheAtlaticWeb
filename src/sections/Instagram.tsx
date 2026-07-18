import { useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { INSTAGRAM_URL, INSTAGRAM_POST_URLS } from '../content/contactInfo';
import { InstagramEmbed } from '../components/InstagramEmbed';
import { FadeOnScroll } from '../components/FadeOnScroll';

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const EMBED_SCRIPT_SRC = 'https://www.instagram.com/embed.js';

function loadInstagramEmbedScript(): Promise<void> {
  return new Promise((resolve) => {
    if (window.instgrm) {
      resolve();
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${EMBED_SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      return;
    }
    const script = document.createElement('script');
    script.src = EMBED_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
}

export function Instagram() {
  const { copy } = useLanguage();
  const instagram = copy.instagram;

  useEffect(() => {
    let cancelled = false;
    loadInstagramEmbedScript().then(() => {
      if (!cancelled) window.instgrm?.Embeds.process();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="instagram" className="relative overflow-hidden bg-black/60">
      <FadeOnScroll className="relative z-10 px-8 py-24 md:px-16 lg:px-20">
        <p className="mb-6 font-body text-sm text-white/80">{instagram.label}</p>
        <h2 className="font-heading text-5xl italic leading-[0.9] tracking-[-2px] text-white md:text-6xl lg:text-7xl">
          {instagram.heading.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block font-body text-sm text-white/80 underline underline-offset-4"
        >
          {instagram.handleLabel}
        </a>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INSTAGRAM_POST_URLS.map((url) => (
            <div key={url} className="flex justify-center">
              <InstagramEmbed url={url} />
            </div>
          ))}
        </div>
      </FadeOnScroll>
    </section>
  );
}
