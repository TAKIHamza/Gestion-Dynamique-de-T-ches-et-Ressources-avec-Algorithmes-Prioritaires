"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { FaTrash, FaTasks, FaFilter, FaGripLines, FaEdit, FaSave, FaTimes, FaSpinner } from "react-icons/fa";
import { useAllocation } from "@/context/AllocationContext";

export default function TaskList() {
  const { tasks, deleteTask, toggleTaskDone, reorderTasks, updateTask } = useAllocation();
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    priority: 1,
    requirement: "",
    is_done: false
  });
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);

  const safeTasks = Array.isArray(tasks) ? tasks : [];

  useEffect(() => {
    // Simulate loading or wait for tasks to be loaded
    if (tasks !== null) {
      setLoading(false);
    }
  }, [tasks]);

  const filteredTasks = safeTasks.filter((task) => {
    if (filter === "done") return task.is_done;
    if (filter === "not_done") return !task.is_done;
    return true;
  });

  const handleEditClick = (task) => {
    setEditingId(task.id);
    setEditForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
      requirement: task.requirement,
      is_done: !!task.is_done
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: name === "priority" ? parseInt(value) : value
    }));
  };

  const handleUpdate = async (id) => {
    try {
      setUpdatingId(id);
      await updateTask(id, editForm);
      setEditingId(null);
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleToggleDone = async (task) => {
    try {
      setTogglingId(task.id);
      const updatedTask = {
        ...task,
        is_done: !task.is_done
      };
      toggleTaskDone(task.id);
      await updateTask(task.id, updatedTask);
    } catch (error) {
      console.error("Error toggling task status:", error);
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await deleteTask(id);
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <FaTasks className="mr-2 text-cyan-600" /> Liste des Tâches
          {loading && (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="ml-2"
            >
              <FaSpinner className="text-blue-500" />
            </motion.span>
          )}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-md text-sm ${filter === "all" ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            disabled={loading}
          >
            Toutes
          </button>
          <button
            onClick={() => setFilter("done")}
            className={`px-3 py-1 rounded-md text-sm ${filter === "done" ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            disabled={loading}
          >
            Complétées
          </button>
          <button
            onClick={() => setFilter("not_done")}
            className={`px-3 py-1 rounded-md text-sm ${filter === "not_done" ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            disabled={loading}
          >
            En cours
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="mr-3"
          >
            <FaSpinner className="text-blue-500 text-2xl" />
          </motion.div>
          <span className="text-gray-600">Chargement des tâches...</span>
        </div>
      ) : (
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
                      task.is_done ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
                    } shadow-sm hover:shadow-md transition-all`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {editingId === task.id ? (
                      <EditTaskForm 
                        editForm={editForm}
                        handleEditChange={handleEditChange}
                        onCancel={() => setEditingId(null)}
                        onSave={() => handleUpdate(task.id)}
                        isUpdating={updatingId === task.id}
                      />
                    ) : (
                      <TaskItem 
                        task={task}
                        onToggleDone={() => handleToggleDone(task)}
                        onEdit={() => handleEditClick(task)}
                        onDelete={() => handleDelete(task.id)}
                        isToggling={togglingId === task.id}
                        isDeleting={deletingId === task.id}
                      />
                    )}
                  </motion.div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          ) : (
            <EmptyState filter={filter} />
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}

// Sub-components with loading states
function EditTaskForm({ editForm, handleEditChange, onCancel, onSave, isUpdating }) {
  return (
    <div className="w-full space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
          <input
            type="text"
            name="title"
            value={editForm.title}
            onChange={handleEditChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            disabled={isUpdating}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
          <select
            name="priority"
            value={editForm.priority}
            onChange={handleEditChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            disabled={isUpdating}
          >
            <option value={1}>Haute</option>
            <option value={2}>Moyenne</option>
            <option value={3}>Basse</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={editForm.description}
            onChange={handleEditChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={2}
            disabled={isUpdating}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Besoin</label>
          <input
            type="number"
            name="requirement"
            value={editForm.requirement}
            onChange={handleEditChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            disabled={isUpdating}
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          onClick={onCancel}
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex items-center"
          disabled={isUpdating}
        >
          Annuler
        </button>
        <button
          onClick={onSave}
          className="px-3 py-1 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 flex items-center justify-center min-w-[100px]"
          disabled={isUpdating}
        >
          {isUpdating ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              En cours...
            </>
          ) : (
            <>
              <FaSave className="mr-1" /> Enregistrer
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function TaskItem({ task, onToggleDone, onEdit, onDelete, isToggling, isDeleting }) {
  return (
    <>
      <div className="flex items-center space-x-3 flex-1">
        <button 
          className="mr-2 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
          aria-label="Réorganiser"
          disabled={isDeleting || isToggling}
        >
          <FaGripLines />
        </button>
        
        {isToggling ? (
          <div className="p-1">
            <FaSpinner className="animate-spin text-blue-500" />
          </div>
        ) : (
          <input
            type="checkbox"
            checked={task.is_done}
            onChange={onToggleDone}
            className={`rounded-full w-5 h-5 border-2 ${
              task.is_done
                ? "bg-green-500 border-green-500"
                : "border-gray-300"
            } focus:ring-0 focus:ring-offset-0 cursor-pointer`}
            aria-label={task.is_done ? "Marquer comme non complétée" : "Marquer comme complétée"}
            disabled={isDeleting}
          />
        )}
        
        <div className="flex-1 min-w-0">
          <p className={`font-medium text-gray-800 truncate ${task.is_done ? "line-through text-gray-500" : ""}`}>
            {task.title}
          </p>
          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
          <div className="flex flex-wrap gap-2 mt-1">
            <span className="px-2 py-1 bg-cyan-100 text-cyan-800 text-xs rounded-full whitespace-nowrap">
              Priorité: {["", "Haute", "Moyenne", "Basse"][task.priority]}
            </span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full whitespace-nowrap">
              Besoin: {task.requirement}
            </span>
            {task.is_done && (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full whitespace-nowrap">
                Complétée
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <motion.button
          onClick={onEdit}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-cyan-600 hover:text-cyan-700 py-2 transition-colors"
          aria-label="Modifier"
          disabled={isDeleting || isToggling}
        >
          <FaEdit className="w-5 h-5"/>
        </motion.button>
        <motion.button
          onClick={onDelete}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-red-400 hover:text-red-600 p-2 transition-colors flex items-center justify-center w-9 h-9"
          aria-label="Supprimer"
          disabled={isDeleting || isToggling}
        >
          {isDeleting ? (
            <FaSpinner className="animate-spin w-5 h-5" />
          ) : (
            <FaTrash className="w-5 h-5" />
          )}
        </motion.button>
      </div>
    </>
  );
}

function EmptyState({ filter }) {
  return (
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
  );
}