"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";

const TrainerStatusPage = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [application, setApplication] = useState(null);

    const isTrainer = user?.role === "trainer";
    const isApproved = application?.status === "approved";
    const isRejected = application?.status === "rejected";
    const isPending = application?.status === "pending";
    const isDemoted =
        !isTrainer && application?.status === "approved";

    useEffect(() => {

        const email = user?.email;


        console.log("Email:", email);
        if (!email) return;

        const fetchApplication =
            async () => {
                try {
                    const { data } = await axiosInstance.get(
                        `/trainer-applications/${email}`
                    );

                    setApplication(data);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };

        fetchApplication();
    }, [user?.email]);

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

                    <h1 className="heading-font text-4xl">
                        Trainer Journey
                    </h1>

                    <Link
                        href="/dashboard/become-trainer"
                        className="btn mt-8 border-none bg-gradient-to-r from-red-600 to-red-500 text-white"
                    >
                        Apply to Become a Trainer
                    </Link>

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
                    Trainer Status
                </h1>

                <p className="mt-2 text-gray-400">
                    Track the progress of
                    your trainer
                    Status.
                </p>

                {!isTrainer && (
                    <>
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
                    </>)
                }
                <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/50 p-6">

                    <p className="text-sm text-gray-500">
                        Current Status
                    </p>

                    {isTrainer ? (
                        <>
                            <span className="mt-4 inline-block rounded-full bg-green-500/20 px-4 py-2 text-green-400">
                                🟢 VERIFIED TRAINER
                            </span>

                            <p className="mt-5 text-gray-300">
                                Congratulations!

                                Your trainer application has been approved.

                                You now have access to create classes, manage students and contribute to the community forum.
                                
                            </p>

                            <div className="mt-6 flex flex-col gap-4 sm:flex-row">

                             
                                <div className="mt-8 rounded-2xl border border-green-500/20 bg-green-500/10 p-5">

                                    <h3 className="text-xl font-semibold text-green-400">
                                        Quick Actions
                                    </h3>

                                    <div className="mt-5 grid gap-4 grid-cols-1 sm:grid-cols-2">

                                        <Link
                                            href="/dashboard/add-class"
                                            className="btn border-none bg-gradient-to-r from-red-600 to-red-500 text-white"
                                        >
                                            Create New Class
                                        </Link>

                                        <Link
                                            href="/dashboard/trainer-overview"
                                            className="btn border-none bg-gradient-to-r from-green-600 to-green-500 text-white"
                                        >
                                            Go to Dashboard
                                        </Link>

                                        <Link
                                            href="/dashboard/my-classes"
                                            className="btn border-none bg-gradient-to-r from-red-600 to-red-500 text-white"
                                        >
                                            My Classes
                                        </Link>

                                        <Link
                                            href="/dashboard/my-forum-posts"
                                            className="btn border-none bg-gradient-to-r from-red-600 to-red-500 text-white"
                                        >
                                            Community Posts
                                        </Link>

                                    </div>

                                </div>

                            </div>
                        </>
                    ) : isPending ? (
                        <>
                            <span className="mt-4 inline-block rounded-full bg-yellow-500/20 px-4 py-2 text-yellow-400">
                                🟡 UNDER REVIEW
                            </span>

                            <p className="mt-5 leading-7 text-gray-300">
                                Your trainer application has been submitted successfully.
                                <br />
                                Our admin team is reviewing your profile.
                                <br />
                                Estimated review time: <span className="text-yellow-400">24–48 Hours</span>.
                            </p>
                                <p className="mt-4 text-sm text-gray-500">
                                    You'll receive an update once your application has been reviewed.
                                </p>
                        </>
                    ) : isRejected ? (
                        <>
                            <span className="mt-4 inline-block rounded-full bg-red-500/20 px-4 py-2 text-red-400">
                                🔴 APPLICATION REJECTED
                            </span>

                            <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-5">
                                <h3 className="text-lg font-semibold text-red-400">
                                    Application Rejected
                                </h3>
                                <p className="mt-4 text-red-300">
                                    Unfortunately your application was not approved.
                                </p>
                                <p className="mt-4 leading-7 text-gray-300">
                                    {application.feedback || "No feedback provided."}
                                </p>
                            </div>
                                    <p className="mt-4 text-sm text-gray-400">
                                        Improve your profile based on the feedback above and submit a new application.
                                    </p>
                            <Link
                                href="/dashboard/become-trainer"
                                className="btn mt-6 border-none bg-gradient-to-r from-red-600 to-red-500 text-white"
                            >
                                Apply Again
                            </Link>
                        </>
                    ) : isDemoted ? (
                        <>
                            <span className="mt-4 inline-block rounded-full bg-orange-500/20 px-4 py-2 text-orange-400">
                                🟠 TRAINER ROLE REMOVED
                            </span>

                            <p className="mt-5 text-gray-300">
                                Your trainer role has been removed by an administrator.

                                You can submit a new application whenever you're ready.
                            </p>
                                        {
                                            application.feedback && (
                                                <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4">

                                                    <h4 className="font-semibold text-red-400">
                                                        Admin Feedback
                                                    </h4>

                                                    <p className="mt-2 text-gray-300">
                                                        {application.feedback}
                                                    </p>

                                                </div>
                                            )
                                        }

                                        <p className="mt-4 text-sm text-gray-400">
                                            You may apply again after addressing the feedback above.
                                        </p>

                            <Link
                                href="/dashboard/become-trainer"
                                className="btn mt-6 border-none bg-gradient-to-r from-red-600 to-red-500 text-white"
                            >
                                Apply Again
                            </Link>
                        </>
                    ) : (
                        <span className="mt-4 inline-block rounded-full bg-gray-500/20 px-4 py-2 text-gray-400">
                            No Application
                        </span>
                    )}

                </div>
                {!isTrainer && (
                <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/50 p-5">
                    <p className="text-sm text-gray-500">
                        Bio
                    </p>

                    <p className="mt-3 text-gray-300">
                        {application.bio}
                    </p>
                </div>)
                }


            </div>
        </motion.div>
    );
};

export default TrainerStatusPage;