"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { authClient } from "@/lib/auth-client";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const ClassDetailsPage = () => {
    const { id } = useParams();
    const router = useRouter();
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

        if (!session?.user) {
            Swal.fire({
                icon: "warning",
                title: "Login Required",
                text: "Please create an account to book this class.",
                confirmButtonText: "Register Now",
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push("/register");
                }
            });

            return;
        }

        router.push(
            `/payment/${classData._id}`
        );
    };
    const handleFavorite = async () => {
        if (!session?.user) {
            Swal.fire({
                icon: "warning",
                title: "Login Required",
                text: "Please login first.",
            });

            return;
        }

        const favoriteData = {
            classId: classData._id,
            className: classData.className,
            image: classData.image,

            trainerName:
                classData.trainerName,

            category:
                classData.category,

            difficulty:
                classData.difficulty,

            duration:
                classData.duration,

            price:
                classData.price,

            userEmail:
                session.user.email,

            createdAt:
                new Date().toISOString(),
        };

        try {
            const res = await fetch(
                "http://localhost:5000/favorites",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify(
                        favoriteData
                    ),
                }
            );

            const result =
                await res.json();

            if (res.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Added To Favorites",
                    timer: 1200,
                    showConfirmButton: false,
                    
                });

                router.push(
                    "/dashboard/favorite-classes"
                );

            } else {
                Swal.fire({
                    icon: "warning",
                    title:
                        result.message ||
                        "Already Added",
                });
            }
        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: "error",
                title:
                    "Failed To Add Favorite",
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
                                    {classData.trainerName || "Trainer Not Assigned yet"}
                                </p>

                                <p>
                                    <span className="font-semibold">
                                        Email:
                                    </span>{" "}
                                    {classData.trainerEmail || "Not Available"}
                                </p>

                                <p>
                                    <span className="font-semibold">
                                        Total Bookings:
                                    </span>{" "}
                                    {classData.bookingCount}
                                </p>
                            </div>
                        </div>

                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <motion.button
                                onClick={handleFavorite}
                                whileHover={{
                                    scale: 1.03,
                                }}
                                whileTap={{
                                    scale: 0.97,
                                }}
                                className="btn border border-red-500 bg-transparent text-red-500 hover:bg-red-600 hover:text-white"
                            >
                                ❤ Save To Favorites
                            </motion.button>

                            <motion.button
                                onClick={handleBooking}
                                whileHover={{
                                    scale: 1.03,
                                    y: -2,
                                }}
                                whileTap={{
                                    scale: 0.97,
                                }}
                                className="btn border-none bg-gradient-to-r from-red-600 to-red-500 text-white"
                            >
                                {session?.user
                                    ? "Book Now"
                                    : "Register To Book"}
                            </motion.button>
                        </div>


                    </div>
                </motion.div>


            </div>
        </section>
    );
};

export default ClassDetailsPage;