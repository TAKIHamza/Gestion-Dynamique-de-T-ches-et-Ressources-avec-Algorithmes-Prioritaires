'use client';

import { AllocationProvider } from "@/context/AllocationContext";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import "../globals.css";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [tokenPresent, setTokenPresent] = useState(false);

  useEffect(() => {
    const token = getCookie("auth_token");
    if (!token) {
      router.push("/login");
    } else {
      setTokenPresent(true);
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p>Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  if (!tokenPresent) {
    return null; // On évite un double rendu
  }

  return (
    <div className="h-full relative overflow-hidden">
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
