"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { authClient } from "@/lib/auth-client";
import {FaTachometerAlt,FaUser,FaCalendarCheck,FaSignOutAlt,} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";


export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: async () => {
                        await Swal.fire({
                            icon: "success",
                            title: "Logged Out",
                            timer: 1200,
                            showConfirmButton: false,
                        });

                        router.push("/login");
                    },
                },
            });
        } catch {
            Swal.fire({
                icon: "error",
                title: "Logout Failed",
            });
        }
    };

    const links = [
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: <FaTachometerAlt />,
        },
        {
            name: "Profile",
            href: "/dashboard/profile",
            icon: <FaUser />,
        },
        {
            name: "Book Class",
            href: "/dashboard/book-class",
            icon: <FaCalendarCheck />,
        },
    ];

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex h-screen w-72 flex-col border-r border-white/10 bg-black/30 backdrop-blur-xl">
                {/* Logo */}
                <div className="border-b border-white/10 p-6">
                    <h2 className="heading-font text-3xl">
                        Momentum<span className="text-red-500">X</span>
                    </h2>

                    <p className="mt-2 text-sm text-[var(--text-secondary)]">
                        Fitness Dashboard
                    </p>
                </div>

                <nav className="flex flex-col gap-2 p-4">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${pathname === link.href
                                    ? "bg-red-600 text-white"
                                    : "text-gray-300 hover:bg-white/5"
                                }`}
                        >
                            {link.icon}
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <div className="mt-auto p-4">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-4 py-3 font-medium text-white transition-all duration-300 hover:bg-red-700"
                    >
                        <FaSignOutAlt />
                        Logout
                    </button>
                </div>
            </aside>
            {/* Mobile Sidebar */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed left-2 top-20 z-50 rounded-xl bg-red-600 p-3 text-white lg:hidden"
            >
                <FaBars />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-40 bg-black/70 lg:hidden"
                        />

                        <motion.aside
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            transition={{ duration: 0.3 }}
                            className="fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-white/10 bg-[#0B0B0D] lg:hidden"
                        >
                            <div className="flex items-center justify-between border-b border-white/10 p-6">
                                <h2 className="heading-font text-3xl">
                                    Momentum<span className="text-red-500">X</span>
                                </h2>

                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-xl text-white"
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            <nav className="flex flex-col gap-2 p-4">
                                {links.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center gap-3 rounded-xl px-4 py-3 ${pathname === link.href
                                                ? "bg-red-600 text-white"
                                                : "text-gray-300"
                                            }`}
                                    >
                                        {link.icon}
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>

                            <div className="mt-auto p-4">
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-4 py-3 font-medium text-white"
                                >
                                    <FaSignOutAlt />
                                    Logout
                                </button>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}