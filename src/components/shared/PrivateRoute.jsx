"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function PrivateRoute({ children }) {
    const { data: session, isPending } = authClient.useSession();
   
    const router = useRouter();

    useEffect(() => {
        // if (!isPending && !session) {
        //     // router.push("/login");
        //     // console.log("PUSHING TO DASHBOARD");
        //     // window.location.href = "/dashboard";
        // }

        console.log("SESSION:", session);
        console.log("PENDING:", isPending);
    }, [session, isPending]);

    if (isPending) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    // if (!session) return null;
    if (!session) {
        return (
            <div className="p-10 text-center">
                No Session Found
            </div>
        );
    }

    return children;
}