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
                            `http://localhost:5000/trainer-applications/${email}`
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
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
                    <h2 className="text-2xl font-bold">
                        No Application Found
                    </h2>

                    <p className="mt-3 text-gray-400">
                        You have not applied
                        to become a trainer
                        yet.
                    </p>
                </div>
            </div>
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