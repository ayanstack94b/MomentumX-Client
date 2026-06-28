"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import Image from "next/image";

import axiosInstance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";

import MemberRoute from "@/components/shared/MemberRoute";

import {
    FaBan,
    FaCalendarCheck,
    FaHeart,
    FaUser,
} from "react-icons/fa";

const MembersOverviewPage = () => {
    const { user } = useAuth();

    const [profile, setProfile] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [trainerApplication, setTrainerApplication] =
        useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        const fetchData = async () => {
            try {
                const [
                    { data: profileData },
                    { data: bookingData },
                    { data: favoriteData },
                    { data: trainerData },
                ] = await Promise.all([
                    axiosInstance.get(
                        `/users/${user.email}`
                    ),

                    axiosInstance.get(
                        `/bookings/${user.email}`
                    ),

                    axiosInstance.get(
                        `/favorites/${user.email}`
                    ),

                    axiosInstance.get(
                        `/trainer-applications/${user.email}`
                    ),
                ]);

                setProfile(profileData);

                setBookings(bookingData);

                setFavorites(favoriteData);

                setTrainerApplication(trainerData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const totalBookedClasses =
        bookings.length;

    const totalFavorites =
        favorites.length;

    const recentBookings = [...bookings]
        .sort(
            (a, b) =>
                new Date(b.createdAt) -
                new Date(a.createdAt)
        )
        .slice(0, 5);

    const recentFavorites = [...favorites]
        .slice(0, 5);

    return (
        <MemberRoute>
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
                            MomentumX Member Dashboard
                        </span>

                        <h1 className="heading-font mt-5 text-5xl">
                            Member Overview
                        </h1>

                        <p className="mt-4 max-w-2xl text-gray-400">
                            View your booked classes, favorite workouts and track
                            your trainer application.
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
                                <FaCalendarCheck className="text-3xl text-red-500" />
                            </div>

                            <div>
                                <p className="text-sm uppercase tracking-wider text-gray-400">
                                    Total Booked Classes
                                </p>

                                <h2 className="mt-1 text-4xl font-bold">
                                    {loading ? (
                                        "..."
                                    ) : (
                                        <CountUp
                                            end={totalBookedClasses}
                                            duration={2}
                                        />
                                    )}
                                </h2>
                            </div>
                        </div>

                        <p className="text-sm text-gray-400">
                            Total classes successfully booked by you.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ y: -5 }}
                        className="rounded-3xl border border-white/10 bg-gradient-to-br from-pink-500/10 to-red-900/10 p-6 backdrop-blur-xl"
                    >
                        <div className="mb-5 flex items-center gap-4">
                            <div className="rounded-2xl bg-pink-500/10 p-4">
                                <FaHeart className="text-3xl text-pink-400" />
                            </div>

                            <div>
                                <p className="text-sm uppercase tracking-wider text-gray-400">
                                    Total Favorites
                                </p>

                                <h2 className="mt-1 text-4xl font-bold">
                                    {loading ? (
                                        "..."
                                    ) : (
                                        <CountUp
                                            end={totalFavorites}
                                            duration={2}
                                        />
                                    )}
                                </h2>
                            </div>
                        </div>

                        <p className="text-sm text-gray-400">
                            Classes you've saved for quick access.
                        </p>
                    </motion.div>
                </div>

                {/* Member Profile */}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                >
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                        <div className="flex justify-center sm:justify-start">
                            {profile?.image ? (
                                <Image
                                    src={profile?.image || "/default-avatar.png"}
                                    alt={profile?.name}
                                    width={110}
                                    height={110}
                                    className="rounded-full border-2 border-red-500 object-cover"
                                />
                            ) : (
                                <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-red-500 bg-white/5">
                                    <FaUser
                                        size={50}
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
                                    User
                                </span>

                                <span
                                    className={`rounded-full px-4 py-2 text-sm font-medium ${trainerApplication?.status ===
                                            "approved"
                                            ? "bg-green-500/10 text-green-400"
                                            : trainerApplication?.status ===
                                                "rejected"
                                                ? "bg-red-500/10 text-red-400"
                                                : "bg-yellow-500/10 text-yellow-400"
                                        }`}
                                >
                                    Trainer Status :{" "}
                                    {trainerApplication?.status ||
                                        "Not Applied"}
                                </span>

                                {
                                    profile?.status === "blocked" && (
                                        <span className="flex animate-pulse items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 shadow-lg shadow-red-500/20">
                                            <FaBan />
                                            Blocked by Admin
                                        </span>
                                    )
                                }

                            </div>

                            {trainerApplication?.status ===
                                "rejected" &&
                                trainerApplication?.feedback && (
                                    <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4">
                                        <h4 className="mb-2 font-semibold text-red-400">
                                            Admin Feedback
                                        </h4>

                                        <p className="text-sm text-gray-300">
                                            {
                                                trainerApplication.feedback
                                            }
                                        </p>
                                    </div>
                                )}
                        </div>
                    </div>
                </motion.div>

                {/* Recent Activity */}

                <div className="grid gap-6 lg:grid-cols-2">

                    {/* Recent Booked Classes */}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                    >
                        <h2 className="mb-5 text-xl font-semibold text-white">
                            Recent Booked Classes
                        </h2>

                        {recentBookings.length === 0 ? (
                            <p className="text-gray-400">
                                You haven't booked any classes yet.
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {recentBookings.map((booking) => (
                                    <div
                                        key={booking?._id}
                                        className="flex items-center justify-between border-b border-white/10 pb-3"
                                    >
                                        <div>
                                            <h3 className="font-medium text-white">
                                                {booking?.className}
                                            </h3>

                                            <p className="mt-1 text-sm text-gray-400">
                                                {booking?.trainerName}
                                            </p>
                                        </div>

                                        <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                                            Booked
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Favorite Classes */}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                    >
                        <h2 className="mb-5 text-xl font-semibold text-white">
                            Favorite Classes
                        </h2>

                        {recentFavorites.length === 0 ? (
                            <p className="text-gray-400">
                                No favorite classes yet.
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {recentFavorites?.map((favorite) => (
                                    <div
                                        key={favorite?._id}
                                        className="flex items-center justify-between border-b border-white/10 pb-3"
                                    >
                                        <div>
                                            <h3 className="font-medium text-white">
                                                {favorite?.className}
                                            </h3>

                                            <p className="mt-1 text-sm text-gray-400">
                                                {favorite?.category}
                                            </p>
                                        </div>

                                        <span className="rounded-full bg-pink-500/10 px-3 py-1 text-xs font-medium text-pink-400">
                                            Favorite
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>

                </div>

            </motion.div>
        </MemberRoute>
    );
};

export default MembersOverviewPage;