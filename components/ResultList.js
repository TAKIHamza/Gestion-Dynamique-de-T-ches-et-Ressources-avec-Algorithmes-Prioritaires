"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaHourglassHalf } from "react-icons/fa";

export default function ResultList({ results }) {
  return (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center mb-4">
        <div className="p-2 bg-blue-100 rounded-lg text-blue-600 mr-3">
          <FaCheckCircle size={20} />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Résultats d'allocation</h3>
      </div>

      <AnimatePresence>
        {results.length > 0 ? (
          <ul className="space-y-3">
            {results.map((item, index) => (
              <motion.li
                key={index}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700">{item.demand_title}</span>
                  </div>
                  <div className="flex items-center">
                    <motion.div
                      className="mx-2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.05 + 0.2 }}
                    >
                      <div className="h-px w-8 bg-gray-300" />
                    </motion.div>
                    {item.resource_label ? (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {item.resource_label}
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        <FaHourglassHalf className="mr-1" size={12} />
                        En attente
                      </span>
                    )}
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        ) : (
          <motion.div
            className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-blue-600">Aucun résultat disponible. Lancez une simulation pour voir les allocations.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}