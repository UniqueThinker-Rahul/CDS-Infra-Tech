import { Home, HardHat, Building2, Users2, Send } from "lucide-react";
import { motion } from 'motion/react';

export default function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { name: 'Home', icon: Home, bgColor: 'bg-[#003366]' },         // Deep Blue
    { name: 'Services', icon: HardHat, bgColor: 'bg-[#e31e24]' },   // Red
    { name: 'Portfolio', icon: Building2, bgColor: 'bg-[#f7a81b]' }, // Yellow
    { name: 'About', icon: Users2, bgColor: 'bg-[#4f8124]' },      // Green
    { name: 'Contact', icon: Send, bgColor: 'bg-[#ff7315]' },       // Orange
  ];

  return (
    <nav className="hidden md:flex fixed top-8 left-1/2 -translate-x-1/2 z-[100] items-center gap-2">
      {navItems.map((item) => {
        const isActive = activeTab === item.name;
        
        return (
          <button
            key={item.name}
            onClick={() => setActiveTab(item.name)}
            className="flex flex-col items-center px-4 py-2 group cursor-pointer outline-none transition-transform active:scale-95"
          >
            {/* GMAR Style Colored Box */}
            <div className={`
              w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 shadow-lg
              ${item.bgColor} 
              ${isActive ? 'scale-110 ring-2 ring-white/50 ring-offset-2 ring-offset-[#0a0a16]' : 'opacity-80 group-hover:opacity-100 group-hover:-translate-y-1'}
            `}>
              <item.icon 
                className="w-6 h-6 text-white" 
                fill="white" // Icon ke andar white color bharne ke liye
              />
            </div>

            {/* Label Niche */}
            <span className={`
              mt-2 text-[10px] font-bold tracking-wider uppercase transition-colors
              ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white'}
            `}>
              {item.name}
            </span>

            {/* Active Glow Underline */}
            {isActive && (
              <motion.div 
                layoutId="nav-active-box"
                className="absolute -bottom-1 w-8 h-1 bg-white rounded-full shadow-[0_0_10px_white]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}