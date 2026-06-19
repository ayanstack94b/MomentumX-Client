"use client";

import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";


export default function ProfilePage() {
    const { data: session, isPending } = authClient.useSession();
    const [profile, setProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true);


    if (isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    const user = session?.user;
    const email = session?.user?.email;

    useEffect(() => {
        if (!email) return;

        const fetchProfile = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5000/users/${email}`
                );

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
    if (loadingProfile) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Loading Profile...
            </div>
        );
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-5"
        >
            <h1 className="heading-font mb-6 text-4xl">
                My Profile
            </h1>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                <div className="flex flex-col items-center gap-6 md:flex-row">
                    {user?.image?.startsWith("http") ? (
                        <Image
                            src={user.image}
                            alt={user.name}
                            width={120}
                            height={120}
                            className="h-30 w-30 rounded-full object-cover border-4 border-red-500"
                        />
                    ) : (
                        <FaUserCircle className="text-[120px] text-gray-500" />
                    )}

                    <div className="space-y-3">
                        <h2 className="text-3xl font-bold">
                            {user?.name}
                        </h2>

                        <p className="text-[var(--text-secondary)]">
                            {user?.email}
                        </p>

                        <p className="text-sm text-[var(--text-secondary)]">
                            Member Since:{" "}
                            {new Date(user?.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}