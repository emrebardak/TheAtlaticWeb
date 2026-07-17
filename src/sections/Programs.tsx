import { FadingVideo } from '../components/FadingVideo';
import { ImageIcon, MovieIcon, LightbulbIcon } from '../components/icons';
import { PROGRAMS_LABEL, PROGRAMS_HEADING, PROGRAM_CARDS } from '../content/copy';
import { PROGRAMS_VIDEO_SRC } from '../content/media';

const CARD_ICONS: Record<'image' | 'movie' | 'lightbulb', typeof ImageIcon> = {
  image: ImageIcon,
  movie: MovieIcon,
  lightbulb: LightbulbIcon,
};

export function Programs() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(10,26,47,0.55) 0%, rgba(10,26,47,0) 60%)',
        }}
      />
      <FadingVideo
        src={PROGRAMS_VIDEO_SRC}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      <div className="relative z-10 flex min-h-screen flex-col px-8 pb-10 pt-24 md:px-16 lg:px-20">
        <div className="mb-auto">
          <p className="mb-6 font-body text-sm text-white/80">{PROGRAMS_LABEL}</p>
          <h2 className="font-heading text-6xl italic leading-[0.9] tracking-[-3px] text-white md:text-7xl lg:text-[6rem]">
            {PROGRAMS_HEADING.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PROGRAM_CARDS.map((card) => {
            const Icon = CARD_ICONS[card.icon];
            return (
              <div
                key={card.title}
                className="liquid-glass flex min-h-[360px] flex-col rounded-[1.25rem] p-6"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="liquid-glass flex h-11 w-11 items-center justify-center rounded-[0.75rem]">
                    <Icon className="h-5 w-5 text-white/90" />
                  </div>
                  <div className="flex flex-wrap justify-end gap-1.5">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="liquid-glass whitespace-nowrap rounded-full px-3 py-1 font-body text-[11px] text-white/90"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex-1" />

                <div>
                  <h3 className="font-heading text-3xl italic leading-none tracking-[-1px] text-white md:text-4xl">
                    {card.title}
                  </h3>
                  <p className="mt-3 max-w-[32ch] font-body text-sm font-light leading-snug text-white/90">
                    {card.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
