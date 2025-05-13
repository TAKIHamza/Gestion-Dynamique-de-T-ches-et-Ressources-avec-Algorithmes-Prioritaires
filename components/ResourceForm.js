"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaServer } from "react-icons/fa";
import { useAllocation } from "@/context/AllocationContext";

export default function ResourceForm({ onSuccess }) {
  const { addResource } = useAllocation();
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addResource({ 
      name, 
      capacity: parseInt(capacity) 
    });
    setName("");
    setCapacity(1);
    if (onSuccess) onSuccess();
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div 
        className="flex items-center mb-4"
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="p-2 bg-green-100 rounded-lg text-green-600 mr-3">
          <FaServer size={20} />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Ajouter une ressource</h3>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la ressource</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Ex: Serveur AWS"
          />
        </motion.div>

        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">Capacité</label>
          <input
            type="number"
            min="1"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </motion.div>

        <motion.button
          type="submit"
          className="flex items-center justify-center w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <FaPlus className="mr-2" />
          Ajouter la ressource
        </motion.button>
      </form>
    </motion.div>
  );
}