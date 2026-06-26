"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";

const ManageTrainersPage = () => {
    const { user, loading: authLoading } = useAuth();
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);


    async function fetchUsers() {
        try {
            const { data: trainersData } =
                await axiosInstance.get("/users/trainers");

            setTrainers(trainersData);
            // console.log(usersData);
        } catch (error) {
            console.error(error);

        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        if (authLoading) return;
        if (!user || user.role !== "admin") return;

        void fetchUsers();
    }, [user, authLoading]);



    const handleRemoveTrainer = async (id) => {
        const result = await Swal.fire({
            title: "Demote Trainer?",
            text: "This trainer will lose trainer privileges and become a member.",
            icon: "warning",
            showCancelButton: true,
        });

        if (!result.isConfirmed) return;

        const { data: updateResult } =
            await axiosInstance.patch(
                `/users/remove-trainer/${id}`
            );

        if (updateResult.modifiedCount > 0) {
            Swal.fire({
                icon: "success",
                title: "Trainer Removed",
                timer: 1200,
                showConfirmButton: false,
            });

            fetchUsers();
        }
    };

    if (loading) {

        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <span className="loading loading-spinner loading-lg text-red-500"></span>
            </div>
        );
    }

    return (

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 sm:p-5"
        >
            <div className="mb-8">
                <h1 className="heading-font text-3xl sm:text-4xl">
                    Manage Trainers                </h1>
                <p className="mt-2 text-sm sm:text-base text-gray-400">
                    Manage active trainers.
                </p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden rounded-3xl border border-white/10 bg-base-200/30"
            >

                {/* Table Wrapper */}
                <div className="w-full">
                    {/* Horizontal Scroll Area */}
                    {/* Table Header */}
                    <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-white/5 via-white/[0.03] to-transparent px-6 py-5">

                        <div>

                            <h2 className="heading-font text-2xl text-white">
                                Manage Trainers
                            </h2>

                            <p className="mt-1 text-sm text-gray-400">
                                View all active trainers and manage their access.
                            </p>

                        </div>

                        <motion.div
                            animate={{
                                boxShadow: [
                                    "0 0 0 rgba(239,68,68,0)",
                                    "0 0 18px rgba(239,68,68,.25)",
                                    "0 0 0 rgba(239,68,68,0)",
                                ],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                            }}
                            className="rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 backdrop-blur-xl"
                        >
                            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-red-400">
                                {trainers.length} Active Trainers
                            </span>
                        </motion.div>

                    </div>



                    <div className="overflow-x-auto max-w-85 p-5 sm:max-w-150 md:max-w-187.5 lg:max-w-full">
                        <table className="table table-xs table-pin-rows table-pin-cols">
                            <thead>
                                <tr className="bg-base-300 text-xs uppercase tracking-widest text-gray-400">

                                    <th className="w-75">
                                        User
                                    </th>

                                    <th className="w-87.5">
                                        Email
                                    </th>

                                    <th className="w-37.5">
                                        Role
                                    </th>

                                    

                                    <th className="w-75">
                                        Actions
                                    </th>

                                </tr>
                            </thead>

                            <tbody>
                                {trainers.map((member, index) => (
                                    <motion.tr
                                        key={member._id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.25,
                                            delay: index * 0.03,
                                        }}
                                        className="border-b border-white/5 hover:bg-white/5"
                                    >
                                        {/* User */}
                                        <td className="min-w-[300px]">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={member.image}
                                                    alt={member.name}
                                                    className="h-11 w-11 rounded-full object-cover ring ring-white/10"
                                                />
                                                <div>
                                                    <h3 className="font-semibold text-white">
                                                        {member.name}
                                                    </h3>
                                                    <p className="text-xs text-gray-500">
                                                        Member Since
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Email - Hidden on Small Devices */}
                                        <td className="min-w-87.5">
                                            <span className="text-xs sm:text-sm text-gray-400">
                                                {member.email}
                                            </span>
                                        </td>

                                        {/* Role */}
                                        <td>
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${member.role === "admin"
                                                    ? "border border-red-500/20 bg-red-500/10 text-red-400"
                                                    : member.role === "trainer"
                                                        ? "border border-blue-500/20 bg-blue-500/10 text-blue-400"
                                                        : "border border-green-500/20 bg-green-500/10 text-green-400"
                                                    }`}
                                            >
                                                {member.role}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="min-w-[300px]">
                                            {/* Action Buttons */}
                                            <div className="flex flex-wrap gap-2">
                                                <motion.button
                                                    whileHover={{
                                                        y: -2,
                                                        scale: 1.03,
                                                    }}
                                                    whileTap={{
                                                        scale: 0.96,
                                                    }}
                                                    onClick={() =>
                                                        handleRemoveTrainer(member._id)
                                                    }
                                                    className="group relative overflow-hidden rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-400 transition-all duration-300 hover:border-red-500/40 hover:bg-red-500/20 hover:text-white"
                                                >
                                                    <span className="relative z-10">
                                                        Demote Trainer
                                                    </span>

                                                    <motion.div
                                                        animate={{
                                                            x: ["-120%", "220%"],
                                                        }}
                                                        transition={{
                                                            duration: 2,
                                                            repeat: Infinity,
                                                            ease: "linear",
                                                        }}
                                                        className="absolute inset-y-0 w-8 -skew-x-12 bg-white/20 blur-sm"
                                                    />
                                                </motion.button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ManageTrainersPage;