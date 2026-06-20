"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { authClient } from "@/lib/auth-client";
import Swal from "sweetalert2";

const ClassDetailsPage = () => {
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [classData, setClassData] = useState(null);
    const { data: session } = authClient.useSession();

    const memberName = session?.user?.name;

    const memberEmail = session?.user?.email;


    useEffect(() => {
        const fetchClass = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5000/classes/${id}`
                );

                const data = await res.json();

                setClassData(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchClass();
        }
    }, [id]);

    const handleBooking = async () => {
        const bookingData = {
            classId: classData._id,
            className: classData.className,
            image: classData.image,

            trainerName:
                classData.trainerName,

            trainerEmail:
                classData.trainerEmail,

            memberName,
            memberEmail,

            price: classData.price,

            status: "pending",

            bookedAt:
                new Date().toISOString(),
        };

        const res = await fetch(
            "http://localhost:5000/bookings",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json",
                },
                body: JSON.stringify(
                    bookingData
                ),
            }
        );

        const result = await res.json();

        if (result.insertedId) {
            Swal.fire({
                icon: "success",
                title: "Class Booked",
                text: "Your booking has been saved.",
            });
        }
    };


    if (loading || !classData) {
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
                    className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
                >
                    <div className="relative h-[400px]">
                        <Image
                            src={classData.image}
                            alt={classData.className}
                            fill
                            sizes="100vw"
                            className="object-cover"
                        />
                    </div>

                    <div className="p-8">
                        <span className="rounded-full bg-red-600/20 px-4 py-2 text-sm text-red-400">
                            {classData.category}
                        </span>

                        <h1 className="mt-5 heading-font text-5xl">
                            {classData.className}
                        </h1>

                        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="text-sm text-gray-400">
                                    Difficulty
                                </p>

                                <h3 className="mt-2 text-xl font-semibold">
                                    {classData.difficulty}
                                </h3>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="text-sm text-gray-400">
                                    Duration
                                </p>

                                <h3 className="mt-2 text-xl font-semibold">
                                    {classData.duration}
                                </h3>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="text-sm text-gray-400">
                                    Schedule
                                </p>

                                <h3 className="mt-2 text-xl font-semibold">
                                    {classData.schedule}
                                </h3>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <p className="text-sm text-gray-400">
                                    Monthly Fee
                                </p>

                                <h3 className="mt-2 text-xl font-semibold text-red-500">
                                    ₹{classData.price}
                                </h3>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h2 className="mb-4 text-2xl font-bold">
                                About This Class
                            </h2>

                            <p className="leading-8 text-gray-300">
                                {classData.description ||
                                    "No description provided by the trainer yet."}
                            </p>
                        </div>

                        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
                            <h2 className="mb-4 text-2xl font-bold">
                                Trainer Information
                            </h2>

                            <div className="space-y-2">
                                <p>
                                    <span className="font-semibold">
                                        Name:
                                    </span>{" "}
                                    {classData.trainerName}
                                </p>

                                <p>
                                    <span className="font-semibold">
                                        Email:
                                    </span>{" "}
                                    {classData.trainerEmail}
                                </p>

                                <p>
                                    <span className="font-semibold">
                                        Total Bookings:
                                    </span>{" "}
                                    {classData.bookingCount}
                                </p>
                            </div>
                        </div>

                        <motion.button
                            onClick={handleBooking}
                            whileHover={{
                                scale: 1.03,
                                y: -2,
                            }}
                            whileTap={{
                                scale: 0.97,
                            }}
                            className="btn mt-10 border-none bg-gradient-to-r from-red-600 to-red-500 text-white"
                        >
                            Book Now
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ClassDetailsPage;