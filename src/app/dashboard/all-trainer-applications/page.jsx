"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Swal from "sweetalert2";

const AllTrainerApplicationsPage = () => {
    const [applications, setApplications] =
        useState([]);

    const [loading, setLoading] =
        useState(true);


    const updateApplicationStatus = async (id, status,
        feedback = "") => {
        try {
            const res = await fetch(
                `http://localhost:5000/trainer-applications/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        status,
                        feedback,
                    }),
                }
            );

            const data =
                await res.json();

            if (data.success) {
                Swal.fire({
                    icon: "success",
                    title: `Application ${status}`,
                    timer: 1500,
                    showConfirmButton: false,
                });

                setApplications(
                    applications.map(
                        (application) =>
                            application._id ===
                                id
                                ? {
                                    ...application,
                                    status,
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
        const fetchApplications =
            async () => {
                try {
                    const res =
                        await fetch(
                            "http://localhost:5000/trainer-applications"
                        );

                    const data =
                        await res.json();

                    setApplications(
                        data
                    );
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };

        fetchApplications();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="p-5">
            <h1 className="heading-font mb-8 text-4xl">
                Trainer Applications
            </h1>

            <div className="grid gap-5">
                {applications.map((application) => (
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



                            <div className="flex flex-col gap-3">
                                <span
                                    className={`rounded-full px-4 py-2 text-center text-xs font-semibold ${application.status ===
                                        "approved"
                                        ? "bg-green-500/10 text-green-400"
                                        : application.status ===
                                            "rejected"
                                            ? "bg-red-500/10 text-red-400"
                                            : "bg-yellow-500/10 text-yellow-400"
                                        }`}
                                >
                                    {application.status}
                                </span>

                                {application.status ===
                                    "pending" && (
                                        <>
                                            <button
                                                onClick={() =>
                                                    updateApplicationStatus(
                                                        application._id,
                                                        "approved"
                                                    )
                                                }
                                                className="btn border-none bg-green-600 text-white"
                                            >
                                                Approve
                                            </button>

                                            <button
                                                onClick={async () => {
                                                    const result =
                                                        await Swal.fire({
                                                            title:
                                                                "Reject Application",
                                                            input: "textarea",
                                                            inputLabel:
                                                                "Feedback",
                                                            inputPlaceholder:
                                                                "Tell the applicant why they were rejected...",
                                                            showCancelButton: true,
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
                                                className="btn border-none bg-red-600 text-white"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}

                                {application.status ===
                                    "approved" && (
                                        <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-2 text-center text-sm font-medium text-green-400">
                                            ✓ Approved
                                        </div>
                                    )}

                                {application.status ===
                                    "rejected" && (
                                        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-center text-sm font-medium text-red-400">
                                            ✕ Rejected
                                        </div>
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