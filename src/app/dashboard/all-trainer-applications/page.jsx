"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const AllTrainerApplicationsPage = () => {
    const [applications, setApplications] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

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

                                <button className="btn bg-green-600 text-white">
                                    Approve
                                </button>

                                <button className="btn bg-red-600 text-white">
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllTrainerApplicationsPage;