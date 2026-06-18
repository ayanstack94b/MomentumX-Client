"use client";

import PrivateRoute from "@/components/shared/PrivateRoute";

export default function BookClassPage() {
    return (
        <PrivateRoute>
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-5xl font-bold">
                    Book Class
                </h1>
            </div>
        </PrivateRoute>
    );
}