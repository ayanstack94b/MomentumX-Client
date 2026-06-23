"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { motion } from "framer-motion";


const ManageClassesPage = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("latest");
    const [applications, setApplications] = useState([]);

    
    const fetchClasses = async () => {

        try {

            const res =
                await fetch(
                    "http://localhost:5000/admin/classes"
                );

            const data =
                await res.json();

            const sortedClasses =
                data.sort(
                    (a, b) =>
                        new Date(
                            b.createdAt
                        ) -
                        new Date(
                            a.createdAt
                        )
                );

            setClasses(
                sortedClasses
            );

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {
        const loadData = async () => {
            await fetchClasses();
        };

        loadData();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            const res =
                await fetch(
                    `http://localhost:5000/classes/${id}`,
                    {
                        method:
                            "DELETE",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body: JSON.stringify(
                            {
                                status,
                            }
                        ),
                    }
                );

            const result =
                await res.json();

            if (
                result.modifiedCount >
                0
            ) {
                Swal.fire({
                    icon: "success",
                    title:
                        "Updated",
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

            const res =
                await fetch(
                    `http://localhost:5000/classes/${id}`,
                    {
                        method:
                            "DELETE",
                    }
                );

            const data = await res.json();

            console.log(data);


            if (
                data.deletedCount > 0
            ) {

                setApplications(
                    (prev) => prev.filter((item) => item._id !== id)
                );
                console.log(item);

                Swal.fire({
                    icon:
                        "success",
                    title:
                        "Deleted",
                    text:
                        "Application removed successfully.",
                    timer:
                        1500,
                    showConfirmButton:
                        false,
                });

            }

        } catch (
        error
        ) {

            console.error(
                error
            );

        }

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

                                <div className="flex flex-col gap-3">
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
                                        <>
                                            <motion.button
                                                whileHover={{
                                                    scale: 1.03,
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
                                                className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400 transition-all hover:bg-green-500/20 hover:text-green-300"
                                            >
                                                ✓ Approve
                                            </motion.button>

                                            <motion.button
                                                whileHover={{
                                                    scale: 1.03,
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
                                                className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-all hover:bg-red-500/20 hover:text-red-300"
                                            >
                                                ✕ Reject
                                            </motion.button>
                                        </>
                                    )}

                                    {item.status === "rejected" && (

                                        <motion.button
                                            whileHover={{
                                                scale: 1.03,
                                            }}
                                            whileTap={{
                                                scale: 0.97,
                                            }}
                                            onClick={() =>
                                                handleDeleteClass(
                                                    item._id
                                                )
                                            }
                                            className="rounded-xl border border-red-500/20 bg-gradient-to-r from-red-500/10 to-rose-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-all hover:from-red-500/20 hover:to-rose-500/20"
                                        >
                                            🗑 Delete
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