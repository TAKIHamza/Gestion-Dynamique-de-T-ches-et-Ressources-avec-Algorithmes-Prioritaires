"use client";
import ResourceForm from "@/components/ResourceForm";
import { motion } from "framer-motion";

export default function NouvelleRessourcePage() {
  return (
    <motion.div 
      className="p-6"
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Ajouter une Ressource</h1>
      <ResourceForm />
    </motion.div>
  );
}
