"use client";
import { useState } from "react";
import { useAllocation } from "@/context/AllocationContext";
import MethodSelector from "@/components/MethodSelector";
import ResultList from "@/components/ResultList";
import { runAllocation } from "@/services/allocationService";
import { motion } from "framer-motion";
import { FaRocket, FaFileExport } from "react-icons/fa";
import StatsPanel from "@/components/StatsPanel";

export default function ResultPage() {
  const { tasks: demands, resources } = useAllocation();
  const [method, setMethod] = useState("priority");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleRun = async () => {
    if (demands.length === 0 || resources.length === 0) return;
    
    setIsLoading(true);
    try {
      const response = await runAllocation({ demands, resources, method });
      setResults(response);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    const headers = "Demande,Ressource,Méthode\n";
    const csv = results.map(r => 
      `"${r.demand}","${r.resource || ''}","${method}"`
    ).join("\n");
    
    const blob = new Blob([headers + csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `allocation-${new Date().toISOString()}.csv`;
    a.click();
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
     

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <MethodSelector method={method} setMethod={setMethod} />

          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-medium text-gray-700">Prêt à lancer la simulation</h3>
                <p className="text-sm text-gray-500">
                  {demands.length} tâches et {resources.length} ressources disponibles
                </p>
              </div>
              <div className="flex space-x-3">
                <motion.button
                  onClick={handleRun}
                  disabled={isLoading || demands.length === 0 || resources.length === 0}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium ${
                    isLoading || demands.length === 0 || resources.length === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                  }`}
                  whileHover={!isLoading && demands.length > 0 && resources.length > 0 ? { scale: 1.03 } : {}}
                  whileTap={!isLoading && demands.length > 0 && resources.length > 0 ? { scale: 0.98 } : {}}
                >
                  <FaRocket className="mr-2" />
                  {isLoading ? "Calcul en cours..." : "Lancer la simulation"}
                </motion.button>

                {results.length > 0 && (
                  <motion.button
                    onClick={handleExport}
                    className="flex items-center px-4 py-3 bg-white border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaFileExport className="mr-2" />
                    Exporter
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>

          <ResultList results={results} />
        </div>

        <div className="lg:col-span-1">
          <StatsPanel 
            demands={demands} 
            resources={resources} 
            results={results} 
          />
        </div>
      </div>
    </motion.div>
  );
}