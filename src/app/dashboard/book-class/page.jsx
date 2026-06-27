"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PrivateRoute from "@/components/shared/PrivateRoute";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function BookClassPage() {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalClasses, setTotalClasses] = useState(0);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/classes`
                );

                const data = await res.json();

                setClasses(data.classes);
                setTotalClasses(data.total);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchClasses();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <PrivateRoute>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden p-5"
            >
                {/* Background Blob 1 */}
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

                {/* Background Blob 2 */}
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
                    <div className="mb-10">
                        <h1 className="heading-font text-4xl">
                            Book a Fitness Class
                        </h1>

                        <p className="mt-2 text-[var(--text-secondary)]">
                            Explore trainer-led fitness programs and reserve your spot.
                        </p>
                    </div>

                    {classes.length === 0 ? (
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
                            <h3 className="text-2xl font-semibold">
                                No Classes Available
                            </h3>

                            <p className="mt-2 text-[var(--text-secondary)]">
                                New fitness classes will appear here soon.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {classes.map((item) => (
                                <motion.div
                                    key={item._id}
                                    whileHover={{
                                        y: -6,
                                    }}
                                    className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
                                >
                                    <div className="relative h-56">
                                        <Image
                                            src={item?.image}
                                            alt={item?.className}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="p-5">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-xl font-bold">
                                                {item.className}
                                            </h2>

                                            <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                                                Available
                                            </span>
                                        </div>

                                        <div className="mt-4 space-y-2 text-sm">
                                            <p>
                                                <strong>Trainer:</strong>{" "}
                                                {item.trainerName}
                                            </p>

                                            <p>
                                                <strong>Category:</strong>{" "}
                                                {item.category}
                                            </p>

                                            <p>
                                                <strong>Difficulty:</strong>{" "}
                                                {item.difficulty}
                                            </p>

                                            <p>
                                                <strong>Duration:</strong>{" "}
                                                {item.duration}
                                            </p>

                                            <p>
                                                <strong>Fee:</strong> ₹
                                                {item.price}
                                            </p>
                                        </div>

                                        <Link
                                            href={`/classes/${item._id}`}
                                            className="btn mt-5 w-full border-none bg-gradient-to-r from-red-600 to-red-500 text-white"
                                        >
                                            View & Book
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        </PrivateRoute>
    );
}