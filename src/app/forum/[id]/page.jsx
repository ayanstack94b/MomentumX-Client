"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Swal from "sweetalert2";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";

const ForumDetailsPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");
    const [replyText, setReplyText] = useState("");
    const [replyingTo, setReplyingTo] = useState(null);
    const [showReplies, setShowReplies] = useState({});
    const [editingReplyId, setEditingReplyId] = useState(null);
    const [editReplyText, setEditReplyText] = useState("");



    useEffect(() => {
        const fetchPost = async () => {

            try {

                const res =
                    await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/forums/${id}`
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
            !user?.email
        ) {
            return;
        }

        const fetchPosts =
            async () => {

                try {

                    const { data } = await axiosInstance.get(
                        `/forums/user/${user.email}`
                    );

                    setPosts(data);

                    setPosts(data);

                } catch (error) {

                    console.error(error);

                } finally {

                    setLoading(false);

                }
            };

        fetchPosts();

    }, [
        user?.email,
    ]);

    useEffect(() => {
        const fetchComments =
            async () => {

                try {

                    const res =
                        await fetch(
                            `${process.env.NEXT_PUBLIC_API_URL}/comments/${id}`
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
        if (!user?.email) {
            return Swal.fire({
                icon: "warning",
                title: "Login Required",
            });
        }

        try {
            const { data: result } = await axiosInstance.patch(
                `/forums/react/${id}`,
                {
                    email: user.email,
                    type,
                }
            );

            if (!result.success) {
                return Swal.fire({
                    icon: "warning",
                    title: result.message,
                });
            }

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/forums/${id}`
            );

            const data = await res.json();

            setPost(data);

        } catch (error) {

            Swal.fire({
                icon: "warning",
                title: "Already Reacted",
                text:
                    error.response?.data?.message ||
                    "You have already reacted to this post.",
            });

        }
    };

    const handleComment = async () => {
        if (!user) {
            return Swal.fire({
                icon: "warning",
                title: "Login Required",
            });
        }

        if (!commentText.trim()) {
            return Swal.fire({
                icon: "warning",
                title: "Write a comment first",
            });
        }

        const commentData = {
            forumId: id,
            userName: user?.name,
            userEmail: user?.email,
            comment: commentText,
            createdAt: new Date().toISOString(),
        };

        try {
            const { data: result } = await axiosInstance.post(
                "/comments",
                commentData
            );

            if (result.insertedId) {
                setComments([
                    {
                        ...commentData,
                        _id: result.insertedId,
                    },
                    ...comments,
                ]);

                setCommentText("");

                Swal.fire({
                    icon: "success",
                    title: "Comment Added",
                    timer: 1200,
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Action Restricted",
                text:
                    error.response?.data?.message ||
                    "Unable to add comment.",
            });

            console.error(error);
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

        const { data: deleteResult } = await axiosInstance.delete(
            `/comments/${commentId}`
        );

        if (deleteResult.deletedCount > 0) {

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

        const { data: result } = await axiosInstance.patch(
            `/comments/${commentId}`,
            {
                comment: editText,
            }
        );

        if (result.modifiedCount > 0) {

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

    const handleReply = async (
        commentId
    ) => {

        if (!user) {

            return Swal.fire({
                icon: "warning",
                title:
                    "Login Required",
            });
        }

        if (!replyText.trim()) {

            return Swal.fire({
                icon: "warning",
                title:
                    "Write a reply first",
            });
        }

        const replyData = {

            _id:
                crypto.randomUUID(),

            userName: user?.name,

            userEmail: user?.email,

            reply:
                replyText,

            createdAt:
                new Date().toISOString(),
        };

        const { data: result } = await axiosInstance.patch(
            `/comments/reply/${commentId}`,
            replyData
        );

        if (result.modifiedCount > 0) {

            Swal.fire({
                icon:
                    "success",
                title:
                    "Reply Added",
                timer:
                    1200,
                showConfirmButton:
                    false,
            });

            setReplyText("");

            setReplyingTo(
                null
            );

            // Temporary refresh
            window.location.reload();
        }
    };

    const handleDeleteReply = async (
        commentId,
        replyId
    ) => {

        const result =
            await Swal.fire({
                title:
                    "Delete Reply?",
                icon:
                    "warning",
                showCancelButton:
                    true,
                confirmButtonColor:
                    "#dc2626",
            });

        if (
            !result.isConfirmed
        ) {
            return;
        }
        const { data: deleteResult } = await axiosInstance.patch(
            `/comments/reply/delete/${commentId}`,
            {
                replyId,
            }
        );

        if (result.modifiedCount > 0) {

            Swal.fire({
                icon:
                    "success",
                title:
                    "Reply Deleted",
                timer:
                    1200,
                showConfirmButton:
                    false,
            });

            window.location.reload();
        }
    };

    const handleEditReply = (
        commentId,
        replyId,
        currentReply
    ) => {

        setEditingReplyId(
            replyId
        );

        setEditReplyText(
            currentReply
        );
    };

    const handleSaveReply = async (
            commentId,
            replyId
        ) => {

            if (
                !editReplyText.trim()
            ) {
                return;
            }

        const { data: result } = await axiosInstance.patch(
            `/comments/reply/edit/${commentId}`,
            {
                replyId,
                reply: editReplyText,
            }
        );

        if (result.modifiedCount > 0) {

                Swal.fire({
                    icon:
                        "success",
                    title:
                        "Reply Updated",
                    timer:
                        1200,
                    showConfirmButton:
                        false,
                });

                setEditingReplyId(
                    null
                );

                setEditReplyText(
                    ""
                );

                window.location.reload();
            }
        };

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
                            src={post?.image}
                            alt={post?.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
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
                                    whileHover={{
                                        scale: 1.05,
                                    }}
                                    whileTap={{
                                        scale: 0.95,
                                    }}
                                    className="flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-2 text-green-400 transition-all hover:bg-green-500/20"
                                >
                                    <motion.div
                                        whileHover={{
                                            rotate: -15,
                                            scale: 1.2,
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                        }}
                                    >
                                        <FaThumbsUp />
                                    </motion.div>

                                    <span>
                                        Like ({post.likes || 0})
                                    </span>
                                </motion.button>

                                <motion.button
                                    onClick={() =>
                                        handleReaction(
                                            "dislike"
                                        )
                                    }
                                    whileHover={{
                                        scale: 1.05,
                                    }}
                                    whileTap={{
                                        scale: 0.95,
                                    }}
                                    className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-red-400 transition-all hover:bg-red-500/20"
                                >
                                    <motion.div
                                        whileHover={{
                                            rotate: 15,
                                            scale: 1.2,
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                        }}
                                    >
                                        <FaThumbsDown />
                                    </motion.div>

                                    <span>
                                        Dislike ({post.dislikes || 0})
                                    </span>
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
                                            <>
                                                <p className="mt-2 text-gray-400">
                                                    {comment.comment}
                                                </p>

                                                <div className="mt-3 flex flex-wrap gap-2">

                                                    {comment.replies?.length > 0 && (
                                                        <button
                                                            onClick={() =>
                                                                setShowReplies((prev) => ({
                                                                    ...prev,
                                                                    [comment._id]:
                                                                        !prev[comment._id],
                                                                }))
                                                            }
                                                            className="rounded-lg border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400"
                                                        >
                                                            {showReplies[comment._id]
                                                                ? "Hide Replies"
                                                                : `Replies (${comment.replies.length})`}
                                                        </button>
                                                    )}

                                                    {comment.userEmail !==
                                                       user?.email && (
                                                            <button
                                                                onClick={() =>
                                                                    setReplyingTo(
                                                                        replyingTo ===
                                                                            comment._id
                                                                            ? null
                                                                            : comment._id
                                                                    )
                                                                }
                                                                className="rounded-lg border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400"
                                                            >
                                                                Reply
                                                            </button>
                                                        )}
                                                </div>

                                                {replyingTo ===
                                                    comment._id && (
                                                        <div className="mt-3">

                                                            <textarea
                                                                value={replyText}
                                                                onChange={(e) =>
                                                                    setReplyText(
                                                                        e.target.value
                                                                    )
                                                                }
                                                                placeholder="Write a reply..."
                                                                className="textarea textarea-sm w-full"
                                                            />

                                                            <div className="mt-2 flex gap-2">

                                                                <button
                                                                    onClick={() =>
                                                                        handleReply(
                                                                            comment._id
                                                                        )
                                                                    }
                                                                    className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-400"
                                                                >
                                                                    Post Reply
                                                                </button>

                                                                <button
                                                                    onClick={() =>
                                                                        setReplyingTo(
                                                                            null
                                                                        )
                                                                    }
                                                                    className="rounded-lg border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-400"
                                                                >
                                                                    Cancel
                                                                </button>

                                                            </div>

                                                        </div>
                                                    )}

                                                {/* Replies Dropdown */}
                                                <AnimatePresence>

                                                    {showReplies[
                                                        comment._id
                                                    ] && (

                                                            <motion.div
                                                                initial={{
                                                                    opacity: 0,
                                                                    height: 0,
                                                                }}
                                                                animate={{
                                                                    opacity: 1,
                                                                    height: "auto",
                                                                }}
                                                                exit={{
                                                                    opacity: 0,
                                                                    height: 0,
                                                                }}
                                                                transition={{
                                                                    duration: 0.3,
                                                                }}
                                                                className="overflow-hidden"
                                                            >

                                                                <div className="mt-3 space-y-2">

                                                                    {comment.replies?.map(
                                                                        (
                                                                            reply,
                                                                            index
                                                                        ) => (

                                                                            <motion.div
                                                                                key={index}
                                                                                initial={{
                                                                                    opacity: 0,
                                                                                    x: -10,
                                                                                }}
                                                                                animate={{
                                                                                    opacity: 1,
                                                                                    x: 0,
                                                                                }}
                                                                                transition={{
                                                                                    delay:
                                                                                        index *
                                                                                        0.05,
                                                                                }}
                                                                                className="ml-6 rounded-xl border border-white/10 bg-black/20 p-3"
                                                                            >

                                                                                {/* Reply Author */}
                                                                                <h5 className="text-sm font-medium text-red-400">
                                                                                    {reply.userName}
                                                                                </h5>

                                                                                {/* Reply Content */}
                                                                                {editingReplyId ===
                                                                                    reply._id ? (

                                                                                    <div className="mt-2">

                                                                                        <textarea
                                                                                            value={editReplyText}
                                                                                            onChange={(e) =>
                                                                                                setEditReplyText(
                                                                                                    e.target.value
                                                                                                )
                                                                                            }
                                                                                            className="textarea textarea-sm w-full"
                                                                                        />

                                                                                        <div className="mt-2 flex gap-2">

                                                                                                <button
                                                                                                    onClick={() =>
                                                                                                        handleSaveReply(
                                                                                                            comment._id,
                                                                                                            reply._id
                                                                                                        )
                                                                                                    }
                                                                                                    disabled={
                                                                                                        editReplyText.trim() ===
                                                                                                        reply.reply
                                                                                                    }
                                                                                                    className={`rounded-lg px-3 py-1 text-xs text-white transition-all ${editReplyText.trim() ===
                                                                                                            reply.reply
                                                                                                            ? "cursor-not-allowed bg-gray-700 opacity-50"
                                                                                                            : "bg-green-600 hover:bg-green-700"
                                                                                                        }`}
                                                                                                >
                                                                                                    Save
                                                                                                </button>

                                                                                            <button
                                                                                                onClick={() => {

                                                                                                    setEditingReplyId(
                                                                                                        null
                                                                                                    );

                                                                                                    setEditReplyText(
                                                                                                        ""
                                                                                                    );

                                                                                                }}
                                                                                                className="rounded-lg border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs text-orange-400"
                                                                                            >
                                                                                                Cancel
                                                                                            </button>

                                                                                        </div>

                                                                                    </div>

                                                                                ) : (

                                                                                    <p className="mt-1 text-sm text-gray-400">
                                                                                        {reply.reply}
                                                                                    </p>

                                                                                )}

                                                                                {/* Reply Actions */}
                                                                                {reply.userEmail ===
                                                                                    user?.email && (

                                                                                        <div className="mt-2 flex gap-2">

                                                                                            <div className="mt-2 flex gap-2">

                                                                                                <button
                                                                                                    onClick={() =>
                                                                                                        handleEditReply(
                                                                                                            comment._id,
                                                                                                            reply._id,
                                                                                                            reply.reply
                                                                                                        )
                                                                                                    }
                                                                                                    className="flex items-center justify-center gap-2 rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-400 transition-all hover:bg-blue-500/20"
                                                                                                >
                                                                                                    <FaRegPenToSquare className="text-blue-500" />
                                                                                                    Edit Reply
                                                                                                </button>

                                                                                                <button
                                                                                                    onClick={() =>
                                                                                                        handleDeleteReply(
                                                                                                            comment._id,
                                                                                                            reply._id
                                                                                                        )
                                                                                                    }
                                                                                                    className="flex items-center justify-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs text-red-400 transition-all hover:bg-red-500/20"
                                                                                                >
                                                                                                    <FaRegTrashCan className="text-red-500" />
                                                                                                    Delete Reply
                                                                                                </button>

                                                                                            </div>


                                                                                        </div>

                                                                                    )}

                                                                            </motion.div>

                                                                        )
                                                                    )}
                                                                </div>

                                                            </motion.div>

                                                        )}

                                                </AnimatePresence>
                                            </>
                                        )}

                                        {/* Show comment actions only for comment owner */}
                                        {comment.userEmail === user?.email && (

                                            <div className="mt-3 flex flex-wrap gap-2">

                                                {/* Edit Comment */}
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
                                                    className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 transition-all hover:bg-blue-500/20"
                                                >
                                                    ✏️ Edit
                                                </motion.button>

                                                {/* Delete Comment */}
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
                                                    className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400 transition-all hover:bg-red-600 hover:text-white"
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