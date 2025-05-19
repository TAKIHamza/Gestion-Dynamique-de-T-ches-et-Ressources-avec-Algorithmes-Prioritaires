"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaServer, FaEdit, FaSpinner } from "react-icons/fa";
import { useAllocation } from "@/context/AllocationContext";
import { useState, useEffect } from "react";
import TaskListByResource from "@/components/TaskListByResource";
import { FaEye } from "react-icons/fa";

export default function ResourceList() {
  const { resources, deleteResource, updateResource, refreshData } = useAllocation();
  const [editingId, setEditingId] = useState(null);
  const [selectedResourceId, setSelectedResourceId] = useState(null);
  const [editForm, setEditForm] = useState({
    label: "",
    description: "",
    capacity: "",
    domain: "",
    available: false
  });
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const toggleDetails = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const safeResources = Array.isArray(resources) ? resources : [];

  useEffect(() => {
    // Simuler un chargement ou attendre que les ressources soient chargées
    if (resources !== null) {
      setLoading(false);
    }
  }, [resources]);

  const handleEditClick = (resource) => {
    setEditingId(resource.id);
    setEditForm({
      label: resource.label,
      description: resource.description,
      capacity: resource.capacity,
      domain: resource.domain,
      available: resource.available
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleUpdate = async (id) => {
    try {
      setUpdatingId(id);
      await updateResource(id, editForm);
      setEditingId(null);
      await refreshData();
    } catch (error) {
      console.error("Error updating resource:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await deleteResource(id);
      await refreshData();
    } catch (error) {
      console.error("Error deleting resource:", error);
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
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg text-green-600 mr-3">
            <FaServer size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            Ressources disponibles ({loading ? '...' : safeResources.length})
          </h3>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <FaSpinner className="text-blue-500 text-2xl" />
          </motion.div>
          <span className="ml-2 text-gray-600">Chargement des ressources...</span>
        </div>
      ) : (
        <AnimatePresence>
          {safeResources.length > 0 ? (
            <ul className="space-y-2">
              {safeResources.map((resource) => (
                <motion.li
                  key={resource.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  {editingId === resource.id ? (
                    <div className="w-full space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                          <input
                            type="text"
                            name="label"
                            value={editForm.label}
                            onChange={handleEditChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Capacité</label>
                          <input
                            type="number"
                            name="capacity"
                            value={editForm.capacity}
                            onChange={handleEditChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          name="description"
                          value={editForm.description}
                          onChange={handleEditChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          rows={2}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            name="available"
                            checked={editForm.available}
                            onChange={handleEditChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label className="ml-2 block text-sm text-gray-700">Disponible</label>
                        </div>
                        <div className="space-x-2">
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                            disabled={updatingId === resource.id}
                          >
                            Annuler
                          </button>
                          <button
                            onClick={() => handleUpdate(resource.id)}
                            className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center min-w-[100px]"
                            disabled={updatingId === resource.id}
                          >
                            {updatingId === resource.id ? (
                              <>
                                <FaSpinner className="animate-spin mr-2" />
                                En cours...
                              </>
                            ) : (
                              "Enregistrer"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        {selectedResourceId && (
                          <TaskListByResource
                            resourceId={selectedResourceId}
                            onClose={() => setSelectedResourceId(null)}
                          />
                        )}
                        <p className="font-medium text-gray-800">{resource.label}</p>
                        <p className="text-sm text-gray-600">{resource.description}</p>
                        <div className="mt-1 text-sm space-x-2">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                            Capacité: {resource.capacity}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              resource.available ? "bg-blue-100 text-blue-800" : "bg-gray-200 text-gray-600"
                            }`}
                          >
                            {resource.available ? "Disponible" : "Indisponible"}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-2 sm:mt-0 sm:ml-4">
                        <button
                          onClick={() => handleEditClick(resource)}
                          className="text-green-600 hover:text-green-700 cursor-pointer"
                          aria-label="Modifier"
                          disabled={deletingId === resource.id}
                        >
                          <FaEdit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(resource.id)}
                          className="text-red-500 hover:text-red-700 p-2 cursor-pointer flex items-center justify-center"
                          aria-label="Supprimer"
                          disabled={deletingId === resource.id}
                        >
                          {deletingId === resource.id ? (
                            <FaSpinner className="animate-spin w-5 h-5" />
                          ) : (
                            <FaTrash className="w-5 h-5" />
                          )}
                        </button>
                        <button
                          onClick={() => setSelectedResourceId(resource.id)}
                          className="text-green-600 hover:text-green-800 cursor-pointer"
                          title="Voir les tâches"
                          disabled={deletingId === resource.id}
                        >
                          <FaEye size={20} />
                        </button>
                      </div>
                    </>
                  )}
                </motion.li>
              ))}
            </ul>
          ) : (
            <motion.div
              className="bg-green-50 border border-green-100 rounded-lg p-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-green-600">Aucune ressource disponible</p>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}