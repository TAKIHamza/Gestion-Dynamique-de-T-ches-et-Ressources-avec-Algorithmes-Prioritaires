"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaServer } from "react-icons/fa";
import { useAllocation } from "@/context/AllocationContext";

export default function ResourceList() {
  const { resources, deleteResource } = useAllocation(); // Utilisation du context

  const safeResources = Array.isArray(resources) ? resources : [];

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
            Ressources disponibles ({safeResources.length})
          </h3>
        </div>
      </div>

      <AnimatePresence>
        {safeResources.length > 0 ? (
          <ul className="space-y-2">
            {safeResources.map((resource) => (
              <motion.li
                key={resource.id} // Utilisation de l'id comme clé
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <div>
                  <span className="font-medium">{resource.name}</span>
                  <span className="ml-3 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Capacité: {resource.capacity}
                  </span>
                </div>
                <button
                  onClick={() => deleteResource(resource.id)} // Passer l'id de la ressource pour la suppression
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
            className="bg-green-50 border border-green-100 rounded-lg p-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-green-600">Aucune ressource disponible</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
