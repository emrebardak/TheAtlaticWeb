import { motion } from 'framer-motion';
import { BlurText } from '../components/BlurText';
import { ArrowUpRight, Play, ClockIcon, GlobeIcon } from '../components/icons';
import { useLanguage } from '../i18n/LanguageContext';

const fadeUp = {
  initial: { filter: 'blur(10px)', opacity: 0, y: 20 },
  animate: { filter: 'blur(0px)', opacity: 1, y: 0 },
};

const STAT_ICONS: Record<'clock' | 'globe', typeof ClockIcon> = {
  clock: ClockIcon,
  globe: GlobeIcon,
};

export function Hero() {
  const { copy } = useLanguage();
  const hero = copy.hero;

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(10,26,47,0.55) 0%, rgba(10,26,47,0) 60%)',
        }}
      />

      <motion.div
        className="relative z-10 flex h-full flex-col"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="flex flex-1 flex-col items-center justify-center px-4 pt-24 text-center">
          <motion.div
            className="liquid-glass flex items-center gap-2 rounded-full px-4 py-2"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
          >
            <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-black">
              {hero.badgeNewLabel}
            </span>
            <span className="font-body text-sm text-white/90">{hero.badgeText}</span>
          </motion.div>

          <div className="mt-6 max-w-3xl">
            <BlurText
              key={hero.headline}
              text={hero.headline}
              className="font-heading text-6xl italic leading-[0.8] tracking-[-4px] text-white md:text-7xl lg:text-[5.5rem]"
            />
          </div>

          <motion.p
            className="mt-4 max-w-2xl font-body text-sm font-light leading-tight text-white md:text-base"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.8 }}
          >
            {hero.subtext}
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
              {hero.ctaPrimary}
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="flex items-center gap-2 font-body text-sm font-medium text-white"
            >
              <Play className="h-4 w-4" />
              {hero.ctaSecondary}
            </button>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-col gap-4 sm:flex-row"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 1.3 }}
          >
            {hero.stats.map((stat) => {
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
            {hero.trustBarText}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
