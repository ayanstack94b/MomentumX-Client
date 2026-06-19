"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";


export default function EditProfilePage() {

    const { data: session, isPending } = authClient.useSession();

    const [profile, setProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const email = session?.user?.email;
    const router = useRouter();

    const onSubmit = async (data) => {
        try {
            const response = await fetch(
                `http://localhost:5000/users/${profile._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: data.name,
                        image: data.image,
                        phone: data.phone,
                        location: data.location,
                        bio: data.bio,
                    }),
                }
            );

            const result = await response.json();

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
                const res = await fetch(
                    `http://localhost:5000/users/${email}`
                );

                const data = await res.json();

                setProfile(data);
                reset(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingProfile(false);
            }
        };

        fetchProfile();
    }, [email]);


    if (isPending || loadingProfile || !profile) {
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
                    <Image
                        src={profile.image}
                        alt={profile.name}
                        width={120}
                        height={120}
                        priority
                        className="rounded-full border-4 border-red-500 object-cover"
                    />

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
                className="space-y-6"
            >
                {/* Name field */}
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Name
                    </label>

                    <input
                        {...register("name", {
                            required: "Name is required",
                        })}
                        className="input input-bordered w-full bg-white/5"
                    />

                    {errors.name && (
                        <p className="mt-1 text-red-500">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Phone URL field */}
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Phone
                    </label>

                    <input
                        {...register("phone")}
                        className="input input-bordered w-full bg-white/5"
                    />
                </div>
                {/* Photo URL field */}
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Photo URL
                    </label>

                    <input
                        {...register("image")}
                        className="input input-bordered w-full bg-white/5"
                    />
                </div>

                {/* Location field */}
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Location
                    </label>

                    <input
                        {...register("location")}
                        className="input input-bordered w-full bg-white/5"
                    />
                </div>

                {/* Bio field */}
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Bio
                    </label>

                    <textarea
                        rows={5}
                        {...register("bio")}
                        className="textarea textarea-bordered w-full bg-white/5"
                    />
                </div>

                {/* Save Button */}
                <button
                    type="submit"
                    className="btn border-none bg-red-600 text-white hover:bg-red-700"
                >
                    Save Changes
                </button>

            </form>


        </motion.div>
    );
}