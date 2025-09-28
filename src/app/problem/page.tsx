'use client'
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Droplets, Fish, DollarSign, ExternalLink } from 'lucide-react';

const FACTS = [
  { 
    icon: Droplets,
    text: '1 gallon of oil contaminates 210M gallons of water',
    stat: '210M:1',
    color: 'text-blue-400'
  },
  { 
    icon: Fish,
    text: 'Oil leaks kill over 500,000 sea animals yearly',
    stat: '500K+',
    color: 'text-red-400'
  },
  { 
    icon: DollarSign,
    text: 'Oil spills are expensive to clean',
    stat: '$65B',
    color: 'text-yellow-400'
  },
  { 
    icon: AlertTriangle,
    text: 'Increased reliance on oil transport',
    stat: '↑ Risk',
    color: 'text-orange-400'
  }
];

const GALLERY: { src: string; alt: string; caption: string; description: string }[] = [
  { 
    src: '/media/bp-horizon.jpg', 
    alt: 'BP Deepwater Horizon oil spill', 
    caption: 'BP Deepwater Horizon',
    description: '210 million gallons spilled in Gulf of Mexico'
  },
  { 
    src: '/media/uae-spill-1.jpg', 
    alt: 'Recent oil spill along the UAE coast', 
    caption: 'UAE Coast Incident',
    description: 'Regional spill affecting marine wildlife'
  },
  { 
    src: '/media/uae-spill-2.jpg', 
    alt: 'Cleanup operations after UAE oil spill', 
    caption: 'Cleanup Operations',
    description: 'Multi-million dollar cleanup efforts'
  },
];

const ModernProblemPage = () => {
  const [activeGalleryItem, setActiveGalleryItem] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      console.log(activeGalleryItem)
      const sections = document.querySelectorAll('.fade-in-section');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
          section.classList.add('fade-in-active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white pt-24">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(239,68,68,0.15),transparent_50%)] bg-[radial-gradient(circle_at_80%_20%,rgba(251,146,60,0.1),transparent_50%)]" />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="inline-block px-4 py-2 bg-red-500/20 rounded-full border border-red-400/30 mb-8">
            <span className="text-red-300 text-sm font-medium tracking-wide">ENVIRONMENTAL CRISIS</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 bg-gradient-to-r from-white via-red-200 to-orange-300 bg-clip-text text-transparent leading-tight">
            The Oil Spill Crisis
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-16 max-w-4xl leading-relaxed">
            Oil spills pose devastating threats to marine ecosystems, wildlife, and coastal economies. 
            The UAE and Gulf regions face particular vulnerability due to intensive maritime oil transport and fragile marine environments.
          </p>
        </div>
      </section>

      {/* Key Facts & Video */}
      <section className="fade-in-section py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Facts */}
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-12">
                Devastating Impact
              </h2>
              
              <div className="space-y-6">
                {FACTS.map((fact, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br from-slate-700 to-slate-600 group-hover:scale-110 transition-transform duration-300`}>
                        <fact.icon className={`${fact.color} w-6 h-6`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-lg font-semibold">{fact.text}</span>
                          <span className={`text-2xl font-black ${fact.color}`}>{fact.stat}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-slate-700 to-slate-600">
                      <ExternalLink className="text-purple-400 w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <span className="text-lg">Case Study: </span>
                      <a
                        href="https://en.wikipedia.org/wiki/Deepwater_Horizon_oil_spill"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 underline font-semibold transition-colors duration-300"
                      >
                        BP Deepwater Horizon oil spill
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video */}
            <div className="relative">
              <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-3xl p-8 backdrop-blur-sm border border-red-400/20">
                <div className="aspect-video bg-slate-800/50 rounded-2xl overflow-hidden relative group">
                  <video 
                    className="w-full h-full object-cover" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    poster="/media/oilspill-poster.jpg"
                  >
                    <source src="/media/oilspill.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold mb-1">SAR Oil Spill Detection</h3>
                    <p className="text-slate-300 text-sm">Synthetic Aperture Radar imaging of oil contamination</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notable Incidents Gallery */}
      <section className="fade-in-section py-24 px-6 bg-gradient-to-r from-slate-800/50 to-indigo-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-8">Notable Incidents</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Historical oil spill disasters that demonstrate the urgent need for advanced detection systems
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GALLERY.map((item, i) => (
              <div 
                key={i} 
                className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-300 group cursor-pointer"
                onMouseEnter={() => setActiveGalleryItem(i)}
                onMouseLeave={() => setActiveGalleryItem(null)}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={item.src} 
                    alt={item.alt} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-bold mb-1">{item.caption}</h3>
                    <p className="text-slate-300 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8">
            Ready to See Our Solution?
          </h2>
          <p className="text-xl text-slate-300 mb-12">
            Discover how our AI-powered detection system can help prevent and respond to oil spill disasters
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="/detect" 
              className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Try Live Demo
            </a>
            <a 
              href="/approaches" 
              className="px-10 py-4 border-2 border-white/20 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              View Our Approach
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        .fade-in-section {
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .fade-in-active {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default ModernProblemPage;