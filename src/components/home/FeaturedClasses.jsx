"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const featuredClasses = [
    {
        id: 1,
        name: "Elite Strength Training",
        trainer: "Alex Carter",
        category: "Strength",
        duration: "12 Weeks",
        bookings: 245,
        price: "$49",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200",
    },
    {
        id: 2,
        name: "HIIT Burn Session",
        trainer: "Sophia Reed",
        category: "HIIT",
        duration: "8 Weeks",
        bookings: 187,
        price: "$39",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200",
    },
    {
        id: 3,
        name: "Power Yoga Flow",
        trainer: "Emma Wilson",
        category: "Yoga",
        duration: "10 Weeks",
        bookings: 163,
        price: "$35",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200",
    },
    {
        id: 4,
        name: "Cardio Endurance",
        trainer: "Michael Stone",
        category: "Cardio",
        duration: "6 Weeks",
        bookings: 132,
        price: "$29",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200",
    },
    {
        id: 5,
        name: "CrossFit Performance",
        trainer: "Ryan Brooks",
        category: "CrossFit",
        duration: "10 Weeks",
        bookings: 201,
        price: "$45",
        image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1200",
    },
    {
        id: 6,
        name: "Body Recomposition",
        trainer: "Daniel Scott",
        category: "Strength",
        duration: "16 Weeks",
        bookings: 289,
        price: "$59",
        image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200",
    },
];


const FeaturedClasses = () => {
    return (
        <section className="py-24">
            <div className="section-container">

                {/* Section Header */}
                <div className="mx-auto mb-14 max-w-3xl text-center">
                    <span className="rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400">
                        Featured Classes
                    </span>

                    <h2 className="heading-font mt-6 text-4xl md:text-5xl">
                        Find Your Perfect Training Program
                    </h2>

                    <p className="mt-4 text-(--text-secondary)">
                        Explore expert-led fitness programs designed to help you build strength,
                        improve endurance, and achieve your fitness goals.
                    </p>
                </div>

                {/* Classes Grid */}
                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {featuredClasses.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: item.id % 2 === 0 ? 50 : -50, }}
                            whileInView={{ opacity: 1, x: 0, }}
                            viewport={{ once: true, amount: 0.2 }}
                            whileHover={{ y: -6 }}
                            transition={{ duration: 0.5 }}
                            className="overflow-hidden rounded-3xl border border-white/10 bg-[var(--card)]"
                        >
                            {/* Card Image */}
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                    className="object-cover transition duration-500 hover:scale-110"
                                />

                                <div className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1 text-xs font-medium">
                                    {item.category}
                                </div>

                                <div className="absolute right-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs">
                                    {item.bookings}+ Bookings
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-6">
                                <h3 className="heading-font text-2xl">
                                    {item.name}
                                </h3>

                                <p className="mt-2 text-sm text-(--text-secondary)">
                                    Trainer: {item.trainer}
                                </p>

                                <div className="mt-5 flex items-center justify-between text-sm text-(--text-secondary)">
                                    <span>{item.duration}</span>

                                    <span className="font-semibold text-red-500">
                                        {item.price}
                                    </span>
                                </div>

                                <Link
                                    href={`/classes/${item.id}`}
                                    className="mt-6 btn flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-red-600 to-red-500 py-3 font-medium transition-all duration-300 hover:shadow-lg hover:shadow-red-600/20"
                                >
                                    View Details
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-14 text-center">
                    <Link
                        href="/classes"
                        className="inline-flex rounded-xl border border-red-500 px-6 py-3 transition-all duration-300 hover:bg-red-600"
                    >
                        View All Classes
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default FeaturedClasses;