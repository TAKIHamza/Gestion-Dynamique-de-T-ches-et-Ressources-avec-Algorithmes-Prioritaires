// components/NavButton.js
"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiArrowLeft, FiHome } from "react-icons/fi";

export default function NavButton() {
  const router = useRouter();
  
  const handleClick = () => {
   
      router.push("/");
    
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 left-4 z-50"
    >
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm shadow-md rounded-full px-4 py-2 text-gray-800 hover:text-cyan-600 transition-all border border-gray-200"
        aria-label="Navigate back"
      >
       
          
            <FiHome className="text-lg" />
            <span className="hidden sm:inline-block text-sm font-medium">Home</span>
          
       
      </motion.button>
    </motion.div>
  );
}