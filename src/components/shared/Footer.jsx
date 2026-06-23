"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TbBarbell } from "react-icons/tb";
import { FaFacebookF, FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";
import { MdEmail, MdLocationOn } from "react-icons/md";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[var(--card)]">
            {/* Main Footer */}
            <div className="section-container py-14">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">

                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center gap-3">
                            <motion.div whileHover={{ rotate: 8, scale: 1.05 }} className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 via-red-500 to-orange-500 shadow-[0_0_20px_rgba(220,38,38,0.35)]">
                                <TbBarbell className="text-2xl text-white" />
                            </motion.div>

                            <h2 className="heading-font text-3xl">
                                Momentum<span className="text-red-500">X</span>
                            </h2>
                        </Link>

                        <p className="mt-4 max-w-sm text-sm text-[var(--text-secondary)]">
                            Transform your fitness journey with expert trainers, structured classes, and a thriving fitness community.
                        </p>

                        {/* Social Links */}
                        <div className="mt-6 flex items-center gap-3">
                            {[FaFacebookF, FaInstagram, FaYoutube, FaXTwitter].map((Icon, index) => (
                                <motion.a
                                    key={index}
                                    href="#"
                                    whileHover={{ y: -3 }}
                                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-black/20 text-lg transition-all hover:border-red-500 hover:text-red-500"
                                >
                                    <Icon />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="heading-font mb-5 text-xl">Quick Links</h3>

                        <div className="flex flex-col gap-3 text-[var(--text-secondary)]">
                            <Link href="/" className="hover:text-red-500 transition-colors">Home</Link>
                            <Link href="/classes" className="hover:text-red-500 transition-colors">All Classes</Link>
                            <Link href="/forum" className="hover:text-red-500 transition-colors">Community Forum</Link>
                            <Link href="/dashboard" className="hover:text-red-500 transition-colors">Dashboard</Link>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="heading-font mb-5 text-xl">Contact</h3>

                        <div className="space-y-4 text-[var(--text-secondary)]">
                            <div className="flex items-start gap-3">
                                <MdEmail className="mt-1 text-lg text-red-500" />
                                <span>support@momentumx.com</span>
                            </div>

                            <div className="flex items-start gap-3">
                                <MdLocationOn className="mt-1 text-lg text-red-500" />
                                <span>Kolkata, West Bengal, India</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="section-container py-5 text-center text-sm text-[var(--text-secondary)]">
                    © {new Date().getFullYear()} MomentumX. All rights reserved.
                </div>
            </div>
        </footer>
    );
}