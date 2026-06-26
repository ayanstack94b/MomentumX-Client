"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import {FaUsers,FaUserTie,FaDumbbell,FaComments} from "react-icons/fa";
import AdminRoute from "@/components/shared/AdminRoute";

const AdminOverviewPage = () => {

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalTrainers: 0,
        totalClasses: 0,
        totalPosts: 0,
    });

    const [recentUsers, setRecentUsers] = useState([]);
    const [recentPosts, setRecentPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        if (!user || user.role !== "admin") return;
        const fetchData = async () => {
            try {
                const [
                    { data: statsData },
                    { data: usersData },
                    forumsRes,
                ] = await Promise.all([
                    axiosInstance.get("/admin/stats"),
                    axiosInstance.get("/users"),
                    fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/forums?page=1&limit=5`
                    ).then((res) => res.json()),
                ]);

                setStats(statsData);

                setRecentUsers(
                    usersData.slice(-5).reverse()
                );

                setRecentPosts(
                    forumsRes.forums
                );
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        

        fetchData();
    }, [user]);
    const cards = [

        {
            title: "Total Users",
            value: stats.totalUsers,
            icon: <FaUsers />,
            color: "text-blue-400",
            bg: "from-blue-500/10 to-cyan-500/10",
        },

        {
            title: "Total Trainers",
            value: stats.totalTrainers,
            icon: <FaUserTie />,
            color: "text-green-400",
            bg: "from-green-500/10 to-emerald-500/10",
        },

        {
            title: "Total Classes",
            value: stats.totalClasses,
            icon: <FaDumbbell />,
            color: "text-orange-400",
            bg: "from-orange-500/10 to-yellow-500/10",
        },

        {
            title: "Forum Posts",
            value: stats.totalPosts,
            icon: <FaComments />,
            color: "text-purple-400",
            bg: "from-purple-500/10 to-pink-500/10",
        },

    ];

    return (

        <AdminRoute>
            <motion.div
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                className="p-5"
            >

            {/* Header */}

            <div className="mb-8">

                <h1 className="heading-font text-4xl">
                    Admin Overview
                </h1>

                <p className="mt-2 text-gray-400">
                    Monitor platform activity and key statistics.
                </p>

            </div>

            {/* Stats Cards */}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {cards.map(
                    (
                        card,
                        index
                    ) => (

                        <motion.div
                            key={
                                card.title
                            }
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay:
                                    index *
                                    0.1,
                            }}
                            whileHover={{
                                y: -5,
                            }}
                            className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${card.bg} p-6 backdrop-blur-xl`}
                        >

                            {/* Glow */}

                            <motion.div
                                animate={{
                                    scale: [
                                        1,
                                        1.15,
                                        1,
                                    ],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                }}
                                className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/5 blur-3xl"
                            />

                            <div className="relative z-10">

                                <div
                                    className={`mb-4 text-4xl ${card.color}`}
                                >
                                    {
                                        card.icon
                                    }
                                </div>

                                <h3 className="text-sm uppercase tracking-wider text-gray-400">
                                    {
                                        card.title
                                    }
                                </h3>

                                <h2 className="mt-2 text-4xl font-bold text-white">

                                    {loading
                                        ? "..."
                                        : card.value}

                                </h2>

                            </div>

                        </motion.div>

                    )
                )}

            </div>

            {/* Recent Activity */}

            <div className="mt-10 grid gap-6 lg:grid-cols-2">

                {/* Recent Users */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                >

                    <h2 className="mb-5 text-xl font-semibold text-white">
                        Recent Users
                    </h2>

                    <div className="space-y-4">

                        {recentUsers.map(
                            (user) => (

                                <div
                                    key={user._id}
                                    className="flex items-center justify-between border-b border-white/5 pb-3"
                                >

                                    <div>

                                        <h3 className="font-medium text-white">
                                            {user.name}
                                        </h3>

                                        <p className="text-sm text-gray-400">
                                            {user.email}
                                        </p>

                                    </div>

                                    <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-400">
                                        {user.role}
                                    </span>

                                </div>

                            )
                        )}

                    </div>

                </motion.div>

                {/* Recent Forum Posts */}

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
                        delay: 0.1,
                    }}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                >

                    <h2 className="mb-5 text-xl font-semibold text-white">
                        Recent Forum Posts
                    </h2>

                    <div className="space-y-4">

                        {recentPosts.map(
                            (post) => (

                                <div
                                    key={post._id}
                                    className="border-b border-white/5 pb-3"
                                >

                                    <h3 className="font-medium text-white">
                                        {post.title}
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-400">
                                        {post.authorName}
                                    </p>

                                </div>

                            )
                        )}

                    </div>

                </motion.div>

            </div>

            </motion.div>
        </AdminRoute>

    );

};

export default AdminOverviewPage;