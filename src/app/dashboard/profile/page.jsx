"use client";

import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaUserShield, FaPhone, FaMapMarkerAlt, FaEdit, FaUserCircle } from "react-icons/fa";
import LoadingSpinner from "@/components/shared/LoadingSpinner";


export default function ProfilePage() {
    const { data: session, isPending } = authClient.useSession();
    const [profile, setProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true);

    const user = session?.user;
    const email = session?.user?.email;

    useEffect(() => {
        if (!email) return;

        const fetchProfile = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/users/${email}`
                );
                console.log("Status:", res.status);
                console.log("OK:", res.ok);

                const data = await res.json();

                setProfile(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingProfile(false);
            }
        };

        fetchProfile();
    }, [email]);

    const roleColor = {
        member: "badge-info",
        trainer: "badge-success",
        admin: "badge-error",
    };
    // to prevent error while loading

    if (isPending || loadingProfile) {
        return <LoadingSpinner />;
    }

    if (!profile) {
        return <LoadingSpinner />;
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 p-5"
        >
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-col items-center gap-5 md:flex-row">
                        {profile?.image ? (
                            <Image
                                src={profile?.image}
                                alt={profile?.name}
                                width={140}
                                height={140}
                                priority
                                className="rounded-full border-4 border-red-500 object-cover"
                            />
                        ) : (
                                <div className="flex h-[140px] w-[140px] items-center justify-center rounded-full border-4 border-red-500 bg-white/5">
                                    <FaUserCircle
                                        className="text-red-500"
                                        size={100}
                                    />
                                </div>
                        )}

                        <div>
                            <h1 className="heading-font text-3xl">
                                {profile?.name}
                            </h1>

                            <p className="mt-1 text-(--text-secondary)">
                                {profile?.email}
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">
                                <span
                                    className={`badge badge-lg ${roleColor[profile.role]} p-3`}
                                >
                                    {profile?.role}
                                </span>

                                <span className="badge badge-outline badge-lg p-2">
                                    {profile?.membership || "Basic"}
                                </span>

                                <span className="badge badge-success badge-lg p-3">
                                    {profile?.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        whileHover={{
                            scale: 1.05,
                            y: -2,
                        }}
                        whileTap={{
                            scale: 0.95,
                        }}
                        transition={{
                            duration: 0.5,
                        }}
                    >
                        <Link
                            href="/dashboard/profile/edit"
                            className="btn border-none bg-red-600 text-white hover:bg-red-700"
                        >
                            <FaEdit />
                            Edit Profile
                        </Link>
                    </motion.div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <div className="mb-3 flex items-center gap-2">
                        <FaPhone className="text-red-500" />
                        <h3 className="font-semibold">Phone</h3>
                    </div>

                    <p className="text-(--text-secondary)">
                        {profile?.phone || "Phone number not added yet."}
                    </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <div className="mb-3 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-red-500" />
                        <h3 className="font-semibold">Location</h3>
                    </div>

                    <p className="text-(--text-secondary)">
                        {profile?.location || "Location not added yet."}
                    </p>
                </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="mb-3 font-semibold">
                    Bio
                </h3>

                <p className="text-(--text-secondary)">
                    {profile?.bio || "Fitness enthusiast and MomentumX member."}
                </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-2">
                    <FaUserShield className="text-red-500" />

                    <span className="font-semibold">
                        Member Since:
                    </span>

                    <span className="text-(--text-secondary)">
                        {profile.createdAt?.split("T")[0]}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}