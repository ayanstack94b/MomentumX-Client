"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { authClient } from "@/lib/auth-client";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useRouter } from "next/navigation";


const BecomeATrainer = () => {
    const { data: session } = authClient.useSession();

    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [userData, setUserData] = useState(null);
    const [application, setApplication] = useState(null);

    const email = session?.user?.email;


    useEffect(() => {

        if (
            application &&
            application.status !==
            "rejected"
        ) {
            router.push(
                "/dashboard/trainer-status"
            );
        }

    }, [application, router]);


    useEffect(() => {
        if (!email) return;

        const fetchApplication = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/trainer-applications/${email}`
                );

                const data = await res.json();

                console.log("Application:", data);

                setApplication(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchApplication();
    }, [email]);

    // users email fetch
    useEffect(() => {

        if (!email) return;

        const fetchUser =
            async () => {

                try {

                    const res =
                        await fetch(
                            `${process.env.NEXT_PUBLIC_API_URL}/users/${email}`
                        );

                    const data =
                        await res.json();

                    setUserData(
                        data
                    );

                } catch (error) {

                    console.error(
                        error
                    );

                }

            };

        fetchUser();

    }, [email]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            userData?.role ===
            "admin"
        ) {
            return Swal.fire({
                icon: "error",
                title:
                    "Access Denied",
                text:
                    "Admins cannot apply as trainers.",
            });
        }

        if (
            userData?.status ===
            "blocked"
        ) {
            return Swal.fire({
                icon: "error",
                title:
                    "Account Blocked",
                text:
                    "Blocked users cannot apply as trainers.",
            });
        }


        setSubmitting(true);

        const form = e.target;

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

            bio:
                form.bio.value,

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

            const data =
                await res.json();

            if (data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title:
                        "Application Submitted",
                    text:
                        "Your application is pending review.",
                });

                setApplication(
                    applicationData
                );
            }
        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: "error",
                title:
                    "Submission Failed",
            });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (application) {
        return (
            <section className="mx-auto max-w-4xl p-5">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                    <h1 className="heading-font text-4xl">
                        Trainer Application
                    </h1>

                    <p className="mt-4 text-lg">
                        Status:
                        <span className="ml-2 font-semibold text-yellow-500">
                            {application.status}
                        </span>
                    </p>

                    <p className="mt-4 text-gray-400">
                        Your application
                        has already been
                        submitted and is
                        waiting for admin
                        review.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="mx-auto max-w-4xl p-5">
            <motion.div
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
            >
                <h1 className="heading-font text-4xl">
                    Become A Trainer
                </h1>

                <p className="mt-3 text-gray-400">
                    Submit your trainer
                    application and join
                    the MomentumX team.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-6"
                >
                    <div>
                        <label className="mb-2 block">
                            Experience
                        </label>

                        <input
                            name="experience"
                            required
                            placeholder="3 Years"
                            className="input w-full border border-white/10 bg-slate-800"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block">
                            Specialization
                        </label>

                        <input
                            name="specialization"
                            required
                            placeholder="Strength Training"
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
                            placeholder="Tell us about your training experience..."
                            className="textarea w-full border border-white/10 bg-slate-800"
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
                            submitting
                        }
                        type="submit"
                        className="btn border-none bg-gradient-to-r from-red-600 to-red-500 text-white"
                    >
                        {submitting
                            ? "Submitting..."
                            : "Apply Now"}
                    </motion.button>
                </form>
            </motion.div>
        </section>
    );
};

export default BecomeATrainer;