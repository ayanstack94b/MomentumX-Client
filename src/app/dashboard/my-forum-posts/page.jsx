"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaPlus, FaComments, FaTrash } from "react-icons/fa";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";


const MyForumPostsPage = () => {

    const { user } = useAuth();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("latest");

    useEffect(() => {

        const fetchMyPosts = async () => {

            if (!user?.email) {
                setLoading(false);
                return;
            }

            try {

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/forums`
                );

                const data = await res.json();

                const myPosts =
                    data.forums.filter(
                        (post) =>
                            post.authorEmail ===
                            user?.email
                    );
                setPosts(myPosts);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };

        fetchMyPosts();

    }, [user?.email]);

    // Filter + Sort
    const filteredPosts = [...posts]
        .filter(
            (post) =>
                post.title
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                post.description
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        )
        .sort((a, b) => {

            if (
                sortOrder === "latest"
            ) {
                return (
                    new Date(
                        b.createdAt
                    ) -
                    new Date(
                        a.createdAt
                    )
                );
            }

            return (
                new Date(
                    a.createdAt
                ) -
                new Date(
                    b.createdAt
                )
            );

        });

    // Delete Handler
    const handleDeletePost = async (id) => {

        const result =
            await Swal.fire({
                title:
                    "Delete Post?",
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

        if (!result.isConfirmed)
            return;

        try {

            const { data } = await axiosInstance.delete(
                `/forums/${id}`
            );

            if (
                data.deletedCount >
                0
            ) {

                setPosts(
                    (prev) =>
                        prev.filter(
                            (post) =>
                                post._id !==
                                id
                        )
                );

                Swal.fire({
                    icon:
                        "success",
                    title:
                        "Post Deleted",
                    timer:
                        1500,
                    showConfirmButton:
                        false,
                });

            }

        } catch (error) {

            console.error(error);

        }

    };



    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="relative min-h-screen overflow-hidden p-5">

            {/* Background Glow */}

            <motion.div
                animate={{
                    x: [0, 60, 0],
                    y: [0, -40, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute left-0 top-0 h-72 w-72 rounded-full bg-red-600/10 blur-3xl"
            />

            <motion.div
                animate={{
                    x: [0, -60, 0],
                    y: [0, 40, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-red-500/10 blur-3xl"
            />

            <div className="relative z-10">

                {/* Header */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
                >

                    <span className="rounded-full bg-red-600/20 px-4 py-2 text-sm text-red-400">
                        Community Hub
                    </span>

                    <h1 className="mt-5 heading-font text-4xl md:text-5xl">
                        My Forum Posts
                    </h1>

                    <p className="mt-4 text-gray-400">
                        View and manage your community discussions.
                    </p>

                </motion.div>

                {/* Empty State */}

                {posts.length === 0 ? (

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl"
                    >

                        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10">
                            <FaComments className="text-4xl text-red-500" />
                        </div>

                        <h2 className="text-3xl font-bold">
                            No Posts Yet
                        </h2>

                        <p className="mx-auto mt-4 max-w-md text-gray-400">
                            You haven't shared anything with the MomentumX community yet.
                        </p>

                        <Link
                            href="/dashboard/add-forum-post"
                            className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-red-500/20 bg-gradient-to-r from-red-600/20 to-red-500/10 px-6 py-4 font-medium text-red-400 backdrop-blur-xl transition-all duration-300 hover:border-red-500 hover:bg-red-500/20"
                        >
                            <FaPlus />
                            Write Your First Post
                        </Link>

                    </motion.div>

                ) : (
                    <>
                        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                            {/* Search */}

                            <input
                                type="text"
                                placeholder="Search posts..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none md:max-w-sm"
                            />

                            {/* Sort */}

                                <div className="flex gap-2 rounded-2xl border border-white/10 bg-white/5 p-1">

                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        whileHover={{ scale: 1.02 }}
                                        onClick={() =>
                                            setSortOrder(
                                                "latest"
                                            )
                                        }
                                        className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${sortOrder ===
                                                "latest"
                                                ? "bg-slate-600 text-white"
                                                : "text-gray-400 hover:text-white"
                                            }`}
                                    >
                                        Latest
                                    </motion.button>

                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        whileHover={{ scale: 1.02 }}
                                        onClick={() =>
                                            setSortOrder(
                                                "oldest"
                                            )
                                        }
                                        className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${sortOrder ===
                                                "oldest"
                                                ? "bg-slate-600 text-white"
                                                : "text-gray-400 hover:text-white"
                                            }`}
                                    >
                                        Oldest
                                    </motion.button>

                                </div>

                        </div>

                        {/* ========================================= */}
                        <div className="grid gap-5">

                                {filteredPosts.map((post, index) => (

                                <motion.div
                                    key={post._id}
                                    initial={{
                                        opacity: 0,
                                        y: 20,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        delay: index * 0.1,
                                    }}
                                    className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                                >

                                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                                        <div>

                                            <h2 className="text-2xl font-semibold">
                                                {post.title}
                                            </h2>

                                            <p className="mt-3 line-clamp-3 text-gray-400">
                                                {post.description}
                                            </p>

                                            <p className="mt-4 text-sm text-gray-500">
                                                {new Date(
                                                    post.createdAt
                                                ).toLocaleDateString()}
                                            </p>
                                                <div className="mt-5 flex flex-wrap gap-3">

                                                    <Link
                                                        href={`/forum/${post._id}`}
                                                        className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400 transition-all hover:bg-blue-500/20"
                                                    >
                                                        📖 Read More
                                                    </Link>

                                                    <motion.button
                                                        whileHover={{
                                                            scale: 1.03,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.97,
                                                        }}
                                                        onClick={() =>
                                                            handleDeletePost(
                                                                post._id
                                                            )
                                                        }
                                                        className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-all hover:bg-red-500/20"
                                                    >
                                                        🗑 Delete
                                                    </motion.button>

                                                </div>
                                        </div>

                                    </div>

                                </motion.div>

                            ))}

                        </div>

                    </>


                )}

            </div>

        </div>
    );
};

export default MyForumPostsPage;