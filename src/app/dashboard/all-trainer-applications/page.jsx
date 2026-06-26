"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";

const AllTrainerApplicationsPage = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const { user } = useAuth();
    const updateApplicationStatus = async (id, status, feedback = "") => {
        try {
            const { data: updateResult } =
                await axiosInstance.patch(
                    `/trainer-applications/${id}`,
                    {
                        status,
                        feedback,
                    }
                );

            if (updateResult.success) {
                Swal.fire({
                    icon: "success",
                    title: `Application ${status}`,
                    timer: 1500,
                    showConfirmButton: false,
                });

                setApplications((prev) =>
                    prev.map((application) =>
                        application._id === id
                            ? {
                                ...application,
                                status,
                                feedback,
                            }
                            : application
                    )
                );
            }
        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: "error",
                title:
                    "Update Failed",
            });
        }
    };


    useEffect(() => {
        if (!user || user.role !== "admin") return;

        const fetchApplications = async () => {
            try {
                const { data: applicationsData } =
                    await axiosInstance.get(
                        "/trainer-applications"
                    );

                setApplications(applicationsData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [user]);

    if (loading) {
        return <LoadingSpinner />;
    }

    // stats

    const totalApplications = applications.length;

    const pendingApplications = applications.filter(
        (item) =>
            item.status ===
            "pending"
    ).length;

    const approvedApplications = applications.filter(
        (item) =>
            item.status ===
            "approved"
    ).length;

    const rejectedApplications = applications.filter(
        (item) =>
            item.status ===
            "rejected"
    ).length;

    // Filtered Data
    const filteredApplications = applications.filter(

        (item) => {

            const matchesStatus =
                filter ===
                    "all"
                    ? true
                    : item.status ===
                    filter;

            const matchesSearch =
                item.name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                item.email
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            return (
                matchesStatus &&
                matchesSearch
            );

        }
    );
    console.log(
        applications[0]
    );

    // Handle delete 
    const handleDeleteApplication = async (id) => {

        const result = await Swal.fire({
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
                    "Delete",
            });

        if (
            !result.isConfirmed
        ) {
            return;
        }

        try {
            const { data: deleteResult } =
                await axiosInstance.delete(
                    `/trainer-applications/${id}`
                );

            if (deleteResult.deletedCount > 0) {

                setApplications((prev) =>
                    prev.filter(
                        (item) => item._id !== id
                    )
                );

                Swal.fire({
                    icon: "success",
                    title: "Application Deleted",
                    timer: 1500,
                    showConfirmButton: false,
                });
            }

        } catch (error) {

            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Delete Failed",
                text:
                    error.response?.data?.message ||
                    "Something went wrong.",
            });

        }
    }

    return (
        <div className="p-5">
            <h1 className="heading-font mb-8 text-4xl">
                Trainer Applications
            </h1>

            {/* Dynamic stats card */}
            <div className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

                {/* card-1 */}
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

                    <h3 className="text-gray-400">
                        Total Applications
                    </h3>

                    <h2 className="mt-2 text-4xl font-bold">
                        {totalApplications}
                    </h2>
                </div>

                {/* card-2 */}
                <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/5 p-6">

                    <h3 className="text-yellow-400">
                        Pending
                    </h3>

                    <h2 className="mt-2 text-4xl font-bold">
                        {pendingApplications}
                    </h2>

                </div>

                {/* card-3 */}
                <div className="rounded-3xl border border-green-500/20 bg-green-500/5 p-6">

                    <h3 className="text-green-400">
                        Approved
                    </h3>

                    <h2 className="mt-2 text-4xl font-bold">
                        {approvedApplications}
                    </h2>

                </div>

                {/* card-4 */}
                <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6">

                    <h3 className="text-red-400">
                        Rejected
                    </h3>

                    <h2 className="mt-2 text-4xl font-bold">
                        {rejectedApplications}
                    </h2>

                </div>

            </div>


            {/* Search + Filter */}
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                {/* Search */}
                <div className="relative w-full lg:max-w-sm">
                    <input
                        type="text"
                        placeholder="Search by trainer name or email..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                        className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-sm text-white outline-none backdrop-blur-xl"
                    />

                </div>


                {/* Filters */}
                <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">

                    {[
                        "all",
                        "pending",
                        "approved",
                        "rejected",
                    ].map(
                        (status) => (

                            <button
                                key={status}
                                onClick={() =>
                                    setFilter(status)
                                }
                                className={`rounded-xl px-4 py-3 text-center text-sm font-medium capitalize transition-all ${filter === status
                                    ? "bg-red-600 text-white"
                                    : "border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10"
                                    }`}
                            >
                                {status}
                            </button>

                        )
                    )}

                </div>

            </div>

            <div className="grid gap-5">
                {filteredApplications.map((application) => (
                    <div
                        key={application._id}
                        className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                    >
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h3 className="text-xl font-semibold">
                                    {application.name}
                                </h3>

                                <p className="text-sm text-gray-400">
                                    {application.email}
                                </p>

                                <p className="mt-2 text-sm">
                                    Experience: {application.experience}
                                </p>

                                <p className="text-sm">
                                    Specialization: {application.specialization}
                                </p>
                            </div>



                            <div className="flex w-full flex-col gap-3 md:w-auto md:min-w-[180px]">

                                {/* Status Badge */}
                                <span
                                    className={`rounded-full px-4 py-2 text-center text-xs font-semibold ${application.status === "approved"
                                            ? "bg-green-500/10 text-green-400"
                                            : application.status === "rejected"
                                                ? "bg-red-500/10 text-red-400"
                                                : "bg-yellow-500/10 text-yellow-400"
                                        }`}
                                >
                                    {application.status}
                                </span>

                                {/* Pending Actions */}
                                {application.status === "pending" && (

                                    <div className="grid grid-cols-2 gap-2">

                                        <button
                                            onClick={() =>
                                                updateApplicationStatus(
                                                    application._id,
                                                    "approved"
                                                )
                                            }
                                            className="rounded-xl border border-green-500/20 bg-green-500/10 px-3 py-2 text-sm font-medium text-green-400 transition-all hover:bg-green-500/20"
                                        >
                                            Approve
                                        </button>

                                        <button
                                            onClick={async () => {

                                                const result =
                                                    await Swal.fire({
                                                        title:
                                                            "Reject Application",
                                                        input:
                                                            "textarea",
                                                        inputLabel:
                                                            "Feedback",
                                                        inputPlaceholder:
                                                            "Tell the applicant why they were rejected...",
                                                        showCancelButton:
                                                            true,
                                                        confirmButtonText:
                                                            "Reject",
                                                        confirmButtonColor:
                                                            "#dc2626",
                                                    });

                                                if (
                                                    result.isConfirmed &&
                                                    result.value
                                                ) {

                                                    updateApplicationStatus(
                                                        application._id,
                                                        "rejected",
                                                        result.value
                                                    );

                                                }

                                            }}
                                            className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-400 transition-all hover:bg-red-500/20"
                                        >
                                            Reject
                                        </button>

                                    </div>

                                )}

                                {/* Rejected Action */}
                                {application.status === "rejected" && (

                                    <motion.button
                                        whileHover={{
                                            scale: 1.03,
                                        }}
                                        whileTap={{
                                            scale: 0.97,
                                        }}
                                        onClick={() =>
                                            handleDeleteApplication(
                                                application._id
                                            )
                                        }
                                        className="rounded-xl border border-red-500/20 bg-gradient-to-r from-red-500/10 to-rose-500/10 px-4 py-3 text-sm font-medium text-red-400 transition-all hover:from-red-500/20 hover:to-rose-500/20"
                                    >
                                        🗑 Delete Application
                                    </motion.button>

                                )}

                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
};

export default AllTrainerApplicationsPage;