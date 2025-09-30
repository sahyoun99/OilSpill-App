'use client'
import React, { useState, useEffect } from 'react';
import { GitBranch, Target, BarChart3, Zap, CheckCircle2 } from 'lucide-react';

const approaches = [
  {
    id: 'single-stage',
    title: 'Single-Stage Pipeline',
    subtitle: 'Direct Semantic Segmentation',
    icon: Zap,
    color: 'from-blue-500 to-cyan-500',
    borderColor: 'border-blue-400/30',
    description: 'End-to-end pixel-wise oil spill detection with immediate segmentation results',
    features: [
      'Direct pixel-wise segmentation from SAR input',
      'Architectures: DAENet, DeepLabV3+, U-Net, FCN',
      '16 backbones each (except FCN) → 49 total models',
      'Faster inference with single forward pass'
    ],
    metrics: {
      IOU: '93.80%',
      accuracy: '99.05%',
      models: '49'
    },
    imageSrc: '/single-stage.png',
    pros: ['Faster inference', 'Simpler pipeline', 'Lower computational overhead'],
    cons: ['Higher false positive rate', 'Less specialized processing']
  },
  {
    id: 'double-stage',
    title: 'Double-Stage Pipeline', 
    subtitle: 'Classification → Segmentation',
    icon: GitBranch,
    color: 'from-purple-500 to-pink-500',
    borderColor: 'border-purple-400/30',
    description: 'Two-phase approach with classification filtering before detailed segmentation',
    features: [
      'Phase 1: Classify tile as oil/no-oil',
      'Phase 2: Segmentation only on predicted oil tiles', 
      'Reduces false positives significantly',
      'Improved computational efficiency for large areas'
    ],
    metrics: {
      IOU: '87.96%',
      accuracy: '98.25%',
      models: '49'
    },
    imageSrc: '/double-stage.png',
    pros: ['Higher precision', 'Reduced false positives', 'Specialized processing'],
    cons: ['Slower inference', 'More complex pipeline', 'Higher computational cost']
  }
];

const evaluationMetrics = [
  {
    category: 'Segmentation Metrics',
    icon: Target,
    color: 'from-emerald-500 to-teal-500',
    borderColor: 'border-emerald-400/30',
    description: 'Pixel-level evaluation of oil spill detection accuracy',
    metrics: [
      { name: 'Mean IoU (mIoU)', desc: 'Average IoU across all classes' },
      { name: 'Accuracy', desc: 'Overall correctness of oil/no-oil predictions' },
      { name: 'IoU-oil', desc: 'Harmonic mean of precision and recall for segmentation' },
       { name: 'IoU-No-oil', desc: 'Harmonic mean of precision and recall for segmentation' },
      { name: 'F1 Score', desc: 'Balance between precision and recall' },
    ],
    imageSrc: '/segmentation-metrics-defs.png'
  },
  {
    category: 'Classification Metrics',
    icon: BarChart3,
    color: 'from-orange-500 to-red-500', 
    borderColor: 'border-orange-400/30',
    description: 'Binary classification performance for oil presence detection',
    metrics: [
      { name: 'Accuracy', desc: 'Overall correctness of oil/no-oil predictions' },
      { name: 'Specificity', desc: 'True negative rate - correctly identifying clean water' },
      { name: 'Sensitivity', desc: 'True positive rate - correctly identifying oil spills' },
    ],
    imageSrc: '/classification-metrics-defs.png'
  }
];

