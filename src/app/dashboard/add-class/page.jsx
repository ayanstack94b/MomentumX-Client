"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import Swal from "sweetalert2";
import PrivateRoute from "@/components/shared/PrivateRoute";

const classNames = [
    "Full Body Strength",
    "Yoga Flow",
    "HIIT Training",
    "CrossFit Fundamentals",
    "Cardio Blast",
    "Muscle Building",
    "Weight Loss Bootcamp",
    "Core Strength",
    "Functional Fitness",
    "Powerlifting Basics",
];
const durations = [
    "30 Minutes",
    "45 Minutes",
    "60 Minutes",
    "75 Minutes",
    "90 Minutes",
    "120 Minutes",
];
const categories = [
    "Strength",
    "Cardio",
    "Yoga",
    "CrossFit",
    "HIIT",
    "Bodybuilding",
];
const schedules = [
    "Mon - Wed - Fri | 7:00 AM",
    "Mon - Wed - Fri | 7:00 PM",
    "Tue - Thu | 6:00 AM",
    "Tue - Thu | 6:00 PM",
    "Saturday | 8:00 AM",
    "Sunday | 9:00 AM",
];
const difficulties = [
    "Beginner",
    "Intermediate",
    "Advanced",
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



export default function AddClassPage() {

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            const classData = {
                ...data,
                price: Number(data.price),
                bookingCount: 0,
                status: "pending",
                createdAt: new Date(),
            };

            const res = await fetch(
                "http://localhost:5000/classes",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(classData),
                }
            );

            const result = await res.json();

            if (result.insertedId) {
                await Swal.fire({
                    icon: "success",
                    title: "Class Added",
                    text: "Class submitted successfully.",
                    timer: 1500,
                    showConfirmButton: false,
                });

                reset();
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed",
                text: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <PrivateRoute>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden p-5"
            >
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

                <div className="relative z-10 mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                    <h1 className="heading-font text-4xl">
                        Add a New Class
                    </h1>

                    <p className="mt-2 text-[var(--text-secondary)]">
                        Create a new fitness class for MomentumX members.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">

                        <div className="grid gap-6 md:grid-cols-2">

                            {/* Class Name */}                           
                            <div>
                                <label className="mb-2 block">
                                    Class Name
                                </label>

                                <select
                                    {...register("className", {
                                        required: "Class name is required",
                                    })}
                                    className="select w-full border border-white/10 bg-slate-800 text-white"
                                >
                                    <option value="">
                                        Select a Class
                                    </option>

                                    {classNames.map((item) => (
                                        <option
                                            key={item}
                                            value={item}
                                        >
                                            {item}
                                        </option>
                                    ))}
                                </select>

                                {errors.className && (
                                    <p className="mt-1 text-red-500">
                                        {errors.className.message}
                                    </p>
                                )}
                            </div>
                            {/* Image */}
                            <div>
                                <label className="mb-2 block">
                                    Image URL
                                </label>

                                <input
                                    {...register("image")}
                                    placeholder="https://example.com/class.jpg"
                                    className="input w-full border border-white/10 bg-slate-900/50"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="mb-2 block">
                                    Category
                                </label>

                                <select
                                    {...register("category")}
                                    className="select w-full border border-white/10 bg-slate-900"
                                >
                                    {categories.map((category) => (
                                        <option
                                            key={category}
                                            value={category}
                                        >
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Difficulty */}
                            <div>
                                <label className="mb-2 block">
                                    Difficulty
                                </label>

                                <select
                                    {...register("difficulty")}
                                    className="select w-full border border-white/10 bg-slate-900"
                                >
                                    {difficulties.map((difficulty) => (
                                        <option
                                            key={difficulty}
                                            value={difficulty}
                                        >
                                            {difficulty}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Duration */}
                            <div>
                                <label className="mb-2 block">
                                    Duration
                                </label>

                                <select
                                    {...register("duration")}
                                    className="select w-full border border-white/10 bg-slate-800 text-white focus:border-red-500"
                                >
                                    <option value="">
                                        Select Duration
                                    </option>

                                    {durations.map((duration) => (
                                        <option
                                            key={duration}
                                            value={duration}
                                        >
                                            {duration}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Schedule */}
                            <div>
                                <label className="mb-2 block">
                                    Schedule
                                </label>

                                <select
                                    {...register("schedule")}
                                    className="select w-full border border-white/10 bg-slate-800 text-white focus:border-red-500"
                                >
                                    <option value="">
                                        Select Schedule
                                    </option>

                                    {schedules.map((schedule) => (
                                        <option
                                            key={schedule}
                                            value={schedule}
                                        >
                                            {schedule}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Price */}
                            <div>
                                <label className="mb-2 block">
                                    Membership Plan
                                </label>

                                <select
                                    {...register("price", {
                                        required: "Membership plan is required",
                                    })}
                                    defaultValue=""
                                    className="select w-full border border-white/10 bg-slate-800 text-white focus:border-red-500"
                                >
                                    <option
                                        value=""
                                        disabled
                                    >
                                        Select Membership Plan
                                    </option>

                                    {pricingPlans.map((plan) => (
                                        <option
                                            key={plan.price}
                                            value={plan.price}
                                        >
                                            {plan.name} - ₹{plan.price}
                                        </option>
                                    ))}
                                </select>

                                {errors.price && (
                                    <p className="mt-1 text-red-500">
                                        {errors.price.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-2 block">
                                Description
                            </label>

                            <textarea
                                rows={6}
                                {...register("description")}
                                placeholder="Describe your class, training style, goals, and what members will learn."
                                className="textarea w-full border border-white/10 bg-slate-900/50"
                            />
                        </div>

                        <motion.button
                            whileHover={{
                                scale: 1.03,
                                y: -2,
                            }}
                            whileTap={{
                                scale: 0.97,
                            }}
                            disabled={loading}
                            type="submit"
                            className="btn border-none bg-gradient-to-r from-red-600 to-red-500 text-white"
                        >
                            {loading
                                ? "Creating..."
                                : "Create Class"}
                        </motion.button>
                    </form>
                </div>
            </motion.div>

        </PrivateRoute>
    );
}