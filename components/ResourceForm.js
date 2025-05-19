"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaServer } from "react-icons/fa";
import { useAllocation } from "@/context/AllocationContext";

export default function ResourceForm({ onSuccess }) {
  const { addResource } = useAllocation();
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState(1);
  const [available, setAvailable] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!label.trim()) return;

    addResource({
        label,
        description,
        capacity: parseFloat(capacity),
        available,
      });

      setLabel("");
      setDescription("");
      setCapacity(1);
      setAvailable(true);

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
        {/* Label */}
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la ressource</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Ex: Serveur AWS"
          />
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Détails ou spécificités de la ressource"
          />
        </motion.div>

        {/* Capacity */}
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">Capacité</label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </motion.div>

        {/* Disponibilité */}
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">Disponible</label>
          <select
            value={available ? "true" : "false"}
            onChange={(e) => setAvailable(e.target.value === "true")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="true">Oui</option>
            <option value="false">Non</option>
          </select>
        </motion.div>

        {/* Bouton Submit */}
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
