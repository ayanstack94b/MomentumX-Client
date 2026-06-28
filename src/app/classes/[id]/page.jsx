"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";

const ClassDetailsPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [classData, setClassData] = useState(null);
    const [alreadyBooked, setAlreadyBooked] = useState(false);

    const { user } = useAuth();

    // console.log(id);
    // console.log(classData);
    // console.log(loading);


    useEffect(() => {

        const fetchClass = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/classes/${id}`
                );

                const data = await res.json();

                setClassData(data);
                console.log("Fetched Class:", data);
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



    // Checak booking use effect
    useEffect(() => {
        const checkBooking =
            async () => {

                if (
                    !user?.email ||
                    !classData?._id
                ) {
                    return;
                }

                try {
                    const { data } = await axiosInstance.get(
                        `/bookings/check?email=${user.email}&classId=${classData._id}`
                    );

                    setAlreadyBooked(data.booked);
                } catch (error) {
                    console.error(error);
                }
            };

        checkBooking();

    }, [
        user?.email,
        classData?._id,
    ]);


    const handleBooking = async () => {

        if (!user) {
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
        if (!user) {
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
            trainerName: classData.trainerName,
            category: classData.category,
            difficulty: classData.difficulty,
            duration: classData.duration,
            price: classData.price,
            userEmail: user.email,
            createdAt: new Date().toISOString(),
        };

        try {
            await axiosInstance.post(
                "/favorites",
                favoriteData
            );

            Swal.fire({
                icon: "success",
                title: "Added to Favorites",
                timer: 1200,
                showConfirmButton: false,
            });

        } catch (error) {
            Swal.fire({
                icon: "info",
                title:
                    error.response?.data?.message ||
                    "Already in Favorites",
            });
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!loading && !classData) {
        notFound();
    }
    // console.log("Rendering:", classData);


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
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
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

                        <div className="mt-6 flex flex-col gap-4 sm:flex-row">

                            <motion.button
                                onClick={handleFavorite}
                                whileHover={{
                                    scale: 1.03,
                                    y: -2,
                                }}
                                whileTap={{
                                    scale: 0.97,
                                }}
                                className="btn flex-1 border border-pink-500/30 bg-gradient-to-r from-pink-600 to-red-500 text-white transition-all hover:shadow-lg hover:shadow-pink-500/20"
                            >
                                 Add to Favorites
                            </motion.button>

                            <motion.button
                                onClick={handleBooking}
                                disabled={alreadyBooked}
                                whileHover={
                                    alreadyBooked
                                        ? {}
                                        : {
                                            scale: 1.03,
                                            y: -2,
                                        }
                                }
                                whileTap={
                                    alreadyBooked
                                        ? {}
                                        : {
                                            scale: 0.97,
                                        }
                                }
                                className="btn flex-1 border border-red-500/30 bg-gradient-to-r from-red-600 to-red-500 text-white transition-all hover:shadow-lg hover:shadow-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {alreadyBooked
                                    ? "Already Booked"
                                    : user
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