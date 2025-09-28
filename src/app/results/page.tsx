'use client'

import React, { useState, useEffect } from 'react';
import { TrendingUp, Award, Zap, GitBranch, Target, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

const finalAnalysis = {
  singleStage: {
    title: "Single Stage Semantic Segmentation",
    advantages: [
      "Outperformed double stage in 43 models",
      "Overall better performance",
      "Faster inference time",
      "Simpler pipeline architecture"
    ],
    performance: {
      bestModel: "DAENet(EfficientNetB4)",
      accuracy: "99.05%",
      f1Score: "93.97%",
      avgIou: "93.80%"
    },
    color: "from-blue-500 to-cyan-500",
    borderColor: "border-blue-400/30"
  },
  doubleStage: {
    title: "Double Stage Semantic Segmentation", 
    disadvantages: [
      "Outperformed single stage in only 6 models",
      "Some oil images lost in classification phase",
      "Led to lower overall performance",
      "Higher computational complexity"
    ],
    performance: {
      bestModel: "DAENet(EfficientNetB3)",
      accuracy: "98.25%",
      f1Score: "87.50%",
      avgIou: "87.96%"
    },
    color: "from-purple-500 to-pink-500", 
    borderColor: "border-purple-400/30"
  }
};

const modelComparison = [
  { model: "DAENet(EfficientNetB4)", singleStage: "Single Stage", winner: "Single Stage", performance: 95 },
  { model: "DeepLabV3+(ResNet101)", singleStage: "Single Stage", winner: "Single Stage", performance: 92 },
  { model: "Unet(DenseNet201)", singleStage: "Single Stage", winner: "Single Stage", performance: 88 },
  { model: "Unet", singleStage: "Single Stage", winner: "Double Stage", performance: 76 }
];

const resultImages = [
  {
    id: 'single-stage-metrics',
    title: 'Single Stage Performance Metrics',
    description: 'Comprehensive evaluation across accuracy, F1 score, IoU-oil, IoU-no-oil, and average IoU',
    src: 'r1.png',
    category: 'Single Stage',
    metrics: ['Accuracy', 'F1 Score', 'IoU-Oil', 'IoU-No-Oil', 'IoU-Avg']
  },
  {
    id: 'single-stage-models',
    title: 'Single Stage Model Comparison',
    description: 'Performance comparison across all single-stage architectures and backbones',
    src: 'r2.png', 
    category: 'Single Stage',
    metrics: ['All Models', 'Architecture Comparison', 'Backbone Analysis']
  },
  {
    id: 'double-stage-metrics',
    title: 'Double Stage Performance Metrics',
    description: 'Evaluation metrics for the two-phase classification and segmentation pipeline',
    src: 'r3.png',
    category: 'Double Stage', 
    metrics: ['Accuracy', 'F1 Score', 'IoU-Oil', 'IoU-No-Oil', 'IoU-Avg']
  },
  {
    id: 'double-stage-models',
    title: 'Double Stage Model Comparison',
    description: 'Comparative analysis of all double-stage model configurations',
    src: 'r4.png',
    category: 'Double Stage',
    metrics: ['All Models', 'Pipeline Analysis', 'Stage Comparison']
  },
  {
    id: 'classification-results',
    title: 'Classification Stage Results',
    description: 'Binary classification performance for oil presence detection in double-stage pipeline',
    src: 'r5.png',
    category: 'Classification',
    metrics: ['Accuracy', 'Precision', 'Recall', 'Specificity', 'Sensitivity']
  }
];

const ModernResultsPage = () => {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Single Stage', 'Double Stage', 'Classification'];

  const filteredImages = selectedCategory === 'All' 
    ? resultImages 
    : resultImages.filter(img => img.category === selectedCategory);

  useEffect(() => {
    const handleScroll = () => {
        console.log(activeImage)
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(34,197,94,0.15),transparent_50%)] bg-[radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.1),transparent_50%)]" />
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-green-500/20 rounded-full border border-green-400/30 mb-8">
            <span className="text-green-300 text-sm font-medium tracking-wide">PERFORMANCE ANALYSIS</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 bg-gradient-to-r from-white via-green-200 to-blue-300 bg-clip-text text-transparent leading-tight">
            Results & Evaluation
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-16 max-w-4xl mx-auto leading-relaxed">
            Comprehensive performance analysis comparing single-stage and double-stage approaches 
            across multiple architectures, backbones, and evaluation metrics.
          </p>

          {/* Key Findings */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-green-400/20">
              <Award className="w-8 h-8 text-green-400 mb-3 mx-auto" />
              <div className="text-2xl font-black text-green-400 mb-2">43/49</div>
              <div className="text-sm text-slate-400">Models won by Single Stage</div>
            </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-purple-400/20">
              <TrendingUp className="w-8 h-8 text-purple-400 mb-3 mx-auto" />
              <div className="text-2xl font-black text-purple-400 mb-2">93.80%</div>
              <div className="text-sm text-slate-400">Highest Mean-IOU</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-blue-400/20">
              <Target className="w-8 h-8 text-blue-400 mb-3 mx-auto" />
              <div className="text-2xl font-black text-blue-400 mb-2">99.05%</div>
              <div className="text-sm text-slate-400">Best Accuracy Achieved</div>
            </div>
          
          </div>
        </div>
      </section>

      {/* Final Analysis Comparison */}
      <section className="fade-in-section py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-8">Final Analysis</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Direct comparison revealing the superior performance of single-stage semantic segmentation
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Single Stage Results */}
            <div className={`bg-white/10 backdrop-blur-md rounded-3xl border ${finalAnalysis.singleStage.borderColor} overflow-hidden`}>
              <div className={`bg-gradient-to-r ${finalAnalysis.singleStage.color} p-8`}>
                <div className="flex items-center gap-4 mb-4">
                  <Zap className="w-8 h-8 text-white" />
                  <h3 className="text-2xl font-bold text-white">{finalAnalysis.singleStage.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                  <span className="text-white/90 font-medium">Winner: 43/49 Models</span>
                </div>
              </div>

              <div className="p-8">
                <h4 className="text-lg font-semibold mb-6 text-green-400">Key Advantages</h4>
                <ul className="space-y-4 mb-8">
                  {finalAnalysis.singleStage.advantages.map((advantage, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">{advantage}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-white/5 rounded-2xl p-6">
                  <h5 className="font-semibold mb-4 text-center">Best Performance: {finalAnalysis.singleStage.performance.bestModel}</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-400">{finalAnalysis.singleStage.performance.avgIou}</div>
                      <div className="text-xs text-slate-400">Mean-IOU</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-green-400">{finalAnalysis.singleStage.performance.accuracy}</div>
                      <div className="text-xs text-slate-400">Accuracy</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Double Stage Results */}
            <div className={`bg-white/10 backdrop-blur-md rounded-3xl border ${finalAnalysis.doubleStage.borderColor} overflow-hidden`}>
              <div className={`bg-gradient-to-r ${finalAnalysis.doubleStage.color} p-8`}>
                <div className="flex items-center gap-4 mb-4">
                  <GitBranch className="w-8 h-8 text-white" />
                  <h3 className="text-2xl font-bold text-white">{finalAnalysis.doubleStage.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-white" />
                  <span className="text-white/90 font-medium">Winner: 6/49 Models</span>
                </div>
              </div>

              <div className="p-8">
                <h4 className="text-lg font-semibold mb-6 text-orange-400">Limitations Found</h4>
                <ul className="space-y-4 mb-8">
                  {finalAnalysis.doubleStage.disadvantages.map((disadvantage, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">{disadvantage}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-white/5 rounded-2xl p-6">
                  <h5 className="font-semibold mb-4 text-center">Best Performance: {finalAnalysis.doubleStage.performance.bestModel}</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-purple-400">{finalAnalysis.doubleStage.performance.avgIou}</div>
                      <div className="text-xs text-slate-400">Mean-IOU</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-pink-400">{finalAnalysis.doubleStage.performance.accuracy}</div>
                      <div className="text-xs text-slate-400">Accuracy</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* VS Comparison */}
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 rounded-full px-8 py-4">
              <span className="text-2xl font-black text-white">Single Stage WINS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Model Comparison Table */}
      <section className="fade-in-section py-24 px-6 bg-gradient-to-r from-slate-800/50 to-indigo-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-8">Model Performance Overview</h2>
            <p className="text-xl text-slate-300">Head-to-head comparison of leading architectures</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-white/5">
                    <th className="text-left p-6 font-semibold">Model</th>
                    <th className="text-center p-6 font-semibold">Single Stage</th>
                    <th className="text-center p-6 font-semibold">Winner</th>
                    <th className="text-center p-6 font-semibold">Double Stage</th>
                  </tr>
                </thead>
                <tbody>
                  {modelComparison.map((model, i) => (
                    <tr key={i} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                      <td className="p-6 font-medium text-blue-300">{model.model}</td>
                      <td className="p-6 text-center">
                        <span className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-300 text-sm">
                          Single Stage
                        </span>
                      </td>
                      <td className="p-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <ArrowRight className="w-4 h-4 text-green-400" />
                          <span className={`font-semibold ${
                            model.winner === 'Single Stage' ? 'text-green-400' : 'text-purple-400'
                          }`}>
                            {model.winner}
                          </span>
                        </div>
                      </td>
                      <td className="p-6 text-center">
                        <span className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-300 text-sm">
                          Double Stage
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Results Gallery */}
      <section className="fade-in-section py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-8">Detailed Results</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Comprehensive visualizations of performance metrics across all experiments
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((image, i) => (
              <div 
                key={image.id}
                className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-300 overflow-hidden group cursor-pointer"
                onMouseEnter={() => setActiveImage(image.id)}
                onMouseLeave={() => setActiveImage(null)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      image.category === 'Single Stage' ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30' :
                      image.category === 'Double Stage' ? 'bg-purple-500/20 text-purple-300 border border-purple-400/30' :
                      'bg-green-500/20 text-green-300 border border-green-400/30'
                    }`}>
                      {image.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{image.title}</h3>
                  <p className="text-slate-300 text-sm mb-4 leading-relaxed">{image.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {image.metrics.map((metric, idx) => (
                      <span key={idx} className="px-2 py-1 bg-white/5 rounded text-xs text-slate-400">
                        {metric}
                      </span>
                    ))}
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
            Ready to Try Our Solution?
          </h2>
          <p className="text-xl text-slate-300 mb-12">
            Experience our award-winning single-stage oil spill detection system in action
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="/detect" 
              className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Live Demo
            </a>
            <a 
              href="/approaches" 
              className="px-10 py-4 border-2 border-white/20 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              Learn More
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

export default ModernResultsPage;