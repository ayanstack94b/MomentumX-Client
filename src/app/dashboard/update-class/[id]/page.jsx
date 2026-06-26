"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {useRouter} from "next/navigation";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import PrivateRoute from "@/components/shared/PrivateRoute";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import axiosInstance from "@/lib/axios";

const difficulties = [
    "Beginner",
    "Intermediate",
    "Advanced",
];

const durations = [
    "30 Minutes",
    "45 Minutes",
    "60 Minutes",
    "90 Minutes",
    "120 Minutes",
];

const schedules = [
    "Monday | 6:00 AM",
    "Monday | 7:00 PM",
    "Tuesday | 6:00 PM",
    "Wednesday | 7:00 PM",
    "Thursday | 6:00 PM",
    "Friday | 7:00 PM",
    "Saturday | 8:00 AM",
    "Sunday | 9:00 AM",
];

const pricingPlans = [
    {
        name: "Basic Plan",
        price: 499,
    },
    {
        name: "Starter Plan",
        price: 699,
    },
    {
        name: "Standard Plan",
        price: 999,
    },
    {
        name: "Premium Plan",
        price: 1499,
    },
    {
        name: "Elite Plan",
        price: 1999,
    },
];


const UpdateClassPage = () => {


    const {register,handleSubmit,reset} = useForm();

    const { id } = useParams();
    console.log("ID:", id);

    const router = useRouter();

    const [loading, setLoading] = useState(true);

    const [classData, setClassData] = useState(null);


    useEffect(() => {
        const fetchClass = async () => {
            try {
                const { data: classDetails } = await axiosInstance.get(
                    `/classes/update/${id}`
                );

                setClassData(classDetails);
                reset(classDetails);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchClass();
        }
    }, [id, reset]);

    const onSubmit = async (data) => {
        try {
            const { _id, ...updateData } = data;

            const { data: result } = await axiosInstance.patch(
                `/classes/update/${id}`,
                updateData
            );

            if (result.modifiedCount > 0) {
                await Swal.fire({
                    icon: "success",
                    title: "Class Updated",
                    timer: 1500,
                    showConfirmButton: false,
                });

                router.push(
                    "/dashboard/my-classes"
                );
               
            }
        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Update Failed",
            });
        }
    };

    if (loading || !classData) {
        return (
            <div className="flex justify-center py-20">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <PrivateRoute>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden p-5"
            >
                {/* Background Blob 1 */}
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

                {/* Background Blob 2 */}
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

                <div className="relative z-10 mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h1 className="heading-font text-4xl">
                            Update Class
                        </h1>

                        <p className="mt-2 text-[var(--text-secondary)]">
                            Modify your class details and keep your
                            members informed.
                        </p>
                    </motion.div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-8 space-y-8"
                    >
                        {/* Class Preview */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay: 0.2,
                            }}
                            className="overflow-hidden rounded-3xl border border-white/10 bg-white/5"
                        >
                            <div className="grid md:grid-cols-[320px_1fr]">
                                <Image
                                    src={classData.image}
                                    alt={classData.className}
                                    width={500}
                                    height={300}
                                    className="h-full min-h-[240px] w-full object-cover"
                                />

                                <div className="flex flex-col justify-center p-6">
                                    <span className="mb-3 w-fit rounded-full bg-red-600/20 px-3 py-1 text-sm text-red-400">
                                        {classData.category}
                                    </span>

                                    <h3 className="text-2xl font-bold">
                                        {classData.className}
                                    </h3>

                                    <p className="mt-2 text-gray-400">
                                        Class name and category
                                        cannot be modified.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Editable Settings */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay: 0.3,
                            }}
                            className="rounded-3xl border border-white/10 bg-white/5 p-6"
                        >
                            <h3 className="mb-6 text-xl font-semibold">
                                Class Settings
                            </h3>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block">
                                        Difficulty
                                    </label>

                                    <select
                                        {...register("difficulty")}
                                        className="select w-full border border-white/10 bg-slate-800 text-white"
                                    >
                                        {difficulties.map(
                                            (difficulty) => (
                                                <option
                                                    key={
                                                        difficulty
                                                    }
                                                    value={
                                                        difficulty
                                                    }
                                                >
                                                    {
                                                        difficulty
                                                    }
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block">
                                        Duration
                                    </label>

                                    <select
                                        {...register("duration")}
                                        className="select w-full border border-white/10 bg-slate-800 text-white"
                                    >
                                        {durations.map(
                                            (duration) => (
                                                <option
                                                    key={
                                                        duration
                                                    }
                                                    value={
                                                        duration
                                                    }
                                                >
                                                    {
                                                        duration
                                                    }
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block">
                                        Schedule
                                    </label>

                                    <select
                                        {...register("schedule")}
                                        className="select w-full border border-white/10 bg-slate-800 text-white"
                                    >
                                        {schedules.map(
                                            (schedule) => (
                                                <option
                                                    key={
                                                        schedule
                                                    }
                                                    value={
                                                        schedule
                                                    }
                                                >
                                                    {
                                                        schedule
                                                    }
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block">
                                        Membership Plan
                                    </label>

                                    <select
                                        {...register("price")}
                                        className="select w-full border border-white/10 bg-slate-800 text-white"
                                    >
                                        {pricingPlans.map(
                                            (plan) => (
                                                <option
                                                    key={
                                                        plan.price
                                                    }
                                                    value={
                                                        plan.price
                                                    }
                                                >
                                                    {
                                                        plan.name
                                                    }{" "}
                                                    - ₹
                                                    {
                                                        plan.price
                                                    }
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>
                        </motion.div>

                        {/* Description */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay: 0.4,
                            }}
                            className="rounded-3xl border border-white/10 bg-white/5 p-6"
                        >
                            <label className="mb-3 block text-lg font-semibold">
                                Class Description
                            </label>

                            <textarea
                                rows={6}
                                {...register(
                                    "description"
                                )}
                                className="textarea w-full border border-white/10 bg-slate-800 text-white"
                            />
                        </motion.div>

                        <motion.button
                            whileHover={{
                                scale: 1.03,
                                y: -2,
                            }}
                            whileTap={{
                                scale: 0.97,
                            }}
                            type="submit"
                            className="btn border-none bg-gradient-to-r from-red-600 to-red-500 text-white"
                        >
                            Update Class
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </PrivateRoute>
    );
};

export default UpdateClassPage;