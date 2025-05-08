// components/ResourceForm.js
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaServer } from "react-icons/fa";
import { useAllocation } from "@/context/AllocationContext"; // Importer le contexte

export default function ResourceForm() {
  const { addResource } = useAllocation(); // Accéder à addResource depuis le contexte
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addResource({ name, capacity: parseInt(capacity) }); // Ajouter la ressource via le contexte
    setName(""); // Réinitialiser les champs du formulaire
    setCapacity(1);
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center mb-4">
        <div className="p-2 bg-green-100 rounded-lg text-green-600 mr-3">
          <FaServer size={20} />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Ajouter une ressource</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la ressource</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Ex: Serveur AWS"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Capacité</label>
          <input
            type="number"
            min="1"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <motion.button
          type="submit"
          className="flex items-center justify-center w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaPlus className="mr-2" />
          Ajouter la ressource
        </motion.button>
      </form>
    </motion.div>
  );
}
