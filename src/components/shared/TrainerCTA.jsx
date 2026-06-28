"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa6";

const TrainerCTA = () => {
    return (
        <section className="py-24">
            <div className="section-container">

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative overflow-hidden rounded-[32px] border border-white/10"
                >

                    {/* Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-950/40 via-[#121212] to-red-950/40" />

                    {/* Glow */}
                    <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/20 blur-[120px]" />

                    {/* Content */}
                    <div className="relative z-10 px-8 py-20 text-center">

                        <span className="text-sm uppercase tracking-[0.4em] text-red-500">
                            Trainer Program
                        </span>

                        <h2 className="heading-font mt-5 text-5xl md:text-6xl">
                            Turn Your Passion
                            <span className="block text-red-500">
                                Into Impact
                            </span>
                        </h2>

                        <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--text-secondary)]">
                            Share your expertise, build your reputation,
                            and help members achieve their fitness goals.
                        </p>

                        {/* Mini Benefits */}
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
                                Create Classes
                            </span>

                            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
                                Build Authority
                            </span>

                            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
                                Inspire Members
                            </span>
                        </div>
                        <Link
                            href="/dashboard/become-trainer"
                            className="group mt-10 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 px-8 py-4 font-medium transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(220,38,38,0.35)]"
                        >
                            Apply As Trainer

                            <FaArrowRightLong className="transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" />
                        </Link>

                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default TrainerCTA;