"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { authClient } from "@/lib/auth-client";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useRouter } from "next/navigation";
import ApplicationStatusCard from "@/components/dashboard/ApplicationStatusCard";
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";



const BecomeATrainerPage = () => {
    const { data: session } = authClient.useSession();
    
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [userData, setUserData] = useState(null);
    const [application, setApplication] = useState(null);
    const router = useRouter()

    useEffect(() => {

        if (!session?.user?.email)
            return;

        const fetchUser =
            async () => {

                const res =
                    await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/users/${session.user.email}`
                    );

                const data =
                    await res.json();

                setUserData(data);

            };

        fetchUser();

    }, [session]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const form = e.target;

        const userRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/${session.user.email}`
        );

        const user = await userRes.json();

        if (user.role === "admin") {
            return Swal.fire({
                icon: "error",
                title: "Access Denied",
                text: "Admins cannot apply as trainers.",
            });
        }

        if (user.status === "blocked") {
            return Swal.fire({
                icon: "error",
                title: "Account Blocked",
                text: "Blocked users cannot apply as trainers.",
            });

        }

        const applicationData = {
            name:
                session?.user?.name,
            email:
                session?.user?.email,
            image:
                session?.user?.image,

            experience:
                form.experience.value,

            specialization:
                form.specialization.value,

            bio: form.bio.value,

            status: "pending",

            appliedAt:
                new Date().toISOString(),
        };

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/trainer-applications`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify(
                        applicationData
                    ),
                }
            );

            const data = await res.json();

            if (data.insertedId) {
                await Swal.fire({
                    icon: "success",
                    title: "Application Submitted",
                    text: "Your trainer application is pending review.",
                });
                router.push("/dashboard/trainer-status");
            }
        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: "error",
                title:
                    "Submission Failed",
            });
        } finally {
            setLoading(false);
        }

    };

    if (loading) {
        return <LoadingSpinner />;
    }
   
    if (userData?.role === "admin") {
        return (
            <div className="flex min-h-[70vh] items-center justify-center p-5">
                <div className="max-w-lg rounded-3xl border border-red-500/20 bg-red-500/5 p-10 text-center backdrop-blur-xl">

                    <div className="mb-5 flex justify-center">
                        <div className="rounded-full border border-red-500/20 bg-red-500/10 p-5">
                            <FaExclamationTriangle
                                className="text-5xl text-red-500"
                            />
                        </div>
                    </div>

                    <h2 className="heading-font text-4xl text-red-500">
                        Access Denied
                    </h2>

                    <p className="mt-4 text-gray-400">
                        Admin accounts cannot apply to become a trainer.
                    </p>

                    <Link
                        href="/dashboard/admin-overview"
                        className="btn mt-8 border-none bg-gradient-to-r from-red-600 to-red-500 text-white"
                    >
                        Back To Dashboard
                    </Link>

                </div>
            </div>
        );
    }



    if (
        application &&
        application.status ===
        "pending"
    ) {
        return (
            <div className="p-10">
                <h2 className="text-3xl font-bold text-yellow-400">
                    Application Pending
                </h2>
                <ApplicationStatusCard
                    title="Application Pending"
                    description="Your trainer application is waiting for admin review."
                    color="pending"
                />

            </div>
        );
    }

    if (
        application &&
        application.status ===
        "approved"
    ) {
        return (
            <div className="p-10">
                <h2 className="text-3xl font-bold text-green-400">
                    Trainer Approved
                </h2>

                <ApplicationStatusCard
                    title="Trainer Approved"
                    description="You are already a trainer."
                    color="approved"
                />
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
            className="mx-auto max-w-3xl p-5"
        >
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                <h1 className="heading-font text-4xl">
                    Become a Trainer
                </h1>

                <p className="mt-2 text-gray-400">
                    Submit your trainer
                    application for
                    review.
                </p>

                

                <form
                    onSubmit={
                        handleSubmit
                    }
                    className="mt-8 space-y-6"
                >
                    <div>
                        <label className="mb-2 block">
                            Experience
                        </label>

                        <input
                            name="experience"
                            placeholder="3 Years"
                            required
                            className="input w-full border border-white/10 bg-slate-800"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block">
                            Specialization
                        </label>

                        <input
                            name="specialization"
                            placeholder="Strength Training"
                            required
                            className="input w-full border border-white/10 bg-slate-800"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block">
                            Bio
                        </label>

                        <textarea
                            name="bio"
                            rows={5}
                            required
                            className="textarea w-full border border-white/10 bg-slate-800"
                            placeholder="Tell us about your training experience..."
                        />
                    </div>

                    <motion.button
                        whileHover={{
                            scale: 1.03,
                        }}
                        whileTap={{
                            scale: 0.97,
                        }}
                        disabled={
                            loading
                        }
                        type="submit"
                        className="btn border-none bg-gradient-to-r from-red-600 to-red-500 text-white"
                    >
                        {loading
                            ? "Submitting..."
                            : "Apply Now"}
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
};

export default BecomeATrainerPage;