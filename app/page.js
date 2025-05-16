"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import NavBar from "@/components/NavBar";

export default function HomePage() {
  const [windowWidth, setWindowWidth] = useState(0);
  const { scrollY } = useScroll();
  const yPos = useTransform(scrollY, [0, 300], [0, 100]);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const bgStyle = {
    backgroundImage: windowWidth > 768 ? `
      radial-gradient(circle at 25% 30%, rgba(56, 182, 255, 0.15) 0%, transparent 25%),
      radial-gradient(circle at 75% 70%, rgba(124, 58, 237, 0.15) 0%, transparent 25%),
      linear-gradient(to bottom right, #f0f9ff, #e0f2fe)
    ` : `
      radial-gradient(circle at 50% 30%, rgba(56, 182, 255, 0.15) 0%, transparent 25%),
      linear-gradient(to bottom, #f0f9ff, #e0f2fe)
    `
  };

  return (
    <section className="relative overflow-hidden min-h-screen mt-9">
      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 z-0 transition-all duration-1000"
        style={bgStyle}
      />
      
      {/* Animated Particles */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-20"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <NavBar />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          {/* Animated Title */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block">Optimisez Vos</span>
            <motion.span 
              className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Ressources Intelligentes
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mt-6 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Une solution IA pour allouer automatiquement vos ressources aux bonnes tâches au bon moment.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/dashboard" >
              <motion.div
                className="px-6 py-3 sm:px-8 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Commencer maintenant
              </motion.div>
            </Link>
            <Link href="/demo" >
              <motion.div
                className="px-6 py-3 sm:px-8 sm:py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50 transition-all text-sm sm:text-base"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Voir la démo
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Enhanced Floating Illustration */}
        <motion.div
          className="mt-16 md:mt-24 px-4 w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{ y: yPos }}
        >
          <div className="relative mx-auto w-full max-w-2xl">
            {/* Glow Effect */}
            <motion.div
              className="absolute -inset-4 bg-blue-500/10 rounded-3xl blur-xl"
              animate={{
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Main Card */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-gray-100 p-4 sm:p-6">
              {/* MacOS-style Title Bar */}
              <div className="flex space-x-2 sm:space-x-3 mb-4">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <div className="flex-1 text-center text-xs text-gray-500 font-medium hidden sm:block">
                  Dashboard - Allocation Intelligente
                </div>
              </div>

              {/* Responsive Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <motion.div
                    key={item}
                    className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-2 sm:p-3 aspect-square flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <motion.div
                      className={`h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-gradient-to-r ${
                        item % 2 === 0 ? 'from-blue-500 to-cyan-400' : 'from-purple-500 to-indigo-400'
                      }`}
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0],
                      }}
                      transition={{
                        duration: 2 + item,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Animated Caption */}
              <motion.div
                className="mt-4 text-center text-xs sm:text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <p>Système d'allocation en temps réel</p>
                <motion.p
                  className="text-cyan-600 font-medium mt-1"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {windowWidth > 768 ? "Visualisation des ressources optimisées" : "Ressources optimisées"}
                </motion.p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}