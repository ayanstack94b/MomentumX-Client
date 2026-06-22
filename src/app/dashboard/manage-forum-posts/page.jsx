"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
    FaComments,
    FaTrash,
    FaUsers,
    FaFire,
} from "react-icons/fa";
import Swal from "sweetalert2";

const ManageForumPostsPage = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchPosts =
            async () => {

                try {

                    const res =
                        await fetch(
                            "http://localhost:5000/forums"
                        );

                    const data =
                        await res.json();

                    setPosts(data);
                    console.log(posts);

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

            const res =
                await fetch(
                    `http://localhost:5000/forums/${id}`,
                    {
                        method:
                            "DELETE",
                    }
                );

            const data =
                await res.json();

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
                            0
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
                            0
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
                            0
                        </h2>
                    </motion.div>

                </div>

                {/* Posts Table */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
                >

                    <div className="border-b border-white/10 p-6">

                        <h2 className="text-2xl font-bold">
                            Community Posts
                        </h2>

                        <p className="mt-2 text-gray-400">
                            View and moderate all
                            community content.
                        </p>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="table">

                            <thead>

                                {posts.map((post) => (

                                    <tr key={post._id}>

                                        <td>
                                            {post.title}
                                        </td>

                                        <td>
                                            {post.authorName}
                                        </td>

                                        <td>
                                            {new Date(
                                                post.createdAt
                                            ).toLocaleDateString()}
                                        </td>

                                        <td>

                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        post._id
                                                    )
                                                }
                                                className="btn btn-sm bg-red-600 text-white"
                                            >
                                                <FaTrash />
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </thead>

                        </table>

                    </div>

                </motion.div>

            </div>

        </div>
    );
};

export default ManageForumPostsPage;