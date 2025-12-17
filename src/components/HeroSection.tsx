import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      tl.fromTo(headlineRef.current,
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' }
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(ctaRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.3'
      );

      // Floating orbs animation
      gsap.to('.hero-orb-1', {
        y: -30,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });

      gsap.to('.hero-orb-2', {
        y: 25,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 1
      });

      gsap.to('.hero-orb-3', {
        y: -20,
        x: 15,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 2
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0">
        <iframe 
          src='https://my.spline.design/void-sYX7HyX3TFpSYMyCYAIIgqfq/'
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="opacity-60"
          title="3D Background"
        />
      </div>

      {/* Spotlight */}
      <div className="spotlight w-full h-[80vh] top-0 left-0 z-10" />

      {/* Floating Orbs */}
      <div className="hero-orb-1 glow-orb w-96 h-96 -top-20 -left-20 opacity-30" />
      <div className="hero-orb-2 glow-orb w-64 h-64 top-1/3 -right-10 opacity-20" 
        style={{ background: 'radial-gradient(circle, hsl(270 91% 65% / 0.3) 0%, transparent 70%)' }} 
      />
      <div className="hero-orb-3 glow-orb w-48 h-48 bottom-20 left-1/4 opacity-25" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4">
          Frontend Developer
        </p>
        
        <h1 
          ref={headlineRef}
          className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-6"
        >
          Hi, I'm{' '}
          <span className="text-primary glow-text font-normal">Shahid Gul</span>
          <br />
          <span className="text-muted-foreground">I craft digital experiences</span>
        </h1>

        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Passionate about creating beautiful, responsive, and user-friendly web applications 
          with modern technologies and seamless animations.
        </p>

        <button 
          ref={ctaRef}
          onClick={scrollToContact}
          className="glow-button text-lg"
        >
          Hire Me
        </button>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
