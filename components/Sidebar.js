"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  FaRocket, 
  FaTasks, 
  FaServer, 
  FaCog,
  FaBars,
  FaPlusCircle,
  FaTimes 
} from "react-icons/fa";
import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/taches", label: "Tâches", icon: <FaTasks className="mr-3" /> },
    { href: "/taches/nouvelle", label: "Ajouter Tâche", icon: <FaPlusCircle className="mr-3 " /> },
    { href: "/ressources", label: "Ressources", icon: <FaServer className="mr-3" /> },
    { href: "/ressources/nouvelle", label: "Ajouter Ressource", icon: <FaPlusCircle className="mr-3 " /> },
    { href: "/resultats", label: "Résultats", icon: <FaCog className="mr-3" /> }
  ];

  return (
    <>
      {/* Mobile menu button */}
      <motion.button
        className="fixed top-4 left-4 z-50 lg:hidden p-2  bg-white shadow-md"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </motion.button>

      {/* Sidebar */}
      <motion.aside
        className={`fixed lg:static z-40 w-64 bg-gradient-to-b from-purple-50 to-blue-50 min-h-screen border-r border-gray-200 p-6 transition-all duration-300 ease-in-out ${
          isOpen ? "left-0" : "-left-64 lg:left-0"
        }`}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="flex items-center mb-8"
          whileHover={{ scale: 1.02 }}
        >
          <div className="p-2 bg-purple-100 rounded-lg text-purple-600 mr-3">
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
              transition={{ delay: 0.1 * index }}
            >
              <Link 
                href={item.href}
                className={`flex items-center p-3 rounded-lg transition-all ${
                  typeof window !== 'undefined' && window.location.pathname === item.href
                    ? "bg-purple-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-white hover:shadow-sm"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className={`${typeof window !== 'undefined' && window.location.pathname === item.href ? "text-white" : "text-purple-500"}`}>
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          v1.0.0
        </motion.div>
      </motion.aside>
    </>
  );
}