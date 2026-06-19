"use client";
import { motion } from "framer-motion";
import {
    FaDumbbell,
    FaHeart,
    FaFire,
    FaTrophy,
} from "react-icons/fa";


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

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {/* Bookings */}
                <motion.div
                    whileHover={{ y: -5 }}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                >
                    <motion.div
                        animate={{
                            y: [0, -8, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="mb-4 inline-flex rounded-2xl bg-red-500/10 p-4"
                    >
                        <FaDumbbell className="text-3xl text-red-500" />
                    </motion.div>

                    <h3 className="text-4xl font-bold">
                        0
                    </h3>

                    <p className="mt-2 text-[var(--text-secondary)]">
                        Total Bookings
                    </p>
                </motion.div>

                {/* Favorites */}
                <motion.div
                    whileHover={{ y: -5 }}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                >
                    <motion.div
                        animate={{
                            y: [0, -8, 0],
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="mb-4 inline-flex rounded-2xl bg-pink-500/10 p-4"
                    >
                        <FaHeart className="text-3xl text-pink-500" />
                    </motion.div>

                    <h3 className="text-4xl font-bold">
                        0
                    </h3>

                    <p className="mt-2 text-[var(--text-secondary)]">
                        Favorite Classes
                    </p>
                </motion.div>

                {/* Goal Streak */}
                <motion.div
                    whileHover={{ y: -5 }}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                >
                    <motion.div
                        animate={{
                            y: [0, -8, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="mb-4 inline-flex rounded-2xl bg-orange-500/10 p-4"
                    >
                        <FaFire className="text-3xl text-orange-500" />
                    </motion.div>

                    <h3 className="text-4xl font-bold">
                        0
                    </h3>

                    <p className="mt-2 text-[var(--text-secondary)]">
                        Active Streak
                    </p>
                </motion.div>

                {/* Achievements */}
                <motion.div
                    whileHover={{ y: -5 }}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                >
                    <motion.div
                        animate={{
                            y: [0, -8, 0],
                        }}
                        transition={{
                            duration: 3.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="mb-4 inline-flex rounded-2xl bg-yellow-500/10 p-4"
                    >
                        <FaTrophy className="text-3xl text-yellow-500" />
                    </motion.div>

                    <h3 className="text-4xl font-bold">
                        0
                    </h3>

                    <p className="mt-2 text-[var(--text-secondary)]">
                        Achievements
                    </p>
                </motion.div>
            </div>
            
            {/* Welcome Back Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
                <h2 className="text-2xl font-semibold">
                    Welcome Back 👋
                </h2>

                <p className="mt-3 text-[var(--text-secondary)]">
                    Manage your classes, track your progress, and stay
                    committed to your fitness journey with MomentumX.
                </p>
            </motion.div>
        </motion.div>
    );
}