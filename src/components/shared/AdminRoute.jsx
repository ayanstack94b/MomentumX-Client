"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function AdminRoute({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
            return;
        }

        if (!loading && user && user.role !== "admin") {
            router.push("/dashboard");
        }
    }, [loading, user, router]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!user || user.role !== "admin") {
        return null;
    }

    return children;
}