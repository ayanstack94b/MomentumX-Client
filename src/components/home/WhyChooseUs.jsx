"use client";

import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const benefits = [
    "Certified & Experienced Trainers",
    "Flexible Class Scheduling",
    "Active Fitness Community",
    "Personalized Fitness Journey",
];

const stats = [
    { number: "1K+", label: "Active Members" },
    { number: "50+", label: "Fitness Classes" },
    { number: "20+", label: "Certified Trainers" },
    { number: "95%", label: "Satisfaction Rate" },
];

const WhyChooseUs = () => {
    return (
        <section className="py-24 overflow-hidden">
            <div className="section-container">
                <div className="grid items-center gap-16 lg:grid-cols-2">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400">
                            Why MomentumX
                        </span>

                        <h2 className="heading-font mt-6 text-4xl md:text-5xl">
                            More Than A Gym.
                            <br />
                            <span className="text-red-500">
                                A Complete Fitness Ecosystem.
                            </span>
                        </h2>

                        <p className="mt-6 max-w-xl leading-7 text-(--text-secondary)">
                            MomentumX combines expert coaching, structured training programs,
                            seamless booking experiences, and an engaging community to help
                            you stay consistent and achieve your fitness goals.
                        </p>

                        <div className="mt-10 space-y-5">
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={benefit}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.15 }}
                                    className="flex items-center gap-4"
                                >
                                    <FaCheckCircle className="text-xl text-red-500" />

                                    <span className="text-lg">
                                        {benefit}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Content */}
                    <div className="grid grid-cols-2 gap-6">
                        {stats.map((item, index) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}

                                whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}

                                viewport={{ once: true }}

                                transition={{ duration: 0.6, delay: index * 0.15 }}

                                whileHover={{ y: -8, scale: 1.03, borderColor: "rgba(220,38,38,0.5)", boxShadow: "0px 0px 35px rgba(220,38,38,0.25)" }}
                                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-(--card) p-8 text-center"
                            >
                                <h3 className="heading-font text-5xl text-red-500">
                                    {item.number}
                                </h3>

                                <p className="mt-3 text-(--text-secondary)">
                                    {item.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;