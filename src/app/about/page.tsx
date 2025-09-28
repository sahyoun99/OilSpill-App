'use client'
import React, { useState, useEffect } from 'react';
import { Mail, MapPin, GraduationCap, Award, Users, Globe, Lightbulb, Target } from 'lucide-react';

const researchers = [
  { 
    name: 'Dr. Mohammad Daoud', 
    role: 'Project Supervisor', 
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStxigY9pshoMN8MZriN0Tn1ZMIPHrW3TM7-Q&s', 
    contact: 'mdaoud@aus.edu',
    affiliation: 'American University of Sharjah',
    specialization: 'Computer Vision & Machine Learning',
    bio: 'Leading expert in deep learning applications for environmental monitoring with 15+ years of research experience.',
    achievements: ['Published 50+ papers', 'IEEE Senior Member', 'Best Paper Award 2023']
  },
  { 
    name: 'Dr. Mohammad Jaradat', 
    role: 'Project Co-Supervisor', 
    img: 'data:image/jpeg;base64,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', 
    contact: 'mjaradat@aus.edu',
    affiliation: 'American University of Sharjah',
    specialization: 'Signal Processing & Remote Sensing',
    bio: 'Expert in SAR image processing and environmental applications with focus on Gulf region challenges.',
    achievements: ['20+ publications', 'Research Excellence Award', 'Industry Collaborations']
  },
  { 
    name: 'Mohamad Abousahyoun', 
    role: 'AI Researcher', 
    img: 'https://static.vecteezy.com/system/resources/previews/032/176/197/non_2x/business-avatar-profile-black-icon-man-of-user-symbol-in-trendy-flat-style-isolated-on-male-profile-people-diverse-face-for-social-network-or-web-vector.jpg', 
    contact: 'mabousahyoun99@gmail.com',
    affiliation: 'American University of Sharjah',
    specialization: 'Deep Learning & Neural Networks',
    bio: 'PhD candidate specializing in advanced neural architectures for environmental monitoring applications.',
    achievements: ['DAENet Architecture', '5+ Conference Papers', 'Graduate Research Award']
  },
  { 
    name: 'Abdallah Lootah', 
    role: 'AI Researcher', 
    img: 'https://static.vecteezy.com/system/resources/previews/032/176/197/non_2x/business-avatar-profile-black-icon-man-of-user-symbol-in-trendy-flat-style-isolated-on-male-profile-people-diverse-face-for-social-network-or-web-vector.jpg', 
    contact: 'alootah@aus.edu',
    affiliation: 'American University of Sharjah',
    specialization: 'Computer Vision & Image Segmentation',
    bio: 'Graduate researcher focused on semantic segmentation and evaluation metrics for environmental AI.',
    achievements: ['Segmentation Expert', 'Research Publications', 'Technical Innovation']
  },
  { 
    name: 'Khalid Saadat', 
    role: 'AI Researcher', 
    img: 'https://static.vecteezy.com/system/resources/previews/032/176/197/non_2x/business-avatar-profile-black-icon-man-of-user-symbol-in-trendy-flat-style-isolated-on-male-profile-people-diverse-face-for-social-network-or-web-vector.jpg', 
    contact: 'ksaadat@aus.edu',
    affiliation: 'American University of Sharjah',
    specialization: 'Machine Learning & Data Analysis',
    bio: 'Research specialist in performance evaluation and statistical analysis of AI models for marine protection.',
    achievements: ['Data Science Expert', 'Model Validation', 'Statistical Analysis']
  }
];

const projectInfo = {
  mission: "To develop cutting-edge AI solutions for oil spill detection and environmental protection in the Gulf region",
  vision: "Creating a safer, cleaner marine environment through advanced technology and international collaboration",
  impact: [
    "Protecting marine ecosystems",
    "Supporting coastal economies", 
    "Advancing AI for good",
    "Enabling rapid response"
  ],
  collaborations: [
    "American University of Sharjah",
    "UAE Environmental Agencies",
    "Regional Maritime Authorities",
    "International Research Partners"
  ]
};

