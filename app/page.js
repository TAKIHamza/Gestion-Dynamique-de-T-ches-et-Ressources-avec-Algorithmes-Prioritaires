"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.h1
        className="text-4xl font-bold text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        🧠 Allocation Intelligente de Ressources
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Link href="/taches">
          <div className="bg-white rounded-xl shadow p-6 hover:bg-gray-100 transition">
            <h2 className="text-xl font-semibold">📝 Gérer les Tâches</h2>
            <p className="text-gray-600">Ajouter, afficher ou supprimer des tâches.</p>
          </div>
        </Link>

        <Link href="/ressources">
          <div className="bg-white rounded-xl shadow p-6 hover:bg-gray-100 transition">
            <h2 className="text-xl font-semibold">🧰 Gérer les Ressources</h2>
            <p className="text-gray-600">Ajouter, afficher ou supprimer des ressources.</p>
          </div>
        </Link>

        <Link href="/resultats">
          <div className="bg-white rounded-xl shadow p-6 hover:bg-gray-100 transition">
            <h2 className="text-xl font-semibold">⚙️ Lancer l'Allocation</h2>
            <p className="text-gray-600">Choisir la méthode et afficher les résultats.</p>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
