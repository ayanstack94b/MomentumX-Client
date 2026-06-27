"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import axiosInstance from "@/lib/axios";
const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const syncUser = async () => {
            const storedUser = localStorage.getItem("momentumx-user");

            if (storedUser) {
                setUser(JSON.parse(storedUser));
                setLoading(false);
                return;
            }

            try {
                const session = await authClient.getSession();

                if (session?.data?.user) {
                    const { data } = await axiosInstance.post("/google-login", {
                        name: session.data.user.name,
                        email: session.data.user.email,
                        image: session.data.user.image,
                    });

                    localStorage.setItem(
                        "momentumx-token",
                        data.token
                    );

                    localStorage.setItem(
                        "momentumx-user",
                        JSON.stringify(data.user)
                    );

                    setUser(data.user);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        syncUser();
    }, []);

    const login = (userData) => {
        localStorage.setItem(
            "momentumx-user",
            JSON.stringify(userData)
        );

        setUser(userData);
    };

    const logout = async () => {
        try {
            await authClient.signOut();
        } catch (error) {
            console.error(error);
        }

        localStorage.removeItem("momentumx-user");
        localStorage.removeItem("momentumx-token");

        setUser(null);
    };

    const authInfo = {
        user,
        login,
        logout,
        loading,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);