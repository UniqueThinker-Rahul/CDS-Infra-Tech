import { useState, useEffect, useCallback, FormEvent } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import {
  Briefcase,
  FolderOpen,
  Home,
  Info,
  Mail,
  MessageCircle,
  Mouse,
  Play,
  Code,
  TrendingUp,
  Users,
  MapPin,
  ExternalLink,
  Send,
  Menu,
  X,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
  Award,
  ShieldCheck,
  Globe,
  Zap,
  Star,
  Quote
} from 'lucide-react';

let lastScrollTime = 0;

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [isNavOpen, setIsNavOpen] = useState(true);
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -250]);

  const tabs = ['Home', 'Services', 'Portfolio', 'About', 'Contact'];
  const currentIndex = tabs.indexOf(activeTab);

  const navigateTo = useCallback((direction: 'next' | 'prev') => {
    const now = Date.now();
    const cooldown = 2200; // Increased cooldown to match total animation time
    if (now - lastScrollTime < cooldown) return;

    if (direction === 'next' && currentIndex < tabs.length - 1) {
      lastScrollTime = now;
      setActiveTab(tabs[currentIndex + 1]);
      setTimeout(() => window.scrollTo(0, 0), 800); // Matches exit duration
    } else if (direction === 'prev' && currentIndex > 0) {
      lastScrollTime = now;
      setActiveTab(tabs[currentIndex - 1]);
      setTimeout(() => window.scrollTo(0, 0), 800);
    }
  }, [currentIndex, tabs]);

  useEffect(() => {
    let touchStartY = 0;
    let autoScrollTimer: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20;
      const isAtTop = window.scrollY <= 10;

      if (e.deltaY > 10 && isAtBottom) {
        navigateTo('next');
      } else if (e.deltaY < -10 && isAtTop) {
        navigateTo('prev');
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20;
      const isAtTop = window.scrollY <= 10;

      if (deltaY > 30 && isAtBottom) {
        navigateTo('next');
      } else if (deltaY < -30 && isAtTop) {
        navigateTo('prev');
      }
    };

    const checkAutoScroll = () => {
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5;
      if (isAtBottom && currentIndex < tabs.length - 1) {
        clearTimeout(autoScrollTimer);
        autoScrollTimer = setTimeout(() => {
          navigateTo('next');
        }, 3000); // Auto scroll after 3 seconds at bottom
      } else {
        clearTimeout(autoScrollTimer);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', checkAutoScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', checkAutoScroll);
      clearTimeout(autoScrollTimer);
    };
  }, [navigateTo, currentIndex, tabs.length]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() || 0;
    const isScrolling = Math.abs(latest - prev) > 15;
    
    // Check if user has reached the bottom of the page (within 50px threshold)
    const isAtBottom = window.innerHeight + latest >= document.documentElement.scrollHeight - 50;

    if (isAtBottom) {
      if (!isNavOpen) setIsNavOpen(true);
    } else if (isScrolling && isNavOpen) {
      setIsNavOpen(false);
    }
  });

  const navItems = [
    { name: 'Home', icon: Home },
    { name: 'Services', icon: Briefcase },
    { name: 'Portfolio', icon: FolderOpen },
    { name: 'About', icon: Info },
    { name: 'Contact', icon: Mail },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a16] font-sans overflow-x-hidden flex flex-col selection:bg-pink-500/30 text-white">
      {/* Premium Background - High-end Architectural Theme */}
      <motion.div 
        style={{ y: backgroundY }}
        className="fixed -top-[250px] -bottom-[250px] left-0 right-0 z-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2500&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a16] via-transparent to-[#0a0a16]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a16] via-transparent to-transparent opacity-80"></div>
        <div className="absolute inset-0 backdrop-blur-[2px]"></div>
      </motion.div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-8 left-1/2 -translate-x-1/2 z-50 items-center gap-8 bg-[#0a0a16]/80 backdrop-blur-xl border border-white/10 px-8 py-3 rounded-full shadow-2xl">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveTab(item.name)}
            className={`flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold transition-all hover:text-pink-400 cursor-pointer relative group ${activeTab === item.name ? 'text-white' : 'text-white/50'}`}
          >
            <item.icon className={`w-4 h-4 transition-colors ${activeTab === item.name ? 'text-pink-400' : 'group-hover:text-pink-400'}`} />
            {item.name}
            <span className={`absolute -bottom-3 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-pink-500 transition-transform duration-300 origin-left ${activeTab === item.name ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
          </button>
        ))}
      </nav>

      {/* Floating Collapsible Navigation (Mobile Only) */}
      <motion.div 
        layout
        className="md:hidden fixed top-6 right-6 z-50 flex items-center p-2 bg-[#0a0a16]/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl"
      >
        <button
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center shadow-lg hover:scale-105 transition-transform shrink-0 cursor-pointer z-10"
        >
          {isNavOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
        </button>

        <AnimatePresence>
          {isNavOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0, marginLeft: 0 }}
              animate={{ width: "auto", opacity: 1, marginLeft: 16 }}
              exit={{ width: 0, opacity: 0, marginLeft: 0 }}
              className="flex items-center gap-3 overflow-hidden pr-2"
            >
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className="flex flex-col items-center group cursor-pointer shrink-0"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg
                    ${activeTab === item.name 
                      ? 'bg-white/10 border-transparent shadow-[0_0_15px_rgba(255,255,255,0.1)] scale-110' 
                      : 'bg-transparent border border-transparent group-hover:bg-white/5'}`}
                  >
                    <item.icon className={`w-3.5 h-3.5 transition-colors ${activeTab === item.name ? 'text-pink-400' : 'text-white/70 group-hover:text-white'}`} />
                  </div>
                  <span className={`text-[9px] uppercase tracking-wider mt-1 font-medium transition-colors ${activeTab === item.name ? 'text-pink-400' : 'text-white/60 group-hover:text-white'}`}>
                    {item.name}
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Persistent Logo Removed */}


      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-32 min-h-screen">
        <AnimatePresence mode="wait">
          {activeTab === 'Home' && <HomeSection key="home" setActiveTab={setActiveTab} />}
          {activeTab === 'Services' && <ServicesSection key="services" />}
          {activeTab === 'Portfolio' && <PortfolioSection key="portfolio" />}
          {activeTab === 'About' && <AboutSection key="about" />}
          {activeTab === 'Contact' && <ContactSection key="contact" setActiveTab={setActiveTab} />}
        </AnimatePresence>

        {/* Next Section Hint */}
        {currentIndex < tabs.length - 1 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 pointer-events-none"
          >
            <span className="text-[10px] uppercase tracking-[0.3em]">Next: {tabs[currentIndex + 1]}</span>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        )}
      </main>

      {/* Global Fixed WhatsApp Button */}
      <a 
        href="https://wa.me/918955957893"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] flex items-center group cursor-pointer decoration-none"
      >
        <div className="relative flex items-center bg-white rounded-full p-1 pr-4 shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-1">
          <div className="w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <MessageCircle className="w-6 h-6 text-white fill-current" />
          </div>
          <div className="ml-3 flex items-center gap-1.5">
            <MessageCircle className="w-3 h-3 text-[#25D366] fill-current" />
            <span className="text-slate-900 text-sm font-bold">Let's Talk</span>
          </div>
        </div>
      </a>
    </div>
  );
}

