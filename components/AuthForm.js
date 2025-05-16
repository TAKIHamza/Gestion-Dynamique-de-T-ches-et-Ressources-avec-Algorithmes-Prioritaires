"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FiEye, FiEyeOff, FiUser, FiMail, FiLock } from "react-icons/fi";

const AuthForm = ({ type, onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    ...(type === "register" && { name: "", confirmPassword: "" }),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="w-full max-w-md mx-auto"
    >
      <motion.div 
        className="relative"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl shadow-lg transform -rotate-1"
        />

        {/* Main Card */}
        <motion.div
          variants={container}
          className="relative bg-white/95 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden p-8"
        >
            
          {/* Header */}
          <motion.div variants={item} className="text-center mb-8">
            <motion.h1 
              className="text-3xl font-bold text-gray-800 mb-2"
              whileHover={{ scale: 1.02 }}
            >
              {type === "login" ? "Connexion" : "Inscription"}
            </motion.h1>
            <motion.p className="text-gray-600">
              {type === "login" 
                ? "Accédez à votre espace de gestion" 
                : "Créez votre compte gratuitement"}
            </motion.p>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {type === "register" && (
              <motion.div variants={item} className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet
                </label>
                <div className="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent pb-3 pl-10 border-b border-gray-300 placeholder-gray-400 outline-none invalid:border-red-400 transition"
                    placeholder="Votre nom"
                  />
                </div>
              </motion.div>
            )}

            <motion.div variants={item} className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent pb-3 pl-10 border-b border-gray-300 placeholder-gray-400 outline-none invalid:border-red-400 transition"
                  placeholder="email@exemple.com"
                  pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                />
              </div>
            </motion.div>

            <motion.div variants={item} className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <div className="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-transparent pb-3 pl-10 border-b border-gray-300 placeholder-gray-400 outline-none invalid:border-red-400 transition pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="text-gray-400 hover:text-gray-600" />
                  ) : (
                    <FiEye className="text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </motion.div>

            {type === "register" && (
              <motion.div variants={item} className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmer le mot de passe
                </label>
                <div className="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    minLength={8}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-transparent pb-3 pl-10 border-b border-gray-300 placeholder-gray-400 outline-none invalid:border-red-400 transition pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff className="text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FiEye className="text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            <motion.div variants={item} className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center py-3 px-4 rounded-lg shadow-md transition-all ${
                  loading ? "bg-gray-300" : "bg-cyan-600 hover:bg-cyan-700 text-white"
                }`}
              >
                {loading ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                ) : null}
                {type === "login" ? "Se connecter" : "S'inscrire"}
              </button>
            </motion.div>
          </form>

          {/* Footer Link */}
          <motion.div 
            variants={item}
            className="mt-6 text-center text-sm text-gray-600"
          >
            {type === "login" ? (
              <>
                Pas de compte?{" "}
                <Link href="/register" className="font-medium text-cyan-600 hover:underline">
                  Créer un compte
                </Link>
              </>
            ) : (
              <>
                Déjà un compte?{" "}
                <Link href="/login" className="font-medium text-cyan-600 hover:underline">
                  Se connecter
                </Link>
              </>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AuthForm; 