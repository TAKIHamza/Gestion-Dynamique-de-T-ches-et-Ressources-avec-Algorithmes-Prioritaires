"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaTasks, FaFilter } from "react-icons/fa";
import { fetchTasksByResource } from "@/services/allocationService";

export default function TaskListByResource({ resourceId, onClose }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasksByResource(resourceId);
        setTasks(data);
      } catch (error) {
        console.error("Erreur lors du chargement des tâches :", error);
      } finally {
        setLoading(false);
      }
    };

    if (resourceId) loadTasks();
  }, [resourceId]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "done") return task.is_done;
    if (filter === "not_done") return !task.is_done;
    return true;
  });

  const toggleTaskDone = async (task) => {
    try {
      const updatedTask = { ...task, is_done: !task.is_done };
      // Call your API to update the task here
      // await updateTask(task.id, updatedTask);
      setTasks(tasks.map(t => t.id === task.id ? updatedTask : t));
    } catch (error) {
      console.error("Error toggling task status:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      // Call your API to delete the task here
      // await deleteTaskApi(taskId);
      setTasks(tasks.filter(t => t.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-black bg-opacity-40">
      <motion.div
        className="bg-white p-6 rounded-xl shadow-lg w-full h-10/12 max-w-10/12"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <FaTasks className="mr-2 text-cyan-600" />
            Tâches affectées
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded-md text-sm ${filter === "all" ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Toutes
            </button>
            <button
              onClick={() => setFilter("done")}
              className={`px-3 py-1 rounded-md text-sm ${filter === "done" ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Complétées
            </button>
            <button
              onClick={() => setFilter("not_done")}
              className={`px-3 py-1 rounded-md text-sm ${filter === "not_done" ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              En cours
            </button>
            <button
          onClick={onClose}
          className="  bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Fermer
        </button>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-500">Chargement des tâches...</p>
        ) : (
          <AnimatePresence>
            {filteredTasks.length > 0 ? (
              <div className="space-y-3">
                {filteredTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    className={`flex items-center justify-between p-4 rounded-xl border ${
                      task.is_done ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
                    } shadow-sm hover:shadow-md transition-all`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <input
                        type="checkbox"
                        checked={task.is_done}
                        onChange={() => toggleTaskDone(task)}
                        className={`rounded-full w-5 h-5 border-2 ${
                          task.is_done
                            ? "bg-green-500 border-green-500"
                            : "border-gray-300"
                        } focus:ring-0 focus:ring-offset-0 cursor-pointer`}
                        aria-label={task.is_done ? "Marquer comme non complétée" : "Marquer comme complétée"}
                      />
                      
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium text-gray-800 truncate ${task.is_done ? "line-through text-gray-500" : ""}`}>
                          {task.title}
                        </p>
                        {task.description && (
                          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                        )}
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
                ))}
              </div>
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
                    ? "Aucune tâche affectée à cette ressource"
                    : filter === "done"
                    ? "Aucune tâche complétée pour le moment"
                    : "Toutes les tâches sont complétées!"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        
      </motion.div>
    </div>
  );
}