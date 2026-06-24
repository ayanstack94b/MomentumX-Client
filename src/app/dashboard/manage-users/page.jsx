"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import Swal from "sweetalert2";

import Image from "next/image";

import { authClient } from "@/lib/auth-client";

const ManageUsersPage = () => {
    const { data: session, status } = authClient.useSession();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {

        fetchUsers();

    }, []);

    async function fetchUsers() {

        try {

            const res =
                await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/users`
                );

            const data =
                await res.json();

            setUsers(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    };


    const handleRemoveAdmin = async (id) => {

        const result =
            await Swal.fire({
                title:
                    "Remove Admin?",
                text:
                    "This user will become a member.",
                icon:
                    "warning",
                showCancelButton:
                    true,
                confirmButtonColor:
                    "#f97316",
            });

        if (
            !result.isConfirmed
        ) {
            return;
        }

        const res =
            await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/users/remove-admin/${id}`,
                {
                    method:
                        "PATCH",
                }
            );

        const data =
            await res.json();

        if (
            data.modifiedCount >
            0
        ) {

            Swal.fire({
                icon:
                    "success",
                title:
                    "Admin Removed",
                timer:
                    1200,
                showConfirmButton:
                    false,
            });

            fetchUsers();
        }
    };

    const handleMakeAdmin = async (id) => {

        const result =
            await Swal.fire({
                title:
                    "Make Admin?",
                icon:
                    "question",
                showCancelButton:
                    true,
            });

        if (!result.isConfirmed)
            return;

        const res =
            await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/users/admin/${id}`,
                {
                    method:
                        "PATCH",
                }
            );

        const data =
            await res.json();

        if (
            data.modifiedCount >
            0
        ) {

            Swal.fire({
                icon:
                    "success",
                title:
                    "Admin Updated",
                timer:
                    1200,
                showConfirmButton:
                    false,
            });

            fetchUsers();
        }
    };

    const handleBlockUser = async (id) => {

        const result =
            await Swal.fire({
                title:
                    "Block User?",
                icon:
                    "warning",
                showCancelButton:
                    true,
            });

        if (!result.isConfirmed)
            return;

        const res =
            await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/users/block/${id}`,
                {
                    method:
                        "PATCH",
                }
            );

        const data =
            await res.json();

        if (
            data.modifiedCount >
            0
        ) {

            Swal.fire({
                icon:
                    "success",
                title:
                    "User Blocked",
                timer:
                    1200,
                showConfirmButton:
                    false,
            });

            fetchUsers();
        }
    };

    const handleUnblockUser = async (id) => {

        const res =
            await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/users/unblock/${id}`,
                {
                    method:
                        "PATCH",
                }
            );

        const data =
            await res.json();

        if (
            data.modifiedCount >
            0
        ) {

            Swal.fire({
                icon:
                    "success",
                title:
                    "User Unblocked",
                timer:
                    1200,
                showConfirmButton:
                    false,
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
                    Manage Users
                </h1>
                <p className="mt-2 text-sm sm:text-base text-gray-400">
                    Manage members, admins and account status.
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
                    <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-6">

                        <div>

                            <h2 className="text-lg font-semibold text-white">
                                Users Directory
                            </h2>

                            <p className="text-xs text-gray-400">
                                Manage roles and permissions
                            </p>

                        </div>

                        <motion.div
                            animate={{
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                            className="badge badge-error badge-outline"
                        >
                            {users.length} Users
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

                                    <th className="w-37.5">
                                        Status
                                    </th>

                                    <th className="w-75">
                                        Actions
                                    </th>

                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user, index) => (
                                    <motion.tr
                                        key={user._id}
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
                                                    src={user.image}
                                                    alt={user.name}
                                                    className="h-11 w-11 rounded-full object-cover ring ring-white/10"
                                                />
                                                <div>
                                                    <h3 className="font-semibold text-white">
                                                        {user.name}
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
                                                {user.email}
                                            </span>
                                        </td>

                                        {/* Role */}
                                        <td>
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${user.role === "admin"
                                                    ? "border border-red-500/20 bg-red-500/10 text-red-400"
                                                    : user.role === "trainer"
                                                        ? "border border-blue-500/20 bg-blue-500/10 text-blue-400"
                                                        : "border border-green-500/20 bg-green-500/10 text-green-400"
                                                    }`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td>
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${user.status === "blocked"
                                                    ? "border border-red-500/20 bg-red-500/10 text-red-400"
                                                    : "border border-green-500/20 bg-green-500/10 text-green-400"
                                                    }`}
                                            >
                                                {user.status}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="min-w-[300px]">
                                            {/* Action Buttons */}
                                            <div className="flex flex-wrap gap-2">
                                                {/* Prevent Admin From Managing Himself */}
                                                {user.email !== session?.user?.email && (
                                                    <>
                                                        {/* Admin Controls */}
                                                        {user.role === "admin" ? (
                                                            <motion.button
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                                onClick={() => handleRemoveAdmin(user._id)}
                                                                className="btn btn-xs btn-warning"
                                                            >
                                                                Remove Admin
                                                            </motion.button>
                                                        ) : (
                                                            <motion.button
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                                onClick={() => handleMakeAdmin(user._id)}
                                                                className="btn btn-xs btn-secondary"
                                                            >
                                                                Make Admin
                                                            </motion.button>
                                                        )}

                                                        {/* User Status Controls */}
                                                        {user.status === "blocked" ? (
                                                            <motion.button
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                                onClick={() => handleUnblockUser(user._id)}
                                                                className="btn btn-xs btn-success"
                                                            >
                                                                Unblock
                                                            </motion.button>
                                                        ) : (
                                                            <motion.button
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                                onClick={() => handleBlockUser(user._id)}
                                                                className="btn btn-xs btn-error"
                                                            >
                                                                Block
                                                            </motion.button>
                                                        )}
                                                    </>
                                                )}
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

export default ManageUsersPage;