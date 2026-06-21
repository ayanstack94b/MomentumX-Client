"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const ManageClassesPage = () => {
    const [classes, setClasses] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const fetchClasses =
        async () => {
            try {
                const res =
                    await fetch(
                        "http://localhost:5000/admin/classes"
                    );

                const data =
                    await res.json();

                setClasses(data);
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
                            "PATCH",

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

    if (loading)
        return (
            <LoadingSpinner />
        );

    return (
        <div className="p-5">
            <h1 className="heading-font mb-8 text-4xl">
                Manage Classes
            </h1>

            <div className="grid gap-5">
                {classes.map(
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

                                    {item.status === "pending" && (
                                        <>
                                            <button
                                                onClick={() =>
                                                    updateStatus(
                                                        item._id,
                                                        "approved"
                                                    )
                                                }
                                                className="btn border-none bg-green-600 text-white"
                                            >
                                                Approve
                                            </button>

                                            <button
                                                onClick={() =>
                                                    updateStatus(
                                                        item._id,
                                                        "rejected"
                                                    )
                                                }
                                                className="btn border-none bg-red-600 text-white"
                                            >
                                                Reject
                                            </button>
                                        </>
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