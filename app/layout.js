'use client'
import "./globals.css";
import { AllocationProvider } from "@/context/AllocationContext";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-gray-50">
        <AllocationProvider>
          <div className="flex h-full">
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
      </body>
    </html>
  );
}