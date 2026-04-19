import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code, TrendingUp, Zap, MessageCircle, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};
export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    // 👉 SAME ARRAY copy karo (original se)
    { 
          title: 'Engineering & Design', 
          desc: 'Advanced structural engineering and architectural design solutions leveraging BIM and 3D modeling for precision construction.', 
          icon: Code,
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
    <motion.div>
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
                    <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                      <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></div>
                      <span className="text-white/70 font-bold tracking-[0.3em] uppercase text-[10px]">Our Expertise</span>
                    </motion.div>
                    <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black mb-8 tracking-tight">
                      Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">Excellence</span>
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-white/40 max-w-3xl mx-auto text-base md:text-lg font-light leading-relaxed">
                      We combine deep domain knowledge with cutting-edge digital solutions to transform the construction landscape through innovation and precision.
                    </motion.p>
                  </div>
      
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[350px] md:auto-rows-[400px]">
                    {services.map((s, i) => (
                      <motion.div 
                        key={i} 
                        variants={itemVariants}
                        whileHover={{ y: -12, scale: 1.01 }}
                        onClick={() => setSelectedService(s)}
                        className={`relative group rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl border border-white/10 bg-[#0a0a16] transition-all duration-500 ${
                          s.size === 'large' ? 'md:col-span-8' : 
                          s.size === 'medium' ? 'md:col-span-6' : 
                          'md:col-span-4'
                        }`}
                      >
                        {/* Background Image with Dynamic Overlay */}
                        <div className="absolute inset-0 z-0">
                          <img 
                            src={s.image} 
                            alt={s.title} 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-30 group-hover:opacity-50"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a16] via-[#0a0a16]/40 to-transparent"></div>
                          <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}></div>
                        </div>
      
                        {/* Glassmorphism Border Glow */}
                        <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-colors duration-500 rounded-[2.5rem] z-10 pointer-events-none"></div>
      
                        {/* Content */}
                        <div className="relative z-20 h-full p-10 flex flex-col justify-end">
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                            <s.icon className="w-7 h-7 text-white" />
                          </div>
                          <h3 className="text-xl md:text-2xl font-black mb-4 group-hover:text-pink-400 transition-colors tracking-tight">{s.title}</h3>
                          <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-md line-clamp-2 group-hover:line-clamp-none transition-all duration-700 font-light">
                            {s.desc}
                          </p>
                          
                          <div className="mt-8 flex items-center gap-3 text-white font-black text-[10px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                            <span className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">Explore Capability</span>
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10">
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
      
                  {/* Expanded UrbanTech Vision Section */}
                  <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="mt-32 w-full p-10 md:p-20 rounded-[4rem] bg-gradient-to-br from-[#0a0a16] to-transparent border border-white/10 relative overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.4)]"
                  >
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px]"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-600/5 blur-[120px]"></div>
                    
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                      <div>
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                          <Zap className="w-4 h-4 text-pink-500" />
                          <span className="text-white/70 font-black tracking-[0.4em] uppercase text-[10px]">Vision 2030: UrbanTech</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">
                          The Future of <br />
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">Urban Engineering</span>
                        </h2>
                        <p className="text-white/50 text-xl leading-relaxed font-light mb-10">
                          CDS Infra Tech is pioneering the <span className="text-white font-medium">UrbanTech</span> revolution. We are moving beyond concrete and steel to integrate intelligence into every square foot of the modern landscape.
                        </p>
                        
                        <div className="space-y-6">
                          {[
                            { title: 'Smart Infrastructure', desc: 'IoT-enabled structural health monitoring for real-time safety.' },
                            { title: 'AI-Driven Efficiency', desc: 'Predictive analytics for resource optimization and timeline precision.' },
                            { title: 'Digital Twins', desc: 'Virtual replicas for seamless lifecycle management and maintenance.' }
                          ].map((item, i) => (
                            <div key={i} className="flex gap-6 items-start group">
                              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-pink-600 transition-colors duration-500">
                                <CheckCircle2 className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className="text-white font-bold mb-1 tracking-tight">{item.title}</h4>
                                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="aspect-square rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative group">
                          <img 
                            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop" 
                            alt="Futuristic City" 
                            className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a16] via-transparent to-transparent"></div>
                          <div className="absolute bottom-10 left-10 right-10 p-8 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl">
                            <p className="text-white font-black text-2xl tracking-tighter mb-2">Urban Resilience</p>
                            <p className="text-white/40 text-sm leading-relaxed">Designing cities that are not just smart, but sustainable and resilient for generations to come.</p>
                          </div>
                        </div>
                        
                        {/* Floating Stats */}
                        <div className="absolute -top-10 -left-10 p-6 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-2xl border border-white/20 animate-bounce-slow">
                          <p className="text-white font-black text-3xl tracking-tighter">40%</p>
                          <p className="text-white/80 text-[8px] font-black uppercase tracking-widest">Efficiency Gain</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div 
                  key="detail"
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -60 }}
                  className="w-full max-w-6xl bg-[#0a0a16]/80 backdrop-blur-3xl border border-white/10 rounded-[3.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)] mt-4"
                >
                  <div className="relative h-80 md:h-[500px] overflow-hidden">
                    <img 
                      src={selectedService.image} 
                      alt={selectedService.title} 
                      className="w-full h-full object-cover opacity-40"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a16] via-[#0a0a16]/40 to-transparent"></div>
                    
                    <button 
                      onClick={() => setSelectedService(null)}
                      className="absolute top-10 left-10 flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 backdrop-blur-2xl text-white hover:bg-pink-600 transition-all group border border-white/10 shadow-2xl"
                    >
                      <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
                      <span className="text-xs font-black tracking-[0.3em] uppercase">Back to Expertise</span>
                    </button>
      
                    <div className="absolute bottom-16 left-10 md:left-16 flex flex-col md:flex-row items-start md:items-end gap-8">
                      <div className={`w-28 h-28 md:w-36 md:h-36 rounded-[2.5rem] bg-gradient-to-br ${selectedService.color} flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20`}>
                        <selectedService.icon className="w-12 h-12 md:w-16 md:h-16 text-white" />
                      </div>
                      <div className="pb-2">
                        <motion.h3 
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter"
                        >
                          {selectedService.title}
                        </motion.h3>
                        <div className={`h-2 w-48 bg-gradient-to-r ${selectedService.color} rounded-full shadow-lg`}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-10 md:p-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
                      <div className="lg:col-span-8">
                        <div className="mb-16">
                          <h4 className="text-sm uppercase tracking-[0.4em] text-pink-500 font-black mb-6">Capability Overview</h4>
                          <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-light tracking-tight">
                            {selectedService.desc}
                          </p>
                        </div>
                        
                        <h4 className="text-sm uppercase tracking-[0.4em] text-pink-500 font-black mb-10">Core Competencies</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {selectedService.details.map((detail, idx) => (
                            <motion.div 
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 + idx * 0.1 }}
                              key={idx} 
                              className="flex items-start gap-6 p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:border-white/20 transition-all hover:bg-white/10 group relative overflow-hidden"
                            >
                              <div className={`absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br ${selectedService.color} opacity-0 group-hover:opacity-5 blur-2xl transition-opacity`}></div>
                              <div className={`mt-1.5 w-7 h-7 rounded-full bg-gradient-to-br ${selectedService.color} flex items-center justify-center shrink-0 shadow-xl`}>
                                <CheckCircle2 className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-white/60 group-hover:text-white transition-colors text-lg leading-relaxed font-medium">{detail}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="lg:col-span-4 space-y-10">
                        <div className="p-12 rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 relative overflow-hidden group shadow-2xl">
                          <div className={`absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br ${selectedService.color} opacity-10 blur-[100px] group-hover:opacity-20 transition-opacity`}></div>
                          <h4 className="text-3xl font-black mb-6 relative z-10 tracking-tight">Transform Your <br />Business</h4>
                          <p className="text-white/40 mb-12 relative z-10 leading-relaxed font-light">Partner with us to leverage cutting-edge engineering and digital solutions tailored for construction excellence.</p>
                          <button className={`w-full py-6 rounded-2xl bg-gradient-to-r ${selectedService.color} text-white font-black tracking-[0.2em] uppercase text-[10px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all active:scale-95 mb-6 relative z-10 shadow-xl`}>
                            Request Consultation
                          </button>
                          <button className="w-full py-6 rounded-2xl border border-white/10 text-white/70 font-black tracking-[0.2em] uppercase text-[10px] hover:bg-white/5 transition-all relative z-10">
                            Capability Deck
                          </button>
                        </div>
                        
                        <div className="flex items-center gap-6 p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group shadow-xl">
                          <div className="w-16 h-16 rounded-2xl bg-pink-600 flex items-center justify-center shrink-0 shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all">
                            <MessageCircle className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <p className="text-[10px] text-pink-500 font-black uppercase tracking-[0.3em] mb-1">Expert Connect</p>
                            <p className="text-xl text-white font-black tracking-tight">Speak with a Specialist</p>
                          </div>
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