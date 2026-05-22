import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Navbar from './Navbar';

// Nav links from the prompt specification
const NAV_LINKS = ['Gallery', 'Styles', 'API', 'Pricing', 'Blog'];

import beachVideo from '../assets/beach-video.mp4';

// Video source
const VIDEO_SRC = beachVideo;

// LogoMark — inline SVG, 44x26, viewBox 0 0 44 26, three white rects at x=0/16/30, y=3, widths 14/12/14, height 20, rx=3.
const LogoMark = () => (
  <svg width="44" height="26" viewBox="0 0 44 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
    <rect x="0" y="3" width="14" height="20" rx="3" fill="white" />
    <rect x="16" y="3" width="12" height="20" rx="3" fill="white" />
    <rect x="30" y="3" width="14" height="20" rx="3" fill="white" />
  </svg>
);

export default function Hero() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [framesReady, setFramesReady] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  // States & Refs from the prompt specification
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoBgRef = useRef<HTMLDivElement>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLCanvasElement[]>([]);

  // Mount effect to fade-in items
  useEffect(() => {
    setMounted(true);
  }, []);

  // Effect 1 — Frame capture (boomerang setup):
  // Guarded so it doesn't try to capture or trigger errors if video source is not playing,
  // making it fully ready for when video element starts playing, or when the user adds it live.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let capturing = true;
    let lastTime = -1;
    const MAX_WIDTH = 960;
    const frames: HTMLCanvasElement[] = [];
    let rafId: number;

    const captureFrame = () => {
      if (!capturing || !video) return;
      if (video.readyState < 2 || video.currentTime === lastTime) {
        scheduleNextCapture();
        return;
      }
      lastTime = video.currentTime;
      const w = video.videoWidth;
      const h = video.videoHeight;
      const scale = Math.min(1, MAX_WIDTH / w);
      const canvas = document.createElement('canvas');
      canvas.width = w * scale;
      canvas.height = h * scale;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        frames.push(canvas);
      }
      scheduleNextCapture();
    };

    const scheduleNextCapture = () => {
      if (!video) return;
      if ('requestVideoFrameCallback' in video) {
        // @ts-ignore
        rafId = video.requestVideoFrameCallback(captureFrame);
      } else {
        rafId = requestAnimationFrame(captureFrame);
      }
    };

    const onLoadedMetadata = () => {
      if (video) {
        video.play().catch(() => {});
        scheduleNextCapture();
      }
    };

    const onEnded = () => {
      capturing = false;
      framesRef.current = frames;
      setFramesReady(true);
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('ended', onEnded);

    if (video.readyState >= 1) {
      onLoadedMetadata();
    }

    return () => {
      capturing = false;
      if (video) {
        video.removeEventListener('loadedmetadata', onLoadedMetadata);
        video.removeEventListener('ended', onEnded);
        if (rafId) {
          if ('cancelVideoFrameCallback' in video) {
            // @ts-ignore
            video.cancelVideoFrameCallback(rafId);
          } else {
            cancelAnimationFrame(rafId);
          }
        }
      }
    };
  }, []);

  // Effect 2 — Boomerang render:
  useEffect(() => {
    const frames = framesRef.current;
    const canvas = displayCanvasRef.current;
    if (!framesReady || !canvas || frames.length === 0) return;

    canvas.width = frames[0].width;
    canvas.height = frames[0].height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let index = 0;
    let direction = 1;
    let last = performance.now();
    const interval = 1000 / 30; // 30 FPS
    let animationFrameId: number;

    const render = (now: number) => {
      if (now - last >= interval) {
        last = now;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(frames[index], 0, 0);

        index += direction;
        if (index >= frames.length - 1) {
          index = frames.length - 1;
          direction = -1;
        } else if (index <= 0) {
          index = 0;
          direction = 1;
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [framesReady]);

  // Effect 3 — Parallax mouse tracking (gsap):
  useEffect(() => {
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    const strength = 20;

    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX = ((e.clientX - cx) / cx) * strength;
      targetY = ((e.clientY - cy) / cy) * strength;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animeId: number;
    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      if (videoBgRef.current) {
        gsap.set(videoBgRef.current, { x: currentX, y: currentY });
      }

      animeId = requestAnimationFrame(updateParallax);
    };

    updateParallax();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animeId);
    };
  }, []);

  return (
    <section className="h-screen w-full relative bg-black text-white font-body overflow-hidden">
      
      {/* Video background layer with delicate dark gradient overlay for superb readability and contrast */}
      <div 
        ref={videoBgRef} 
        className={`absolute inset-0 w-full h-full z-0 scale-[1.08] origin-center bg-black overflow-hidden animate-gentle-zoom transition-all duration-300 ${
          menuOpen ? 'opacity-0 pointer-events-none scale-100' : 'opacity-100 scale-[1.08]'
        }`}
      >
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          className="w-full h-full object-cover opacity-65 scale-[1.02]"
          style={{ display: framesReady ? 'none' : 'block' }}
        />
        <canvas
          ref={displayCanvasRef}
          className="w-full h-full object-cover opacity-65 scale-[1.02]"
          style={{ display: framesReady ? 'block' : 'none' }}
        />
        {/* Ambient dark gradient protecting legibility of text */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/45 to-black/95 pointer-events-none" />
      </div>

      {/* Nav Section */}
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* Hero Title Section */}
      <div
        className={`absolute left-0 right-0 z-20 w-full px-4 transition-all duration-300 md:duration-1000 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        } ${
          menuOpen ? 'opacity-0 pointer-events-none' : ''
        }`}
        style={{ top: '126px' }}
      >
        <h1 className="hero-title select-none">Splash</h1>
      </div>

      {/* Bottom Row */}
      <div
        className={`absolute bottom-12 left-0 right-0 px-10 flex flex-col md:flex-row items-center md:items-end justify-between gap-6 md:gap-4 z-20 transition-all duration-300 md:duration-1000 md:delay-300 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        } ${
          menuOpen ? 'opacity-0 pointer-events-none' : ''
        }`}
      >
        {/* Left column info */}
        <p className="text-sm font-body font-light text-[#DEDBC8]/75 max-w-[240px] leading-relaxed text-center md:text-left self-center md:self-end">
          Splash engineers next-generation high-fidelity municipal and industrial water reclamation systems across the globe.
        </p>

        {/* Right column info */}
        <p className="text-sm font-body font-light text-[#DEDBC8]/75 max-w-[240px] leading-relaxed text-center md:text-right self-center md:self-end">
          Integrating molecular ultrafiltration with electro-coagulation for absolute chemical-free water purification.
        </p>
      </div>

    </section>
  );
}
