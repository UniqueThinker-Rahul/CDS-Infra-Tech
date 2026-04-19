import { motion } from 'motion/react';
import { Globe, Award, Zap, ShieldCheck, Star, Quote, CheckCircle } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  exit: { opacity: 0, y: -30 }
};

export default function AboutSection() {
  const values = [
    { title: 'Global Standards', desc: 'Adhering to international safety and structural engineering protocols.', icon: Globe },
    { title: 'Certified Excellence', desc: 'ISO 9001:2015 certified digital solutions for modern construction.', icon: Award },
    { title: 'Rapid Deployment', desc: 'Proprietary frameworks reducing project lead times by up to 40%.', icon: Zap },
    { title: 'Data Integrity', desc: 'Military-grade encryption for sensitive project and blueprint data.', icon: ShieldCheck },
  ];

  const testimonials = [
    { name: 'Rajesh Khanna', role: 'CEO, BuildCorp India', text: 'CDS transformed our site monitoring. We saw a 25% increase in operational efficiency within just 3 months.', stars: 5 },
    { name: 'Sarah Miller', role: 'Director, UrbanTech UK', text: 'The BIM integration provided by CDS is world-class. Their engineering depth and technical support are unmatched.', stars: 5 },
  ];

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full flex flex-col items-center pt-10 pb-20 px-6 md:px-10 max-w-7xl mx-auto"
    >
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center mb-32">
        <div className="order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/40 mb-6 backdrop-blur-md">
            <CheckCircle className="w-3 h-3 text-pink-400" />
            <span className="text-pink-400 font-bold tracking-[0.2em] uppercase text-[10px]">Our Legacy</span>
          </div>
          
          {/* Increased drop shadow for the main heading */}
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-black mb-8 leading-[1.1] text-white tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
            Engineering the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] drop-shadow-none">
              Next Urban Frontier
            </span>
          </h2>
          
          {/* Increased text opacity from white/70 to white/90 for better reading against buildings */}
          <p className="text-lg text-white/90 leading-relaxed mb-10 font-medium max-w-xl drop-shadow-md">
            CDS Infra Tech bridges the gap between massive-scale physical construction and high-velocity digital innovation. We develop the core infrastructure and intelligent systems that power the world’s most ambitious architectural marvels.
          </p>
          
          <div className="flex flex-wrap gap-4 md:gap-6">
            {/* Added stronger border and higher background opacity for stat cards */}
            <div className="flex-1 min-w-[140px] p-6 rounded-3xl bg-black/40 border border-white/20 backdrop-blur-xl hover:border-pink-500/50 transition-all group shadow-xl">
              <p className="text-4xl font-black text-white mb-1 group-hover:text-pink-500 transition-colors">15+</p>
              <p className="text-[10px] text-white/70 uppercase tracking-[0.2em] font-extrabold">Global Awards</p>
            </div>
            <div className="flex-1 min-w-[140px] p-6 rounded-3xl bg-black/40 border border-white/20 backdrop-blur-xl hover:border-purple-500/50 transition-all group shadow-xl">
              <p className="text-4xl font-black text-white mb-1 group-hover:text-purple-500 transition-colors">500+</p>
              <p className="text-[10px] text-white/70 uppercase tracking-[0.2em] font-extrabold">Projects Delivered</p>
            </div>
          </div>
        </div>

        {/* Image side remains clear, but with enhanced glow to separate from background building */}
        <div className="relative order-1 lg:order-2">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-600/30 blur-[120px] rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-pink-600/30 blur-[120px] rounded-full"></div>
          
          <div className="relative rounded-[3rem] overflow-hidden border-2 border-white/30 shadow-2xl group">
            <img 
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1000&auto=format&fit=crop" 
              alt="Engineering Team" 
              className="w-full h-full object-cover grayscale-[0.5] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* Values Grid - Darker card backgrounds for contrast */}
      <div className="w-full mb-32 relative">
        <div className="text-center mb-16">
          <h3 className="text-2xl md:text-3xl font-black mb-4 text-white tracking-tight uppercase drop-shadow-md">
            The <span className="text-pink-500">CDS Standard</span>
          </h3>
          <p className="text-white/70 text-sm font-bold tracking-[0.3em] uppercase">Built on precision & innovation</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div key={i} className="p-8 xl:p-10 rounded-[2.5rem] bg-black/60 border border-white/10 hover:border-pink-500/50 hover:bg-black/80 transition-all group relative overflow-hidden shadow-2xl">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-gradient-to-br from-purple-600 to-pink-500 transition-all duration-500 shadow-xl">
                <v.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-black mb-3 text-white tracking-tight">{v.title}</h4>
              <p className="text-sm text-white/80 leading-relaxed font-normal">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="w-full mb-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="p-10 xl:p-14 rounded-[3.5rem] bg-black/50 backdrop-blur-md border border-white/20 relative group hover:border-white/40 transition-all shadow-2xl">
              <Quote className="absolute top-10 right-10 w-12 h-12 text-white/10 group-hover:text-pink-500/20 transition-colors" />
              
              <div className="flex gap-1 mb-8">
                {[...Array(t.stars)].map((_, starIdx) => (
                  <Star key={starIdx} className="w-4 h-4 text-pink-500 fill-pink-500" />
                ))}
              </div>
              
              <p className="text-lg xl:text-xl text-white/90 italic mb-12 leading-relaxed font-medium tracking-tight">
                "{t.text}"
              </p>
              
              <div className="flex items-center gap-4 border-t border-white/20 pt-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] flex items-center justify-center font-black text-white text-lg shadow-lg">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-black text-white text-lg tracking-tight">{t.name}</p>
                  <p className="text-[10px] text-pink-400 font-bold uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}