import { useEffect, useRef, useState, type CSSProperties } from 'react';

interface FadingVideoProps {
  src: string | string[];
  className?: string;
  style?: CSSProperties;
}

const FADE_IN_MS = 500;
const FADE_OUT_MS = 550;
const FADE_OUT_THRESHOLD_S = 0.55;

export function FadingVideo({ src, className, style }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const opacityRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const fadingOutRef = useRef(false);
  const [sourceIndex, setSourceIndex] = useState(0);

  const sources = Array.isArray(src) ? src : [src];
  const currentSrc = sources[sourceIndex] ?? sources[0];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const animateOpacity = (target: number, durationMs: number) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);

      const start = opacityRef.current;
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        const value = start + (target - start) * progress;
        opacityRef.current = value;
        video.style.opacity = String(value);
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          rafRef.current = null;
        }
      };

      rafRef.current = requestAnimationFrame(step);
    };

    fadingOutRef.current = false;
    video.style.opacity = '0';
    opacityRef.current = 0;

    const handleLoadedData = () => {
      animateOpacity(1, FADE_IN_MS);
    };

    const handleTimeUpdate = () => {
      if (!video.duration || Number.isNaN(video.duration)) return;
      const remaining = video.duration - video.currentTime;
      if (remaining <= FADE_OUT_THRESHOLD_S && !fadingOutRef.current) {
        fadingOutRef.current = true;
        animateOpacity(0, FADE_OUT_MS);
      }
    };

    const handleEnded = () => {
      fadingOutRef.current = false;
      if (sources.length > 1) {
        setSourceIndex((prevIndex) => (prevIndex + 1) % sources.length);
      } else {
        video.currentTime = 0;
        video.play().catch(() => {});
        animateOpacity(1, FADE_IN_MS);
      }
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [currentSrc, sources.length]);

  return (
    <video
      ref={videoRef}
      key={currentSrc}
      src={currentSrc}
      className={className}
      style={{ opacity: 0, ...style }}
      autoPlay
      muted
      playsInline
      preload="auto"
    />
  );
}
