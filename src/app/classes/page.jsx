"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const ClassesPage = () => {
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [classes, setClasses] = useState([]);
    const [allClasses, setAllClasses] = useState([]);
    const [placeholder, setPlaceholder] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);


    useEffect(() => {

        const fetchClasses = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5000/classes?search=${search}&category=${category}&page=${page}&limit=6`
                )

                const data = await res.json();

                setClasses(
                    data.classes
                );

                setTotalPages(
                    Math.ceil(
                        data.total / 6
                    )
                );
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchClasses();

    }, [search, category, page]);

    useEffect(() => {

        const words = [
            "Search classes...",
            "Yoga Classes...",
            "HIIT Training...",
            "CrossFit Fundamentals...",
            "Full Body Strength...",
        ];

        const currentWord = words[wordIndex];

        if (
            charIndex < currentWord.length
        ) {
            const timeout =
                setTimeout(() => {
                    setPlaceholder(
                        currentWord.slice(
                            0,
                            charIndex + 1
                        )
                    );

                    setCharIndex(
                        (prev) =>
                            prev + 1
                    );
                }, 100);

            return () =>
                clearTimeout(timeout);
        }

        const nextWordTimeout =
            setTimeout(() => {
                setCharIndex(0);

                setPlaceholder("");

                setWordIndex(
                    (prev) =>
                        (prev + 1) %
                        words.length
                );
            }, 1500);

        return () =>
            clearTimeout(
                nextWordTimeout
            );
    }, [charIndex, wordIndex]);


    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <section className="relative overflow-hidden py-20">
            {/* Animated Background */}
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

            <div className="container mx-auto px-4">
                {/* Heading */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    className="mb-12 text-center"
                >
                    <h1 className="heading-font text-5xl">
                        Fitness Classes
                    </h1>

                    <p className="mt-4 text-gray-400">
                        Explore our trainer-led fitness programs.
                    </p>
                </motion.div>

                {/* Search bar */}

                <div className="mb-10 flex flex-col gap-4 md:flex-row">
                    <input
                        type="text"
                        placeholder={placeholder}
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                        className="input flex-1 border border-white/10 bg-white/5 p-2"
                    />

                    <datalist id="class-suggestions">
                        {allClasses.map((item) => (
                            <option
                                key={item._id}
                                value={item.className}
                            />
                        ))}
                    </datalist>

                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(
                                e.target.value
                            )
                        }
                        className="select border border-white/10 bg-slate-800"
                    >
                        <option value="">
                            All Categories
                        </option>

                        <option value="Yoga">
                            Yoga
                        </option>

                        <option value="Cardio">
                            Cardio
                        </option>

                        <option value="CrossFit">
                            CrossFit
                        </option>

                        <option value="Strength">
                            Strength
                        </option>

                        <option value="HIIT">
                            HIIT
                        </option>
                    </select>
                </div>

                {classes.length === 0 ? (
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
                        <h3 className="text-2xl font-semibold">
                            No Classes Available
                        </h3>

                        <p className="mt-2 text-gray-400">
                            New fitness programs will appear here soon.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {classes.map((item, index) => (
                            <motion.div
                                key={item._id}
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    delay: index * 0.1,
                                }}
                                viewport={{
                                    once: true,
                                }}
                                whileHover={{
                                    y: -8,
                                }}
                                className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
                            >
                                <div className="relative h-60">
                                    <Image
                                        src={item.image}
                                        alt={item.className}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover"
                                    />
                                </div>

                                <div className="p-6">
                                    <span className="rounded-full bg-red-600/20 px-3 py-1 text-sm text-red-400">
                                        {item.category}
                                    </span>

                                    <h2 className="mt-4 text-2xl font-bold">
                                        {item.className}
                                    </h2>

                                    <div className="mt-4 space-y-2 text-sm text-gray-400">
                                        <p>
                                            Difficulty: {item.difficulty}
                                        </p>

                                        <p>
                                            Trainer: {item.trainerName}
                                        </p>

                                        <p>
                                            Duration: {item.duration}
                                        </p>

                                        <p>
                                            Bookings: {item.bookingCount}
                                        </p>

                                        <p>
                                            Fee: ₹{item.price}
                                        </p>
                                    </div>

                                    <Link
                                        href={`/classes/${item._id}`}
                                        className="btn btn-sm w-full bg-red-600 text-white border-none hover:bg-red-700"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}


                <div className="mt-12 flex justify-center gap-2">
                    <button
                        onClick={() =>
                            setPage(
                                page - 1
                            )
                        }
                        disabled={page === 1}
                        className="btn"
                    >
                        Prev
                    </button>

                    {[...Array(totalPages)].map(
                        (_, index) => (
                            <button
                                key={index}
                                onClick={() =>
                                    setPage(
                                        index + 1
                                    )
                                }
                                className={`btn ${page ===
                                    index + 1
                                    ? "bg-red-600 text-white"
                                    : ""
                                    }`}
                            >
                                {index + 1}
                            </button>
                        )
                    )}

                    <button
                        onClick={() =>
                            setPage(
                                page + 1
                            )
                        }
                        disabled={
                            page ===
                            totalPages
                        }
                        className="btn"
                    >
                        Next
                    </button>
                </div>

            </div>
        </section>
    );
};

export default ClassesPage;