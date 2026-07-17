import { motion } from 'framer-motion';
import { FadingVideo } from '../components/FadingVideo';
import { BlurText } from '../components/BlurText';
import { ArrowUpRight, Play, ClockIcon, GlobeIcon } from '../components/icons';
import {
  HERO_BADGE_TEXT,
  HERO_HEADLINE,
  HERO_SUBTEXT,
  HERO_BADGE_NEW_LABEL,
  HERO_STATS,
  HERO_CTA_PRIMARY_TEXT,
  HERO_CTA_SECONDARY_TEXT,
  TRUST_BAR_TEXT,
  TRUST_STATS,
} from '../content/copy';
import { HERO_VIDEO_SRC } from '../content/media';

const fadeUp = {
  initial: { filter: 'blur(10px)', opacity: 0, y: 20 },
  animate: { filter: 'blur(0px)', opacity: 1, y: 0 },
};

const STAT_ICONS: Record<'clock' | 'globe', typeof ClockIcon> = {
  clock: ClockIcon,
  globe: GlobeIcon,
};

export function Hero() {
  return (
    <section className="relative h-screen overflow-hidden bg-black">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(10,26,47,0.55) 0%, rgba(10,26,47,0) 60%)',
        }}
      />
      <FadingVideo
        src={HERO_VIDEO_SRC}
        className="absolute left-1/2 top-0 z-0 -translate-x-1/2 object-cover object-top"
        style={{ width: '120%', height: '120%' }}
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-4 pt-24 text-center">
          <motion.div
            className="liquid-glass flex items-center gap-2 rounded-full px-4 py-2"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
          >
            <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-black">
              {HERO_BADGE_NEW_LABEL}
            </span>
            <span className="font-body text-sm text-white/90">{HERO_BADGE_TEXT}</span>
          </motion.div>

          <div className="mt-6 max-w-3xl">
            <BlurText
              text={HERO_HEADLINE}
              className="font-heading text-6xl italic leading-[0.8] tracking-[-4px] text-white md:text-7xl lg:text-[5.5rem]"
            />
          </div>

          <motion.p
            className="mt-4 max-w-2xl font-body text-sm font-light leading-tight text-white md:text-base"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.8 }}
          >
            {HERO_SUBTEXT}
          </motion.p>

          <motion.div
            className="mt-6 flex flex-col items-center gap-6 sm:flex-row"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 1.1 }}
          >
            <button
              type="button"
              className="liquid-glass-strong flex items-center gap-2 rounded-full px-5 py-2.5 font-body text-sm font-medium text-white"
            >
              {HERO_CTA_PRIMARY_TEXT}
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="flex items-center gap-2 font-body text-sm font-medium text-white"
            >
              <Play className="h-4 w-4" />
              {HERO_CTA_SECONDARY_TEXT}
            </button>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-col gap-4 sm:flex-row"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 1.3 }}
          >
            {HERO_STATS.map((stat) => {
              const Icon = STAT_ICONS[stat.icon];
              return (
                <div
                  key={stat.label}
                  className="liquid-glass w-[220px] rounded-[1.25rem] p-5 text-left"
                >
                  <Icon className="h-5 w-5 text-white/80" />
                  <div className="mt-4 font-heading text-4xl italic leading-none tracking-[-1px] text-white">
                    {stat.value}
                  </div>
                  <div className="mt-2 font-body text-sm text-white/80">{stat.label}</div>
                </div>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          className="flex flex-col items-center gap-4 pb-8"
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 1.4 }}
        >
          <div className="liquid-glass rounded-full px-4 py-2 font-body text-sm text-white/90">
            {TRUST_BAR_TEXT}
          </div>
          <div className="flex flex-wrap justify-center gap-3 px-4">
            {TRUST_STATS.map((stat) => (
              <span
                key={stat}
                className="liquid-glass rounded-full px-4 py-1.5 font-body text-sm text-white/90"
              >
                {stat}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
