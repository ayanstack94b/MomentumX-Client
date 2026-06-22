"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { authClient } from "@/lib/auth-client";
import Swal from "sweetalert2";

const ForumDetailsPage = () => {
    const { id } = useParams();
    const { data: session } = authClient.useSession();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");



    useEffect(() => {
        const fetchPost = async () => {

            try {

                const res =
                    await fetch(
                        `http://localhost:5000/forums/${id}`
                    );

                const data =
                    await res.json();

                setPost(data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }
        };

        if (id) {
            fetchPost();
        }

    }, [id]);

    useEffect(() => {

        if (
            !session?.user?.email
        ) {
            return;
        }

        const fetchPosts =
            async () => {

                try {

                    const res =
                        await fetch(
                            `http://localhost:5000/forums/user/${session.user.email}`
                        );

                    const data =
                        await res.json();

                    setPosts(data);

                } catch (error) {

                    console.error(error);

                } finally {

                    setLoading(false);

                }
            };

        fetchPosts();

    }, [
        session?.user?.email,
    ]);

    useEffect(() => {
        const fetchComments =
            async () => {

                try {

                    const res =
                        await fetch(
                            `http://localhost:5000/comments/${id}`
                        );

                    const data =
                        await res.json();

                    setComments(data);

                } catch (error) {

                    console.error(error);

                }
            };

        if (id) {
            fetchComments();
        }

    }, [id]);


    const handleReaction = async (type) => {

        if (
            !session?.user?.email
        ) {
            return Swal.fire({
                icon: "warning",
                title:
                    "Login Required",
            });
        }

        const res =
            await fetch(
                `http://localhost:5000/forums/react/${id}`,
                {
                    method:
                        "PATCH",

                    headers:
                    {
                        "Content-Type":
                            "application/json",
                    },

                    body:
                        JSON.stringify(
                            {
                                email:
                                    session
                                        .user
                                        .email,

                                type,
                            }
                        ),
                }
            );

        if (res.ok) {

            const updated =
                await fetch(
                    `http://localhost:5000/forums/${id}`
                );

            const data =
                await updated.json();

            setPost(data);
        }
    };

    const handleComment = async () => {

        if (!session?.user) {

            return Swal.fire({
                icon: "warning",
                title:
                    "Login Required",
            });
        }

        if (!commentText.trim()) {

            return Swal.fire({
                icon: "warning",
                title:
                    "Write a comment first",
            });
        }

        const commentData = {
            forumId: id,

            userName:
                session.user.name,

            userEmail:
                session.user.email,

            comment:
                commentText,

            createdAt:
                new Date().toISOString(),
        };

        const res =
            await fetch(
                "http://localhost:5000/comments",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify(
                        commentData
                    ),
                }
            );

        const data =
            await res.json();

        if (data.insertedId) {

            setComments([
                {
                    ...commentData,
                    _id:
                        data.insertedId,
                },
                ...comments,
            ]);

            setCommentText("");

            Swal.fire({
                icon: "success",
                title:
                    "Comment Added",
                timer: 1200,
                showConfirmButton:
                    false,
            });
        }
    };

    const handleDeleteComment = async (commentId) => {

        const result =
            await Swal.fire({
                title:
                    "Delete Comment?",
                icon:
                    "warning",
                showCancelButton:
                    true,
            });

        if (
            !result.isConfirmed
        ) {
            return;
        }

        const res =
            await fetch(
                `http://localhost:5000/comments/${commentId}`,
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

            setComments(
                comments.filter(
                    (
                        item
                    ) =>
                        item._id !==
                        commentId
                )
            );
        }
    };

    const handleEditComment = async (commentId) => {

        const res =
            await fetch(
                `http://localhost:5000/comments/${commentId}`,
                {
                    method: "PATCH",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({
                        comment:
                            editText,
                    }),
                }
            );

        const data =
            await res.json();

        if (
            data.modifiedCount >
            0
        ) {

            setComments(
                comments.map(
                    (item) =>
                        item._id ===
                            commentId
                            ? {
                                ...item,
                                comment:
                                    editText,
                            }
                            : item
                )
            );

            setEditingId(
                null
            );

            setEditText("");
        }
    };


    const handleDelete = async (id) => {

        const result =
            await Swal.fire({
                title:
                    "Delete Post?",
                text:
                    "This action cannot be undone.",
                icon:
                    "warning",
                showCancelButton:
                    true,
                confirmButtonText:
                    "Delete",
            });

        if (
            !result.isConfirmed
        ) {
            return;
        }

        const res =
            await fetch(
                `http://localhost:5000/forums/${id}`,
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

            setPosts(
                posts.filter(
                    (
                        post
                    ) =>
                        post._id !==
                        id
                )
            );

            Swal.fire({
                icon:
                    "success",
                title:
                    "Post Deleted",
            });
        }
    };

    // const handleEditComment = async (
    //         commentId) => {

    //         const res =
    //             await fetch(
    //                 `http://localhost:5000/comments/${commentId}`,
    //                 {
    //                     method:
    //                         "PATCH",

    //                     headers:
    //                     {
    //                         "Content-Type":
    //                             "application/json",
    //                     },

    //                     body:
    //                         JSON.stringify(
    //                             {
    //                                 comment:
    //                                     editText,
    //                             }
    //                         ),
    //                 }
    //             );

    //         const data =
    //             await res.json();

    //         if (
    //             data.modifiedCount >
    //             0
    //         ) {

    //             setComments(
    //                 comments.map(
    //                     (
    //                         item
    //                     ) =>
    //                         item._id ===
    //                             commentId
    //                             ? {
    //                                 ...item,
    //                                 comment:
    //                                     editText,
    //                             }
    //                             : item
    //                 )
    //             );

    //             setEditingId(
    //                 null
    //             );

    //             setEditText("");
    //         }
    //     };


    if (loading) {
        return <LoadingSpinner />;
    }

    if (!post) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <h2 className="text-3xl font-bold">
                    Forum Post Not Found
                </h2>
            </div>
        );
    }

    return (
        <section className="relative overflow-hidden py-20">

            {/* Animated Background */}
            <motion.div
                animate={{
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute left-0 top-0 h-72 w-72 rounded-full bg-red-600/10 blur-3xl"
            />

            <motion.div
                animate={{
                    x: [0, -50, 0],
                    y: [0, 30, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-red-500/10 blur-3xl"
            />

            <div className="container relative z-10 mx-auto px-4">

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
                >

                    {/* Hero Image */}
                    <div className="relative h-[250px] md:h-[400px]">

                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            sizes="100vw"
                            className="object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-10 lg:p-12">

                        <span className="rounded-full bg-red-600/20 px-4 py-2 text-sm text-red-400">
                            Community Forum
                        </span>

                        <h1 className="mt-6 text-3xl font-bold md:text-5xl">
                            {post.title}
                        </h1>

                        <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-400">

                            <span>
                                👤 {post.authorName}
                            </span>

                            <span>
                                📅{" "}
                                {new Date(
                                    post.createdAt
                                ).toLocaleDateString()}
                            </span>

                        </div>

                        <div className="mt-10 space-y-6 leading-8 text-gray-300">

                            <p>
                                {post.description}
                            </p>

                        </div>

                        {/* Placeholder For Future Features */}

                        <div className="mt-12 border-t border-white/10 pt-8">

                            <h3 className="mb-6 text-2xl font-bold">
                                Community Interactions
                            </h3>

                            <div className="flex flex-wrap gap-4">

                                <motion.button
                                    onClick={() =>
                                        handleReaction(
                                            "like"
                                        )
                                    }
                                >
                                    👍 Like (
                                    {post.likes || 0}
                                    )
                                </motion.button>


                                <motion.button
                                    onClick={() =>
                                        handleReaction(
                                            "dislike"
                                        )
                                    }
                                >
                                    👎 Dislike (
                                    {post.dislikes || 0}
                                    )
                                </motion.button>

                            </div>

                            <div className="my-8 rounded-2xl border border-white/10 bg-white/5 p-5">

                                <h3 className="mb-4 text-xl font-bold">
                                    Join The Discussion
                                </h3>

                                <textarea
                                    value={commentText}
                                    onChange={(e) =>
                                        setCommentText(
                                            e.target.value
                                        )
                                    }
                                    rows={4}
                                    placeholder="Write your comment..."
                                    className="textarea w-full"
                                />

                                <motion.button
                                    onClick={handleComment}
                                    whileHover={{
                                        scale: 1.02,
                                    }}
                                    whileTap={{
                                        scale: 0.97,
                                    }}
                                    className="btn mt-4 border-none bg-gradient-to-r from-red-600 to-red-500 text-white"
                                >
                                    Post Comment
                                </motion.button>

                            </div>

                            <div className="mt-8">

                                <h3 className="mb-4 text-xl font-bold">
                                    Comments
                                </h3>

                                {comments.map((comment) => (

                                    <div
                                        key={comment._id}
                                        className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
                                    >

                                        <h4 className="font-semibold">
                                            {comment.userName}
                                        </h4>

                                        {editingId === comment._id ? (

                                            <div className="mt-3">

                                                <textarea
                                                    value={editText}
                                                    onChange={(e) =>
                                                        setEditText(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="textarea w-full"
                                                />

                                                <div className="mt-3 flex gap-3">

                                                    <button
                                                        onClick={() =>
                                                            handleEditComment(
                                                                comment._id
                                                            )
                                                        }
                                                        disabled={
                                                            editText.trim() ===
                                                            comment.comment
                                                        }
                                                        className={`rounded-xl px-5 py-2 text-sm font-medium text-white transition-all ${editText.trim() ===
                                                            comment.comment
                                                            ? "cursor-not-allowed bg-gray-700 opacity-50"
                                                            : "bg-gradient-to-r from-red-600 to-red-500"
                                                            }`}
                                                    >
                                                        Save Changes
                                                    </button>

                                                    <button
                                                        onClick={() => {

                                                            setEditingId(
                                                                null
                                                            );

                                                            setEditText("");
                                                        }}
                                                        className="rounded-xl border border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-amber-500/10 px-5 py-2 text-sm font-medium text-orange-400 transition-all hover:from-orange-500/20 hover:to-amber-500/20 hover:text-orange-300"
                                                    >
                                                        Cancel
                                                    </button>

                                                </div>
                                            </div>

                                        ) : (

                                            <p className="mt-2 text-gray-400">
                                                {comment.comment}
                                            </p>

                                        )}

                                        {comment.userEmail ===
                                            session?.user?.email && (

                                                <div className="mt-4 flex gap-3">

                                                    <motion.button
                                                        onClick={() => {

                                                            setEditingId(
                                                                comment._id
                                                            );

                                                            setEditText(
                                                                comment.comment
                                                            );

                                                        }}
                                                        whileHover={{
                                                            scale: 1.05,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.95,
                                                        }}
                                                        className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400 transition-all hover:bg-blue-500/20"
                                                    >
                                                        ✏️ Edit
                                                    </motion.button>

                                                    <motion.button
                                                        onClick={() =>
                                                            handleDeleteComment(
                                                                comment._id
                                                            )
                                                        }
                                                        whileHover={{
                                                            scale: 1.05,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.95,
                                                        }}
                                                        className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-all hover:bg-red-600 hover:text-white"
                                                    >
                                                        🗑 Delete
                                                    </motion.button>

                                                </div>

                                            )}

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>

                </motion.div>

            </div>



        </section>
    );
};

export default ForumDetailsPage;