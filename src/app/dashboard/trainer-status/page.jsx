"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Link from "next/link";

const TrainerStatusPage = () => {
    const { data: session } =
        authClient.useSession();

    const [loading, setLoading] =
        useState(true);

    const [application, setApplication] =
        useState(null);

    useEffect(() => {
        console.log("Session:", session);
        const email = session?.user?.email;


        console.log("Email:", email);
        if (!email) return;

        const fetchApplication =
            async () => {
                try {
                    const res =
                        await fetch(
                            `${process.env.NEXT_PUBLIC_API_URL}/trainer-applications/${email}`
                        );
                    console.log(
                        "Status:",
                        res.status
                    );
                    

                    const text = await res.text();

                    console.log("Response:", text);

                    if (!text) {
                        setApplication(null);
                        return;
                    }

                    const data = JSON.parse(text);

                    setApplication(data);


                    setApplication(data);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };

        fetchApplication();
    }, [session]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!application) {
        return (
            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.95,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.5,
                }}
                className="flex min-h-[50vh] items-center justify-center px-4 py-10"
            >
                <motion.div
                    whileHover={{
                        y: -5,
                        scale: 1.02,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                    }}
                    className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 text-center backdrop-blur-xl"
                >
                    {/* Glow Effects */}
                    <div className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-red-600/10 blur-3xl" />

                    <div className="absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-red-500/10 blur-3xl" />

                    {/* Floating Icon */}
                    <motion.div
                        animate={{
                            y: [0, -6, 0],
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                        }}
                        className="mb-4 text-4xl sm:text-5xl"
                    >
                        🏋️
                    </motion.div>

                    <h2 className="heading-font text-2xl sm:text-3xl font-bold">
                        No Application Found
                    </h2>

                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-gray-400">
                        You haven't applied to become a trainer yet.
                        Submit your application and start your
                        journey as a MomentumX trainer.
                    </p>

                    <motion.div
                        animate={{
                            opacity: [0.4, 1, 0.4],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                        }}
                        className="mt-6 h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-red-600 to-red-400"
                    />
                </motion.div>
            </motion.div>
        );
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
            className="mx-auto max-w-4xl p-5"
        >
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                <h1 className="heading-font text-4xl">
                    Trainer Application
                </h1>

                <p className="mt-2 text-gray-400">
                    Track the progress of
                    your trainer
                    application.
                </p>

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                    <div>
                        <p className="text-sm text-gray-500">
                            Name
                        </p>

                        <h3 className="mt-1 text-lg font-semibold">
                            {application.name}
                        </h3>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Email
                        </p>

                        <h3 className="mt-1 text-lg font-semibold">
                            {application.email}
                        </h3>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Experience
                        </p>

                        <h3 className="mt-1 text-lg font-semibold">
                            {
                                application.experience
                            }
                        </h3>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Specialization
                        </p>

                        <h3 className="mt-1 text-lg font-semibold">
                            {
                                application.specialization
                            }
                        </h3>
                    </div>
                </div>

                <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/50 p-5">
                    <p className="text-sm text-gray-500">
                        Application Status
                    </p>

                    <div className="mt-3">
                        <span
                            className={`rounded-full px-4 py-2 text-sm font-medium ${application.status ===
                                    "approved"
                                    ? "bg-green-500/20 text-green-400"
                                    : application.status ===
                                        "rejected"
                                        ? "bg-red-500/20 text-red-400"
                                        : "bg-yellow-500/20 text-yellow-400"
                                }`}
                        >
                            {application.status}
                        </span>
                        {
                            application.status ===
                            "rejected" &&
                            application.feedback && (
                                <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-5">
                                    <h3 className="font-semibold text-red-400">
                                        Admin Feedback
                                    </h3>

                                    <p className="mt-3 text-sm text-gray-300">
                                        {
                                            application.feedback
                                        }
                                    </p>
                                </div>
                            )
                        }
                        {
                            application.status ===
                            "rejected" && (
                                <Link
                                    href="/dashboard/become-trainer"
                                    className="btn mt-5 border-none bg-red-600 text-white"
                                >
                                    Apply Again
                                </Link>
                            )
                        }
                    </div>
                </div>

                <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/50 p-5">
                    <p className="text-sm text-gray-500">
                        Bio
                    </p>

                    <p className="mt-3 text-gray-300">
                        {application.bio}
                    </p>
                </div>

                <Link
                    href="/dashboard/become-trainer"
                    className={`btn mt-8 ${application.status === "rejected"
                        ? "bg-linear-to-r from-red-600 to-red-500"
                            : "btn-disabled"
                        }`}
                >
                    {application.status === "rejected"
                        ? "Reapply as Trainer"
                        : "Application Locked"}
                </Link>

            </div>
        </motion.div>
    );
};

export default TrainerStatusPage;