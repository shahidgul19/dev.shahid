import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code,
  Palette,
  Lightning,
  Atom,
  GithubLogo,
  FigmaLogo
} from '@phosphor-icons/react';
import profileImage from '@/assets/profile.png';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'HTML5', icon: Code },
  { name: 'CSS3', icon: Palette },
  { name: 'JavaScript', icon: Lightning },
  { name: 'React', icon: Atom },
  { name: 'Git', icon: GithubLogo },
  { name: 'Figma', icon: FigmaLogo },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section fade in
      gsap.fromTo(sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Image animation
      gsap.fromTo(imageRef.current,
        { opacity: 0, x: -80, filter: 'blur(10px)' },
        {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Content animation
      gsap.fromTo(contentRef.current,
        { opacity: 0, x: 80, filter: 'blur(10px)' },
        {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Skills stagger
      gsap.fromTo('.skill-item',
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="glow-orb w-80 h-80 -top-20 right-0 opacity-20" />
      <div className="glow-orb w-64 h-64 bottom-0 -left-20 opacity-15" 
        style={{ background: 'radial-gradient(circle, hsl(270 91% 65% / 0.3) 0%, transparent 70%)' }} 
      />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="flex justify-center lg:justify-start">
            <div className="glow-ring">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-glass-border bg-card">
                <img 
                  src={profileImage} 
                  alt="Shahid Gul"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4">
              About Me
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">
              Crafting Digital
              <span className="text-primary glow-text"> Excellence</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              I'm a passionate Frontend Developer with expertise in creating 
              responsive, user-centric web applications. With a keen eye for design 
              and a love for clean code, I transform ideas into seamless digital 
              experiences that captivate and engage users.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              My journey in web development has equipped me with a diverse skill set, 
              from modern JavaScript frameworks to cutting-edge animation libraries. 
              I believe in continuous learning and staying ahead of industry trends 
              to deliver exceptional results.
            </p>

            {/* Skills Grid */}
            <div className="skills-grid grid grid-cols-3 md:grid-cols-6 gap-3">
              {skills.map((skill, index) => (
                <div 
                  key={skill.name}
                  className="skill-item skill-badge flex-col py-4"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <skill.icon size={24} weight="light" className="text-primary" />
                  <span className="text-xs mt-2">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
