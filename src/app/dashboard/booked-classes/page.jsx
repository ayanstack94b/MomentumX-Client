"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { motion } from "framer-motion";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const BookedClassesPage = () => {
    const { data: session } = authClient.useSession();

    const email = session?.user?.email;

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!email) return;

        const fetchBookings = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5000/bookings/member/${email}`
                );

                const data = await res.json();

                setBookings(data);
            } catch (error) {
                console.error(error);
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
                                whileHover={{
                                    y: -5,
                                }}
                                className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
                            >
                                <div className="relative h-56">
                                    <Image
                                        src={booking.image}
                                        alt={booking.className}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                        className="object-cover"
                                    />
                                </div>

                                <div className="p-5">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-bold">
                                            {booking.className}
                                        </h2>

                                        <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                                            Booked
                                        </span>
                                    </div>

                                    <div className="mt-4 space-y-2 text-sm">
                                        <p>
                                            <strong>Trainer:</strong>{" "}
                                            {booking.trainerName}
                                        </p>

                                        <p>
                                            <strong>Price:</strong> ₹
                                            {booking.price}
                                        </p>

                                        <p>
                                            <strong>Status:</strong>{" "}
                                            {booking.status}
                                        </p>

                                        <p>
                                            <strong>Booked On:</strong>{" "}
                                            {new Date(
                                                booking.bookedAt
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
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