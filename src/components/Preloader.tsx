import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate progress bar and percentage
    tl.to(progressBarRef.current, {
      width: '100%',
      duration: 2.5,
      ease: 'power2.out',
      onUpdate: function() {
        const progress = Math.round(this.progress() * 100);
        setPercent(progress);
      }
    })
    .to(logoRef.current, {
      scale: 1.1,
      duration: 0.3,
      ease: 'power2.out'
    }, '-=0.5')
    .to(logoRef.current, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.in'
    })
    .to(preloaderRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete: () => {
        if (preloaderRef.current) {
          preloaderRef.current.style.display = 'none';
        }
        onComplete();
      }
    }, '+=0.3');

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      {/* Spotlight effect */}
      <div className="spotlight w-full h-[60vh] top-0 left-0" />
      
      {/* Floating orbs */}
      <div className="glow-orb w-64 h-64 top-20 left-1/4 opacity-30" style={{ animation: 'float 4s ease-in-out infinite' }} />
      <div className="glow-orb w-48 h-48 bottom-32 right-1/4 opacity-20" style={{ animation: 'float 5s ease-in-out infinite 1s' }} />

      {/* Logo */}
      <div ref={logoRef} className="mb-12 text-center">
        <h1 className="text-5xl md:text-7xl font-light tracking-tight text-foreground">
          <span className="text-primary glow-text">S</span>hahid
        </h1>
        <p className="mt-2 text-muted-foreground text-sm tracking-[0.3em] uppercase">
          Frontend Developer
        </p>
      </div>

      {/* Progress bar container */}
      <div className="w-64 md:w-80">
        <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
          <div 
            ref={progressBarRef}
            className="progress-bar"
            style={{ width: '0%' }}
          />
        </div>
        <div className="mt-4 flex justify-between text-sm text-muted-foreground">
          <span>Loading</span>
          <span ref={percentRef}>{percent}%</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
