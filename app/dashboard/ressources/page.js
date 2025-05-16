"use client";
import ResourceList from "@/components/ResourceList";
import ResourceForm from "@/components/ResourceForm";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

export default function ResourcePage() {
  const [showResourceForm, setShowResourceForm] = useState(false);

  const toggleResourceForm = () => {
    setShowResourceForm(!showResourceForm);
  };

  return (
    <motion.div 
      className="space-y-4" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Ressources</h1>
        <motion.button
          onClick={toggleResourceForm}
          className="flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 text-white w-10 h-10 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {showResourceForm ? (
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
        {showResourceForm && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ResourceForm onSuccess={() => setShowResourceForm(false)} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <ResourceList />
    </motion.div>
  );
}