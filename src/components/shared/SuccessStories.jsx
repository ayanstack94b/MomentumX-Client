"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa6";

const stories = [
    {
        name: "Sarah Johnson",
        role: "Fitness Enthusiast",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
        review:
            "MomentumX completely changed my fitness routine. The trainers and classes keep me motivated every week.",
    },
    {
        name: "Michael Reed",
        role: "CrossFit Member",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400",
        review:
            "The booking system is seamless and the community discussions are surprisingly helpful.",
    },
    {
        name: "Emma Wilson",
        role: "Yoga Student",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400",
        review:
            "I've improved my consistency more in three months here than in years of training alone.",
    },
    {
        name: "David Brooks",
        role: "Strength Athlete",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400",
        review:
            "The quality of trainers and class variety makes MomentumX stand out from other platforms.",
    },
    {
        name: "Sophia Carter",
        role: "Member",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400",
        review:
            "The forum and fitness guidance helped me stay accountable during my transformation journey.",
    },
];

const SuccessStories = () => {
    return (
        <section className="py-24">
            <div className="mx-auto max-w-[1200px] px-4">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="overflow-hidden"
                >
                    <div className="mb-14 text-center">
                       

                        <span className="rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 mt-5 text-sm text-red-400">
                            Success Stories
                        </span>

                        <h2 className="heading-font mt-6 text-4xl md:text-5xl">
                            What Our Members Say
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)]">
                            Real experiences from members who transformed their fitness journey through MomentumX.
                        </p>
                    </div>

                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                        whileHover={{ scale: 1.001 }}
                        className="flex w-max gap-6"
                    >
                        {[...stories, ...stories].map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -8 }}
                                className="w-[350px] rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
                            >
                                <div className="mb-6 text-4xl text-red-500">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={56}
                                        height={56}
                                        className="h-14 w-14 rounded-full object-cover"
                                    />
                                </div>

                                <div className="relative">
                                    <FaQuoteLeft className="mb-4 text-3xl text-gray-500/60" />

                                    <p className="leading-7 text-[var(--text-secondary)]">
                                        {item.review}
                                    </p>
                                </div>

                                <div className="mt-8 border-t border-white/10 pt-5">
                                    <h4 className="font-semibold text-white">
                                        {item.name}
                                    </h4>

                                    <p className="mt-1 text-sm text-red-400">
                                        {item.role}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
};

export default SuccessStories;