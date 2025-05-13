"use client";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";
import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence
import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

export default function TaskPage() {
  const [showTaskForm, setShowTaskForm] = useState(false);

  const toggleTaskForm = () => {
    setShowTaskForm(!showTaskForm);
  };

  return (
    <motion.div 
      className="space-y-4 h-full" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tâches</h1>
        <motion.button
          onClick={toggleTaskForm}
          className="flex items-center justify-center rounded-full bg-cyan-600 hover:bg-cyan-600 text-white w-10 h-10 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {showTaskForm ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <FaTimes className="text-lg" />
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <FaPlus className="text-lg" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
      
      <AnimatePresence>
        {showTaskForm && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <TaskForm onSuccess={() => setShowTaskForm(false)} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <TaskList />
    </motion.div>
  );
}