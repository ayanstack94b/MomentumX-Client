"use client";

import { motion } from "framer-motion";

const categories = [
    "Strength Training",
    "HIIT Workouts",
    "CrossFit",
    "Cardio Fitness",
    "Powerlifting",
    "Bodybuilding",
    "Yoga Flow",
    "Recovery",
    "Mobility",
    "Nutrition",
];

const FitnessMarquee = () => {
    const marqueeItems = [...categories, ...categories];

    return (
        <section className="relative overflow-hidden py-8">
            <div className="mb-5 text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-red-500">
                    Popular Training Categories
                </p>
            </div>
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent" />

            {/* Left Fade */}
            <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-[#0B0B0D] to-transparent" />

            {/* Right Fade */}
            <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-[#0B0B0D] to-transparent" />

            <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="flex w-max items-center gap-10"
            >
                {marqueeItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-10">
                        <span className="heading-font whitespace-nowrap text-lg uppercase tracking-[0.2em] text-white/80 transition-colors duration-300 hover:text-red-500">
                            {item}
                        </span>

                        <span className="text-xl text-red-500">✦</span>
                    </div>
                ))}
            </motion.div>
        </section>
    );
};

export default FitnessMarquee;