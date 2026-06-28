"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";
import { useEffect, useRef, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

export default function AddForumPostPage() {

    const router = useRouter();
    const { user } = useAuth();
    const fileInputRef = useRef(null);



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

    // const canUploadImage =
    //     user?.role === "admin" ||
    //     user?.role === "trainer";

    // Placeholder until ImageBB integration
    const [uploadedImage, setUploadedImage] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [imageName, setImageName] = useState("");
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (!user?.email) return;

        const fetchProfile = async () => {
            try {
                const { data } = await axiosInstance.get(
                    `/users/${user.email}`
                );

                setProfile(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProfile();
    }, [user?.email]);

    const canUploadImage =
        profile?.role === "admin" ||
        profile?.role === "trainer";


    // Disable Logic

    const disableTemplate =
        canUploadImage &&
        Boolean(uploadedImage);

    const disableUpload =
        !canUploadImage ||
        Boolean(selectedImage);


    // useEffect(() => {
    //     console.log("Uploaded Image State:", uploadedImage);
    // }, [uploadedImage]);


    const handleImageUpload = async (file) => {
        // No File Selected

        if (!file) return;

        // Allowed Image Formats

        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
        ];

        // Validate Image Format

        if (!allowedTypes.includes(file.type)) {

            await Swal.fire({
                icon: "error",
                title: "Unsupported File",
                text: "Please upload only JPG, JPEG, PNG or WEBP images.",
            });

            return;
        }
        // Validate Maximum File Size (5 MB)

        if (file.size > 5 * 1024 * 1024) {

            await Swal.fire({
                icon: "error",
                title: "Image Too Large",
                text: "Maximum allowed image size is 5 MB.",
            });

            return;
        }
        // Save Selected File Name

        setImageName(file.name);

        try {
            // Start Uploading

            setUploadingImage(true);

            // Remove any previously uploaded image
            setUploadedImage(null);

            // Get ImageBB API Key

            const apiKey =
                process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;

            if (!apiKey) {

                throw new Error(
                    "ImageBB API key is missing."
                );

            }
            // Prepare Image For Upload

            const formData = new FormData();

            formData.append(
                "image",
                file
            );
            // Upload To ImageBB

            const response = await fetch(
                `https://api.imgbb.com/1/upload?key=${apiKey}`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            // Check Server Response

            if (!response.ok) {

                throw new Error(
                    "Unable to connect to ImageBB."
                );

            }

            const result = await response.json();
            console.log("ImageBB Response:", result);
            // Check Upload Success
            if (!result.success) {

                throw new Error(
                    "Image upload failed."
                );
            }
            // Save Uploaded Image URL

            setUploadedImage(result.data.url);
            console.log("Uploaded URL:", result.data.url);
            // Success Alert

            await Swal.fire({
                icon: "success",
                title: "Image Uploaded Successfully",
                timer: 1200,
                showConfirmButton: false,
            });

        } catch (error) {

            console.error(error);
            // Upload Failed

            await Swal.fire({
                icon: "error",
                title: "Upload Failed",
                text:
                    error.message ||
                    "Something went wrong while uploading the image.",
            });

        } finally {
            // Stop Loading

            setUploadingImage(false);

        }

    };
    const onSubmit = async (data) => {

        const forumData = {
            title:
                data.title,
            image:
                uploadedImage ||
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

                setUploadedImage(null);
                setImageName("");

                // Clear file input
                if (fileInputRef.current) {

                    fileInputRef.current.value = "";

                }
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

                            {uploadedImage || selectedImage ? (
                                <Image
                                    src={uploadedImage || selectedImage}
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

                            {/* Cover Image */}

                            <div className="space-y-3">

                                <div className="grid gap-5 md:grid-cols-2">

                                    {/* Template */}

                                    <div className="flex flex-col">
                                        <label className="mb-2 text-sm font-medium text-gray-300">
                                            Template Cover
                                        </label>

                                        <select
                                            disabled={disableTemplate}
                                            {...register("image")}
                                            className="select h-14 w-full border border-white/10 bg-slate-900 focus:border-red-500"
                                        >
                                            <option value="">Select Template</option>

                                            {forumImages.map((item) => (
                                                <option
                                                    key={item.name}
                                                    value={item.url}
                                                >
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                        <p className="mt-3 text-xs text-gray-500">
                                            Select a template or upload your own cover image.
                                        </p>
                                    </div>

                                    {/* Upload */}

                                    <div className="flex flex-col">
                                        <label className="mb-2 text-sm font-medium text-gray-300">
                                            Upload Image
                                        </label>

                                        <label
                                            className={`flex h-14 w-full items-center justify-center gap-3 rounded-xl border-2 border-dashed transition-all ${canUploadImage
                                                ? "cursor-pointer border-red-500/30 bg-red-500/5 hover:border-red-500 hover:bg-red-500/10"
                                                : " cursor-pointer border-white/10 bg-white/5 opacity-60"
                                                }`}
                                        >
                                            <FaCloudUploadAlt className="text-lg text-red-400" />

                                            <span className="font-medium">
                                                {canUploadImage
                                                    ? "Choose Image"
                                                    : "Trainer/Admin Only"}
                                            </span>

                                            <input onChange={(e) => {

                                                const file =
                                                    e.target.files?.[0];

                                                if (!file) return;

                                                handleImageUpload(file);

                                            }} ref={fileInputRef}
                                                disabled={disableUpload}
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                            />
                                        </label>
                                        <p className="mt-2 text-xs leading-5 text-gray-500">
                                            Supported: JPG, JPEG, PNG, WEBP • Maximum size: 5 MB
                                        </p>
                                    </div>

                                </div>


                            </div>

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
                                disabled={uploadingImage}
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
                                {
                                    uploadingImage
                                        ? "Uploading Image..."
                                        : "🚀 Publish Post"
                                }
                            </motion.button>

                        </form>

                    </div>

                </div>

            </div>

        </motion.div>
    );
}