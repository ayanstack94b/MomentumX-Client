"use client"
import { authClient } from '@/lib/auth-client';
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { motion } from "framer-motion";


const MyClassesPage = () => {
    const { data: session } = authClient.useSession();
    const email = session?.user?.email;

    const [classes, setClasses] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!email) return;

        const fetchClasses = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5000/classes/trainer/${email}`
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
    }, [email]);


    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 p-5"
        >
            <div>
                <h1 className="heading-font text-4xl">
                    My Classes
                </h1>

                <p className="mt-2 text-[var(--text-secondary)]">
                    Manage all classes created by you.
                </p>
            </div>

            {classes.length === 0 ? (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
                    <h3 className="text-2xl font-semibold">
                        No Classes Found
                    </h3>

                    <p className="mt-2 text-[var(--text-secondary)]">
                        Create your first fitness class.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {classes.map((item) => (
                        <motion.div
                            key={item._id}
                            whileHover={{
                                y: -5,
                            }}
                            className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
                        >
                            <div className="relative h-56">
                                <Image
                                    src={item.image}
                                    alt={item.className}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="p-5">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold">
                                        {item.className}
                                    </h2>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium ${item.status === "approved"
                                                ? "bg-green-500/20 text-green-400"
                                                : "bg-yellow-500/20 text-yellow-400"
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </div>

                                <div className="mt-4 space-y-2 text-sm">
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
                                        <strong>Price:</strong> ₹
                                        {item.price}
                                    </p>
                                </div>

                                <div className="mt-5 flex gap-3">
                                    <button className="btn btn-sm flex-1 bg-red-600 text-white border-none hover:bg-red-700">
                                        Update
                                    </button>

                                    <button className="btn btn-sm flex-1 btn-outline border-red-500 text-red-500">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default MyClassesPage;