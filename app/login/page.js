
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setCookie } from "cookies-next";
import AuthForm from "@/components/AuthForm";
import { loginUser } from "@/services/allocationService";
import HomeButton from "@/components/HomeButton";
 
export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError("");
    
    try {
      const response = await loginUser({
        email: formData.email,
        password: formData.password
      });

      // Stockage du token dans un cookie sécurisé
      setCookie("auth_token", response.access_token || response.access, {
        maxAge: 60 * 60 * 24 * 7, // 1 semaine
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      // Redirection
      router.push("/dashboard");
    } catch (err) {
      console.error("Erreur de connexion:", err);
      setError(err.response?.data?.message || "Identifiants incorrects");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center p-4">
     <HomeButton />
      <AuthForm 
        type="login"
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />

    </div>
  );
}