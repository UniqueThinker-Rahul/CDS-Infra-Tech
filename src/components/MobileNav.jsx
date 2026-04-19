import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Home, Briefcase, FolderOpen, Info, Mail } from "lucide-react";

export default function MobileNav({ activeTab, setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Contact', icon: Mail },
    { name: 'About', icon: Info },
    { name: 'Portfolio', icon: FolderOpen },
    { name: 'Services', icon: Briefcase },
    { name: 'Home', icon: Home },
  ];

  return (
    <>
      {/* 🔥 GLOBAL LOGO FOR MOBILE: Redirects to Home on click
      <div 
        onClick={() => setActiveTab('Home')}
        className="md:hidden fixed top-6 left-6 z-[120] flex flex-col items-center gap-0.5 cursor-pointer active:scale-95 transition-transform"
      >
        <img
          src="/logo.png"
          alt="CDS Logo"
          className="h-8 w-auto object-contain"
        />
        <span className="text-[7px] font-bold tracking-[0.2em] uppercase text-white/70">
          Infra Tech
        </span>
        <div className="w-6 h-0.5 bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] rounded-full"></div>
      </div> */}

      {/* HAMBURGER MENU */}
      <motion.div 
        layout
        className="md:hidden fixed top-6 right-6 z-[120] flex flex-row-reverse items-center p-2 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl"
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] flex items-center justify-center shadow-lg active:scale-90 transition-transform shrink-0 cursor-pointer z-10"
        >
          {isOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0, marginRight: 0 }}
              animate={{ width: "auto", opacity: 1, marginRight: 12 }}
              exit={{ width: 0, opacity: 0, marginRight: 0 }}
              className="flex flex-row-reverse items-center gap-4 overflow-hidden pl-4"
            >
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveTab(item.name);
                    setIsOpen(false);
                  }}
                  className="flex flex-col items-center group cursor-pointer shrink-0"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300
                    ${activeTab === item.name 
                      ? 'bg-white/20 scale-110 shadow-lg shadow-pink-500/20' 
                      : 'bg-white/5 group-hover:bg-white/10'}`}
                  >
                    <item.icon className={`w-4 h-4 ${
                      activeTab === item.name ? 'text-white' : 'text-white/50'
                    }`} />
                  </div>

                  <span className={`text-[8px] uppercase tracking-widest mt-1.5 font-black ${
                    activeTab === item.name ? 'text-white' : 'text-white/30'
                  }`}>
                    {item.name}
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}