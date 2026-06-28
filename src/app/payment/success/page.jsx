"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import axiosInstance from "@/lib/axios";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

function PaymentSuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

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
                    Swal.fire({
                        icon: "success",
                        title: "Payment Successful",
                        text: "Your payment has been verified.",
                        timer: 2000,
                        showConfirmButton: false,
                    });

                    router.push("/dashboard/booked-classes");
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

    return <LoadingSpinner />;
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <PaymentSuccessContent />
        </Suspense>
    );
}