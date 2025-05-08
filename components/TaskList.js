"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaExclamationCircle, FaFilter } from "react-icons/fa";
import { useAllocation } from "@/context/AllocationContext";

export default function TaskList() {
  const { tasks, deleteTask, toggleTaskDone } = useAllocation();
  const [filter, setFilter] = useState("all"); // 'all' | 'done' | 'not_done'

  const safeTasks = Array.isArray(tasks) ? tasks : [];

  // Filtrage
  const filteredTasks = safeTasks.filter((task) => {
    if (filter === "done") return task.done;
    if (filter === "not_done") return !task.done;
    return true;
  });

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600 mr-3">
            <FaExclamationCircle size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            Tâches ({filteredTasks.length})
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <FaFilter className="text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none"
          >
            <option value="all">Toutes</option>
            <option value="done">Faites</option>
            <option value="not_done">Non faites</option>
          </select>
        </div>
      </div>

      <AnimatePresence>
        {filteredTasks.length > 0 ? (
          <ul className="space-y-2">
            {filteredTasks.map((task) => (
              <motion.li
                key={task.id} // Utilise l'ID de la tâche pour la clé
                className={`flex items-center justify-between p-3 rounded-lg border border-gray-200 ${
                  task.done ? "bg-green-50" : "bg-gray-50"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTaskDone(task.id)} // Passe l'ID à la fonction
                    className="accent-blue-600 w-4 h-4"
                  />
                  <div>
                    <span
                      className={`font-medium ${
                        task.done ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {task.name}
                    </span>
                    <span className="ml-3 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Priorité: {task.priority}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => deleteTask(task.id)} // Passe l'ID à la fonction
                  className="text-red-500 hover:text-red-700 p-1"
                  aria-label="Supprimer"
                >
                  <FaTrash />
                </button>
              </motion.li>
            ))}
          </ul>
        ) : (
          <motion.div
            className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-blue-600">Aucune tâche à afficher</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
