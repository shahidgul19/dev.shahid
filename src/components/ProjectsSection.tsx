import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from '@phosphor-icons/react';
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';
import project4 from '@/assets/project-4.jpg';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Shopistaan',
    description: 'A modern e-commerce platform with sleek UI and seamless shopping experience.',
    image: project1,
    tech: ['React', 'Tailwind', 'Node.js'],
    link: '#'
  },
  {
    id: 2,
    title: 'Quiz System',
    description: 'Interactive online assessment platform with real-time scoring and analytics.',
    image: project2,
    tech: ['HTML', 'CSS', 'PHP'],
    link: '#'
  },
  {
    id: 3,
    title: 'Newlight Hospitality',
    description: 'Elegant restaurant website with booking system and menu management.',
    image: project3,
    tech: ['WordPress', 'PHP'],
    link: '#'
  },
  {
    id: 4,
    title: 'Glasswick',
    description: 'Premium glass manufacturing company website with product showcase.',
    image: project4,
    tech: ['HTML', 'CSS', 'JavaScript'],
    link: '#'
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.projects-title',
        { opacity: 0, y: 40, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards stagger animation
      gsap.fromTo('.project-card',
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 75%',
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
      id="projects" 
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="glow-orb w-96 h-96 top-1/4 -right-40 opacity-20" />
      <div className="glow-orb w-72 h-72 bottom-20 -left-20 opacity-15"
        style={{ background: 'radial-gradient(circle, hsl(270 91% 65% / 0.3) 0%, transparent 70%)' }} 
      />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="projects-title text-center mb-16">
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4">
            Portfolio
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light">
            Featured
            <span className="text-primary glow-text"> Projects</span>
          </h2>
        </div>

        {/* Projects Grid - Bento Style */}
        <div className="projects-grid grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project) => (
            <a 
              key={project.id}
              href={project.link}
              className="project-card glass-card-hover group block overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-48 md:h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl md:text-2xl font-light text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <ArrowUpRight 
                    size={24} 
                    className="text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 text-xs bg-secondary/50 border border-glass-border rounded-full text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
