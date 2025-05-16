// app/register/page.js
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthForm from "@/components/AuthForm";
import { registerUser } from "@/services/allocationService";
import HomeButton from "@/components/HomeButton";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData) => {
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      // Redirection vers la page de connexion avec un paramètre
      router.push("/login?registered=true");
    } catch (err) {
      console.error("Erreur d'inscription:", err);
      setError(err.response?.data?.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 flex items-center justify-center p-4">
      <HomeButton />
      <AuthForm
        type="register"
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </div>
  );
}