const ModernAboutPage = () => {
  const [activeResearcher, setActiveResearcher] = useState<number | null>(null);

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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(34,197,94,0.15),transparent_50%)] bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-green-500/20 rounded-full border border-green-400/30 mb-8">
              <span className="text-green-300 text-sm font-medium tracking-wide">RESEARCH TEAM</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 bg-gradient-to-r from-white via-green-200 to-blue-300 bg-clip-text text-transparent leading-tight">
              Meet Our Team
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Dedicated researchers and AI specialists working together to protect marine environments 
              through cutting-edge technology and collaborative innovation.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-green-400/20">
              <div className="flex items-center gap-4 mb-6">
                <Target className="w-8 h-8 text-green-400" />
                <h2 className="text-2xl font-bold">Our Mission</h2>
              </div>
              <p className="text-slate-300 leading-relaxed">{projectInfo.mission}</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-blue-400/20">
              <div className="flex items-center gap-4 mb-6">
                <Lightbulb className="w-8 h-8 text-blue-400" />
                <h2 className="text-2xl font-bold">Our Vision</h2>
              </div>
              <p className="text-slate-300 leading-relaxed">{projectInfo.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Team */}
      <section className="fade-in-section py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-8">Research Team</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Combining expertise in AI, computer vision, and environmental science to tackle critical challenges
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {researchers.map((researcher, i) => (
              <div 
                key={i}
                className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-300 overflow-hidden group"
                onMouseEnter={() => setActiveResearcher(i)}
                onMouseLeave={() => setActiveResearcher(null)}
              >
                {/* Profile Image & Header */}
                <div className="relative p-8 pb-4">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <img 
                      src={researcher.img} 
                      alt={researcher.name}
                      className="w-full h-full rounded-full object-cover border-4 border-white/20 group-hover:border-white/40 transition-all duration-300"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">{researcher.name}</h3>
                    <p className="text-blue-400 font-medium mb-1">{researcher.role}</p>
                    <p className="text-slate-400 text-sm">{researcher.specialization}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="px-8 pb-8">
                  {/* Bio */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">{researcher.bio}</p>
                  
                  {/* Affiliation */}
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-400 text-sm">{researcher.affiliation}</span>
                  </div>
                  
                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Key Achievements
                    </h4>
                    <div className="space-y-2">
                      {researcher.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                          <span className="text-slate-400 text-xs">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Contact */}
                  <a 
                    href={`mailto:${researcher.contact}`}
                    className="flex items-center gap-3 bg-white/5 rounded-xl p-3 hover:bg-white/10 transition-all duration-300 group/contact"
                  >
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400 text-sm group-hover/contact:text-blue-300">{researcher.contact}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact & Collaborations */}
      <section className="fade-in-section py-24 px-6 bg-gradient-to-r from-slate-800/50 to-indigo-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Impact */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <Users className="w-8 h-8 text-green-400" />
                <h2 className="text-4xl font-black">Our Impact</h2>
              </div>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Our research contributes to environmental protection and sustainable development 
                through innovative AI solutions and collaborative partnerships.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {projectInfo.impact.map((item, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-green-400/20">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <span className="text-lg font-bold">{i + 1}</span>
                      </div>
                      <p className="text-slate-300 text-sm">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Collaborations */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <Globe className="w-8 h-8 text-blue-400" />
                <h2 className="text-4xl font-black">Collaborations</h2>
              </div>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Working with leading institutions and organizations to advance research 
                and implement real-world solutions for marine conservation.
              </p>
              <div className="space-y-4">
                {projectInfo.collaborations.map((collaboration, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-blue-400/20 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <span className="text-slate-300 font-medium">{collaboration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8">
            Join Our Mission
          </h2>
          <p className="text-xl text-slate-300 mb-12">
            Interested in collaborating on environmental AI research or learning more about our work?
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="mailto:mdaoud@aus.edu" 
              className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Contact Us
            </a>
            <a 
              href="/problem" 
              className="px-10 py-4 border-2 border-white/20 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              Learn About Our Research
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

export default ModernAboutPage;