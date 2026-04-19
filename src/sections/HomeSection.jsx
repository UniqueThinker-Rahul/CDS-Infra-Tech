import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X, TrendingUp, Users, MapPin, Globe, ShieldCheck } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import backgroundImage from '/background.jpg';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1, staggerChildren: 0.2 } },
  exit: { opacity: 0 }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function HomeSection({ setActiveTab }) {
  const [showVideo, setShowVideo] = useState(false);

  const handleWhatsApp = () => {
    const phoneNumber = "918955957893";
    const message = encodeURIComponent("Hello CDS Infra Tech, I would like to inquire about your construction solutions.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

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
      {/* Dynamic Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-0"></div>

      {/* Main Content Container */}
      <div className="relative flex-1 flex flex-col items-center justify-center text-center w-full max-w-5xl px-6 z-10 -mt-12">
        
        {/* Title Section with Staggered Animation */}
        <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-4xl md:text-[64px] text-white leading-[1.05] mb-10 tracking-tight font-black">
                <span className="opacity-70 font-light block text-2xl md:text-3xl tracking-[0.2em] uppercase mb-4">
                    Building Digital Foundations for
                </span>
                <span className="drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    CONSTRUCTION <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-[#ec4899]">SUCCESS</span>
                </span>
            </h1>
        </motion.div>
        
        {/* Call to Action Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 items-center">
          <button 
            onClick={() => setActiveTab('Services')}
            className="group relative px-12 py-4 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] text-white font-bold text-sm tracking-widest uppercase hover:scale-105 transition-all shadow-[0_20px_40px_rgba(236,72,153,0.3)] active:scale-95 overflow-hidden"
          >
            <span className="relative z-10">Explore Our Solutions</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
          
          <button 
            onClick={() => setShowVideo(true)}
            className="px-10 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white font-bold text-sm tracking-widest uppercase flex items-center gap-3 hover:bg-white/10 transition-all active:scale-95 shadow-xl"
          >
            <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center border border-pink-500/30">
              <Play className="w-3 h-3 fill-pink-500 text-pink-500" />
            </div>
            Watch Overview
          </button>
        </motion.div>

        {/* Industry Trust Section */}
        <motion.div variants={itemVariants} className="mt-28 w-full">
          <p className="text-white/40 text-[10px] uppercase tracking-[0.6em] font-bold mb-10">Trusted by Industry Leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            {['BuildCorp', 'Skyline', 'UrbanTech', 'TerraForm', 'Apex'].map((brand) => (
              <div key={brand} className="flex items-center gap-2 group cursor-default">
                <ShieldCheck className="w-4 h-4 text-white/50 group-hover:text-pink-500 transition-colors" />
                <span className="text-lg font-black tracking-tighter text-white/80 group-hover:text-white transition-colors">{brand}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Sidebar Metrics - Refined High-Transparency Glass */}
      <div className="hidden xl:block absolute right-10 top-1/2 -translate-y-1/2 z-20">
        <div className="bg-black/40 backdrop-blur-[40px] rounded-[48px] py-12 px-6 flex flex-col gap-12 border border-white/10 shadow-2xl">
          {metrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col items-center group cursor-default">
              <div className="mb-3 p-2.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-[#ec4899]/20 group-hover:border-[#ec4899]/30 transition-all duration-500">
                <metric.icon className="w-5 h-5 text-white/70 group-hover:text-white" />
              </div>
              <span className="text-2xl font-black text-white leading-none mb-1 tracking-tighter">{metric.value}</span>
              <span className="text-[7px] text-white/30 font-black tracking-[0.2em] text-center leading-tight uppercase group-hover:text-white/60 transition-colors">
                {metric.label.split(' ').join('\n')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp Floating Component */}
      <div className="fixed bottom-10 right-10 z-50">
        <button 
          onClick={handleWhatsApp}
          className="group flex items-center gap-4 bg-white/10 backdrop-blur-2xl border border-white/10 text-white pl-2 pr-8 py-2.5 rounded-full font-bold shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:bg-white/15 transition-all hover:-translate-y-1 active:scale-95"
        >
          <div className="relative w-12 h-12 bg-[#22c55e] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-[#22c55e]/40 transition-all">
              <div className="absolute inset-0 rounded-full bg-[#22c55e] animate-ping opacity-20"></div>
              <FaWhatsapp className="w-7 h-7 text-white relative z-10" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-[10px] text-white/50 uppercase tracking-widest leading-none mb-1 font-medium">Have a project?</span>
            <span className="text-sm uppercase tracking-widest font-black">Let's Talk</span>
          </div>
        </button>
      </div>

      {/* Simple Video Modal */}
      <AnimatePresence>
        {showVideo && (
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
            >
                <button onClick={() => setShowVideo(false)} className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors">
                    <X className="w-10 h-10" />
                </button>
                <div className="w-full max-w-4xl aspect-video bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center">
                    <p className="text-white/40 font-black tracking-widest uppercase italic">Video Stream Placeholder</p>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
