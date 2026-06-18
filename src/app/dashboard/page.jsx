"use client";
import { motion } from "framer-motion";
export default function DashboardPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 p-5"
        >
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
            >
                <h1 className="heading-font text-4xl">
                    Dashboard
                </h1>

                <p className="mt-2 text-[var(--text-secondary)]">
                    Welcome to your MomentumX dashboard.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
                <h2 className="text-xl font-semibold">
                    Dashboard Home
                </h2>

                <p className="mt-3 text-[var(--text-secondary)]">
                    Dashboard content will be added here.
                </p>
            </motion.div>
        </motion.div>
    );
}