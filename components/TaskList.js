"use client";
import { useState } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { FaTrash, FaTasks, FaFilter, FaGripLines } from "react-icons/fa";
import { useAllocation } from "@/context/AllocationContext";

export default function TaskList() {
  const { tasks, deleteTask, toggleTaskDone, reorderTasks } = useAllocation();
  const [filter, setFilter] = useState("all"); // 'all', 'done', or 'not_done'

  const safeTasks = Array.isArray(tasks) ? tasks : [];

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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg text-white mr-3 shadow-md">
            <FaTasks size={20} />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            Liste des Tâches ({filteredTasks.length})
          </h3>
        </div>
        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
          <FaFilter className="text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="text-sm bg-transparent border-none focus:outline-none focus:ring-0"
          >
            <option value="all">Toutes</option>
            <option value="done">Faites</option>
            <option value="not_done">Non faites</option>
          </select>
        </div>
      </div>

      <AnimatePresence>
        {filteredTasks.length > 0 ? (
          <Reorder.Group
            axis="y"
            values={filteredTasks}
            onReorder={reorderTasks}
            className="space-y-3"
          >
            {filteredTasks.map((task) => (
              <Reorder.Item
                key={task.id}
                value={task}
                whileDrag={{ 
                  scale: 1.03,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  zIndex: 10
                }}
              >
                <motion.div
                  className={`flex items-center justify-between p-4 rounded-xl border ${
                    task.done ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
                  } shadow-sm hover:shadow-md transition-all`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <button 
                      className="mr-2 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
                      onPointerDown={(e) => e.preventDefault()} // Improves drag handling
                    >
                      <FaGripLines />
                    </button>
                    
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggleTaskDone(task.id)}
                      className={`rounded-full w-5 h-5 border-2 ${
                        task.done
                          ? "bg-green-500 border-green-500"
                          : "border-gray-300"
                      } focus:ring-0 focus:ring-offset-0 cursor-pointer`}
                    />
                    
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-medium text-gray-800 truncate ${
                          task.done ? "line-through text-gray-500" : ""
                        }`}
                      >
                        {task.name}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="px-2 py-1 bg-cyan-100 text-cyan-800 text-xs rounded-full whitespace-nowrap">
                          Priorité: {task.priority}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full whitespace-nowrap">
                          Durée: {task.duration}
                        </span>
                        {task.done && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full whitespace-nowrap">
                            Complétée
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <motion.button
                    onClick={() => deleteTask(task.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-red-400 hover:text-red-600 p-2 transition-colors"
                    aria-label="Supprimer"
                  >
                    <FaTrash />
                  </motion.button>
                </motion.div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        ) : (
          <motion.div
            className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-cyan-600 font-medium">
              Aucune tâche à afficher
            </p>
            <p className="text-gray-500 text-sm mt-1">
              {filter === "all"
                ? "Ajoutez une nouvelle tâche pour commencer"
                : filter === "done"
                ? "Aucune tâche complétée pour le moment"
                : "Toutes les tâches sont complétées!"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}