import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  InstagramLogo, 
  FacebookLogo, 
  GithubLogo, 
  LinkedinLogo,
  TwitterLogo,
  StackOverflowLogo,
  PaperPlaneTilt
} from '@phosphor-icons/react';
import { toast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: InstagramLogo, href: '#', label: 'Instagram' },
  { icon: FacebookLogo, href: '#', label: 'Facebook' },
  { icon: GithubLogo, href: '#', label: 'GitHub' },
  { icon: LinkedinLogo, href: '#', label: 'LinkedIn' },
  { icon: TwitterLogo, href: '#', label: 'Twitter' },
  { icon: StackOverflowLogo, href: '#', label: 'Stack Overflow' },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.contact-title',
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

      // Form inputs animation
      gsap.fromTo('.contact-input',
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Social icons animation
      gsap.fromTo('.social-item',
        { opacity: 0, y: 20, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.social-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });

    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);

    // Button animation
    gsap.fromTo('.submit-btn',
      { scale: 1 },
      { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.inOut' }
    );
  };

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="glow-orb w-80 h-80 top-0 left-1/4 opacity-20" />
      <div className="glow-orb w-64 h-64 bottom-20 right-10 opacity-15"
        style={{ background: 'radial-gradient(circle, hsl(270 91% 65% / 0.3) 0%, transparent 70%)' }} 
      />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="contact-title text-center mb-16">
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4">
            Get In Touch
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light">
            Let's Work
            <span className="text-primary glow-text"> Together</span>
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="contact-form glass-card p-8 md:p-10 mb-12">
            <div className="space-y-6">
              <div className="contact-input">
                <label className="block text-sm text-muted-foreground mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="glass-input"
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="contact-input">
                <label className="block text-sm text-muted-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="glass-input"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="contact-input">
                <label className="block text-sm text-muted-foreground mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="glass-input min-h-[150px] resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-btn glow-button w-full flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <PaperPlaneTilt size={20} weight="light" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>

          {/* Social Links */}
          <div className="social-grid flex flex-wrap justify-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                className="social-item social-icon"
                aria-label={social.label}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <social.icon size={22} weight="light" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
