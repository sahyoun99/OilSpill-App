'use client'
import React, { useState, useEffect } from 'react';
import { Target, GitCompare, Brain, Globe, CheckCircle2, ArrowRight, Users, Award, TrendingUp } from 'lucide-react';

const objectives = [
  {
    id: 1,
    title: 'Compare Two Approaches',
    subtitle: 'Pipeline Architecture Analysis',
    description: 'Investigate single-stage (direct segmentation) vs. double-stage (classification → segmentation) pipelines to determine optimal detection strategy.',
    icon: GitCompare,
    color: 'from-blue-500 to-cyan-500',
    borderColor: 'border-blue-400/30',
    details: [
      'Single-stage direct pixel segmentation evaluation',
      'Double-stage classification + segmentation analysis', 
      'Performance comparison across 49+ model configurations',
      'Computational efficiency and accuracy trade-offs'
    ],
    expectedOutcome: 'Identify the superior pipeline architecture for oil spill detection',
    timeline: 'Months 1-6',
    metrics: ['Accuracy', 'Speed', 'Resource Usage']
  },
  {
    id: 2,
    title: 'Custom DAENet Architecture',
    subtitle: 'Advanced Neural Network Design',
    description: 'Design and evaluate a custom-made DAENet variant specifically engineered for improving oil-spill detection quality in SAR imagery.',
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
    borderColor: 'border-purple-400/30',
    details: [
      'Novel encoder-decoder architecture development',
      'Attention mechanisms for oil spill feature enhancement',
      'Multi-scale feature fusion for better segmentation',
      'Specialized loss functions for environmental data'
    ],
    expectedOutcome: 'State-of-the-art oil spill detection performance',
    timeline: 'Months 3-8',
    metrics: ['IoU Score', 'Precision', 'Recall']
  },
  {
    id: 3,
    title: 'Web-based Platform',
    subtitle: 'Production-Ready Deployment',
    description: 'Deliver a production-ready, web-based deep learning system to detect and segment oil spills in SAR imagery for real-world applications.',
    icon: Globe,
    color: 'from-emerald-500 to-teal-500',
    borderColor: 'border-emerald-400/30',
    details: [
      'User-friendly web interface development',
      'Real-time SAR image processing capabilities',
      'Interactive visualization and analysis tools',
      'Scalable cloud deployment architecture'
    ],
    expectedOutcome: 'Accessible platform for environmental monitoring agencies',
    timeline: 'Months 6-12',
    metrics: ['Response Time', 'User Experience', 'Scalability']
  }
];

const researchGoals = [
  {
    title: 'Scientific Excellence',
    description: 'Rigorous evaluation and peer-reviewed methodologies',
    icon: Award,
    color: 'text-yellow-400'
  },
  {
    title: 'Real-World Impact', 
    description: 'Practical solutions for environmental protection',
    icon: Target,
    color: 'text-green-400'
  },
  {
    title: 'Technical Innovation',
    description: 'Advancing state-of-the-art in AI for environmental monitoring',
    icon: TrendingUp,
    color: 'text-blue-400'
  },
  {
    title: 'Community Benefit',
    description: 'Open and accessible tools for researchers and agencies',
    icon: Users,
    color: 'text-purple-400'
  }
];

const ModernObjectivesPage = () => {
  const [activeObjective, setActiveObjective] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.fade-in-section');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        console.log(activeObjective)
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.15),transparent_50%)] bg-[radial-gradient(circle_at_80%_30%,rgba(147,51,234,0.1),transparent_50%)]" />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30 mb-8">
              <span className="text-blue-300 text-sm font-medium tracking-wide">RESEARCH OBJECTIVES</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent leading-tight">
              Our Objectives
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-16 max-w-4xl mx-auto leading-relaxed">
              Our work targets rigorously evaluated modeling and a usable platform for real-world environmental response. 
              Through systematic research and innovation, we aim to advance AI for marine protection.
            </p>
          </div>

          {/* Research Goals Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {researchGoals.map((goal, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <goal.icon className={`w-8 h-8 ${goal.color} mb-4 group-hover:scale-110 transition-transform duration-300`} />
                <h3 className="font-bold mb-2">{goal.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{goal.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Objectives */}
      <section className="fade-in-section py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-8">Core Objectives</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Three primary research directions driving innovation in oil spill detection and environmental AI
            </p>
          </div>

          <div className="space-y-12">
            {objectives.map((objective, i) => (
              <div 
                key={objective.id}
                className={`bg-white/10 backdrop-blur-md rounded-3xl border ${objective.borderColor} hover:bg-white/15 transition-all duration-300 overflow-hidden group`}
                onMouseEnter={() => setActiveObjective(objective.id)}
                onMouseLeave={() => setActiveObjective(null)}
              >
                <div className="grid lg:grid-cols-5 gap-0">
                  {/* Header Section */}
                  <div className={`lg:col-span-2 bg-gradient-to-br ${objective.color} p-8 lg:p-12`}>
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <objective.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <div className="text-4xl font-black text-white mb-2">0{objective.id}</div>
                        <h3 className="text-2xl font-bold text-white mb-2">{objective.title}</h3>
                        <p className="text-white/80 font-medium mb-4">{objective.subtitle}</p>
                        <div className="inline-block px-3 py-1 bg-white/20 rounded-full">
                          <span className="text-white/90 text-sm font-medium">{objective.timeline}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="lg:col-span-3 p-8 lg:p-12">
                    <p className="text-slate-300 text-lg leading-relaxed mb-8">{objective.description}</p>
                    
                    {/* Key Details */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                        Key Components
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {objective.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-slate-400 text-sm">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Metrics & Outcome */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-purple-400 mb-3">Success Metrics</h5>
                        <div className="flex flex-wrap gap-2">
                          {objective.metrics.map((metric, idx) => (
                            <span key={idx} className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-300 text-xs">
                              {metric}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-emerald-400 mb-3">Expected Outcome</h5>
                        <p className="text-slate-400 text-sm">{objective.expectedOutcome}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Timeline */}
      <section className="fade-in-section py-24 px-6 bg-gradient-to-r from-slate-800/50 to-indigo-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-8">Research Timeline</h2>
            <p className="text-xl text-slate-300">Systematic approach to achieving our research objectives</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500"></div>
            
            <div className="space-y-12">
              {objectives.map((objective, i) => (
                <div key={objective.id} className="relative flex items-start gap-8">
                  {/* Timeline Dot */}
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${objective.color} flex items-center justify-center relative z-10`}>
                    <objective.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Timeline Content */}
                  <div className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{objective.title}</h3>
                        <p className="text-slate-400 text-sm">{objective.subtitle}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="px-4 py-2 bg-white/5 rounded-full text-sm font-medium">
                          {objective.timeline}
                        </span>
                        <ArrowRight className="w-5 h-5 text-slate-400" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8">
            Explore Our Progress
          </h2>
          <p className="text-xl text-slate-300 mb-12">
            Discover how we are achieving these objectives through innovative approaches and rigorous evaluation
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="/approaches" 
              className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              See Our Approaches
            </a>
            <a 
              href="/results" 
              className="px-10 py-4 border-2 border-white/20 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              View Results
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

export default ModernObjectivesPage;