"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// const latestPostsData = [
//     {
//         id: "post-001",
//         title: "5 Common Mistakes That Slow Muscle Growth",
//         author: "Alex Carter",
//         category: "Nutrition",
//         description:
//             "Discover the most common mistakes people make while trying to build muscle and how to avoid them.",
//         image:
//             "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200",
//     },
//     {
//         id: "post-002",
//         title: "Why Recovery Is More Important Than Training",
//         author: "Sophia Reed",
//         category: "Recovery",
//         description:
//             "Learn how sleep, nutrition, and recovery can dramatically improve your fitness performance.",
//         image:
//             "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200",
//     },
//     {
//         id: "post-003",
//         title: "Beginner's Guide To Strength Training",
//         author: "Michael Stone",
//         category: "Strength",
//         description:
//             "Everything you need to know before starting your first strength training journey.",
//         image:
//             "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200",
//     },
//     {
//         id: "post-004",
//         title: "How HIIT Improves Fat Loss Efficiency",
//         author: "Emma Wilson",
//         category: "HIIT",
//         description:
//             "Understand why high intensity interval training remains one of the most effective fitness methods.",
//         image:
//             "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200",
//     },
// ];

const LatestPosts = () => {

    const [latestPosts, setLatestPosts] = useState([]);

    useEffect(() => {
        const fetchLatestPosts =
            async () => {
                try {
                    const res =
                        await fetch(
                            `${process.env.NEXT_PUBLIC_API_URL}/forums`
                        );

                    const data =
                        await res.json();

                    setLatestPosts(
                        data.forums?.slice(
                            0,
                            4
                        ) || []
                    );
                } catch (error) {
                    console.error(
                        error
                    );
                }
            };

        fetchLatestPosts();
    }, []);


    return (
        <section className="py-24">
            <div className="section-container">

                {/* Section Header */}
                <div className="mx-auto mb-14 max-w-3xl text-center">
                    <span className="rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400">
                        Community Forum
                    </span>

                    <h2 className="heading-font mt-6 text-4xl md:text-5xl">
                        Learn, Share & Stay Motivated
                    </h2>

                    <p className="mt-4 text-[var(--text-secondary)]">
                        Explore fitness insights, expert advice, and inspiring discussions
                        shared by our trainers and community members.
                    </p>
                </div>

                {/* Posts Grid */}
                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                    {latestPosts.map((item) => (
                        <motion.article
                            key={item._id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            whileHover={{ y: -6 }}
                            transition={{ duration: 0.5 }}
                            className="overflow-hidden rounded-3xl border border-white/10 bg-[var(--card)]"
                        >

                            {/* Image */}
                            <div className="relative h-52 overflow-hidden">
                                <Image
                                    src={
                                        item?.image?.startsWith(
                                            "http"
                                        )
                                            ? item.image
                                            : "/images/forum-placeholder.jpg"
                                    }
                                    alt={item.title}
                                    fill
                                    sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 25vw"
                                    className="object-cover transition duration-500 hover:scale-110"
                                />

                                <div className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1 text-xs font-medium">
                                    {item.category || "Fitness"}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <p className="mb-3 text-xs uppercase tracking-wider text-red-400">
                                    By {item.authorName}
                                </p>

                                <h3 className="heading-font line-clamp-2 text-2xl">
                                    {item.title}
                                </h3>

                                <p className="mt-4 line-clamp-3 text-sm leading-6 text-[var(--text-secondary)]">
                                    {item.description}
                                </p>

                                <Link
                                    href={`/forum/${item._id}`}
                                    className="mt-6 inline-flex items-center gap-2 text-red-500 transition hover:text-red-400"
                                >
                                    Read More →
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-14 text-center">
                    <Link
                        href="/forum"
                        className="inline-flex rounded-xl border border-red-500 px-6 py-3 transition-all duration-300 hover:bg-red-600"
                    >
                        View All Posts
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default LatestPosts;