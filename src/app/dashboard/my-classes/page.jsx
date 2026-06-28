"use client"
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { motion } from "framer-motion";
import Swal from 'sweetalert2';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import axiosInstance from '@/lib/axios';


const MyClassesPage = () => {
    const { user } = useAuth();
    const email = user?.email;

    const [classes, setClasses] = useState([])
    const [loading, setLoading] = useState(true);
    const [selectedClass, setSelectedClass] = useState(null);
    const [members, setMembers] = useState([]);


    useEffect(() => {
        if (!email) return;

        const fetchClasses = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/classes/trainer/${email}`
                );

                const data = await res.json();

                setClasses(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchClasses();
    }, [email]);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Delete Class?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            confirmButtonText: "Delete",
        });

        if (!result.isConfirmed) return;

        try {
            const { data: deleteResult } = await axiosInstance.delete(
                `/classes/${id}`
            );

            if (deleteResult.deletedCount > 0) {
                await Swal.fire({
                    icon: "success",
                    title: "Deleted",
                    timer: 1200,
                    showConfirmButton: false,
                });

                setClasses((prev) =>
                    prev.filter((item) => item._id !== id)
                );
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Delete Failed",
                text:
                    error.response?.data?.message ||
                    "Something went wrong.",
            });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    const handleViewMembers = async (classId) => {
        try {
            const { data: membersData } = await axiosInstance.get(
                `/bookings/class/${classId}`
            );

            // console.log("Members:", membersData);

            setMembers(
                Array.isArray(membersData)
                    ? membersData
                    : []
            );
            document.getElementById("members_modal").showModal();

            // setSelectedClass(classId);

        } catch (error) {
            console.log(error.response?.data);
        }
    };


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 p-5"
        >
            <div>
                <h1 className="heading-font text-4xl">
                    My Classes
                </h1>

                <p className="mt-2 text-[var(--text-secondary)]">
                    Manage all classes created by you.
                </p>
            </div>

            {classes.length === 0 ? (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
                    <h3 className="text-2xl font-semibold">
                        No Classes Found
                    </h3>

                    <p className="mt-2 text-[var(--text-secondary)]">
                        Create your first fitness class.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {classes.map((item) => (
                        <motion.div
                            key={item._id}
                            whileHover={{
                                y: -5,
                            }}
                            className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
                        >
                            <div className="relative h-56">
                                <Image
                                    src={item?.image}
                                    alt={item?.className}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                    className="object-cover"
                                />
                            </div>

                            <div className="p-5">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold">
                                        {item?.className}
                                    </h2>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium ${item.status === "approved"
                                                ? "bg-green-500/20 text-green-400"
                                                : item.status === "rejected"
                                                    ? "bg-red-500/20 text-red-400"
                                                    : "bg-yellow-500/20 text-yellow-400"
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </div>

                                <div className="mt-4 space-y-2 text-sm">
                                    <p>
                                        <strong>Category:</strong>{" "}
                                        {item.category}
                                    </p>

                                    <p>
                                        <strong>Difficulty:</strong>{" "}
                                        {item.difficulty}
                                    </p>

                                    <p>
                                        <strong>Duration:</strong>{" "}
                                        {item.duration}
                                    </p>

                                    <p>
                                        <strong>Created:</strong>{" "}
                                        {new Date(
                                            item.createdAt
                                        ).toLocaleDateString()}
                                    </p>

                                    <p>
                                        <strong>Price:</strong> ₹
                                        {item.price}
                                    </p>
                                    <p>
                                        <strong>Bookings:</strong>{" "}
                                        {item.bookingCount}
                                    </p>
                                    
                                </div>

                                <div className="mt-5 grid grid-cols-2 gap-3">
                                    <Link
                                        href={`/dashboard/update-class/${item._id}`}
                                        className="btn btn-sm bg-red-600 text-white border-none hover:bg-red-700"
                                    >
                                        Update
                                    </Link>

                                    <motion.button
                                        onClick={() => handleDelete(item._id)}
                                        whileHover={{
                                            scale: 1.05,
                                            y: -2,
                                        }}
                                        whileTap={{
                                            scale: 0.95,
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 15,
                                        }}
                                        className="btn btn-sm border border-red-500 bg-red-500/10 text-red-500 hover:bg-red-600 hover:text-white"
                                    >
                                        Delete
                                    </motion.button>

                                    <button
                                        onClick={() => handleViewMembers(item._id)}
                                        className="btn btn-sm col-span-2 border border-blue-500 bg-blue-500/10 text-blue-400 hover:bg-blue-600 hover:text-white"
                                    >
                                        View Members
                                    </button>

                                </div>

                                <dialog
                                    id="members_modal"
                                    className="modal"
                                >
                                    <div className="modal-box max-w-2xl bg-slate-900 border border-white/10">
                                        <h3 className="text-2xl font-bold mb-5">
                                            Enrolled Members
                                        </h3>

                                        {members.length === 0 ? (
                                            <p className="text-gray-400">
                                                No members enrolled yet.
                                            </p>
                                        ) : (
                                            <div className="space-y-3">
                                                {members.map(
                                                    (
                                                        member,
                                                        index
                                                    ) => (
                                                        <div
                                                            key={index}
                                                            className="rounded-xl border border-white/10 bg-white/5 p-4"
                                                        >
                                                            <p className="font-semibold">
                                                                {
                                                                    member.memberName
                                                                }
                                                            </p>

                                                            <p className="text-sm text-gray-400">
                                                                {
                                                                    member.memberEmail
                                                                }
                                                            </p>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}

                                        <div className="modal-action">
                                            <form method="dialog">
                                                <button className="btn">
                                                    Close
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>

                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default MyClassesPage;