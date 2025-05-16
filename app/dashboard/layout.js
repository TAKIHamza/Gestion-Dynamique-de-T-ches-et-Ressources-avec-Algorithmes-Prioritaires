// app/dashboard/layout.js
'use client';

import { AllocationProvider } from "@/context/AllocationContext";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import "../globals.css";



export default function DashboardLayout({ children }) {
  return (
    <div className="h-full  relative overflow-hidden">
      {/* ✅ Fond radial avec dégradé */}
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:17px_17px]"></div>
      <AllocationProvider>
        <div className="flex h-screen">
          <Sidebar />
          <motion.main
            className="flex-1 p-6 rounded-3xl overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.main>
        </div>
      </AllocationProvider>
    </div>
  );
}
