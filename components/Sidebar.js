"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaRocket, 
  FaTasks, 
  FaServer, 
  FaCog,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaUserCircle
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getCurrentUser, logoutUser } from "@/services/allocationService";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [activeBg, setActiveBg] = useState("from-cyan-50 to-blue-100");
  const [user, setUser] = useState(null);
    const [showLogout, setShowLogout] = useState(false);
  const router = useRouter();

  const navItems = [
    { 
      href: "/dashboard/taches", 
      label: "Tâches", 
      icon: <FaTasks className="mr-3" />,
      bg: "from-cyan-50 to-blue-100",
      activeBg: "bg-cyan-600",
    },
    { 
      href: "/dashboard/ressources", 
      label: "Ressources", 
      icon: <FaServer className="mr-3" />,
      bg: "from-green-50 to-teal-50",
      activeBg: "bg-green-600",
    },
    { 
      href: "/dashboard/resultats", 
      label: "Résultats", 
      icon: <FaCog className="mr-3" />,
      bg: "from-purple-50 to-purple-200",
      activeBg: "bg-purple-600",
    }
  ];
  
  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  useEffect(() => {
    // Récupérer les informations de l'utilisateur depuis localStorage
    
    setUser(getCurrentUser);

    const currentItem = navItems.find(item => pathname.startsWith(item.href));
    setActiveBg(currentItem?.bg || "from-cyan-50 to-blue-100");
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

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
        className={`fixed lg:static z-40 w-64 h-screen border-r border-gray-200 p-6 transition-all duration-300 ease-in-out ${
          isOpen ? "left-0" : "-left-64 lg:left-0"
        } bg-gradient-to-b ${activeBg} flex flex-col`}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        
        <div className="flex-1">
          <motion.div 
            className="flex items-center mb-8"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`p-2 rounded-lg mr-3 ${
              pathname.startsWith("/dashboard/taches") ? "bg-cyan-100 text-cyan-600" :
              pathname.startsWith("/dashboard/ressources") ? "bg-green-100 text-green-600" :
              pathname.startsWith("/dashboard/resultats") ? "bg-purple-100 text-purple-600" :
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
                  <span className={`${pathname.startsWith(item.href) ? "text-white" : ""}`}>
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>

        {/* User Info and Logout */}
 <div className="mt-auto border-t border-gray-200 pt-4">
        {user && (
          <motion.div 
            className="flex items-center p-3 mb-2 bg-white rounded-lg shadow-sm cursor-pointer"
            onClick={toggleLogout}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ backgroundColor: "#f3f4f6" }}
          >
            <div className="relative">
              <FaUserCircle className="text-gray-600 text-2xl" />
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="font-medium text-gray-800 truncate">{user.name || user.email}</p>
              
            </div>
          </motion.div>
        )}

        <AnimatePresence>
 {showLogout && (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    exit={{ opacity: 0, height: 0 }}
    transition={{ duration: 0.2 }}
    className="overflow-hidden flex justify-center my-2"
  >
    <motion.button
      onClick={handleLogout}
      className={`group flex items-center justify-start w-11 h-11  rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1${
              pathname.startsWith("/dashboard/taches") ? " bg-cyan-600" :
              pathname.startsWith("/dashboard/ressources") ? " bg-green-600" :
              pathname.startsWith("/dashboard/resultats") ? " bg-purple-600" :
              "bg-cyan-100 text-cyan-600"
            }`}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)"
      }}
      whileTap={{ 
        scale: 0.95,
      }}
    >
      <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
        <FaSignOutAlt className="w-4 h-4 text-white" />
      </div>
      <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-sm font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        Logout
      </div>
    </motion.button>
  </motion.div>
)}
        </AnimatePresence>
      </div>
       
      </motion.aside>
    </>
  );
}