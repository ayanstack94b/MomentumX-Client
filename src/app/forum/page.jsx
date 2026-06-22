"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const ForumPage = () => {

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

                } catch (error) {

                    console.error(error);

                } finally {

                    setLoading(false);

                }
            };

        fetchPosts();

    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <section className="relative overflow-hidden py-20">

            <motion.div
                animate={{
                    x: [0, 40, 0],
                    y: [0, -30, 0],
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
                    x: [0, -40, 0],
                    y: [0, 30, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-red-500/10 blur-3xl"
            />

            <div className="container relative z-10 mx-auto px-4">

                <div className="mb-14 text-center">

                    <h1 className="heading-font text-5xl">
                        Community Forum
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-gray-400">
                        Explore fitness tips, training advice,
                        nutrition guides, and community insights
                        shared by trainers and admins.
                    </p>

                </div>

                <div className="mb-10 rounded-3xl border border-red-500/20 bg-gradient-to-r from-red-600/10 to-red-500/5 p-6 backdrop-blur-xl">
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                        <div>
                            <h2 className="text-2xl font-bold">
                                Share Your Fitness Knowledge
                            </h2>

                            <p className="mt-2 text-gray-400">
                                Trainers and admins can publish workout tips,
                                nutrition advice, recovery strategies, and
                                fitness insights for the MomentumX community.
                            </p>
                        </div>

                        <Link
                            href="/dashboard/add-forum-post"
                            className="btn border-none bg-gradient-to-r from-red-600 to-red-500 text-white"
                        >
                            Create Post
                        </Link>

                    </div>
                </div>

                {posts.length === 0 ? (

                    <div className="flex min-h-[40vh] items-center justify-center">

                        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">

                            <h2 className="text-2xl font-bold">
                                No Forum Posts Yet
                            </h2>

                            <p className="mt-3 text-gray-400">
                                Trainers and admins have not
                                published any content yet.
                            </p>

                        </div>

                    </div>

                ) : (

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                        {posts.map((post) => (

                            <motion.div
                                key={post._id}
                                whileHover={{
                                    y: -8,
                                }}
                                className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
                            >

                                <div className="relative h-56">

                                    
                                       <Image
                                        src={
                                            post.image?.startsWith("http")
                                                ? post.image
                                                : "/images/forum-placeholder.jpg"
                                        }
                                        alt={post.title}
                                        fill
                                        sizes="100vw"
                                        className="object-cover"
                                    />

                                </div>

                                <div className="p-6">

                                    <h2 className="line-clamp-2 text-2xl font-bold">
                                        {post.title}
                                    </h2>

                                    <p className="mt-2 text-sm text-red-400">
                                        By {post.authorName}
                                    </p>

                                    <p className="mt-4 line-clamp-3 text-gray-400">
                                        {post.description}
                                    </p>

                                    <Link
                                        href={`/forum/${post._id}`}
                                        className="btn mt-6 w-full border-none bg-gradient-to-r from-red-600 to-red-500 text-white"
                                    >
                                        Read More
                                    </Link>

                                </div>

                            </motion.div>

                        ))}

                    </div>

                )}

            </div>

        </section>
    );
};

export default ForumPage;