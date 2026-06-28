"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import axiosInstance from "@/lib/axios";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

 function PaymentSuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [verified, setVerified] = useState(false);

    useEffect(() => {
        const verifyPayment = async () => {
            const sessionId = searchParams.get("session_id");

            if (!sessionId) {
                router.push("/");
                return;
            }

            try {
                const { data } = await axiosInstance.post(
                    "/confirm-payment",
                    {
                        sessionId,
                    }
                );

                if (data.success) {
                    setVerified(true);
                }
            } catch (error) {
                console.error(error);

                Swal.fire({
                    icon: "error",
                    title: "Payment Failed",
                    text: "Unable to verify payment.",
                });

                router.push("/");
            }
        };

        verifyPayment();
    }, [router, searchParams]);

    if (!verified) {
        return <LoadingSpinner />;
    }

    return (
        <section className="flex min-h-[80vh] items-center justify-center px-4">
            <div className="w-full max-w-xl rounded-3xl border border-green-500/20 bg-white/5 p-10 text-center backdrop-blur-xl">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-5xl text-green-500">
                    ✓
                </div>

                <h1 className="heading-font mt-6 text-4xl">
                    Payment Successful
                </h1>

                <p className="mt-4 text-gray-400">
                    Your payment has been verified successfully.
                    Your booking has been confirmed.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">

                    <button
                        onClick={() =>
                            router.push(
                                "/dashboard/booked-classes"
                            )
                        }
                        className="btn flex-1 border-none bg-gradient-to-r from-red-600 to-red-500 text-white"
                    >
                        View My Bookings
                    </button>

                    <button
                        onClick={() =>
                            router.push("/")
                        }
                        className="btn flex-1 btn-outline"
                    >
                        Back to Home
                    </button>

                </div>
            </div>
        </section>
    );
}
export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <PaymentSuccessContent />
        </Suspense>
    );
}