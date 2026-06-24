"use client"
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import Swal from 'sweetalert2';


const Newsletter = () => {

    const [email, setEmail] = useState("");
    const [placeholder, setPlaceholder] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const words = [
            "john@gmail.com",
            "fitnessfan@example.com",
            "workoutlover@gmail.com",
            "yourname@email.com",
        ];

        const currentWord = words[wordIndex];

        if (charIndex < currentWord.length) {
            const timeout = setTimeout(() => {
                setPlaceholder(
                    currentWord.slice(
                        0,
                        charIndex + 1
                    )
                );

                setCharIndex(
                    (prev) => prev + 1
                );
            }, 80);

            return () =>
                clearTimeout(timeout);
        }

        const nextWordTimeout =
            setTimeout(() => {
                setPlaceholder("");
                setCharIndex(0);

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

    const handleSubscribe = (e) => {
        e.preventDefault();

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            !emailRegex.test(email)
        ) {
            return Swal.fire({
                icon: "error",
                title: "Invalid Email",
                text: "Please enter a valid email address.",
            });
        }

        Swal.fire({
            icon: "success",
            title: "Subscribed!",
            text: "Thanks for joining the MomentumX newsletter.",
        });

        setEmail("");
    };

    return (
        <div>
            <section className="relative overflow-hidden py-24">

                <motion.div
                    animate={{
                        x: [0, 60, 0],
                        y: [0, -40, 0],
                    }}
                    transition={{
                        duration: 15,
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
                        duration: 18,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-red-500/10 blur-3xl"
                />

                <div className="container relative z-10 mx-auto px-4">

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 30,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{
                            once: true,
                        }}
                        className="mx-auto max-w-4xl rounded-[32px] border border-red-500/20 bg-white/5 p-10 backdrop-blur-xl"
                    >

                        <motion.h2
                            initial={{
                                opacity: 0,
                            }}
                            whileInView={{
                                opacity: 1,
                            }}
                            className="heading-font text-center text-5xl"
                        >
                            Join The MomentumX Newsletter
                        </motion.h2>

                        <p className="mx-auto mt-5 max-w-2xl text-center text-gray-400">
                            Get exclusive workout tips, nutrition guides,
                            fitness insights, and platform updates delivered
                            directly to your inbox.
                        </p>

                        <form
                            onSubmit={
                                handleSubscribe
                            }
                            className="mx-auto mt-10 flex max-w-2xl flex-col gap-4 md:flex-row"
                        >

                            <input
                                type="email"
                                required
                                pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                                placeholder={placeholder}
                                className="input p-5 flex-1 border border-white/10 bg-slate-900 text-white"
                            />

                            <motion.button
                                whileHover={{
                                    scale: 1.03,
                                }}
                                whileTap={{
                                    scale: 0.97,
                                }}
                                type="submit"
                                className="btn p-5 border-none bg-gradient-to-r from-red-600 to-red-500 text-white"
                            >
                                Subscribe
                            </motion.button>

                        </form>

                        <div className="mt-8 flex flex-wrap justify-center gap-3">

                            <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-gray-400">
                                Weekly Fitness Tips
                            </span>

                            <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-gray-400">
                                Nutrition Guides
                            </span>

                            <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-gray-400">
                                Workout Strategies
                            </span>

                        </div>

                    </motion.div>

                </div>

            </section>
        </div>
    );
};

export default Newsletter;