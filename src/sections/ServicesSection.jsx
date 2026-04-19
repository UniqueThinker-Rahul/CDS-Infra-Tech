import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code, TrendingUp, Zap, MessageCircle, MapPin, ArrowRight, CheckCircle2, Factory, HardHat, Building2 } from 'lucide-react';

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function ServicesSection({ setActiveTab }) {
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    if (selectedService) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedService]);

  const services = [
    { 
      title: 'Engineering & Design', 
      desc: 'Advanced structural engineering and architectural design solutions leveraging BIM and 3D modeling for precision construction.', 
      icon: Building2,
      impact: 'Zero Design Errors',
      details: [
        'Building Information Modeling (BIM) Level 2 & 3',
        'Structural Analysis & Optimization',
        'Architectural Visualization & Walkthroughs',
        'Sustainable Design & LEED Certification Support',
        'Pre-construction Feasibility Studies'
      ],
      color: 'from-blue-600 to-indigo-600',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
      size: 'large'
    },
    { 
      title: 'Digital Transformation', 
      desc: 'Modernizing construction workflows with custom ERPs, cloud integration, and automated project management systems.', 
      icon: TrendingUp,
      impact: '40% Faster Reporting',
      details: [
        'Custom Construction ERP Development',
        'Cloud-based Project Management Portals',
        'Supply Chain & Vendor Integration',
        'Automated Reporting & Data Analytics',
        'Legacy System Modernization'
      ],
      color: 'from-purple-600 to-pink-600',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
      size: 'medium'
    },
    { 
      title: 'Smart Construction', 
      desc: 'Implementing Industry 4.0 technologies, IoT sensors, and real-time site monitoring for enhanced safety and efficiency.', 
      icon: Zap,
      impact: 'Site Safety +99%',
      details: [
        'IoT-enabled Site Monitoring Systems',
        'Real-time Asset & Equipment Tracking',
        'Safety Compliance Automation',
        'Drone-based Site Surveys & Progress Mapping',
        'Smart Warehouse & Inventory Management'
      ],
      color: 'from-orange-600 to-red-600',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200&auto=format&fit=crop',
      size: 'medium'
    },
    { 
      title: 'Digital Marketing', 
      desc: 'Strategic brand positioning and high-impact lead generation campaigns tailored for the construction industry.', 
      icon: MessageCircle,
      impact: 'High-Value Lead Flow',
      details: [
        'Construction-specific SEO & Content Strategy',
        'High-conversion PPC & Social Media Ads',
        'Brand Identity & Narrative Development',
        'Lead Nurturing & CRM Automation',
        'Performance Marketing & ROI Tracking'
      ],
      color: 'from-cyan-600 to-blue-600',
      image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1200&auto=format&fit=crop',
      size: 'small'
    },
    { 
      title: 'Local Visibility', 
      desc: 'Dominating local search and Google Maps to ensure your business is the first choice in your service area.', 
      icon: MapPin,
      impact: 'Top 3 GMB Ranking',
      details: [
        'Hyper-local SEO & GMB Optimization',
        'Local Citation & Review Management',
        'Geofenced Advertising Campaigns',
        'Community Engagement Strategies',
        'Local Market Analysis & Insights'
      ],
      color: 'from-green-600 to-emerald-600',
      image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop',
      size: 'small'
    }
  ];

  return (
    <motion.div className="w-full max-w-7xl mx-auto px-4 md:px-6 pb-20">
      <AnimatePresence mode="wait">
        {!selectedService ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="w-full"
          >
            <div className="text-center mb-20">
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-[#ec4899] animate-pulse"></div>
                <span className="text-white/70 font-bold tracking-[0.3em] uppercase text-[10px]">Technical Capabilities</span>
              </motion.div>
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 tracking-tighter text-white uppercase italic">
                Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-[#ec4899]">Impact</span>
              </motion.h2>
              <motion.p variants={itemVariants} className="text-white/60 max-w-3xl mx-auto text-base md:text-lg font-light leading-relaxed">
                We bridge the gap between heavy engineering and high-velocity digital innovation, delivering precision at scale for modern infrastructure.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[350px] md:auto-rows-[400px]">
              {services.map((s, i) => (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  whileHover={{ y: -12 }}
                  onClick={() => setSelectedService(s)}
                  className={`relative group rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-500 ${
                    s.size === 'large' ? 'md:col-span-8' : 
                    s.size === 'medium' ? 'md:col-span-6' : 
                    'md:col-span-4'
                  }`}
                >
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={s.image} 
                      alt={s.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-30 group-hover:opacity-50 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-20 transition-opacity duration-700`}></div>
                  </div>

                  <div className="relative z-20 h-full p-8 md:p-10 flex flex-col justify-end">
                    <div className="flex justify-between items-start mb-6">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-2xl group-hover:rotate-6 transition-all duration-500`}>
                            <s.icon className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-[10px] font-black text-white/40 group-hover:text-white uppercase tracking-[0.2em] border border-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                            {s.impact}
                        </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all tracking-tighter uppercase italic">{s.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed max-w-md line-clamp-2 transition-all duration-700 font-light group-hover:text-white/80">
                      {s.desc}
                    </p>
                    <div className="mt-6 flex items-center gap-3 text-white font-black text-[10px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <span className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">View Capability</span>
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="detail"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            className="w-full max-w-7xl mx-auto bg-black/80 backdrop-blur-3xl border border-white/10 rounded-[3.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)] mt-4 mb-20"
          >
            <div className="relative h-64 md:h-[500px] overflow-hidden">
              <motion.img 
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5 }}
                src={selectedService.image} 
                alt={selectedService.title} 
                className="w-full h-full object-cover opacity-50 grayscale-[0.5]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-8 left-8 z-30 flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl text-white hover:bg-[#ec4899] transition-all group border border-white/10 shadow-2xl"
              >
                <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                <span className="text-[10px] font-black tracking-[0.2em] uppercase">Return to Overview</span>
              </button>

              <div className="absolute bottom-12 left-8 md:left-16 flex flex-col md:flex-row items-start md:items-end gap-8">
                <div className={`w-24 h-24 md:w-36 md:h-36 rounded-[2.5rem] bg-gradient-to-br ${selectedService.color} flex items-center justify-center shadow-2xl border border-white/20`}>
                  <selectedService.icon className="w-10 h-10 md:w-16 md:h-16 text-white" />
                </div>
                <div className="pb-1">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-[2px] bg-[#ec4899]"></div>
                        <span className="text-[#ec4899] font-black uppercase tracking-[0.3em] text-[10px]">{selectedService.impact}</span>
                    </div>
                  <motion.h3 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-4xl md:text-7xl font-black text-white mb-2 tracking-tighter uppercase italic"
                  >
                    {selectedService.title}
                  </motion.h3>
                </div>
              </div>
            </div>
            
            <div className="p-8 md:p-20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-7">
                  <div className="mb-16">
                    <h4 className="text-[11px] uppercase tracking-[0.5em] text-[#ec4899] font-black mb-6">Service Scope</h4>
                    <p className="text-xl md:text-2xl text-white leading-snug font-light tracking-tight opacity-90 italic">
                      {selectedService.desc}
                    </p>
                  </div>
                  
                  <h4 className="text-[11px] uppercase tracking-[0.5em] text-[#ec4899] font-black mb-10">Technical Competencies</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedService.details.map((detail, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        key={idx} 
                        className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all hover:bg-white/[0.07] group"
                      >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${selectedService.color} flex items-center justify-center shrink-0 shadow-lg opacity-80 group-hover:opacity-100`}>
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-white/70 group-hover:text-white transition-colors text-sm font-medium">{detail}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="lg:col-span-5">
                  <div className="p-10 rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 relative overflow-hidden group shadow-2xl sticky top-32">
                    <div className={`absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br ${selectedService.color} opacity-10 blur-[80px]`}></div>
                    <Building2 className="w-12 h-12 text-white/10 mb-8" />
                    <h4 className="text-3xl font-black mb-4 text-white tracking-tighter uppercase italic">Redefine Your Infrastructure</h4>
                    <p className="text-white/40 mb-10 text-sm leading-relaxed font-light">Join the industry leaders leveraging CDS technology to build faster, safer, and smarter. Our specialists are ready to architect your next phase.</p>
                    
                    <button 
                      onClick={() => setActiveTab('Contact')}
                      className={`w-full py-6 rounded-2xl bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] text-white font-black tracking-[0.2em] uppercase text-[11px] hover:shadow-[0_20px_50px_rgba(236,72,153,0.3)] hover:-translate-y-1 transition-all active:scale-95 mb-4 relative z-10 shadow-xl cursor-pointer`}
                    >
                      Request a Consultation
                    </button>

                    <button 
                      onClick={() => setActiveTab('Portfolio')}
                      className="w-full py-6 rounded-2xl border-2 border-white/10 text-white/80 font-black tracking-[0.2em] uppercase text-[11px] hover:bg-white/5 transition-all relative z-10 cursor-pointer"
                    >
                      Explore Case Studies
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
