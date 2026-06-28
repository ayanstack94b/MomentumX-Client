"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { motion } from "framer-motion";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";
import Link from "next/link";

const BookedClassesPage = () => {
    const { user, loading: authLoading } = useAuth();
    const email = user?.email;


    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        if (!email) return;

        const fetchBookings =
            async () => {
                try {
                    const { data } = await axiosInstance.get(
                        `/bookings/${email}`
                    );

                    setBookings(data);
                } catch (error) {
                    console.error(error);
                    setBookings([]);
                } finally {
                    setLoading(false);
                }
            };

        fetchBookings();
    }, [email]);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
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
                duration: 0.4,
            }}
            className="relative overflow-hidden p-5"
        >
            {/* Background Glow */}
            <motion.div
                animate={{
                    x: [0, 40, 0],
                    y: [0, -30, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute left-0 top-0 h-72 w-72 rounded-full bg-red-600/10 blur-3xl"
            />

            <motion.div
                animate={{
                    x: [0, -40, 0],
                    y: [0, 30, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-red-500/10 blur-3xl"
            />

            <div className="relative z-10">
                <div className="mb-8">
                    <h1 className="heading-font text-4xl">
                        Booked Classes
                    </h1>

                    <p className="mt-2 text-[var(--text-secondary)]">
                        View all classes you have booked.
                    </p>
                </div>

                {bookings.length === 0 ? (
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
                        <h3 className="text-2xl font-semibold">
                            No Bookings Yet
                        </h3>

                        <p className="mt-2 text-[var(--text-secondary)]">
                            Your booked classes will appear here.
                        </p>
                    </div>
                ) : (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {bookings.map((booking) => (
                                <motion.div
                                    key={booking._id}
                                    whileHover={{ y: -5 }}
                                    className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
                                >
                                    <div className="relative h-56">
                                        <Image
                                            src={booking?.image || "/placeholder.jpg"}
                                            alt={booking?.className || "Booked Class"}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="p-5">

                                        <div className="flex items-center justify-between gap-3">
                                            <h2 className="line-clamp-1 text-xl font-bold">
                                                {booking.className || "Unnamed Class"}
                                            </h2>

                                            <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                                                {booking.paymentStatus || "Booked"}
                                            </span>
                                        </div>

                                        <div className="mt-5 space-y-3 text-sm">

                                            <div className="flex justify-between gap-3 border-b border-white/10 pb-2">
                                                <span className="text-gray-400">
                                                    Trainer
                                                </span>

                                                <span className="text-right font-medium">
                                                    {booking.trainerName || "Not Assigned"}
                                                </span>
                                            </div>

                                            <div className="flex justify-between gap-3 border-b border-white/10 pb-2">
                                                <span className="text-gray-400">
                                                    Schedule
                                                </span>

                                                <span className="text-right font-medium">
                                                    {booking.schedule || "To Be Announced"}
                                                </span>
                                            </div>

                                            <div className="flex justify-between gap-3 border-b border-white/10 pb-2">
                                                <span className="text-gray-400">
                                                    Duration
                                                </span>

                                                <span className="text-right font-medium">
                                                    {booking.duration || "Not Available"}
                                                </span>
                                            </div>

                                            <div className="flex justify-between gap-3 border-b border-white/10 pb-2">
                                                <span className="text-gray-400">
                                                    Category
                                                </span>

                                                <span className="text-right font-medium">
                                                    {booking.category || "General Fitness"}
                                                </span>
                                            </div>

                                            <div className="flex justify-between gap-3 border-b border-white/10 pb-2">
                                                <span className="text-gray-400">
                                                    Price
                                                </span>

                                                <span className="font-semibold text-red-400">
                                                    ₹{booking.price ?? "0"}
                                                </span>
                                            </div>

                                            <div className="flex justify-between gap-3 border-b border-white/10 pb-2">
                                                <span className="text-gray-400">
                                                    Payment Status
                                                </span>

                                                <span className="font-medium capitalize text-green-400">
                                                    {booking.paymentStatus || "Pending"}
                                                </span>
                                            </div>


                                            <div className="flex justify-between gap-3">
                                                <span className="text-gray-400">
                                                    Booked On
                                                </span>

                                                <span className="text-right font-medium">
                                                    {booking.bookedAt
                                                        ? new Date(
                                                            booking.bookedAt
                                                        ).toLocaleDateString()
                                                        : "Not Available"}
                                                </span>
                                            </div>

                                        </div>

                                        <Link
                                            href={booking.classId ? `/classes/${booking.classId}` : "#"}
                                            className="btn mt-6 w-full border-none bg-gradient-to-r from-red-600 to-red-500 text-white"
                                        >
                                            View Class Details
                                        </Link>

                                    </div>
                                </motion.div>
                            ))}
                        </div>
                )}
            </div>
        </motion.div>
    );
};

export default BookedClassesPage;