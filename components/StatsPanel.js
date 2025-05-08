"use client";
import { motion } from "framer-motion";
import { FaTasks, FaServer, FaCheck, FaChartLine } from "react-icons/fa";

const StatCard = ({ icon, title, value, color }) => (
  <motion.div
    className={`p-4 rounded-xl shadow-sm border border-gray-100 bg-gradient-to-br ${color}`}
    whileHover={{ y: -5 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className="p-2 rounded-lg bg-white bg-opacity-30">
        {icon}
      </div>
    </div>
  </motion.div>
);

export default function StatsPanel({ demands, resources, results }) {
  const allocated = results.filter(r => r.resource).length;
  const efficiency = demands.length > 0 ? Math.round((allocated / demands.length) * 100) : 0;

  return (
    <motion.div
      className="space-y-4 sticky top-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center p-3 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-2 bg-purple-100 rounded-lg text-purple-600 mr-3">
          <FaChartLine size={20} />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Statistiques</h3>
      </div>

      <div className="space-y-3">
        <StatCard
          icon={<FaTasks className="text-purple-600" size={20} />}
          title="Tâches"
          value={demands.length}
          color="from-purple-50 to-purple-100"
        />
        <StatCard
          icon={<FaServer className="text-blue-600" size={20} />}
          title="Ressources"
          value={resources.length}
          color="from-blue-50 to-blue-100"
        />
        <StatCard
          icon={<FaCheck className="text-green-600" size={20} />}
          title="Alloués"
          value={allocated}
          color="from-green-50 to-green-100"
        />
        <StatCard
          icon={<FaChartLine className="text-orange-600" size={20} />}
          title="Efficacité"
          value={`${efficiency}%`}
          color="from-orange-50 to-orange-100"
        />
      </div>
    </motion.div>
  );
}