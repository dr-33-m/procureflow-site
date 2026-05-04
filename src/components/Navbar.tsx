import { useState, useEffect } from 'react';
import logoPng from '../assets/procureFlow.png';

const navLinks = [
  { href: '#solutions', id: 'solutions', label: 'Solutions' },
  { href: '#how-it-works', id: 'how-it-works', label: 'How It Works' },
  { href: '#outcomes', id: 'outcomes', label: 'Outcomes' },
  { href: '#pricing', id: 'pricing', label: 'Pricing' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('solutions');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveSection(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 border-b border-border transition-all duration-300 ${
        scrolled ? 'bg-background/90 backdrop-blur-xl shadow-sm' : 'bg-background/60 backdrop-blur-md'
      }`}
    >
      <div className="flex justify-between items-center h-20 px-8 max-w-screen-2xl mx-auto">
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2 text-primary"
        >
          <img src={logoPng.src ?? logoPng} alt="ProcureFlow" className="h-7 w-auto object-contain" />
          <span className="text-xl font-bold tracking-tighter font-serif">ProcureFlow</span>
        </a>
        <div className="hidden md:flex items-center gap-8 font-sans antialiased tracking-tight">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`relative pb-1 font-semibold text-sm transition-colors duration-300 ${
                  isActive ? 'text-primary' : 'text-foreground hover:text-primary'
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-primary rounded-full transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0'
                  }`}
                />
              </a>
            );
          })}
        </div>
        <div className="flex items-center gap-3">
          <button className="hidden md:block px-6 py-2 rounded-lg font-semibold text-sm text-foreground hover:bg-secondary transition-all duration-300">
            Book a Demo
          </button>
          <button className="px-6 py-2 rounded-lg font-semibold text-sm text-primary-foreground bg-primary hover:bg-primary/90 transition-all duration-300 shadow-sm active:scale-95">
            Start Tracking
          </button>
        </div>
      </div>
    </nav>
  );
}
