import { motion } from "framer-motion";

const ApplicationStatusCard = ({ title, description, color, }) => {

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 30,
                scale: 0.95,
            }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1,
            }}
            transition={{
                duration: 0.5,
            }}
            className="flex min-h-[70vh] items-center justify-center p-5"
        >
            <div
                className={`relative w-full max-w-md overflow-hidden rounded-[32px] border p-8 backdrop-blur-xl ${color === "pending"
                    ? "border-yellow-500/20 bg-yellow-500/10"
                    : color === "approved"
                        ? "border-green-500/20 bg-green-500/10"
                        : "border-red-500/20 bg-red-500/10"
                    }`}
            >
                {/* Glow Effect */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.35, 0.2],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className={`absolute -top-20 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full blur-3xl ${color === "pending"
                        ? "bg-yellow-500/20"
                        : color === "approved"
                            ? "bg-green-500/20"
                            : "bg-red-500/20"
                        }`}
                />

                <div className="relative z-10 text-center">
                    <motion.div
                        animate={{
                            y: [0, -8, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className={`mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border ${color === "pending"
                            ? "border-yellow-500/20 bg-yellow-500/10"
                            : color === "approved"
                                ? "border-green-500/20 bg-green-500/10"
                                : "border-red-500/20 bg-red-500/10"
                            }`}
                    >
                        <span className="text-4xl">
                            {color === "pending"
                                ? "⏳"
                                : color === "approved"
                                    ? "✓"
                                    : "✕"}
                        </span>
                    </motion.div>

                    <h2 className="heading-font text-4xl">
                        {title}
                    </h2>

                    <p className="mt-4 leading-relaxed text-gray-300">
                        {description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default ApplicationStatusCard;