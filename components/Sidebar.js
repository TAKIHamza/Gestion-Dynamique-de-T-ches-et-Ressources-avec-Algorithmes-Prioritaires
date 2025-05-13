"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaRocket, 
  FaTasks, 
  FaServer, 
  FaCog,
  FaBars,
  FaTimes 
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [activeBg, setActiveBg] = useState("from-cyan-50 to-blue-100");

  const navItems = [
    { 
      href: "/taches", 
      label: "Tâches", 
      icon: <FaTasks className="mr-3" />,
      bg: "from-cyan-50 to-blue-100",
      activeBg: "bg-cyan-600",
    
    },
    { 
      href: "/ressources", 
      label: "Ressources", 
      icon: <FaServer className="mr-3" />,
      bg: "from-green-50 to-teal-50",
      activeBg: "bg-green-600",
   
    },
    { 
      href: "/resultats", 
      label: "Résultats", 
      icon: <FaCog className="mr-3" />,
      bg: "from-purple-50 to-purple-200",
      activeBg: "bg-purple-600",
     
    }
  ];

  useEffect(() => {
    const currentItem = navItems.find(item => pathname.startsWith(item.href));
    setActiveBg(currentItem?.bg || "from-cyan-50 to-blue-100");
  }, [pathname]);

  return (
    <>
      {/* Mobile menu button */}
      <motion.button
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-white shadow-md rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <FaTimes size={20} />
            </motion.span>
          ) : (
            <motion.span
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <FaBars size={20} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Sidebar */}
      <motion.aside
        className={`fixed lg:static z-40 w-64 min-h-screen border-r border-gray-200 p-6 transition-all duration-300 ease-in-out ${
          isOpen ? "left-0" : "-left-64 lg:left-0"
        } bg-gradient-to-b ${activeBg}`}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="flex items-center mb-8"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className={`p-2 rounded-lg mr-3 ${
            pathname.startsWith("/taches") ? "bg-cyan-100 text-cyan-600" :
            pathname.startsWith("/ressources") ? "bg-green-100 text-green-600" :
            pathname.startsWith("/resultats") ? "bg-purple-100 text-purple-600" :
            "bg-cyan-100 text-cyan-600"
          }`}>
            <FaRocket size={20} />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Allocation Pro</h2>
        </motion.div>

        <nav className="space-y-2">
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, type: "spring", stiffness: 100 }}
            >
              <Link 
                href={item.href}
                className={`flex items-center p-3 rounded-lg transition-all ${
                  pathname.startsWith(item.href)
                    ? "text-white shadow-md"
                    : "text-gray-700 hover:bg-white hover:shadow-sm"
                } ${
                  pathname.startsWith(item.href) ? item.activeBg : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className={`${pathname.startsWith(item.href) ? "text-white" : item.iconColor}`}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Footer/Version */}
        <motion.div 
          className="absolute bottom-4 left-0 right-0 px-6 text-center text-xs text-gray-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          v1.0.0
        </motion.div>
      </motion.aside>
    </>
  );
}