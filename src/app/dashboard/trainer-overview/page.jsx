"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";


import {
    FaDumbbell,
    FaUsers,
    FaUserTie
} from "react-icons/fa";
import TrainerRoute from "@/components/shared/TrainerRoute";

export default function TrainerOverviewPage() {
    const { user } = useAuth();

    const [profile, setProfile] = useState(null);
    const [classes, setClasses] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        const fetchData = async () => {
            try {
                const [
                    { data: profileData },
                    { data: trainerClasses },
                ] = await Promise.all([
                    axiosInstance.get(`/users/${user.email}`),
                    axiosInstance.get(
                        `/classes/trainer/${user.email}`
                    ),
                ]);

                setProfile(profileData);

                setClasses(trainerClasses);

                try {
                    const forumRes = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/forums`
                    );

                    const forumData = await forumRes.json();

                    const myPosts =
                        forumData.forums?.filter(
                            (post) =>
                                post?.authorEmail ===
                                user?.email
                        ) || [];

                    setPosts(myPosts);
                } catch (err) {
                    console.error(err);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const totalClassesCreated = classes.length;

    const totalStudentsEnrolled = classes.reduce(
        (total, item) =>
            total + (item?.bookingCount || 0),
        0
    );

    const recentClasses = [...classes]
        .sort(
            (a, b) =>
                new Date(b.createdAt) -
                new Date(a.createdAt)
        )
        .slice(0, 5);

    const recentPosts = [...posts]
        .sort(
            (a, b) =>
                new Date(b.createdAt) -
                new Date(a.createdAt)
        )
        .slice(0, 5);

    return (
        <TrainerRoute>
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
                    duration: 0.5,
                }}
                className="space-y-8 p-5"
            >
                {/* Hero */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
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
                            MomentumX Trainer Dashboard
                        </span>

                        <h1 className="heading-font mt-5 text-5xl">
                            Trainer Overview
                        </h1>

                        <p className="mt-4 max-w-2xl text-gray-400">
                            Manage your fitness
                            classes, monitor student
                            enrollments and track
                            your recent activity.
                        </p>
                    </div>
                </motion.div>

                {/* Statistics Cards */}

                <div className="grid gap-6 md:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        whileHover={{ y: -5 }}
                        className="rounded-3xl border border-white/10 bg-gradient-to-br from-red-500/10 to-red-900/10 p-6 backdrop-blur-xl"
                    >
                        <div className="mb-5 flex items-center gap-4">
                            <div className="rounded-2xl bg-red-500/10 p-4">
                                <FaDumbbell className="text-3xl text-red-500" />
                            </div>

                            <div>
                                <p className="text-sm uppercase tracking-wider text-gray-400">
                                    Total Classes Created
                                </p>

                                <h2 className="mt-1 text-4xl font-bold">
                                    {loading ? (
                                        "..."
                                    ) : (
                                        <CountUp
                                            end={totalClassesCreated}
                                            duration={2}
                                        />
                                    )}
                                </h2>
                            </div>
                        </div>

                        <p className="text-sm text-gray-400">
                            All fitness classes created by you.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ y: -5 }}
                        className="rounded-3xl border border-white/10 bg-gradient-to-br from-green-500/10 to-emerald-900/10 p-6 backdrop-blur-xl"
                    >
                        <div className="mb-5 flex items-center gap-4">
                            <div className="rounded-2xl bg-green-500/10 p-4">
                                <FaUsers className="text-3xl text-green-400" />
                            </div>

                            <div>
                                <p className="text-sm uppercase tracking-wider text-gray-400">
                                    Total Students Enrolled
                                </p>

                                <h2 className="mt-1 text-4xl font-bold">
                                    {loading ? (
                                        "..."
                                    ) : (
                                        <CountUp
                                            end={totalStudentsEnrolled}
                                            duration={2}
                                        />
                                    )}
                                </h2>
                            </div>
                        </div>

                        <p className="text-sm text-gray-400">
                            Total students enrolled across your classes.
                        </p>
                    </motion.div>
                </div>

                {/* Trainer Profile */}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                >
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                        <div className="flex justify-center sm:justify-start">
                            {profile?.image ? (
                                <img
                                    src={profile?.image}
                                    alt={profile?.name}
                                    className="h-28 w-28 rounded-full border-2 border-red-500 object-cover"
                                />
                            ) : (
                                <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-red-500 bg-white/5">
                                    <FaUserTie
                                        size={55}
                                        className="text-red-500"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="min-w-0 flex-1 text-center sm:text-left">
                            <h2 className="break-words text-3xl font-semibold text-white">
                                {profile?.name}
                            </h2>

                            <p className="mt-2 break-all text-gray-400">
                                {profile?.email}
                            </p>

                            <div className="mt-5 flex flex-wrap justify-center gap-3 sm:justify-start">
                                <span className="rounded-full bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400">
                                    Trainer
                                </span>

                                <span className="rounded-full bg-white/5 px-4 py-2 text-sm text-gray-300">
                                    Fitness Coach
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Recent Activity */}

                <div className="grid gap-6 lg:grid-cols-2">

                    {/* Recent Classes */}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                    >
                        <h2 className="mb-5 text-xl font-semibold text-white">
                            My Recent Classes
                        </h2>

                        {recentClasses?.length === 0 ? (
                            <p className="text-gray-400">
                                No classes created yet.
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {recentClasses?.map((item) => (
                                    <div
                                        key={item?._id}
                                        className="flex items-center justify-between border-b border-white/10 pb-3"
                                    >
                                        <div>
                                            <h3 className="font-medium text-white">
                                                {item?.className}
                                            </h3>

                                            <p className="mt-1 text-sm text-gray-400">
                                                {item?.category}
                                            </p>
                                        </div>

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${item?.status === "approved"
                                                    ? "bg-green-500/10 text-green-400"
                                                    : "bg-yellow-500/10 text-yellow-400"
                                                }`}
                                        >
                                            {item?.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Recent Forum Posts */}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                    >
                        <h2 className="mb-5 text-xl font-semibold text-white">
                            My Recent Forum Posts
                        </h2>

                        {recentPosts.length === 0 ? (
                            <p className="text-gray-400">
                                No forum posts found.
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {recentPosts.map((post) => (
                                    <div
                                        key={post?._id}
                                        className="border-b border-white/10 pb-3"
                                    >
                                        <h3 className="font-medium text-white">
                                            {post?.title}
                                        </h3>

                                        <p className="mt-1 text-sm text-gray-400">
                                            {new Date(
                                                post?.createdAt
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>

                </div>

            </motion.div>
        </TrainerRoute>
    );
}


