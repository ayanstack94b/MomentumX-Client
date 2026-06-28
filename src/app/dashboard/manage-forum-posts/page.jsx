"use client";

import axiosInstance from "@/lib/axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
    FaComments,
    FaUsers,
    FaFire,
} from "react-icons/fa";
import Swal from "sweetalert2";

const ManageForumPostsPage = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [filterBy, setFilterBy] = useState("latest");

    useEffect(() => {

        const fetchPosts =
            async () => {

                try {

                    const res =
                        await fetch(
                            `${process.env.NEXT_PUBLIC_API_URL}/forums`
                        );

                    const data = await res.json();

                    const sortedPosts =
                        data.forums.sort(
                            (a, b) =>
                                new Date(
                                    b.createdAt
                                ) -
                                new Date(
                                    a.createdAt
                                )
                        );

                    setPosts(
                        sortedPosts
                    );
                    // console.log(posts);

                } catch (error) {

                    console.error(error);

                } finally {

                    setLoading(false);

                }
            };

        fetchPosts();

    }, []);

    const handleDelete = async (id) => {

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
            });

        if (
            !result.isConfirmed
        ) {
            return;
        }

        const { data } = await axiosInstance.delete(
            `/forums/${id}`
        );

        if (
            data.deletedCount >
            0
        ) {

            setPosts(
                posts.filter(
                    (
                        post
                    ) =>
                        post._id !==
                        id
                )
            );

            Swal.fire({
                icon:
                    "success",
                title:
                    "Post Deleted",
            });
        }
    };

    // Total Forum Posts
    const totalPosts = posts.length;

    // Unique Authors
    const activeAuthors = new Set(
        posts.map(
            (post) =>
                post.authorEmail
        )
    ).size;

    // Community Activity
    const totalActivity =
        posts.reduce(
            (
                total,
                post
            ) =>
                total +
                (post.likes || 0) +
                (post.dislikes || 0),
            0
        );

    const sortedPosts = [...posts].sort(
        (a, b) =>
            filterBy === "latest"
                ? new Date(b.createdAt) -
                new Date(a.createdAt)
                : new Date(a.createdAt) -
                new Date(b.createdAt)
    );



    return (
        <div className="relative min-h-screen overflow-hidden p-5">

            {/* Animated Background */}

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

                {/* Hero */}

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
                        Admin Control Center
                    </span>

                    <h1 className="mt-5 heading-font text-5xl">
                        Manage Forum Posts
                    </h1>

                    <p className="mt-4 max-w-2xl text-gray-400">
                        Monitor community discussions,
                        moderate content and maintain
                        a healthy fitness community.
                    </p>

                </motion.div>
             


                {/* Stats */}
                <div className="mb-8 grid gap-6 md:grid-cols-3">

                    <motion.div
                        whileHover={{
                            y: -5,
                        }}
                        className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                    >
                        <FaComments className="mb-4 text-3xl text-red-500" />

                        <h3 className="text-gray-400">
                            Total Posts
                        </h3>

                        <h2 className="mt-2 text-4xl font-bold">
                            {totalPosts}
                        </h2>
                    </motion.div>

                    <motion.div
                        whileHover={{
                            y: -5,
                        }}
                        className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                    >
                        <FaUsers className="mb-4 text-3xl text-red-500" />

                        <h3 className="text-gray-400">
                            Active Authors
                        </h3>

                        <h2 className="mt-2 text-4xl font-bold">
                            {activeAuthors}
                        </h2>
                    </motion.div>

                    <motion.div
                        whileHover={{
                            y: -5,
                        }}
                        className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                    >
                        <FaFire className="mb-4 text-3xl text-red-500" />

                        <h3 className="text-gray-400">
                            Community Activity
                        </h3>

                        <h2 className="mt-2 text-4xl font-bold">
                            {totalActivity}
                        </h2>
                    </motion.div>

                </div>

                {/* Filter div */}
                <div className="mb-6 flex justify-end mr-6">
                    <select
                        value={filterBy}
                        onChange={(e) =>
                            setFilterBy(e.target.value)
                        }
                        className="rounded-xl border select select-bordered border-white/10 bg-slate-900 px-4 py-2"
                    >
                        <option value="latest">
                            Latest Posts
                        </option>

                        <option value="oldest">
                            Oldest Posts
                        </option>
                    </select>
                </div>


                {/* Posts Grid */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                >

                    <div className="mb-6">

                        <h2 className="text-2xl font-bold">
                            Community Posts
                        </h2>

                        <p className="mt-2 text-gray-400">
                            Review and moderate all community discussions.
                        </p>

                    </div>

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                        {sortedPosts.map(
                            (
                                post,
                                index
                            ) => (

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
                                        delay:
                                            index *
                                            0.03,
                                    }}
                                    whileHover={{
                                        y: -5,
                                    }}
                                    className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
                                >

                                    {/* Image */}

                                    <div className="relative h-48 overflow-hidden">

                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                                    </div>

                                    {/* Content */}

                                    <div className="p-5">

                                        <h3 className="line-clamp-2 text-lg font-semibold text-white">

                                            {post.title}

                                        </h3>

                                        <p className="mt-3 line-clamp-3 text-sm text-gray-400">

                                            {post.description}

                                        </p>

                                        {/* Author */}

                                        <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-3">

                                            <p className="text-sm font-medium">

                                                {post.authorName}

                                            </p>

                                            <p className="text-xs text-gray-500">

                                                {post.authorEmail}

                                            </p>

                                        </div>

                                        {/* Footer */}

                                        <div className="mt-5 flex items-center justify-between">

                                            <span className="text-xs text-gray-500">

                                                {new Date(
                                                    post.createdAt
                                                ).toLocaleDateString()}

                                            </span>

                                            <motion.button
                                                whileHover={{
                                                    scale: 1.05,
                                                }}
                                                whileTap={{
                                                    scale: 0.95,
                                                }}
                                                onClick={() =>
                                                    handleDelete(
                                                        post._id
                                                    )
                                                }
                                                className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-all hover:bg-red-600 hover:text-white"
                                            >
                                                Delete
                                            </motion.button>

                                        </div>

                                    </div>

                                </motion.div>

                            )
                        )}

                    </div>

                </motion.div>

            </div>

        </div>
    );
};

export default ManageForumPostsPage;