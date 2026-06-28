"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function PrivateRoute({ children }) {
    const { user, loading } = useAuth();
   
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }

        console.log(user);
        console.log("LOADING:", loading);

    }, [user, loading, router]);
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="p-10 text-center">
                No Session Found
            </div>
        );
    }

    return children;
}