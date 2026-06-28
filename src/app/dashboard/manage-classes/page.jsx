"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { motion } from "framer-motion";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";


const ManageClassesPage = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("latest");
    const { user } = useAuth();


    const fetchClasses = async () => {
        try {
            const { data: classesData } =
                await axiosInstance.get("/admin/classes");

            const sortedClasses =
                classesData.sort(
                    (a, b) =>
                        new Date(b.createdAt) -
                        new Date(a.createdAt)
                );

            setClasses(sortedClasses);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (!user || user.role !== "admin") return;
        const loadData = async () => {
            await fetchClasses();
        };

        loadData();
    }, [user]);

    const updateStatus = async (id, status) => {
        try {

            console.log("ID:", id);
            console.log("STATUS:", status);

            const { data: updateResult } = await axiosInstance.patch(
                `/classes/${id}`,
                {
                    status,
                }
            );
            console.log("RESULT:", updateResult);

            if (updateResult.modifiedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: "Updated",
                });

                fetchClasses();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteClass = async (id) => {
        console.log(
            "Deleting ID:",
            id
        );
        const result =
            await Swal.fire({
                title:
                    "Delete Application?",
                text:
                    "This action cannot be undone.",
                icon:
                    "warning",
                showCancelButton:
                    true,
                confirmButtonColor:
                    "#dc2626",
                cancelButtonColor:
                    "#374151",
                confirmButtonText:
                    "Yes, Delete",
            });

        if (!result.isConfirmed)
            return;

        try {
            const { data: deleteResult } = await axiosInstance.delete(
                `/admin/classes/${id}`
            );

            // console.log(deleteResult);

            if (deleteResult.deletedCount > 0) {
                setClasses((prev) =>
                    prev.filter((item) => item._id !== id)
                );

                Swal.fire({
                    icon: "success",
                    title: "Deleted",
                    text: "Class removed successfully.",
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
        } catch (
        error
        ) { console.error(error); }
    };

    if (loading)
        return (
            <LoadingSpinner />
        );

    const sortedClasses = [...classes].sort(
        (a, b) =>

            sortBy ===
                "latest"

                ? new Date(
                    b.createdAt
                ) -
                new Date(
                    a.createdAt
                )

                : new Date(
                    a.createdAt
                ) -
                new Date(
                    b.createdAt
                )
    );


    return (
        <div className="p-5">
            {/* Page Header */}
            <h1 className="text-4xl font-bold">
                Manage Classes
            </h1>

            {/* dropdown filter div */}
            <div className="mb-5 flex items-center justify-between">

                <h2 className="text-lg font-semibold text-white">
                    Classes List
                </h2>
                {/* filter */}
                <select
                    value={sortBy}
                    onChange={(e) =>
                        setSortBy(
                            e.target.value
                        )
                    }
                    className="select select-bordered select-sm bg-white/5"
                >

                    <option value="latest">
                        Latest First
                    </option>

                    <option value="oldest">
                        Oldest First
                    </option>

                </select>

            </div>

            {/* Main conditional grid*/}
            <div className="grid gap-5">
                {sortedClasses.map(
                    (item) => (
                        <div
                            key={
                                item._id
                            }
                            className="rounded-3xl border border-white/10 bg-white/5 p-6"
                        >
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold">
                                        {
                                            item.className
                                        }
                                    </h3>
                                    <p className="mt-1 text-xs text-gray-500">

                                        {new Date(
                                            item.createdAt
                                        ).toLocaleDateString()}

                                    </p>

                                    <p className="text-sm text-gray-400">
                                        Trainer:
                                        {" "}
                                        {
                                            item.trainerName
                                        }
                                    </p>

                                    <p className="mt-2 text-sm">
                                        Category:
                                        {" "}
                                        {
                                            item.category
                                        }
                                    </p>
                                </div>

                                <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur-md">
                                    <span
                                        className={`rounded-full px-4 py-2 text-center text-xs font-semibold ${item.status === "approved"
                                            ? "bg-green-500/10 text-green-400"
                                            : item.status === "rejected"
                                                ? "bg-red-500/10 text-red-400"
                                                : "bg-yellow-500/10 text-yellow-400"
                                            }`}
                                    >
                                        {item.status}

                                    </span>

                                    {/* Approve reject btn */}
                                    {item.status === "pending" && (

                                        <div className="flex flex-col gap-2">

                                            <motion.button
                                                whileHover={{
                                                    scale: 1.02,
                                                }}
                                                whileTap={{
                                                    scale: 0.97,
                                                }}
                                                onClick={() =>
                                                    updateStatus(
                                                        item._id,
                                                        "approved"
                                                    )
                                                }
                                                className="group flex items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 to-green-500/10 px-4 py-3 text-sm font-semibold text-emerald-400 transition-all hover:from-emerald-500/20 hover:to-green-500/20"
                                            >
                                                ✓ Approve Class
                                            </motion.button>

                                            <motion.button
                                                whileHover={{
                                                    scale: 1.02,
                                                }}
                                                whileTap={{
                                                    scale: 0.97,
                                                }}
                                                onClick={() =>
                                                    updateStatus(
                                                        item._id,
                                                        "rejected"
                                                    )
                                                }
                                                className="group flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-gradient-to-r from-red-500/10 to-rose-500/10 px-4 py-3 text-sm font-semibold text-red-400 transition-all hover:from-red-500/20 hover:to-rose-500/20"
                                            >
                                                ✕ Reject Class
                                            </motion.button>

                                        </div>

                                    )}

                                    {/* For reject classes */}
                                    {item.status === "rejected" && (

                                        <motion.button
                                            whileHover={{
                                                scale: 1.02,
                                            }}
                                            whileTap={{
                                                scale: 0.97,
                                            }}
                                            onClick={() =>
                                                handleDeleteClass(
                                                    item._id
                                                )
                                            }
                                            className="flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-gradient-to-r from-red-500/10 to-rose-500/10 px-4 py-3 text-sm font-semibold text-red-400 transition-all hover:from-red-500/20 hover:to-rose-500/20"
                                        >
                                            🗑 Delete Class
                                        </motion.button>

                                    )}
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default ManageClassesPage;