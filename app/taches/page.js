"use client";
import TaskList from "@/components/TaskList";
import { motion } from "framer-motion";

export default function TaskPage() {
  return (
    <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="text-2xl font-bold">Tâches</h1>
      <TaskList />
    </motion.div>
  );
}
