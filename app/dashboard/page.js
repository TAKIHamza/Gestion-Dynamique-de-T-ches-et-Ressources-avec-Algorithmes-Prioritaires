"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  return (
    <motion.div
      className="min-h-screen   px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
            whileHover={{ scale: 1.02 }}
          >
            <span className="inline-block bg-gradient-to-r from-cyan-600 to-cyan-500 bg-clip-text text-transparent">
              🧠 Allocation Intelligente
            </span>
          </motion.h1>
          
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, staggerChildren: 0.1 }}
        >
          {[
            {
              title: "📝 Gérer les Tâches",
              description: "Ajouter, organiser et prioriser vos tâches",
              href: "/taches",
              color: "from-purple-500 to-indigo-500",
            },
            {
              title: "🧰 Gérer les Ressources",
              description: "Organiser vos ressources disponibles",
              href: "/ressources",
              color: "from-emerald-500 to-teal-500",
            },
            {
              title: "⚙️ Lancer l'Allocation",
              description: "Optimiser automatiquement vos ressources",
              href: "/resultats",
              color: "from-amber-500 to-orange-500",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <Link href={item.href}>
                <div className={`bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 h-full`}>
                  <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h2>
                    <p className="text-gray-600">{item.description}</p>
                    <div className="mt-4">
                      <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-700">
                        Accéder →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 rounded-xl shadow-lg p-6 text-center border border-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-medium text-gray-800 mb-2">Prêt à optimiser votre workflow?</h3>
          <p className="text-gray-600 mb-4">Commencez par ajouter vos premières tâches et ressources</p>
          <Link href="/taches">
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Commencer maintenant
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}