"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import {
    FaDumbbell,
    FaHeart,
    FaFire,
    FaTrophy,
    FaUsers,
    FaComments,
    FaChartLine,
} from "react-icons/fa";


export default function DashboardPage() {

    const [users, setUsers] = useState([]);
    const [forums, setForums] = useState([]);
    const [classes, setClasses] = useState([]);
    const [applications, setApplications] = useState([]);

    // fetching all needed data
    useEffect(() => {

        const fetchDashboardData =
            async () => {

                try {

                    const [
                        usersRes,
                        forumsRes,
                        classesRes,
                        applicationsRes,
                    ] = await Promise.all([
                        fetch(
                            "http://localhost:5000/users"
                        ),
                        fetch(
                            "http://localhost:5000/forums"
                        ),
                        fetch(
                            "http://localhost:5000/classes"
                        ),
                        fetch(
                            "http://localhost:5000/trainer-applications"
                        ),
                    ]);

                    const usersData =
                        await usersRes.json();

                    const forumsData =
                        await forumsRes.json();

                    const classesData =
                        await classesRes.json();

                    const applicationsData =
                        await applicationsRes.json();

                    setUsers(
                        usersData
                    );

                    setForums(
                        forumsData
                    );

                    setClasses(
                        classesData.classes
                    );

                    setApplications(
                        applicationsData
                    );

                } catch (error) {

                    console.error(
                        error
                    );

                }

            };

        fetchDashboardData();

    }, []);

    // Real stats
    const totalUsers = users.length;

    const totalPosts = forums.length;

    const totalClasses = classes.length;

    const totalBookings = classes.reduce(
        (total, item) =>
            total +
            (item.bookingCount || 0),
        0
    );

    // Platform Health data
    const approvedClasses = classes.filter(
        (item) =>
            item.status ===
            "approved"
    ).length;

    const classApprovalRate = totalClasses
        ? Math.round(
            (approvedClasses /
                totalClasses) *
            100
        )
        : 0;

    const communityEngagement = totalUsers
        ? Math.min(
            Math.round(
                (totalPosts /
                    totalUsers) *
                100
            ),
            100
        )
        : 0;

    const bookingActivity = totalClasses
        ? Math.min(
            Math.round(
                (totalBookings /
                    totalClasses) *
                10
            ),
            100
        )
        : 0;

    const platformHealth = Math.round(
        (
            classApprovalRate +
            communityEngagement +
            bookingActivity
        ) / 3
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 p-5 min-h-screen"
        >
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-red-950/40 via-black to-red-950/40 p-8"
                >
                    <motion.div
                        animate={{
                            x: [0, 50, 0],
                            y: [0, -20, 0],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-red-600/10 blur-3xl"
                    />

                    <div className="relative z-10">
                        <span className="rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400">
                            MomentumX Dashboard
                        </span>

                        <h1 className="heading-font mt-5 text-5xl">
                            Welcome Back 👋
                        </h1>

                        <p className="mt-4 max-w-2xl text-gray-400">
                            Track your fitness journey, manage classes,
                            monitor activity and stay consistent.
                        </p>
                    </div>
                </motion.div>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {/* Community Members */}
                <motion.div
                    whileHover={{ y: -8, scale: 1.02, }}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl transition-all duration-500 hover:border-red-500/20"
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
                        <FaUsers className="text-3xl text-cyan-400" />
                    </motion.div>

                    <h3 className="text-4xl font-bold">
                        <CountUp
                            end={totalUsers}
                            duration={2}
                        />
                    </h3>

                    <p className="mt-2 text-[var(--text-secondary)]">
                        Community Members
                    </p>
                </motion.div>

                {/* Available Classes */}
                <motion.div
                    whileHover={{ y: -8, scale: 1.02, }}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl transition-all duration-500 hover:border-red-500/20"
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
                        <FaDumbbell className="text-3xl text-red-500" />
                    </motion.div>
                    <h3 className="text-4xl font-bold">
                        <CountUp
                            end={totalClasses}
                            duration={2}
                        />
                    </h3>
                    <p className="mt-2 text-[var(--text-secondary)]">
                        Available Classes
                    </p>
                </motion.div>

                {/* Forum Posts */}
                <motion.div
                    whileHover={{ y: -8, scale: 1.02, }}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl transition-all duration-500 hover:border-red-500/20"
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
                        <FaComments className="text-3xl text-purple-400" />
                    </motion.div>
                    <h3 className="text-4xl font-bold">
                        <CountUp
                            end={totalPosts}
                            duration={2}
                        />
                    </h3>

                    <p className="mt-2 text-[var(--text-secondary)]">
                        All posts
                    </p>
                </motion.div>

                {/* Total Bookings */}
                <motion.div
                    whileHover={{ y: -8, scale: 1.02, }}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl transition-all duration-500 hover:border-red-500/20"
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
                        <FaChartLine className="text-3xl text-green-400" />
                    </motion.div>
                    <h3 className="text-4xl font-bold">
                        <CountUp
                            end={totalBookings}
                            duration={2}
                        />
                    </h3>

                    <p className="mt-2 text-[var(--text-secondary)]">
                        Bookings
                    </p>
                </motion.div>
            </div>
            {/* ------------------------------Platform Health section -----------------------------*/}

            {/* Platform Analytics */}
            <motion.div
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    delay: 0.5,
                }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl transition-all duration-500 hover:border-red-500/20"
            >

                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100" />

                <div className="relative z-10">

                    <div className="mb-8 flex items-center justify-between">
                        <h2 className="text-2xl font-semibold">
                            Platform Analytics
                        </h2>

                        <span className="rounded-full bg-red-500/10 px-3 py-1 text-sm text-red-400">
                            Live Overview
                        </span>
                    </div>

                    <div className="grid gap-10 lg:grid-cols-2">

                        {/* Left Side */}
                        <div className="space-y-6">

                            {/* Class Approval */}
                            <div>
                                <div className="mb-2 flex justify-between">
                                    <span>
                                        Class Approval Rate
                                    </span>

                                    <span>
                                        {classApprovalRate}%
                                    </span>
                                </div>

                                <div className="h-3 rounded-full bg-white/10">
                                    <motion.div
                                        initial={{
                                            width: 0,
                                        }}
                                        animate={{
                                            width: `${classApprovalRate}%`,
                                        }}
                                        transition={{
                                            duration: 1.5,
                                        }}
                                        className="h-full rounded-full bg-gradient-to-r from-red-600 to-red-400"
                                    />
                                </div>
                            </div>

                            {/* Community */}
                            <div>
                                <div className="mb-2 flex justify-between">
                                    <span>
                                        Community Engagement
                                    </span>

                                    <span>
                                        {communityEngagement}%
                                    </span>
                                </div>

                                <div className="h-3 rounded-full bg-white/10">
                                    <motion.div
                                        initial={{
                                            width: 0,
                                        }}
                                        animate={{
                                            width: `${communityEngagement}%`,
                                        }}
                                        transition={{
                                            duration: 1.8,
                                        }}
                                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-400"
                                    />
                                </div>
                            </div>

                            {/* Booking */}
                            <div>
                                <div className="mb-2 flex justify-between">
                                    <span>
                                        Booking Activity
                                    </span>

                                    <span>
                                        {bookingActivity}%
                                    </span>
                                </div>

                                <div className="h-3 rounded-full bg-white/10">
                                    <motion.div
                                        initial={{
                                            width: 0,
                                        }}
                                        animate={{
                                            width: `${bookingActivity}%`,
                                        }}
                                        transition={{
                                            duration: 2,
                                        }}
                                        className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400"
                                    />
                                </div>
                            </div>

                        </div>

                        {/* Right Side Circular Progress */}
                        <div className="flex items-center justify-center">

                            <div className="relative flex h-52 w-52 items-center justify-center">

                                <svg
                                    className="absolute h-full w-full -rotate-90"
                                    viewBox="0 0 100 100"
                                >
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="42"
                                        stroke="rgba(255,255,255,0.1)"
                                        strokeWidth="8"
                                        fill="none"
                                    />

                                    <motion.circle
                                        cx="50"
                                        cy="50"
                                        r="42"
                                        stroke="url(#gradient)"
                                        strokeWidth="8"
                                        fill="none"
                                        strokeLinecap="round"
                                        initial={{
                                            pathLength: 0,
                                        }}
                                        animate={{
                                            pathLength:
                                                platformHealth / 100,
                                        }}
                                        transition={{
                                            duration: 2,
                                        }}
                                        style={{
                                            pathLength:
                                                platformHealth / 100,
                                        }}
                                    />

                                    <defs>
                                        <linearGradient
                                            id="gradient"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor="#ef4444"
                                            />

                                            <stop
                                                offset="100%"
                                                stopColor="#22c55e"
                                            />
                                        </linearGradient>
                                    </defs>

                                </svg>

                                <div className="text-center">
                                    <h3 className="text-5xl font-bold">
                                        {platformHealth}%
                                    </h3>

                                    <p className="mt-2 text-sm text-gray-400">
                                        Platform Health
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </motion.div>

        </motion.div>
    );
}