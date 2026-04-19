import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, ArrowRight } from 'lucide-react';

// 1. Variants define kiye (Missing the)
const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
  exit: { opacity: 0 }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function PortfolioSection() {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Commercial', 'Residential', 'Infrastructure', 'Digital'];

  const projects = [
    { 
      id: 1, 
      title: 'Skyline Tower', 
      cat: 'Commercial', 
      location: 'Dubai, UAE',
      year: '2025',
      impact: '30% Energy Reduction',
      img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
      size: 'large'
    },
    { 
      id: 2, 
      title: 'Eco Residences', 
      cat: 'Residential', 
      location: 'Singapore',
      year: '2024',
      impact: 'Net Zero Carbon',
      img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
      size: 'medium'
    },
    { 
      id: 3, 
      title: 'Global Bridge', 
      cat: 'Infrastructure', 
      location: 'London, UK',
      year: '2024',
      impact: 'Smart Traffic IoT',
      img: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=1200&auto=format&fit=crop',
      size: 'medium'
    },
    { 
      id: 4, 
      title: 'Tech Hub ERP', 
      cat: 'Digital', 
      location: 'Remote Implementation',
      year: '2025',
      impact: '50% Faster Workflows',
      img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
      size: 'small'
    },
    { 
      id: 5, 
      title: 'Modern Villas', 
      cat: 'Residential', 
      location: 'California, USA',
      year: '2023',
      impact: 'BIM Optimized',
      img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
      size: 'small'
    },
    { 
      id: 6, 
      title: 'Smart Highway', 
      cat: 'Infrastructure', 
      location: 'Mumbai, India',
      year: '2025',
      impact: 'AI Safety Monitoring',
      img: 'https://images.unsplash.com/photo-1541888087425-ce81dcfa4892?q=80&w=1200&auto=format&fit=crop',
      size: 'medium'
    },
  ];

  // 2. Filter logic add kiya (Missing tha)
  const filtered = filter === 'All' 
    ? projects 
    : projects.filter(p => p.cat === filter);

  return (
    <motion.div 
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      // 3. pt-32 add kiya Navbar visibility ke liye
      className="w-full flex flex-col items-center pt-5 pb-20 px-6 md:px-10 max-w-7xl mx-auto"
    >
      <div className="text-center mb-16">
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
          <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></div>
          <span className="text-white/70 font-bold tracking-[0.3em] uppercase text-[10px]">Our Impact</span>
        </motion.div>
        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black mb-8 tracking-tight text-white text-center">
          Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">Portfolio</span>
        </motion.h2>
        
        {/* Filter Bar */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 md:gap-4 mt-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-full text-xs font-black tracking-[0.2em] uppercase transition-all duration-500 border ${
                filter === cat 
                  ? 'bg-white text-[#0a0a16] border-white shadow-[0_10px_30px_rgba(255,255,255,0.2)]' 
                  : 'bg-white/5 text-white/50 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full auto-rows-[400px]">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div
              layout
              key={p.id}
              variants={itemVariants}
              initial="initial"
              animate="animate"
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
              className={`relative group rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 bg-[#0a0a16] ${
                p.size === 'large' ? 'md:col-span-8' : 
                p.size === 'medium' ? 'md:col-span-6' : 
                'md:col-span-4'
              }`}
            >
              <img 
                src={p.img} 
                alt={p.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a16] via-[#0a0a16]/20 to-transparent opacity-80"></div>
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <div className="flex justify-between items-end">
                  <div className="translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[9px] font-black uppercase tracking-[0.2em] text-pink-400">
                        {p.cat}
                      </span>
                      <span className="text-white/40 text-[9px] font-black uppercase tracking-[0.2em]">
                        {p.year}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-white mb-2 tracking-tight">{p.title}</h3>
                    <div className="flex items-center gap-2 text-white/50 text-xs font-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{p.location}</span>
                    </div>
                  </div>
                  
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#0a0a16] transition-all cursor-pointer">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-4 group-hover:translate-y-0">
                  <div className="px-6 py-3 rounded-2xl bg-gradient-to-br from-purple-600/80 to-pink-600/80 backdrop-blur-xl border border-white/20 shadow-2xl">
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/60 mb-1">Key Impact</p>
                    <p className="text-sm font-black text-white">{p.impact}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}