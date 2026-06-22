"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { authClient } from "@/lib/auth-client";

const PaymentPage = () => {
    const { id } = useParams();

    const router = useRouter();

    const { data: session } =
        authClient.useSession();

    const [loading, setLoading] =
        useState(true);

    const [classData, setClassData] =
        useState(null);

    useEffect(() => {
        const fetchClass =
            async () => {
                try {
                    const res =
                        await fetch(
                            `http://localhost:5000/classes/${id}`
                        );

                    const data =
                        await res.json();

                    setClassData(
                        data
                    );
                } catch (error) {
                    console.error(
                        error
                    );
                } finally {
                    setLoading(
                        false
                    );
                }
            };

        if (id) {
            fetchClass();
        }
    }, [id]);

    const handlePayment = async () => {
            const bookingData = {
                classId:
                    classData._id,

                className:
                    classData.className,

                image:
                    classData.image,

                trainerName:
                    classData.trainerName,

                trainerEmail:
                    classData.trainerEmail,

                schedule:
                    classData.schedule,

                duration:
                    classData.duration,

                category:
                    classData.category,

                memberName:
                    session?.user
                        ?.name,

                memberEmail:
                    session?.user
                        ?.email,

                price:
                    classData.price,

                status:
                    "paid",

                bookedAt:
                    new Date().toISOString(),
            };

            try {
                const res =
                    await fetch(
                        "http://localhost:5000/bookings",
                        {
                            method:
                                "POST",

                            headers:
                            {
                                "Content-Type":
                                    "application/json",
                            },

                            body: JSON.stringify(
                                bookingData
                            ),
                        }
                    );

                const result =
                    await res.json();

                if (
                    result.insertedId
                ) {
                    await Swal.fire(
                        {
                            icon: "success",

                            title:
                                "Payment Successful",

                            text: "Your class has been booked successfully.",
                        }
                    );

                    router.push(
                        "/dashboard/booked-classes"
                    );
                }
            } catch (error) {
                console.error(
                    error
                );

                Swal.fire({
                    icon: "error",

                    title:
                        "Payment Failed",

                    text: "Something went wrong.",
                });
            }
        };

    if (
        loading ||
        !classData
    ) {
        return (
            <LoadingSpinner />
        );
    }

    return (
        <section className="relative overflow-hidden py-20">
            <motion.div
                animate={{
                    x: [0, 40, 0],
                    y: [0, -30, 0],
                }}
                transition={{
                    duration: 12,
                    repeat:
                        Infinity,
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
                    repeat:
                        Infinity,
                    ease: "linear",
                }}
                className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-red-500/10 blur-3xl"
            />

            <div className="container relative z-10 mx-auto px-4">
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
                >
                    <div className="relative h-[350px]">
                        <Image
                            src={
                                classData.image
                            }
                            alt={
                                classData.className
                            }
                            fill
                            sizes="100vw"
                            className="object-cover"
                        />
                    </div>

                    <div className="p-8">
                        <h1 className="heading-font text-4xl">
                            Payment
                            Summary
                        </h1>

                        <div className="mt-8 space-y-4">
                            <div className="flex justify-between border-b border-white/10 pb-3">
                                <span>
                                    Class
                                </span>

                                <span>
                                    {
                                        classData.className
                                    }
                                </span>
                            </div>

                            <div className="flex justify-between border-b border-white/10 pb-3">
                                <span>
                                    Trainer
                                </span>

                                <span>
                                    {
                                        classData.trainerName
                                    }
                                </span>
                            </div>

                            <div className="flex justify-between border-b border-white/10 pb-3">
                                <span>
                                    Schedule
                                </span>

                                <span>
                                    {
                                        classData.schedule
                                    }
                                </span>
                            </div>

                            <div className="flex justify-between border-b border-white/10 pb-3">
                                <span>
                                    Duration
                                </span>

                                <span>
                                    {
                                        classData.duration
                                    }
                                </span>
                            </div>

                            <div className="flex justify-between text-xl font-bold text-red-500">
                                <span>
                                    Total
                                </span>

                                <span>
                                    ₹
                                    {
                                        classData.price
                                    }
                                </span>
                            </div>
                        </div>

                        <motion.button
                            onClick={
                                handlePayment
                            }
                            whileHover={{
                                scale: 1.03,
                            }}
                            whileTap={{
                                scale: 0.97,
                            }}
                            className="btn mt-10 w-full border-none bg-gradient-to-r from-red-600 to-red-500 text-white"
                        >
                            Pay ₹
                            {
                                classData.price
                            }
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default PaymentPage;