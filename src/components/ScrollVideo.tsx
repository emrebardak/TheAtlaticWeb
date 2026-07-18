import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollVideoProps {
  src: string;
}

export function ScrollVideo({ src }: ScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let tween: gsap.core.Tween | null = null;

    // GSAP's own ticker drives the interpolation, so seeks are batched and
    // smoothed instead of one raw seek per scroll event. `scrub: 0.5` adds
    // half a second of catch-up easing so fast/jittery scrolling doesn't
    // translate into a jerky video — see the pasted ScrollTrigger guide,
    // section 4 ("Senkronizasyon ve Pürüzsüzlük: Scrubbing Özelliği").
    const setupScrub = () => {
      video.pause();
      video.currentTime = 0;

      tween = gsap.to(video, {
        currentTime: video.duration,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      });
    };

    video.addEventListener('loadedmetadata', setupScrub);

    return () => {
      video.removeEventListener('loadedmetadata', setupScrub);
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      className="fixed inset-0 z-0 h-full w-full object-cover"
      muted
      playsInline
      preload="auto"
    />
  );
}
