import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X, TrendingUp, Users, MapPin, Globe, ShieldCheck } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import backgroundImage from '/background.jpg';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1 } },
  exit: { opacity: 0 }
};

export default function HomeSection({ setActiveTab }) {
  const [showVideo, setShowVideo] = useState(false);

  const metrics = [
    { value: '50+', label: 'Websites Built', icon: Globe },
    { value: '100+', label: 'Clients Served', icon: Users },
    { value: '1M+', label: 'Leads Generated', icon: TrendingUp },
    { value: '25+', label: 'Cities Covered', icon: MapPin },
  ];

  return (
    <motion.div 
      variants={pageVariants} 
      initial="initial" 
      animate="animate" 
      exit="exit" 
      className="relative flex-1 flex flex-col items-center w-full min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Increased overlay opacity for better text contrast */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Header removed to clean up space for the global logo in App.tsx */}

      {/* Main Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center text-center w-full max-w-5xl px-6 z-10">
        
        {/* Increased text size and added shadow for maximum visibility */}
        <h1 className="text-4xl md:text-[56px] text-white leading-[1.1] mb-12 tracking-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
          <span className="opacity-90 font-light block mb-2">Building Digital Foundations for</span>
          <span className="font-extrabold tracking-wide">CONSTRUCTION SUCCESS</span>
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <button 
            onClick={() => setActiveTab('Services')}
            className="px-12 py-4 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] text-white font-bold text-base hover:brightness-110 transition-all shadow-2xl shadow-pink-500/30 active:scale-95"
          >
            Explore Our Solutions
          </button>
          
          <button 
            onClick={() => setShowVideo(true)}
            className="px-12 py-4 rounded-full border border-white/40 bg-white/10 backdrop-blur-md text-white font-bold text-base flex items-center gap-3 hover:bg-white/20 transition-all active:scale-95 shadow-xl"
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Play className="w-4 h-4 fill-white" />
            </div>
            Watch Overview
          </button>
        </div>

        {/* Client Logos - Adjusted visibility */}
        <div className="mt-24 w-full">
          <p className="text-white/60 text-[10px] uppercase tracking-[0.5em] font-bold mb-10">Trusted by Industry Leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-x-14 gap-y-8 opacity-80 transition-all duration-700">
            {['BuildCorp', 'Skyline', 'UrbanTech', 'TerraForm', 'Apex'].map((brand) => (
              <div key={brand} className="flex items-center gap-2 group cursor-default">
                <ShieldCheck className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                <span className="text-xl font-bold tracking-tighter text-white group-hover:scale-105 transition-transform">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar Metrics - Enhanced Glassmorphism */}
      <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 z-20">
        <div className="bg-black/20 backdrop-blur-3.5xl rounded-[40px] py-12 px-6 flex flex-col gap-10 border border-white/90 shadow-2xl">
          {metrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col items-center group">
              <div className="mb-3 p-2 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-[#ec4899]/30 transition-all">
                <metric.icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-2xl font-black text-white leading-none mb-1">{metric.value}</span>
              <span className="text-white/50 font-bold text-[7px] tracking-widest text-center leading-tight uppercase">
                {metric.label.split(' ').join('\n')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Vertical Label */}
      <div className="hidden md:block fixed right-0 top-1/2 -translate-y-1/2 translate-x-[42px] rotate-90 z-30">
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 text-white/60 px-8 py-3 rounded-t-2xl text-[10px] font-bold tracking-[0.4em] uppercase">
          Our Journey
        </div>
      </div>

      {/* WhatsApp Chat Button */}
      <div className="fixed bottom-10 right-10 z-50">
        <button className="flex items-center gap-4 bg-white/10 backdrop-blur-2xl border border-white/20 text-white pl-2 pr-8 py-2.5 rounded-full font-bold shadow-2xl hover:bg-white/20 transition-all hover:-translate-y-1">
          <div className="w-12 h-12 bg-[#22c55e] rounded-full flex items-center justify-center shadow-lg shadow-green-500/20">
              <FaWhatsapp className="w-7 h-7 text-white" />
          </div>
          <span className="text-sm uppercase tracking-widest">Let's Talk</span>
        </button>
      </div>
    </motion.div>
  );
}