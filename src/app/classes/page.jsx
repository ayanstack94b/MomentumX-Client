"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const ClassesPage = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const res = await fetch(
                    "http://localhost:5000/classes"
                );

                const data = await res.json();

                setClasses(data);
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
        <section className="relative overflow-hidden py-20">
            {/* Animated Background */}
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

            <div className="container mx-auto px-4">
                {/* Heading */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    className="mb-12 text-center"
                >
                    <h1 className="heading-font text-5xl">
                        Fitness Classes
                    </h1>

                    <p className="mt-4 text-gray-400">
                        Explore our trainer-led fitness programs.
                    </p>
                </motion.div>

                {classes.length === 0 ? (
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
                        <h3 className="text-2xl font-semibold">
                            No Classes Available
                        </h3>

                        <p className="mt-2 text-gray-400">
                            New fitness programs will appear here soon.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {classes.map((item, index) => (
                            <motion.div
                                key={item._id}
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    delay: index * 0.1,
                                }}
                                viewport={{
                                    once: true,
                                }}
                                whileHover={{
                                    y: -8,
                                }}
                                className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
                            >
                                <div className="relative h-60">
                                    <Image
                                        src={item.image}
                                        alt={item.className}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover"
                                    />
                                </div>

                                <div className="p-6">
                                    <span className="rounded-full bg-red-600/20 px-3 py-1 text-sm text-red-400">
                                        {item.category}
                                    </span>

                                    <h2 className="mt-4 text-2xl font-bold">
                                        {item.className}
                                    </h2>

                                    <div className="mt-4 space-y-2 text-sm text-gray-400">
                                        <p>
                                            Difficulty: {item.difficulty}
                                        </p>

                                        <p>
                                            Trainer: {item.trainerName}
                                        </p>

                                        <p>
                                            Duration: {item.duration}
                                        </p>

                                        <p>
                                            Bookings: {item.bookingCount}
                                        </p>

                                        <p>
                                            Fee: ₹{item.price}
                                        </p>
                                    </div>

                                    <Link
                                        href={`/classes/${item._id}`}
                                        className="btn mt-6 w-full border-none bg-red-600 text-white hover:bg-red-700"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ClassesPage;