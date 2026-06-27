"use client";

import Image from "next/image";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";



const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();


    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const { data: userData, error } =
                await authClient.signUp.email({
                    name: data.name,
                    email: data.email.toLowerCase(),
                    password: data.password,
                    image: data.photoURL || "",
                });
            if (error) {
                Swal.fire({
                    icon: "error",
                    title: "Registration Failed",
                    text: error.message,
                });

                return;
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    image:
                        data.photoURL || "",

                    role: "member",
                    status: "active",

                    membership: "basic",

                    trainerApplicationStatus: null,
                    trainerFeedback: "",

                    bio: "",
                    phone: "",
                    location: "",

                    createdAt: userData.user.createdAt,
                }),
            });

            console.log("POST Status:", response.status);

            const result = await response.json();
            console.log("User Data:", userData);
            console.log("Mongo Result:", result);

            console.log("POST Result:", result);
            if (error) {
                Swal.fire({
                    icon: "error",
                    title: "Registration Failed",
                    text: error.message,
                });

                return;
            }

            await Swal.fire({
                icon: "success",
                title: "Account Created",
                text: "Welcome to MomentumX!",
                timer: 1500,
                showConfirmButton: false,
            });

            router.push("/login");

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Something went wrong",
                text: error.message,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleRegister = async () => {
        setIsLoading(true);

        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "https://momentum-x-client.vercel.app/dashboard",
            });
        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Google Sign-Up Failed",
                text: "Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-[#0B0B0D] px-4 lg:px-10">

            {/* Left Side */}
            <motion.div
                initial={{ opacity: 0, x: -80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="relative hidden overflow-hidden lg:flex items-center justify-center "
            >

                {/* Floating Card 1 */}
                <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-12 top-28 z-20 rounded-2xl border border-white/10 bg-black/40 px-5 py-4 backdrop-blur-xl"
                >
                    <p className="text-sm text-gray-400">Active Members</p>
                    <h3 className="heading-font text-3xl text-red-500">10K+</h3>
                </motion.div>

                {/* Floating Card 2 */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute right-12 top-40 z-20 rounded-2xl border border-white/10 bg-black/40 px-5 py-4 backdrop-blur-xl"
                >
                    <p className="text-sm text-gray-400">Fitness Classes</p>
                    <h3 className="heading-font text-3xl text-red-500">50+</h3>
                </motion.div>

                {/* Floating Card 3 */}
                <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-70 bottom-48 z-20 rounded-2xl border border-white/10 bg-black/40 px-5 py-4 backdrop-blur-xl"
                >
                    <p className="text-sm text-gray-400">Success Rate</p>
                    <h3 className="heading-font text-3xl text-red-500">95%</h3>
                </motion.div>

                {/* Image */}
                <Image
                    src="/images/AgentX.png"
                    alt="MomentumX Athlete"
                    width={700}
                    height={900}
                    priority
                    className="relative z-10 h-auto max-h-[80vh] w-auto object-contain"
                />

                {/* Bottom Text */}
                <div className="absolute bottom-10 left-10 max-w-md">
                    <h2 className="heading-font text-5xl leading-tight">
                        Start Your
                        <span className="block text-red-500">
                            Fitness Journey
                        </span>
                    </h2>

                    <p className="mt-4 text-[var(--text-secondary)]">
                        Join MomentumX and connect with expert trainers, premium fitness classes, and a thriving fitness community.
                    </p>
                </div>

            </motion.div>

            {/* Right Side Form area */}
            <motion.div
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="flex items-center justify-center px-4 lg:px-6 py-12"
            >
                <div className="w-full max-w-md lg:max-w-lg rounded-4xl border border-white/10 bg-white/5 p-6 lg:p-8">

                    <div className="mb-8">
                        <h1 className="heading-font text-4xl">
                            Create Account
                        </h1>

                        <p className="mt-2 text-(--text-secondary)">
                            Start your fitness transformation today.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                        <div>
                            <label className="mb-2 block text-sm">Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                {...register("name")}
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition-all focus:border-red-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                {...register("email")}
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition-all focus:border-red-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm">Photo URL</label>
                            <input
                                type="text"
                                placeholder="Enter photo url"
                                {...register("photoURL")}
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition-all focus:border-red-500"
                            />
                        </div>
                        {/* Password field */}
                        <div>
                            <label className="mb-2 block text-sm">Password</label>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password"
                                    {...register("password")}
                                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 outline-none transition-all focus:border-red-500"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password field */}

                        <div>
                            <label className="mb-2 block text-sm">Confirm Password</label>

                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm password"
                                    {...register("confirmPassword")}
                                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 outline-none transition-all focus:border-red-500"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full rounded-xl bg-linear-to-r from-red-600 to-red-500 py-3 font-medium transition-all duration-300 hover:shadow-[0_0_25px_rgba(220,38,38,0.35)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Registering...
                                </span>
                            ) : (
                                "Register"
                            )}
                        </button>

                        {/* ===============Google Button============== */}
                        <button
                            type="button"
                            onClick={handleGoogleRegister}
                            disabled={isLoading}
                            className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-white/5 py-3 font-medium backdrop-blur-md transition-all duration-300 hover:border-red-500/40 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-red-500/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"></span>

                            {isLoading ? (
                                <span className="relative z-10 flex items-center gap-2">
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Connecting...
                                </span>
                            ) : (
                                <>
                                    <FaGoogle className="relative z-10 text-lg text-gray-300 transition-all duration-300 group-hover:text-red-500" />

                                    <span className="relative z-10">
                                        Continue with Google
                                    </span>
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-(--text-secondary)">
                        Already have an account?{" "}
                        <Link href="/login" className="text-red-500 hover:text-red-400">
                            Login
                        </Link>
                    </p>

                </div>
            </motion.div>

        </div>
    );
};

export default RegisterPage;