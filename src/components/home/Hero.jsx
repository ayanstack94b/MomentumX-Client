"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdGroups } from "react-icons/md";
import { GiMuscleUp } from "react-icons/gi";
import { BsCalendar2CheckFill } from "react-icons/bs";

export default function Hero() {
    const categories = ["Yoga", "HIIT", "Strength", "Cardio", "CrossFit"];

    return (
        <section className="relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-red-600/20 blur-[120px]" />
            <div className="absolute left-0 bottom-0 h-72 w-72 rounded-full bg-red-500/10 blur-[120px]" />

            <div className="section-container min-h-[85vh] grid items-center gap-12 py-12 lg:grid-cols-2">

                {/* Left Content */}
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>

                    {/* Badge */}
                    <div className="mb-6 inline-flex items-center rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400">
                        🔥 1,200+ Active Members
                    </div>

                    {/* Heading */}
                    <h1 className="heading-font text-5xl font-bold leading-none md:text-6xl lg:text-7xl">
                        Train Harder.
                        <br />
                        Track <span className="text-red-500">Smarter.</span>
                        <br />
                        Achieve More.
                    </h1>

                    {/* Description */}
                    <p className="mt-6 max-w-xl text-base leading-7 text-[var(--text-secondary)] md:text-lg">
                        Discover expert-led fitness classes, connect with certified trainers,
                        track your progress, and stay motivated through a thriving fitness community.
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link href="/classes" className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 px-6 py-3 font-medium transition-all duration-300 hover:shadow-lg hover:shadow-red-600/20">
                            Explore Classes
                            <FaArrowRightLong className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>

                        <Link href="/register" className="rounded-xl border border-white/10 px-6 py-3 font-medium transition-all duration-300 hover:border-red-500">
                            Become a Trainer
                        </Link>
                    </div>

                    {/* Categories */}
                    <div className="mt-8 flex flex-wrap gap-3">
                        {categories.map((item) => (
                            <span key={item} className="cursor-pointer rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm transition-all duration-300 hover:border-red-500 hover:text-red-400">
                                {item}
                            </span>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="mt-10 grid max-w-md grid-cols-3 gap-6">
                        <div>
                            <h3 className="heading-font text-3xl text-red-500">50+</h3>
                            <p className="text-sm text-[var(--text-secondary)]">Classes</p>
                        </div>

                        <div>
                            <h3 className="heading-font text-3xl text-red-500">20+</h3>
                            <p className="text-sm text-[var(--text-secondary)]">Trainers</p>
                        </div>

                        <div>
                            <h3 className="heading-font text-3xl text-red-500">1K+</h3>
                            <p className="text-sm text-[var(--text-secondary)]">Members</p>
                        </div>
                    </div>
                </motion.div>

                {/* Right Content */}
                <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="relative flex justify-center">

                    {/* Main Image */}
                    <Image
                        src="/images/hero-athlete.png"
                        alt="Fitness Athlete"
                        width={700}
                        height={700}
                        priority
                        className="relative z-10 object-contain"
                    />

                    {/* Trainer Card */}
                    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-10 left-0 z-20 rounded-2xl border border-white/10 bg-[var(--card)] p-4 backdrop-blur-xl">
                        <div className="flex items-center gap-3">
                            <GiMuscleUp className="text-2xl text-red-500" />
                            <div>
                                <h4 className="font-semibold">Expert Trainers</h4>
                                <p className="text-xs text-[var(--text-secondary)]">
                                    20+ Certified Coaches
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Community Card */}
                    <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute right-0 top-32 z-20 rounded-2xl border border-white/10 bg-[var(--card)] p-4 backdrop-blur-xl">
                        <div className="flex items-center gap-3">
                            <MdGroups className="text-2xl text-red-500" />
                            <div>
                                <h4 className="font-semibold">Community</h4>
                                <p className="text-xs text-[var(--text-secondary)]">
                                    Daily Discussions
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Booking Card */}
                    <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity }} className="absolute bottom-10 left-10 z-20 rounded-2xl border border-white/10 bg-[var(--card)] p-4 backdrop-blur-xl">
                        <div className="flex items-center gap-3">
                            <BsCalendar2CheckFill className="text-xl text-red-500" />
                            <div>
                                <h4 className="font-semibold">Easy Booking</h4>
                                <p className="text-xs text-[var(--text-secondary)]">
                                    Reserve Instantly
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}