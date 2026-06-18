"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PrivateRoute({ children }) {
    const { data: session, isPending } = authClient.useSession();

    const router = useRouter();

    useEffect(() => {
        if (!isPending && !session) {
            router.push("/login");
        }
    }, [session, isPending, router]);

    if (isPending) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-ring loading-xl"></span>
            </div>
        );
    }

    if (!session) return null;

    return children;
}