"use client";

import PrivateRoute from "@/components/shared/PrivateRoute";

export default function ProfilePage() {
    return (
        <PrivateRoute>
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-5xl font-bold">
                    Profile
                </h1>
            </div>
        </PrivateRoute>
    );
}