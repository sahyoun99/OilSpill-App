'use client'
import React, {useEffect } from 'react';
import { ChevronDown, Activity, CheckCircle, MapPin, Database, ArrowRight} from 'lucide-react';

const ModernHomepage = () => {

  const stats = [
    { label: 'Avg. mask IoU', value: '93.8%', icon: Activity },
    { label: 'Accuracy', value: '99.05%', icon: CheckCircle },
    { label: 'Scenes analyzed', value: '600+', icon: Database },
    { label: 'UAE focus regions', value: 'Gulf Coast', icon: MapPin },
  ];

  const approaches = [
    {
      title: "Single-Stage Detection",
      description: "Direct segmentation approach using advanced neural architectures",
      performance: "IoU: 93.8o%"
    },
    {
      title: "Double-Stage Pipeline", 
      description: "Classification followed by precise segmentation",
      performance: "IoU: 87.96%"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
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
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.1),transparent_50%)] bg-[radial-gradient(circle_at_70%_70%,rgba(147,51,234,0.1),transparent_50%)]" />
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30 mb-8">
            <span className="text-blue-300 text-sm font-medium">AI-Powered Environmental Protection</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent leading-tight">
            Oil Spill Detection
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Advanced SAR image analysis using deep learning to protect marine ecosystems and coastal economies
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button onClick={()=>window.location.href='/problem'}  className="cursor-pointer px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
              Explore Research
            </button>
            <button onClick={()=>window.location.href='/results'} className="cursor-pointer px-8 py-4 border-2 border-white/20 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
              View Results
            </button>
          </div>
          
          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <stat.icon className="text-blue-400 mb-3 mx-auto" size={28} />
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-white/60" />
        </div>
      </section>

      {/* Problem Section */}
      <section className="fade-in-section py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-red-500/20 rounded-full border border-red-400/30 mb-6">
                <span className="text-red-300 text-sm font-medium">CRITICAL CHALLENGE</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-8">
                The Oil Spill Crisis
              </h2>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Oil spills pose devastating threats to marine ecosystems, wildlife, and coastal economies. 
                The Gulf region faces particular vulnerability due to intensive maritime oil transport.
              </p>
              
              <div className="space-y-4">
                {[
                  "1 gallon of oil contaminates 1M gallons of water",
                  "Oil leaks kill over 500,000 sea animals yearly", 
                  "Cleanup costs reach billions per incident",
                  "Long-term ecosystem damage persists for decades"
                ].map((fact, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0" />
                    <span className="text-slate-300 text-lg">{fact}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
  <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-3xl p-8 backdrop-blur-sm border border-red-400/20">
    {/* YouTube embed */}
<div className="aspect-video rounded-2xl overflow-hidden">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/VfZlaa3VHaw?si=aBDQmzCPdH2xGexX"
    title="SAR Oil Spill Detection Demo"
    frameBorder={0}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
    loading="lazy"
  />
</div>

    <div className="text-center">
      <h3 className="text-xl font-semibold mb-2">Deepwater Horizon Impact</h3>
      <p className="text-slate-400">210 million gallons spilled, 11 people killed, 17 people injured</p>
    </div>
  </div>
</div>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="fade-in-section py-24 px-6 bg-gradient-to-r from-indigo-900/50 to-purple-900/50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30 mb-6">
            <span className="text-blue-300 text-sm font-medium">RESEARCH OBJECTIVES</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-16">Our Mission</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Dual Approach Investigation",
                description: "Compare single-stage vs double-stage detection methodologies for optimal performance"
              },
              {
                title: "Custom DAENet Architecture", 
                description: "Develop advanced neural network specifically designed for oil spill detection"
              },
              {
                title: "Web-Based Platform",
                description: "Create accessible deep learning platform for real-time SAR image analysis"
              }
            ].map((objective, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold">{i + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-4">{objective.title}</h3>
                <p className="text-slate-400 leading-relaxed">{objective.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approaches Section */}
      <section className="fade-in-section py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-green-500/20 rounded-full border border-green-400/30 mb-6">
              <span className="text-green-300 text-sm font-medium">METHODOLOGY</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-8">Detection Approaches</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              We evaluate multiple neural network architectures across two distinct pipeline approaches
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {approaches.map((approach, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-3xl p-8 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 group">
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-2xl font-bold">{approach.title}</h3>
                  <div className="px-3 py-1 bg-green-500/20 rounded-full">
                    <span className="text-green-300 text-sm font-medium">{approach.performance}</span>
                  </div>
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">{approach.description}</p>
                <div className="flex items-center text-blue-400 font-medium group-hover:text-blue-300 transition-colors duration-300">
                  <span>Learn more</span>
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Preview */}
      <section className="fade-in-section py-24 px-6 bg-gradient-to-r from-emerald-900/30 to-teal-900/30">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-emerald-500/20 rounded-full border border-emerald-400/30 mb-6">
            <span className="text-emerald-300 text-sm font-medium">PERFORMANCE METRICS</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-8">Proven Results</h2>
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
            Our DAENet approach achieves state-of-the-art performance in oil spill detection and segmentation
          </p>
          
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-black text-emerald-400 mb-2">99.05%</div>
                <div className="text-slate-400">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black text-blue-400 mb-2">93.80%</div>
                <div className="text-slate-400">IoU Score</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black text-purple-400 mb-2">93.97</div>
                <div className="text-slate-400">F1-score</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8">
            Ready to Explore Our Research?
          </h2>
          <p className="text-xl text-slate-300 mb-12">
            Dive deeper into our methodology, results, and future work in environmental AI
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button  onClick={()=>window.location.href='/results'} className="cursor-pointer px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
              View Full Results
            </button>
            <button  onClick={()=>window.location.href='/about'}  className="cursor-pointer px-10 py-4 border-2 border-white/20 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
              Meet the Team
            </button>
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

export default ModernHomepage;