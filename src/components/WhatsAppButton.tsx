import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import whatsappIcon from "@/assets/whatsapp.png";

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href="https://wa.me/+8801683336603"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 right-8 z-[100] flex items-center justify-end"
    >
      {/* Background Glow */}
      <div 
        className={`absolute inset-0 bg-[#25D366] rounded-full blur-2xl transition-opacity duration-500 pointer-events-none ${isHovered ? 'opacity-30' : 'opacity-0'}`} 
      />
      
      {/* Main Container */}
      <motion.div
        layout
        initial={{ width: 56 }}
        animate={{ 
          width: isHovered ? "auto" : 56,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 30,
        }}
        className="relative h-14 flex items-center bg-[#075E54]/95 backdrop-blur-xl border border-[#25D366]/20 rounded-full shadow-2xl overflow-hidden"
      >
        {/* Icon Circle */}
        <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-lg overflow-hidden">
          <img 
            src={whatsappIcon} 
            alt="WhatsApp" 
            className="w-8 h-8 object-contain"
          />
        </div>
        
        {/* Text Area (Expanded) */}
        <AnimatePresence mode="wait">
          {isHovered && (
            <motion.div
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="px-5 flex flex-col whitespace-nowrap"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#25D366] leading-none mb-1">CONNECT ON</span>
              <span className="text-sm font-bold text-white leading-none">WhatsApp</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.a>
  );
};

export default WhatsAppButton;
