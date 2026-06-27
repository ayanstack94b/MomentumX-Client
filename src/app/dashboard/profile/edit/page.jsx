"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";


export default function EditProfilePage() {

    const { user, loading } = useAuth();

    const [profile, setProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const email = user?.email?.toLowerCase();
    const router = useRouter();

    const onSubmit = async (data) => {
        if (!profile?._id) {
            Swal.fire({
                icon: "error",
                title: "Profile ID Missing",
            });

            console.log(profile);
            console.log(profile?._id);
            return;
        }
        try {
            const { data: result } = await axiosInstance.patch(
                `/users/${profile._id}`,
                {
                    name: data.name,
                    image: data.image,
                    phone: data.phone,
                    location: data.location,
                    bio: data.bio,
                }
            );
            if (result.modifiedCount > 0) {
                await Swal.fire({
                    icon: "success",
                    title: "Profile Updated",
                    text: "Your profile has been updated successfully.",
                    timer: 1500,
                    showConfirmButton: false,
                });

                router.push("/dashboard/profile");
            }
        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: "Something went wrong. Please try again.",
            });
        }
    };


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();


    useEffect(() => {
        if (!email) return;

        const fetchProfile = async () => {
            try {
                const { data } = await axiosInstance.get(
                    `/users/${email}`
                );

                setProfile(data);
                reset(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingProfile(false);
            }
        };

        fetchProfile();
    }, [email, reset]);


    if (loading || loadingProfile || !profile) {
        return <LoadingSpinner />;
    }



    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden p-5"
        >
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
                    x: [0, -30, 0],
                    y: [0, 30, 0],
                }}
                transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-red-500/10 blur-3xl"
            />

            <div className="relative z-10 mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                <h1 className="heading-font text-4xl">
                    Edit Profile
                </h1>

                <p className="mt-2 text-[var(--text-secondary)]">
                    Update your personal information.
                </p>

                <div className="my-8 flex flex-col items-center gap-4">
                    {profile?.image ? (
                        <Image
                            src={profile?.image || "/default-avatar.png"}
                            alt={profile?.name || "User"}
                            width={120}
                            height={120}
                            priority
                            className="rounded-full border-4 border-red-500 object-cover"
                        />
                    ) : (
                        <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full border-4 border-red-500 bg-white/5">
                            User
                        </div>
                    )}

                    <h2 className="text-2xl font-bold">
                        {profile.name}
                    </h2>

                    <p className="text-[var(--text-secondary)]">
                        {profile.email}
                    </p>
                </div>




            </div>

            {/*==================================== Edit Form ===================================== */}

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 space-y-6"
            >
                <div className="grid gap-6 md:grid-cols-2">

                    {/* Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">
                            Full Name
                        </label>

                        <input
                            {...register("name", {
                                required: "Name is required",
                            })}
                            placeholder="Enter your full name"
                            className="input w-full border border-white/10 bg-slate-900/50 backdrop-blur-sm focus:border-red-500"
                        />

                        {errors.name && (
                            <p className="text-sm text-red-500">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">
                            Phone Number
                        </label>

                        <input
                            {...register("phone")}
                            placeholder="+91 9876543210"
                            className="input w-full border border-white/10 bg-slate-900/50 backdrop-blur-sm focus:border-red-500"
                        />
                    </div>

                    {/* Photo URL */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">
                            Profile Photo URL
                        </label>

                        <input
                            {...register("image")}
                            placeholder="https://example.com/profile.jpg"
                            className="input w-full border border-white/10 bg-slate-900/50 backdrop-blur-sm focus:border-red-500"
                        />
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">
                            Location
                        </label>

                        <input
                            {...register("location")}
                            placeholder="Kolkata, West Bengal"
                            className="input w-full border border-white/10 bg-slate-900/50 backdrop-blur-sm focus:border-red-500"
                        />
                    </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-white">
                        Bio
                    </label>

                    <textarea
                        rows={6}
                        {...register("bio")}
                        placeholder="Tell others about yourself, your fitness journey, goals, interests, and achievements..."
                        className="textarea w-full border border-white/10 bg-slate-900/50 backdrop-blur-sm focus:border-red-500"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4 pt-4 sm:flex-row">

                    <motion.button
                        whileHover={{
                            scale: 1.03,
                            y: -2,
                        }}
                        whileTap={{
                            scale: 0.97,
                        }}
                        type="submit"
                        className="btn flex-1 border-none bg-gradient-to-r from-red-600 to-red-500 text-white"
                    >
                        Save Changes
                    </motion.button>

                    <motion.button
                        whileHover={{
                            scale: 1.03,
                            y: -2,
                        }}
                        whileTap={{
                            scale: 0.97,
                        }}
                        type="button"
                        onClick={() => router.push("/dashboard/profile")}
                        className="btn flex-1 border border-white/10 bg-white/5 text-white hover:bg-white/10"
                    >
                        Cancel
                    </motion.button>

                </div>
            </form>


        </motion.div>
    );
}