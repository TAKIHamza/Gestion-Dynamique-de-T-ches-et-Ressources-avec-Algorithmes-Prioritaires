"use client";
import { motion } from "framer-motion";
import { 
  FaFirstOrderAlt as FaFirstOrder,
  FaListOl,
  FaClock,
  FaProjectDiagram
} from "react-icons/fa";

const methods = [
  { 
    value: "priority", 
    label: "Priorité", 
    icon: <FaFirstOrder className="mr-2" /> 
  },
  { 
    value: "fifo", 
    label: "FIFO", 
    icon: <FaListOl className="mr-2" /> 
  },
  { 
    value: "round_robin", 
    label: "Round Robin", 
    icon: <FaClock className="mr-2" /> 
  },
  { 
    value: "sjn", 
    label: "Plus court d'abord", 
    icon: <FaProjectDiagram className="mr-2" /> 
  }
];

export default function MethodSelector({ method, setMethod }) {
  return (
    <motion.div
      className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl shadow-sm border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center mb-4">
        <div className="p-2 bg-purple-100 rounded-lg text-purple-600 mr-3">
          <FaProjectDiagram size={20} />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Méthode d'ordonnancement</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {methods.map((m) => (
          <motion.button
            key={m.value}
            onClick={() => setMethod(m.value)}
            className={`flex items-center p-3 rounded-lg transition-all ${
              method === m.value
                ? "bg-purple-600 text-white shadow-md"
                : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className={`mr-2 ${method === m.value ? "text-white" : "text-purple-500"}`}>
              {m.icon}
            </span>
            {m.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}