"use client";

import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";

export default function AddForumPostPage() {

    const router = useRouter();

    const { user, loading } = useAuth();

    const forumImages = [
        {
            name: "Strength Training",
            url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
        },
        {
            name: "Cardio Workout",
            url: "https://images.unsplash.com/photo-1518611012118-696072aa579a",
        },
        {
            name: "Yoga & Flexibility",
            url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
        },
        {
            name: "Nutrition & Diet",
            url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
        },
        {
            name: "Gym Motivation",
            url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd",
        },
    ];



    const { register, handleSubmit, reset, watch, formState: { errors }, } = useForm();
    const selectedImage = watch("image");

    const onSubmit = async (data) => {

        const forumData = {
            title:
                data.title,
            image:
                data.image,
            description:
                data.description,
            authorName:
                user?.name,
            authorEmail:
                user?.email,
            category:
                data?.category || "Fitness",
            createdAt:
                new Date().toISOString(),

            likes: 0,

            dislikes: 0,
        };

        try {

            const { data: result } = await axiosInstance.post(
                "/forums",
                forumData
            );

            if (
                result.insertedId
            ) {

                await Swal.fire({
                    icon: "success",
                    title:
                        "Forum Post Created",
                });

                reset();

                router.push("/forum");

            }

        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Failed To Create Post",
                text: error.response?.data?.message || error.message,
            });
        }
    };

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
            transition={{
                duration: 0.4,
            }}
            className="relative overflow-hidden p-5"
        >

            {/* Animated Background */}
            <motion.div
                animate={{
                    x: [0, 40, 0],
                    y: [0, -20, 0],
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
                    y: [0, 20, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-red-500/10 blur-3xl"
            />

            <div className="relative z-10 mx-auto max-w-7xl">

                {/* Hero */}
                <div className="mb-10 text-center">

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: -20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        className="inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400"
                    >
                        MomentumX Community
                    </motion.div>

                    <h1 className="heading-font mt-5 text-5xl">
                        Create Forum Post
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-gray-400">
                        Share workout tips, nutrition guides,
                        recovery strategies and fitness
                        knowledge with the MomentumX
                        community.
                    </p>

                </div>

                <div className="grid gap-8 lg:grid-cols-2">

                    {/* Preview Card */}
                    <motion.div
                        whileHover={{
                            y: -6,
                        }}
                        className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
                    >

                        <div className="relative h-80">

                            {selectedImage ? (

                                <Image
                                    src={selectedImage}
                                    alt="Forum Preview"
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                    className="object-cover"
                                />

                            ) : (

                                <div className="flex h-full items-center justify-center bg-gradient-to-br from-red-900/20 to-black">

                                    <div className="text-center">

                                        <h3 className="text-2xl font-bold">
                                            Live Preview
                                        </h3>

                                        <p className="mt-2 text-gray-500">
                                            Select a cover image
                                        </p>

                                    </div>

                                </div>

                            )}

                        </div>

                        <div className="p-8">

                            <span className="rounded-full bg-red-600/20 px-3 py-1 text-xs text-red-400">
                                Community Post
                            </span>

                            <h2 className="mt-4 text-3xl font-bold">
                                {watch("title") ||
                                    "Your Post Title"}
                            </h2>

                            <p className="mt-5 line-clamp-6 text-gray-400">
                                {watch(
                                    "description"
                                ) ||
                                    "Your forum content preview will appear here as you type."}
                            </p>

                        </div>

                    </motion.div>

                    {/* Form Card */}
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

                        <h2 className="text-3xl font-bold">
                            Post Information
                        </h2>

                        <p className="mt-2 text-gray-400">
                            Fill in the details below to
                            publish your forum post.
                        </p>

                        <form
                            onSubmit={handleSubmit(
                                onSubmit
                            )}
                            className="mt-8 space-y-6"
                        >

                            <input
                                {...register(
                                    "title",
                                    {
                                        required:
                                            true,
                                    }
                                )}
                                placeholder="Enter Post Title"
                                className="input w-full border border-white/10 bg-slate-900/50 backdrop-blur-sm focus:border-red-500"
                            />

                            <select
                                {...register(
                                    "image"
                                )}
                                className="select w-full border border-white/10 bg-slate-900 backdrop-blur-sm focus:border-red-500"
                            >
                                <option value="">
                                    Select a Cover Image
                                </option>



                                {forumImages.map(
                                    (
                                        item
                                    ) => (
                                        <option
                                            key={
                                                item.name
                                            }
                                            value={
                                                item.url
                                            }
                                        >
                                            {
                                                item.name
                                            }
                                        </option>
                                    )
                                )}
                            </select>

                            <select
                                {...register("category")}
                                className="select w-full border border-white/10 bg-slate-900 backdrop-blur-sm focus:border-red-500"
                            >
                                <option value="">
                                    Select category
                                </option>
                                <option value="Nutrition">
                                    Nutrition
                                </option>

                                <option value="Workout Tips">
                                    Workout Tips
                                </option>

                                <option value="Recovery">
                                    Recovery
                                </option>

                                <option value="Strength Training">
                                    Strength Training
                                </option>

                                <option value="Weight Loss">
                                    Weight Loss
                                </option>

                            </select>


                            <textarea
                                rows={10}
                                {...register(
                                    "description",
                                    {
                                        required:
                                            true,
                                    }
                                )}
                                placeholder="Write your forum post..."
                                className="textarea w-full border border-white/10 bg-slate-900/50 backdrop-blur-sm focus:border-red-500"
                            />

                            <motion.button
                                whileHover={{
                                    scale: 1.02,
                                    y: -2,
                                    boxShadow:
                                        "0 0 30px rgba(220,38,38,0.4)",
                                }}
                                whileTap={{
                                    scale: 0.97,
                                }}
                                className="btn h-14 w-full border-none bg-gradient-to-r from-red-600 to-red-500 text-lg text-white"
                            >
                                🚀 Publish Post
                            </motion.button>

                        </form>

                    </div>

                </div>

            </div>

        </motion.div>
    );
}