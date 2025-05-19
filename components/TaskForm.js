"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaTasks } from "react-icons/fa";
import { useAllocation } from "@/context/AllocationContext";



export default function TaskForm({ onSuccess }) {
  const { addTask } = useAllocation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(2);
  const [requirement, setRequirement] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({
      title,
      description,
      priority: parseInt(priority),
      requirement,
      done: false,
    });
    setTitle("");
    setDescription("");
    setPriority(2);
    setRequirement("");
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
      <motion.div className="flex items-center mb-4">
        <div className="p-2 bg-cyan-100 rounded-lg text-cyan-600 mr-3">
          <FaTasks size={20} />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Ajouter une tâche</h3>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Titre de la tâche"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Détails de la tâche"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value={1}>Haute</option>
            <option value={2}>Moyenne</option>
            <option value={3}>Basse</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">Besoin (ex : 10 unités)</label>
          <input
            type="text"
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            className="w-full px-4 py-2  border border-gray-300 rounded-lg"
            placeholder="Ex : 5kg, 2Go RAM..."
          />
        </div>

       

        <motion.button
          type="submit"
          className="flex items-center justify-center w-full bg-cyan-600 text-white px-4 py-3 rounded-lg hover:bg-cyan-700 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaPlus className="mr-2" />
          Ajouter la tâche
        </motion.button>
      </form>
    </motion.div>
  );
}
