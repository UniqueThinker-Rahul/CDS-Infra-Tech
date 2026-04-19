import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

import HomeSection from "./sections/HomeSection";
import ServicesSection from "./sections/ServicesSection";
import PortfolioSection from "./sections/PortfolioSection";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";

import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";
import Footer from "./components/Footer";

// 👉 Import the global background
import backgroundImage from "/background.jpg";

export default function App() {
  const [activeTab, setActiveTab] = useState("Home");
  const tabsOrder = ["Home", "Services", "Portfolio", "About", "Contact"];
  const isScrolling = useRef(false);

  const handleScroll = useCallback(
    (e) => {
      const target = e.target;
      const isInnerScrollable = target.closest(".allow-scroll") !== null;

      if (isInnerScrollable) return;
      if (isScrolling.current) return;

      const currentIndex = tabsOrder.indexOf(activeTab);
      const threshold = 80;

      if (Math.abs(e.deltaY) < threshold) return;

      let nextTab = activeTab;

      if (e.deltaY > threshold && currentIndex < tabsOrder.length - 1) {
        nextTab = tabsOrder[currentIndex + 1];
      } else if (e.deltaY < -threshold && currentIndex > 0) {
        nextTab = tabsOrder[currentIndex - 1];
      }

      if (nextTab !== activeTab) {
        setActiveTab(nextTab);
        isScrolling.current = true;

        setTimeout(() => {
          isScrolling.current = false;
        }, 1000);
      }
    },
    [activeTab]
  );

  useEffect(() => {
    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, [handleScroll]);

  return (
    <div 
      className="relative h-screen w-full bg-[#0a0a16] text-white overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
     <div className="absolute inset-0 bg-black/70 z-0"></div>

      {/* GLOBAL LOGO - Added onClick to redirect to Home */}
      <div 
        onClick={() => setActiveTab("Home")}
        className="fixed top-8 left-10 z-[110] flex flex-col items-center gap-1 group cursor-pointer"
      >
        <img
          src="/logo.png"
          alt="CDS Logo"
          className="h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
        />
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/70">
          Infra Tech
        </span>
        <div className="w-8 h-0.5 bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] rounded-full mt-1 group-hover:w-full transition-all duration-500"></div>
      </div>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: "100vh" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100vh" }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-10 h-full w-full"
        >
          {/* Added pt-28 (mobile) and md:pt-32 (desktop) to ensure content starts AFTER the navbar */}
          {activeTab === "Home" && (
            <div className="h-full w-full overflow-y-auto allow-scroll pt-28 md:pt-5">
              <HomeSection setActiveTab={setActiveTab} />
            </div>
          )}

          {activeTab === "Services" && (
            <div className="h-full w-full overflow-y-auto allow-scroll pt-28 md:pt-32">
              <ServicesSection />
            </div>
          )}

          {activeTab === "Portfolio" && (
            <div className="h-full w-full overflow-y-auto allow-scroll pt-28 md:pt-32">
              <PortfolioSection />
            </div>
          )}

          {activeTab === "About" && (
            <div className="h-full w-full overflow-y-auto allow-scroll pt-28 md:pt-32">
              <AboutSection />
            </div>
          )}

          {activeTab === "Contact" && (
            <div className="h-full w-full overflow-y-auto allow-scroll pt-28 md:pt-32">
              <ContactSection setActiveTab={setActiveTab} />
              <Footer />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
