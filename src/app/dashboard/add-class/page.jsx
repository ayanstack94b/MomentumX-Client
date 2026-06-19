"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import Swal from "sweetalert2";
import PrivateRoute from "@/components/shared/PrivateRoute";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

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
const classTemplates = [
    {
        id: "full-body-strength",
        className: "Full Body Strength",
        category: "Strength",
        image: "/classes/strength.png",
    },
    {
        id: "yoga-flow",
        className: "Yoga Flow",
        category: "Yoga",
        image: "/classes/yoga.png",
    },
    {
        id: "hiit-training",
        className: "HIIT Training",
        category: "HIIT",
        image: "/classes/hiit.png",
    },
    {
        id: "crossfit-fundamentals",
        className: "CrossFit Fundamentals",
        category: "CrossFit",
        image: "/classes/crossfit.png",
    },
    {
        id: "cardio-blast",
        className: "Cardio Blast",
        category: "Cardio",
        image: "/classes/cardio.png",
    },
    {
        id: "muscle-building",
        className: "Muscle Building",
        category: "Bodybuilding",
        image: "/classes/muscle-building.png",
    },
    {
        id: "weight-loss-bootcamp",
        className: "Weight Loss Bootcamp",
        category: "Cardio",
        image: "/classes/weight-loss.png",
    },
    {
        id: "core-strength",
        className: "Core Strength",
        category: "Strength",
        image: "/classes/core-strength.png",
    },
    {
        id: "functional-fitness",
        className: "Functional Fitness",
        category: "Strength",
        image: "/classes/functional-fitness.png",
    },
    {
        id: "powerlifting-basics",
        className: "Powerlifting Basics",
        category: "Strength",
        image: "/classes/powerlifting.png",
    },
    {
        id: "custom-class",
        className: "Custom Class",
        category: "",
        image: "",
    },
];


export default function AddClassPage() {


    const [loading, setLoading] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const { data: session } = authClient.useSession();

    const trainerName = session?.user?.name;
    const trainerEmail = session?.user?.email;

    

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

   

    const onSubmit = async (data) => {
        if (!selectedTemplate) {
            Swal.fire({
                icon: "error",
                title: "Please select a class template",
            });

            return;
        }
        try {
            setLoading(true);

            const classData = {
                templateId: selectedTemplate.id,

                className: selectedTemplate.className,

                category: selectedTemplate.category,

                image: selectedTemplate.image,

                difficulty: data.difficulty,
                duration: data.duration,
                schedule: data.schedule,
                price: Number(data.price),
                description: data.description,

                trainerName,
                trainerEmail,

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
                {/* Animated Background Blob 1 */}
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

                {/* Animated Background Blob 2 */}
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

                {/* Main Card */}
                <div className="relative z-10 mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

                    <div className="mb-8">
                        <h1 className="heading-font text-4xl">
                            Add a New Class
                        </h1>

                        <p className="mt-2 text-[var(--text-secondary)]">
                            Create and publish a new fitness class for MomentumX members.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-8 space-y-8"
                    >
                        {/* Template Selection */}
                        <div className="space-y-4">
                            <label className="block text-sm font-medium">
                                Fitness Class Template
                            </label>

                            <select
                                onChange={(e) => {
                                    const template = classTemplates.find(
                                        (item) =>
                                            item.className === e.target.value
                                    );

                                    setSelectedTemplate(template);
                                }}
                                className="select w-full border border-white/10 bg-slate-800 text-white"
                            >
                                <option value="">
                                    Select Class Template
                                </option>

                                {classTemplates.map((item) => (
                                    <option
                                        key={item.id}
                                        value={item.className}
                                    >
                                        {item.className}
                                    </option>
                                ))}
                            </select>

                            {selectedTemplate && (
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
                                        duration: 0.3,
                                    }}
                                    className="overflow-hidden rounded-3xl border border-white/10 bg-white/5"
                                >
                                    <div className="grid md:grid-cols-[320px_1fr]">
                                        <Image
                                            src={selectedTemplate.image}
                                            alt={selectedTemplate.className}
                                            width={500}
                                            height={300}
                                            className="h-full min-h-[240px] w-full object-cover"
                                        />

                                        <div className="flex flex-col justify-center p-6">
                                            <span className="mb-3 w-fit rounded-full bg-red-600/20 px-3 py-1 text-sm text-red-400">
                                                {selectedTemplate.category}
                                            </span>

                                            <h3 className="text-2xl font-bold">
                                                {selectedTemplate.className}
                                            </h3>

                                            <p className="mt-2 text-sm text-gray-400">
                                                Template selected and ready for publishing.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Class Settings */}
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                            <h3 className="mb-6 text-xl font-semibold">
                                Class Settings
                            </h3>

                            <div className="grid gap-6 md:grid-cols-2">
                                {/* Difficulty */}
                                <div>
                                    <label className="mb-2 block">
                                        Difficulty
                                    </label>

                                    <select
                                        {...register("difficulty")}
                                        className="select w-full border border-white/10 bg-slate-800 text-white"
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
                                        className="select w-full border border-white/10 bg-slate-800 text-white"
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
                                        className="select w-full border border-white/10 bg-slate-800 text-white"
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

                                {/* Membership */}
                                <div>
                                    <label className="mb-2 block">
                                        Membership Plan
                                    </label>

                                    <select
                                        {...register("price")}
                                        className="select w-full border border-white/10 bg-slate-800 text-white"
                                    >
                                        <option value="">
                                            Select Membership
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
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                            <label className="mb-3 block text-lg font-semibold">
                                Class Description
                            </label>

                            <textarea
                                rows={6}
                                {...register("description")}
                                placeholder="Describe the training style, goals, benefits, and what members can expect from this class..."
                                className="textarea w-full border border-white/10 bg-slate-800 text-white"
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