"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaTasks } from "react-icons/fa";
import { useAllocation } from "@/context/AllocationContext";

export default function TaskForm({ onSuccess }) {
  const { addTask } = useAllocation();
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState(1);
  const [duration, setDuration] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    addTask({
      name: task,
      priority: parseInt(priority),
      duration: parseInt(duration),
      done: false,
    });
    setTask("");
    setPriority(1);
    setDuration(1);
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
        <div className="p-2 bg-cyan-100 rounded-lg text-cyan-600 mr-3">
          <FaTasks size={20} />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Ajouter une tâche</h3>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la tâche</label>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="Ex: Analyse des données"
          />
        </motion.div>

        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">Priorité (1-10)</label>
          <input
            type="number"
            min="1"
            max="10"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </motion.div>

        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">Durée (heures)</label>
          <input
            type="number"
            min="1"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="Ex: 5"
          />
        </motion.div>

        <motion.button
          type="submit"
          className="flex items-center justify-center w-full bg-cyan-600 text-white px-4 py-3 rounded-lg hover:bg-cyan-700 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <FaPlus className="mr-2" />
          Ajouter la tâche
        </motion.button>
      </form>
    </motion.div>
  );
}
