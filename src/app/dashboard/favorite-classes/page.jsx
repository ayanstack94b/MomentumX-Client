"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Image from "next/image";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const FavoriteClassesPage = () => {
    const { data: session } =
        authClient.useSession();

    const email =
        session?.user?.email;

    const [favorites, setFavorites] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        if (!email) return;

        const fetchFavorites =
            async () => {
                try {
                    const res =
                        await fetch(
                            `http://localhost:5000/favorites/${email}`
                        );

                    const data =
                        await res.json();

                    setFavorites(data);
                } catch (error) {
                    console.error(
                        error
                    );
                } finally {
                    setLoading(false);
                }
            };

        fetchFavorites();
    }, [email]);

    const handleDelete =
        async (id) => {
            const result =
                await Swal.fire({
                    title:
                        "Remove Favorite?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor:
                        "#dc2626",
                });

            if (
                !result.isConfirmed
            )
                return;

            try {
                const res =
                    await fetch(
                        `http://localhost:5000/favorites/${id}`,
                        {
                            method:
                                "DELETE",
                        }
                    );

                const data =
                    await res.json();

                if (
                    data.deletedCount >
                    0
                ) {
                    setFavorites(
                        (prev) =>
                            prev.filter(
                                (
                                    item
                                ) =>
                                    item._id !==
                                    id
                            )
                    );

                    Swal.fire({
                        icon: "success",
                        title:
                            "Removed",
                        timer: 1200,
                        showConfirmButton: false,
                    });
                }
            } catch (error) {
                console.error(
                    error
                );
            }
        };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            className="space-y-6 p-5"
        >
            <div>
                <h1 className="heading-font text-4xl">
                    Favorite Classes
                </h1>

                <p className="mt-2 text-[var(--text-secondary)]">
                    Your saved fitness
                    classes.
                </p>
            </div>

            {favorites.length ===
                0 ? (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
                    <h3 className="text-2xl font-semibold">
                        No Favorites Yet
                    </h3>

                    <p className="mt-2 text-[var(--text-secondary)]">
                        Save classes to
                        view them later.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {favorites.map(
                        (
                            item
                        ) => (
                            <motion.div
                                key={
                                    item._id
                                }
                                whileHover={{
                                    y: -5,
                                }}
                                className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
                            >
                                <div className="relative h-56">
                                    <Image
                                        src={
                                            item.image
                                        }
                                        alt={
                                            item.className
                                        }
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="p-5">
                                    <h2 className="text-xl font-bold">
                                        {
                                            item.className
                                        }
                                    </h2>

                                    <div className="mt-4 space-y-2 text-sm">
                                        <p>
                                            <strong>
                                                Trainer:
                                            </strong>{" "}
                                            {
                                                item.trainerName
                                            }
                                        </p>

                                        <p>
                                            <strong>
                                                Category:
                                            </strong>{" "}
                                            {
                                                item.category
                                            }
                                        </p>

                                        <p>
                                            <strong>
                                                Price:
                                            </strong>{" "}
                                            ₹
                                            {
                                                item.price
                                            }
                                        </p>
                                    </div>

                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                item._id
                                            )
                                        }
                                        className="btn mt-5 w-full border border-red-500 bg-red-500/10 text-red-500 hover:bg-red-600 hover:text-white"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </motion.div>
                        )
                    )}
                </div>
            )}
        </motion.div>
    );
};

export default FavoriteClassesPage;