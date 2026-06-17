"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { TbBarbell } from "react-icons/tb";

export default function Navbar() {
    // Mobile menu state
    const [isOpen, setIsOpen] = useState(false);

    // Navbar visibility state
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Navbar hide/show on scroll
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < 50) {
                setVisible(true);
            } else if (currentScrollY > lastScrollY) {
                setVisible(false);
            } else {
                setVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    // Navigation links
    const navLinks = [
        { name: "Home", href: "/" },
        { name: "All Classes", href: "/classes" },
        { name: "Community Forum", href: "/forum" },
        { name: "Dashboard", href: "/dashboard" },
    ];

    return (
        <>
            {/* Navbar */}
            <motion.header
                initial={{ y: 0 }}
                animate={{ y: visible ? 0 : -100 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="fixed top-0 left-0 z-50 w-full"
            >
                <div className="mx-auto mt-3 flex h-16 w-full items-center justify-between border border-white/10 bg-[rgba(15,15,18,0.85)] px-6 backdrop-blur-xl shadow-[0_0_25px_rgba(220,38,38,0.12)]">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <motion.div
                            whileHover={{ rotate: 10, scale: 1.08 }}
                            transition={{ duration: 0.2 }}
                            className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-red-500 shadow-lg shadow-red-600/30"
                        >
                            <TbBarbell className="text-2xl text-white" />
                        </motion.div>

                        <div>
                            <h2 className="heading-font text-3xl tracking-wide">
                                Momentum<span className="text-red-500">X</span>
                            </h2>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        <motion.div
                            whileHover={{ y: -2 }}
                            transition={{ duration: 0.15 }}
                        >
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="body-font text-sm font-medium text-[var(--text-primary)] transition-all duration-300 hover:text-red-500 mr-5"
                            >
                                {link.name}
                            </Link>
                        ))}
                        </motion.div>
                    </nav>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden lg:flex items-center gap-3">
                        <Link
                            href="/login"
                            className="rounded-lg border border-[var(--border)] px-5 py-2 text-sm font-medium transition-all duration-300 hover:border-red-600"
                        >
                            Login
                        </Link>

                        <Link
                            href="/register"
                            className="rounded-lg bg-gradient-to-r from-red-600 to-red-500 px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-red-600/20"
                        >
                            Register
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="lg:hidden text-3xl text-white"
                    >
                        <HiOutlineMenuAlt3 />
                    </button>
                </div>
            </motion.header>

            {/* ============================================= Mobile Menu ======================================  */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            onClick={() => setIsOpen(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md"
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.3 }}
                            className="fixed top-0 right-0 z-[70] h-screen w-full bg-[var(--background)]"
                        >
                            {/* Mobile Header */}
                            <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-red-500 text-lg font-bold text-white">
                                        M
                                    </div>

                                    <h2 className="heading-font text-2xl font-bold">
                                        MomentumX
                                    </h2>
                                </div>

                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-3xl"
                                >
                                    <HiOutlineX />
                                </button>
                            </div>

                            {/*Mobile Navigation*/}
                            <nav className="flex flex-col gap-8 px-8 py-12">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="heading-font text-3xl font-semibold transition-all duration-300 hover:text-red-500"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>

                            {/* Mobile Auth Buttons */}
                            <div className="px-8 mt-4 flex flex-col gap-4">
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-lg border border-[var(--border)] px-5 py-3 text-center"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/register"
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-lg bg-gradient-to-r from-red-600 to-red-500 px-5 py-3 text-center font-medium text-white"
                                >
                                    Register
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}