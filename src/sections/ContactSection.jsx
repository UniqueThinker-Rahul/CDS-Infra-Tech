import { useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Mail, MapPin, ExternalLink, Send, CheckCircle2 } from 'lucide-react';
import Footer from '../components/Footer';

// 👉 Page Variants define kiye (Missing the)
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -20 }
};

export default function ContactSection({ setActiveTab }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      // 👉 pt-32 add kiya hai taaki Navbar content ko hide na kare
      className="w-full pt-10 pb-10 px-6 md:px-10 max-w-7xl mx-auto z-10"
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full mb-20">
        
        {/* Contact Form Container */}
        <div className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-pink-500/10 blur-[80px]"></div>
          
          <h2 className="text-3xl font-black mb-8 text-white tracking-tight">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 text-italic">Touch</span>
          </h2>
          
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-20 h-20 rounded-3xl bg-green-500/20 flex items-center justify-center mb-6 border border-green-500/30">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-black mb-2 text-white">Message Sent!</h3>
              <p className="text-white/40 font-light">Thank you for reaching out. Our engineering team will get back to you shortly.</p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="mt-8 text-pink-500 font-bold hover:underline text-sm uppercase tracking-widest"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-3">Full Name</label>
                  <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20 transition-all font-light" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-3">Work Email</label>
                  <input type="email" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20 transition-all font-light" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-3">Project Requirements</label>
                <textarea required rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20 transition-all resize-none font-light" placeholder="Tell us about your infrastructure needs..."></textarea>
              </div>
              <button type="submit" className="w-full py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-black tracking-[0.2em] uppercase text-[10px] hover:shadow-[0_20px_40px_rgba(236,72,153,0.3)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Direct Contact Cards */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-[#121221] border border-white/5 p-8 md:p-10 rounded-[2.5rem] flex-1 shadow-2xl relative overflow-hidden group">
            <h3 className="text-xl font-black mb-10 text-white tracking-tight">Direct Channels</h3>
            <div className="space-y-10">
              <a href="https://wa.me/918955957893" target="_blank" rel="noreferrer" className="flex items-center gap-6 group/item">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover/item:bg-green-500 transition-all duration-500 border border-white/5">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] mb-1">WhatsApp Business</p>
                  <p className="text-lg font-bold text-white group-hover/item:text-green-400 transition-colors">+91 89559 57893</p>
                </div>
              </a>
              <a href="mailto:cdsinfrat@gmail.com" className="flex items-center gap-6 group/item">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover/item:bg-pink-500 transition-all duration-500 border border-white/5">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] mb-1">Email Inquiry</p>
                  <p className="text-lg font-bold text-white group-hover/item:text-pink-400 transition-colors">cdsinfrat@gmail.com</p>
                </div>
              </a>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] mb-1">Corporate Office</p>
                  <p className="text-lg font-bold text-white tracking-tight">HITEC City, Hyderabad, India</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Visual Map Tile */}
          <div className="h-56 rounded-[2.5rem] overflow-hidden border border-white/5 relative group shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" 
              alt="Hyderabad Map View" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 grayscale hover:grayscale-0 transition-all"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a16] via-transparent to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
              <button className="px-8 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all flex items-center gap-3">
                Launch Maps <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}