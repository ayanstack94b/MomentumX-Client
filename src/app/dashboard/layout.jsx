"use client";

import PrivateRoute from "@/components/shared/PrivateRoute";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }) {
    return (
        <PrivateRoute>
            <div className="min-h-screen flex">
                <Sidebar />

                <main className="flex-1">
                    {children}
                </main>
            </div>
        </PrivateRoute>
    );
}