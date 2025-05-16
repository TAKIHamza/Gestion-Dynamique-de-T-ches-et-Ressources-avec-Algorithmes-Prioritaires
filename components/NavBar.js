"use client"
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar() {
    const [navbar, setNavbar] = useState(false);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: -20, opacity: 0 },
        show: { 
            y: 0, 
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    const mobileMenuVariants = {
        open: { 
            opacity: 1,
            height: "auto",
            transition: { 
                staggerChildren: 0.1,
                delayChildren: 0.2
            } 
        },
        closed: { 
            opacity: 0,
            height: 0,
            transition: {
                staggerChildren: 0.1,
                staggerDirection: -1
            } 
        }
    };

    return (
        <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className=" pb-2 w-full backdrop-blur-xl top-0 dark:bg-white dark:border-gray-700 xl:fixed xl:w-full xl:top-0 xl:left-0 xl:z-30 fixed z-50"
        >
            <div className="container mx-auto w-full pt-2 bg-white-100">
                <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                    <div>
                        <div className="flex items-center justify-between py-1 md:py-2 md:block">
                            <motion.h1 
                                whileHover={{ scale: 1.05 }}
                                className="text-2xl md:text-3xl font-bold font-mono 
                                    bg-gradient-to-r from-cyan-800 via-sky-700 to-cyan-600
                                    bg-clip-text text-transparent
                                    hover:from-pink-600 hover:to-purple-600 
                                    transition-all duration-300">
                                Allo.Pro 
                            </motion.h1>
                            <div className="md:hidden">
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                    onClick={() => setNavbar(!navbar)}
                                >
                                    {navbar ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        </svg>
                                    )}
                                </motion.button>
                            </div>
                        </div>
                    </div>

                    {/* Original structure preserved - now with animations */}
                    <div className={`md:flex ${navbar ? "block" : "hidden"}`}>
                        <AnimatePresence>
                            {(navbar || !navbar) && (
                                <motion.div
                                    initial={false}
                                    animate={navbar ? "open" : "closed"}
                                    variants={navbar ? mobileMenuVariants : {}}
                                    className="flex-1 justify-between pb-3 mt-8 md:block md:pb-0 md:mt-0"
                                >
                                    <motion.ul 
                                        variants={navbar ? containerVariants : {}}
                                        className="lg:pt-0 gap-8 tracking-wide font-medium flex-col flex md:flex-row md:gap-0"
                                    >
                                        
                                    </motion.ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className={`md:flex ${navbar ? "block" : "hidden"}`}>
                        <AnimatePresence>
                            {(navbar || !navbar) && (
                                <motion.div
                                    initial={false}
                                    animate={navbar ? "open" : "closed"}
                                    variants={navbar ? mobileMenuVariants : {}}
                                    className="justify-end pb-3 mt-8 md:block md:pb-0 md:mt-0"
                                >
                                    <motion.ul 
                                        variants={navbar ? containerVariants : {}}
                                        className="lg:pt-0 gap-8 tracking-wide font-medium flex-col flex md:flex-row md:gap-0"
                                    >
                                        <motion.li 
                                            variants={navbar ? itemVariants : {}}
                                            className="max-w-max"
                                        >
                                            <Link 
                                                href="/login" 
                                                className="block md:px-3 group"
                                                onClick={() => setNavbar(false)}
                                            >
                                                <div className="relative text-gray-600 dark:text-gray-300
                                                        before:absolute before:-bottom-2 md:before:-bottom-3 before:origin-left before:w-full before:h-0.5 before:mx-auto before:mt-auto before:rounded-full before:bg-cyan-800 dark:before:bg-cyan-400 before:transition before:scale-x-0 group-hover:before:scale-x-100">
                                                    <span className="transition group-hover:text-cyan-700 dark:group-hover:text-cyan-400">Login</span>
                                                </div>
                                            </Link>
                                        </motion.li>
                                    </motion.ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}