"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const NotFound = () => {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4">

            {/* Background Glow */}
            <motion.div
                animate={{
                    x: [0, 80, 0],
                    y: [0, -50, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute left-0 top-0 h-screen w-72 bg-red-600/10 blur-3xl"
            />

            <motion.div
                animate={{
                    x: [0, -80, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-red-500/10 blur-3xl"
            />

            <motion.div
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.5,
                }}
                className="relative z-10 mx-auto w-full max-w-[750px]"
            >

                {/* Glitch Image */}
                <motion.div
                    animate={{
                        x: [0, 0, -5, 5, -2, 2, 0],
                        filter: [
                            "brightness(1)",
                            "brightness(1)",
                            "brightness(1.3)",
                            "brightness(0.8)",
                            "brightness(1.2)",
                            "brightness(1)",
                            "brightness(1)",
                        ],
                    }}
                    transition={{
                        duration: 0.18,
                        repeat: Infinity,
                        repeatDelay: 1,
                    }}
                    className="relative"
                >
                    <Image
                        src="/images/Error.png"
                        alt="Page Not Found"
                        width={700}
                        height={700}
                        priority
                        className="mx-auto h-auto w-full"
                    />
                </motion.div>

                {/* Buttons */}
                <div className="absolute bottom-[8%] left-1/2 flex w-full max-w-xs -translate-x-1/2 flex-col gap-3 px-4 sm:bottom-[10%] sm:max-w-sm sm:flex-row md:bottom-[12%] md:max-w-md">

                    <Link
                        href="/"
                        className="flex-1 rounded-xl bg-linear-to-r from-red-600 to-red-500 px-6 py-3 text-center font-medium transition-all duration-300 hover:shadow-lg hover:shadow-red-600/20"
                    >
                        Back To Home
                    </Link>

                    <Link
                        href="/classes"
                        className="flex-1 rounded-xl border border-white/10 px-6 py-3 text-center font-medium transition-all duration-300 hover:border-red-500"
                    >
                        Browse Classes
                    </Link>

                </div>

            </motion.div>

        </div>
    );
};

export default NotFound;