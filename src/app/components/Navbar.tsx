'use client'
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const SECTIONS = ['home','problem','objective','about','approaches','results'] as const;

type SectionId = typeof SECTIONS[number];

interface NavItemProps {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}

export default function Navbar(): JSX.Element {
  const [active, setActive] = useState<SectionId>('home');
  const [open, setOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Get current path to set active state
    const currentPath = window.location.pathname;
    if (currentPath === '/') {
      setActive('home');
    } else {
      const pathSection = currentPath.slice(1) as SectionId;
      if (SECTIONS.includes(pathSection)) {
        setActive(pathSection);
      }
    }

    // Only try to observe sections if we're on a page that might have them
    if (currentPath === '/') {
      const els = SECTIONS.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        });
      }, { threshold: 0.6 });
      els.forEach(el => io.observe(el));
      return () => io.disconnect();
    }
  }, []);

  const label = (id: SectionId): string => {
    switch (id) {
      case 'home': return 'Home';
      case 'problem': return 'Problem';
      case 'objective': return 'Objectives';
      case 'about': return 'About';
      case 'approaches': return 'Approaches';
      case 'results': return 'Results';
      default: return id;
    }
  };

  const getHref = (id: SectionId): string => {
    return id === 'home' ? '/' : `/${id}`;
  };

  const NavItem: React.FC<NavItemProps> = ({ href, label, active, onClick }) => (
    <a
      href={href}
      onClick={onClick}
      className={`relative group px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
        active 
          ? 'text-white bg-white/20 backdrop-blur-md' 
          : 'text-white/80 hover:text-white hover:bg-white/10'
      }`}
    >
      {label}
      <span className={`absolute left-3 right-3 -bottom-1 h-0.5 rounded bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 ${
        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
      }`} />
    </a>
  );

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-900/90 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
          <a href="/" className="font-black text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Oil Spill AI
          </a>
          
          {/* Desktop */}
          <nav className="hidden lg:flex items-center gap-2">
            {SECTIONS.map(id => (
              <NavItem key={id} href={getHref(id)} label={label(id)} active={active === id} />
            ))}
            <a 
              href="/detect" 
              className="ml-4 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Live Demo
            </a>
          </nav>

          {/* Mobile */}
          <div className="lg:hidden">
            <button 
              onClick={() => setOpen(true)} 
              className="p-3 rounded-xl hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm"
            >
              <Menu size={24} className="text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-slate-900/95 backdrop-blur-xl shadow-2xl border-l border-white/10 transform transition-transform duration-300 ${
        open ? 'translate-x-0' : 'translate-x-full'
      } z-50`}>
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <span className="font-black text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Menu
          </span>
          <button 
            onClick={() => setOpen(false)} 
            className="p-2 hover:bg-white/10 rounded-xl transition-colors duration-300"
          >
            <X size={24} className="text-white" />
          </button>
        </div>
        <nav className="flex flex-col gap-2 p-6">
          {SECTIONS.map(id => (
            <NavItem 
              key={id} 
              href={getHref(id)} 
              label={label(id)} 
              active={active === id} 
              onClick={() => setOpen(false)} 
            />
          ))}
          <a 
            href="/detect" 
            onClick={() => setOpen(false)} 
            className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg"
          >
            Live Demo
          </a>
        </nav>
      </div>

      {/* Mobile Overlay */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}