const ModernApproachesPage = () => {
  const [activeApproach, setActiveApproach] = useState<string | null>(null);
  const [activeMetric, setActiveMetric] = useState<string | null>(null);

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
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white pt-24">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.15),transparent_50%)] bg-[radial-gradient(circle_at_70%_70%,rgba(147,51,234,0.1),transparent_50%)]" />
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30 mb-8">
            <span className="text-blue-300 text-sm font-medium tracking-wide">METHODOLOGY</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent leading-tight">
            Our Approaches
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-16 max-w-4xl mx-auto leading-relaxed">
            Comparing single-stage and double-stage pipelines with comprehensive evaluation metrics 
            to determine the optimal approach for oil spill detection in SAR imagery.
          </p>
        </div>
      </section>

      {/* Pipeline Comparison */}
      <section className="fade-in-section py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-8">Pipeline Architectures</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Two distinct approaches to oil spill detection, each with unique advantages and trade-offs
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {approaches.map((approach, i) => (
              <div 
                key={approach.id}
                className={`bg-white/10 backdrop-blur-md rounded-3xl border ${approach.borderColor} hover:bg-white/15 transition-all duration-300 group overflow-hidden`}
                onMouseEnter={() => setActiveApproach(approach.id)}
                onMouseLeave={() => setActiveApproach(null)}
              >
                {/* Header */}
                <div className={`bg-gradient-to-r ${approach.color} p-8`}>
                  <div className="flex items-center gap-4 mb-4">
                    <approach.icon className="w-8 h-8 text-white" />
                    <div>
                      <h3 className="text-2xl font-bold text-white">{approach.title}</h3>
                      <p className="text-white/80">{approach.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-white/90 leading-relaxed">{approach.description}</p>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-4">Key Features</h4>
                    <ul className="space-y-3">
                      {approach.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="text-center bg-white/5 rounded-xl p-4">
                      <div className="text-2xl font-black text-blue-400">{approach.metrics.IOU}</div>
                      <div className="text-xs text-slate-400">Mean IOU</div>
                    </div>
                    <div className="text-center bg-white/5 rounded-xl p-4">
                      <div className="text-2xl font-black text-green-400">{approach.metrics.accuracy}</div>
                      <div className="text-xs text-slate-400">Accuracy</div>
                    </div>
                    <div className="text-center bg-white/5 rounded-xl p-4">
                      <div className="text-2xl font-black text-purple-400">{approach.metrics.models}</div>
                      <div className="text-xs text-slate-400">Models</div>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6">
                    <img 
                      src={approach.imageSrc} 
                      alt={`${approach.title} architecture diagram`}
                      className="w-full h-full object-contain bg-white/5"
                    />
                  </div>

                  {/* Pros/Cons */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-green-400 mb-3">Advantages</h5>
                      <ul className="space-y-2">
                        {approach.pros.map((pro, idx) => (
                          <li key={idx} className="text-sm text-slate-300 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-orange-400 mb-3">Trade-offs</h5>
                      <ul className="space-y-2">
                        {approach.cons.map((con, idx) => (
                          <li key={idx} className="text-sm text-slate-300 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evaluation Metrics */}
      <section className="fade-in-section py-24 px-6 bg-gradient-to-r from-slate-800/50 to-indigo-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-8">Evaluation Metrics</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Comprehensive performance measurement across both classification and segmentation tasks
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {evaluationMetrics.map((category, i) => (
              <div 
                key={category.category}
                className={`bg-white/10 backdrop-blur-md rounded-3xl border ${category.borderColor} hover:bg-white/15 transition-all duration-300 overflow-hidden`}
                onMouseEnter={() => setActiveMetric(category.category)}
                onMouseLeave={() => setActiveMetric(null)}
              >
                {/* Header */}
                <div className={`bg-gradient-to-r ${category.color} p-8`}>
                  <div className="flex items-center gap-4 mb-4">
                    <category.icon className="w-8 h-8 text-white" />
                    <h3 className="text-2xl font-bold text-white">{category.category}</h3>
                  </div>
                  <p className="text-white/90 leading-relaxed">{category.description}</p>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Metrics List */}
                  <div className="space-y-4 mb-8">
                    {category.metrics.map((metric, idx) => (
                      <div key={idx} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors duration-300">
                        <h4 className="font-semibold text-white mb-2">{metric.name}</h4>
                        <p className="text-slate-300 text-sm">{metric.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Visualization */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
                    <img 
                      src={category.imageSrc} 
                      alt={`${category.category} definitions`}
                      className="w-full h-full object-contain bg-white/5"
                    />
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
            Ready to See the Results?
          </h2>
          <p className="text-xl text-slate-300 mb-12">
            Discover how our approaches perform across different architectures and datasets
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="/results" 
              className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              View Results
            </a>
            <a 
              href="/detect" 
              className="px-10 py-4 border-2 border-white/20 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              Try Live Demo
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

export default ModernApproachesPage;