function Footer({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  return (
    <footer className="relative z-10 w-full bg-[#05050a] border-t border-white/5 pt-20 pb-10 px-4 sm:px-6 lg:px-8 mt-20 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Leading the digital transformation of the global construction industry through engineering excellence and innovative technology.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'Instagram'].map(social => (
                <div key={social} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-pink-500 transition-all cursor-pointer">
                  <Globe className="w-4 h-4" />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Solutions</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li className="hover:text-pink-400 transition-colors cursor-pointer">Engineering & Design</li>
              <li className="hover:text-pink-400 transition-colors cursor-pointer">Digital Transformation</li>
              <li className="hover:text-pink-400 transition-colors cursor-pointer">Smart Construction</li>
              <li className="hover:text-pink-400 transition-colors cursor-pointer">Local Visibility</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li className="hover:text-pink-400 transition-colors cursor-pointer" onClick={() => setActiveTab?.('About')}>Our Story</li>
              <li className="hover:text-pink-400 transition-colors cursor-pointer">Careers</li>
              <li className="hover:text-pink-400 transition-colors cursor-pointer">Press & Media</li>
              <li className="hover:text-pink-400 transition-colors cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Global Presence</h4>
            <div className="space-y-4 text-sm text-white/40">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-pink-500 shrink-0 mt-1" />
                <p>HITEC City, Hyderabad, India</p>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-pink-500 shrink-0 mt-1" />
                <p>cdsinfrat@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/20">© 2026 CDS Engineering & Technologies. All rights reserved.</p>
          <div className="flex items-center gap-2 text-xs text-white/20">
            <ShieldCheck className="w-3 h-3" />
            <span>ISO 27001 Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* --- Section Components --- */

const pageVariants = {
  initial: { opacity: 0, x: 40, filter: "blur(4px)" },
  animate: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, x: -40, filter: "blur(4px)", transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

function HomeSection({ setActiveTab }: { setActiveTab: (tab: string) => void; key?: string }) {
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
      className="flex-1 flex flex-col items-center justify-center w-full h-full mt-12 md:mt-0"
    >
      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-2xl"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              <button 
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/v3Xv4j-T7-U?autoplay=1" 
                title="Construction Technology Overview"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed "Our Journey" Button (Right side, rotated) - Only on Home */}
      <div className="hidden md:block fixed right-0 top-1/2 -translate-y-1/2 rotate-90 origin-right z-30">
        <button 
          onClick={() => setActiveTab('About')}
          className="bg-white/5 backdrop-blur-md border border-white/10 text-white/60 px-5 py-1.5 rounded-t-xl tracking-[0.3em] uppercase text-[9px] font-bold hover:bg-white/10 hover:text-pink-400 transition-all cursor-pointer shadow-2xl border-b-0"
        >
          Our Journey
        </button>
      </div>

      {/* Center Content */}
      <div className="flex flex-col items-center justify-center text-center w-full max-w-3xl z-10">
        <p className="text-base sm:text-lg md:text-2xl text-white/90 font-light max-w-2xl mb-8 md:mb-10 leading-relaxed">
          Building Digital Foundations for <br className="hidden sm:block" />
          <span className="font-semibold text-white">Construction Success</span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto px-4 sm:px-0">
          <button 
            onClick={() => setActiveTab('Services')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.5)] hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Explore Our Solutions
          </button>
          <button 
            onClick={() => setShowVideo(true)}
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
            Watch Overview
          </button>
        </div>

        {/* Trust Bar / Client Logos */}
        <div className="mt-20 w-full">
          <p className="text-white/30 text-xs uppercase tracking-[0.4em] font-bold mb-8">Trusted by Industry Leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            {['BuildCorp', 'Skyline', 'UrbanTech', 'TerraForm', 'Apex'].map((brand) => (
              <div key={brand} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-black tracking-tighter text-white">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar Metrics */}
      <div className="w-full max-w-xs sm:max-w-sm mt-16 md:mt-0 md:w-20 lg:w-24 md:absolute md:right-4 lg:right-6 md:top-[60%] md:-translate-y-1/2 z-20">
        <div className="bg-white/90 backdrop-blur-3xl rounded-3xl p-2 lg:p-3 shadow-[0_30px_70px_rgba(0,0,0,0.2)] border border-white/50">
          <div className="flex flex-col gap-4 lg:gap-5">
            {metrics.map((metric, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="mb-1 w-6 h-6 rounded-lg bg-purple-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-sm">
                  <metric.icon className="w-3 h-3 text-purple-600" />
                </div>
                <span className="text-base lg:text-lg font-black text-[#0a0a16] tracking-tighter">
                  {metric.value}
                </span>
                <span className="text-[#0a0a16]/40 font-black uppercase tracking-[0.2em] text-[6px] lg:text-[7px] mt-0.5 leading-tight">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
function ServicesSection() {
  const [selectedService, setSelectedService] = useState<null | any>(null);

  const services = [
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

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    },
    exit: { opacity: 0 }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full min-h-[70vh] flex flex-col items-center px-4 md:px-0"
    >
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
                    {selectedService.details.map((detail: string, idx: number) => (
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

function PortfolioSection() {
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

  const filtered = filter === 'All' ? projects : projects.filter(p => p.cat === filter);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 40, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full flex flex-col items-center"
    >
      <div className="text-center mb-16">
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
          <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></div>
          <span className="text-white/70 font-bold tracking-[0.3em] uppercase text-[10px]">Our Impact</span>
        </motion.div>
        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black mb-8 tracking-tight">
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
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a16] via-[#0a0a16]/20 to-transparent opacity-80"></div>
              
              {/* Project Info Overlay */}
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
                  
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-end">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center mb-4 hover:bg-white hover:text-[#0a0a16] transition-all cursor-pointer">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">View Case Study</p>
                  </div>
                </div>
                
                {/* Impact Badge */}
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

function AboutSection() {
  const values = [
    { title: 'Global Standards', desc: 'We adhere to international engineering and safety protocols.', icon: Globe },
    { title: 'Certified Excellence', desc: 'ISO 9001:2015 and LEED certified digital solutions provider.', icon: Award },
    { title: 'Rapid Deployment', desc: 'Proprietary frameworks that cut development time by 40%.', icon: Zap },
    { title: 'Data Integrity', desc: 'Bank-grade encryption for all construction project data.', icon: ShieldCheck },
  ];

  const testimonials = [
    { name: 'Rajesh Khanna', role: 'CEO, BuildCorp India', text: 'CDS transformed our site monitoring. We saw a 25% increase in efficiency within 3 months.', stars: 5 },
    { name: 'Sarah Miller', role: 'Director, UrbanTech UK', text: 'The BIM integration provided by CDS is world-class. Their engineering depth is unmatched.', stars: 5 },
  ];

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full flex flex-col items-center pt-8 md:pt-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <div>
          <span className="text-pink-500 font-bold tracking-widest uppercase text-sm mb-4 block">Our Legacy</span>
          <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">Engineering the <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Future of Construction</span></h2>
          <p className="text-base text-white/60 leading-relaxed mb-8">
            Founded with a vision to bridge the gap between traditional construction and modern technology, CDS has evolved into a global leader in engineering-tech solutions. We don't just build websites; we build the digital infrastructure that powers the world's most ambitious projects.
          </p>
          <div className="flex gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-3xl font-black text-white mb-1">15+</p>
              <p className="text-xs text-white/40 uppercase tracking-widest">Global Awards</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-3xl font-black text-white mb-1">500+</p>
              <p className="text-xs text-white/40 uppercase tracking-widest">Projects Delivered</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-[3rem] blur-2xl opacity-20"></div>
          <img 
            src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1000&auto=format&fit=crop" 
            alt="Engineering Team" 
            className="relative rounded-[2.5rem] shadow-2xl border border-white/10"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="w-full mb-24">
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold mb-4">Why Industry Leaders <span className="text-pink-500">Choose CDS</span></h3>
          <p className="text-white/40 text-sm">The standard of excellence in construction technology.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <v.icon className="w-6 h-6 text-pink-500" />
              </div>
              <h4 className="text-xl font-bold mb-3">{v.title}</h4>
              <p className="text-sm text-white/50 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="w-full mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="p-10 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 relative">
              <Quote className="absolute top-8 right-8 w-12 h-12 text-white/5" />
              <div className="flex gap-1 mb-6">
                {[...Array(t.stars)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
              </div>
              <p className="text-lg text-white/80 italic mb-8 leading-relaxed">"{t.text}"</p>
              <div>
                <p className="font-bold text-white">{t.name}</p>
                <p className="text-sm text-white/40">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ContactSection({ setActiveTab, key }: { setActiveTab: (tab: string) => void; key?: string }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full pt-8 md:pt-12"
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full mb-20">
        {/* Form */}
        <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold mb-6">Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Touch</span></h2>
          
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
              <p className="text-white/60">Thank you for reaching out. We'll get back to you shortly.</p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="mt-8 text-pink-500 font-bold hover:underline"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Name</label>
                <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Email</label>
                <input type="email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Message</label>
                <textarea required rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:shadow-[0_0_20px_-5px_rgba(236,72,153,0.5)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Direct Contact */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl flex-1 shadow-xl">
            <h3 className="text-xl font-bold mb-8">Direct Contact</h3>
            <div className="space-y-8">
              <a href="https://wa.me/918955957893" target="_blank" rel="noreferrer" className="flex items-center gap-5 group">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-green-500 transition-colors shadow-lg">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-white/60 font-medium">WhatsApp</p>
                  <p className="text-base font-semibold group-hover:text-green-400 transition-colors">+91 89559 57893</p>
                </div>
              </a>
              <a href="mailto:cdsinfrat@gmail.com" className="flex items-center gap-5 group">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-pink-500 transition-colors shadow-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-white/60 font-medium">Email</p>
                  <p className="text-base font-semibold group-hover:text-pink-400 transition-colors">cdsinfrat@gmail.com</p>
                </div>
              </a>
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center shadow-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs text-white/60 font-medium">Office</p>
                  <p className="text-base font-semibold">HITEC City, Hyderabad</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Map Placeholder */}
          <div className="h-48 rounded-3xl overflow-hidden border border-white/10 relative group shadow-xl">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" alt="Map" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-[#0a0a16]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button onClick={() => alert('Opening Maps')} className="px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-sm font-semibold hover:bg-white/30 transition-colors flex items-center gap-2 cursor-pointer">
                View on Map <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer setActiveTab={setActiveTab} />
    </motion.div>
  );
}
