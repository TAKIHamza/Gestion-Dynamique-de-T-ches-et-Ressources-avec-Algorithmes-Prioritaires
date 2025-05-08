"use client";
import ResourceList from "@/components/ResourceList";
import { motion } from "framer-motion";

export default function ResourcePage() {
  return (
    <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="text-2xl font-bold">Ressources</h1>
      <ResourceList />
    </motion.div>
  );
}
