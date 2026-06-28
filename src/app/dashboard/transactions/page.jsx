"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import axiosInstance from "@/lib/axios";
import AdminRoute from "@/components/shared/AdminRoute";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { FaMoneyCheckDollar } from "react-icons/fa6";

const TransactionsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const { data } =
                    await axiosInstance.get(
                        "/transactions"
                    );

                setTransactions(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    const totalRevenue =
        transactions.reduce(
            (sum, item) =>
                sum + Number(item.price),
            0
        );

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <AdminRoute>
            <motion.div
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                className="space-y-6 p-4 sm:p-6 lg:p-8"
            >
                {/* Hero */}

                <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-red-950/40 via-black to-red-950/40 p-4 sm:rounded-3xl sm:p-6 lg:p-8">
                    <span className="inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs text-red-400 sm:px-4 sm:py-2 sm:text-sm">
                        Admin Dashboard
                    </span>

                    <h1 className="heading-font mt-4 text-2xl leading-tight sm:mt-5 sm:text-3xl md:text-4xl lg:text-5xl">
                        Transactions
                    </h1>

                    <p className="mt-3 max-w-full text-sm leading-6 text-gray-400 sm:mt-4 sm:max-w-xl sm:text-base lg:max-w-2xl">
                        View all successful Stripe payments made across MomentumX.
                    </p>
                </div>

                {/* Revenue Card */}
<div className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6">
    <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">

        <div className="flex flex-col items-center gap-4 sm:flex-row">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 sm:h-20 sm:w-20">
                <FaMoneyCheckDollar className="text-3xl text-red-500 sm:text-4xl" />
            </div>

            <div>
                <p className="text-sm text-gray-400 sm:text-base">
                    Total Revenue
                </p>

                <h2 className="mt-1 text-3xl font-bold sm:text-4xl lg:text-5xl">
                    ₹
                    <CountUp
                        end={totalRevenue}
                        duration={2}
                    />
                </h2>
            </div>

        </div>

    </div>
</div>

                {/* Transactions Table */}

                <div className="overflow-hidden rounded-3xl border border-white/10 bg-base-200/30">
                    <div className="overflow-x-auto max-w-85 p-5 sm:max-w-150 md:max-w-187.5 lg:max-w-full">

                        <div className="flex items-center justify-between gap-2 border-b border-white/10 px-4 py-4 sm:px-6">
                            <div>
                                <h2 className="text-lg font-semibold text-white">
                                    Payment History
                                </h2>

                                <p className="text-xs text-gray-400">
                                    All successful Stripe transactions
                                </p>
                            </div>

                            <motion.div
                                animate={{
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                }}
                                className="badge badge-error badge-outline flex"
                            >
                                {transactions.length} <span>Payments</span>
                            </motion.div>
                        </div>

                    
                        <table className="table table-sm table-pin-rows table-pin-cols">

                            <thead>

                                <tr className="bg-base-300 text-xs uppercase  text-gray-400">

                                    <th>User Email</th>

                                    <th>Class</th>

                                    <th>Trainer</th>

                                    <th>Amount</th>

                                    <th>Payment Date</th>

                                    <th>Transaction ID</th>

                                </tr>

                            </thead>

                            <tbody>

                                {transactions.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan={7}
                                            className="py-8 text-center text-gray-400"
                                        >
                                            No transactions found.
                                        </td>

                                    </tr>

                                ) : (

                                    transactions.map(
                                        (
                                            transaction,
                                            index
                                        ) => (

                                            <tr
                                                key={
                                                    transaction._id
                                                }
                                                className="hover"
                                            >

                                                <td className="max-w-xs whitespace-normal break-all">
                                                    {
                                                        transaction.memberEmail
                                                    }
                                                </td>

                                                <td className="whitespace-nowrap font-medium">
                                                    {transaction.className}
                                                </td>

                                                <td className="whitespace-nowrap">
                                                    {transaction.trainerName}
                                                </td>

                                                <td className="whitespace-nowrap font-semibold text-green-400">
                                                    ₹
                                                    {
                                                        transaction.price
                                                    }
                                                </td>
                                                <td className="whitespace-nowrap">
                                                    {new Date(transaction.paidAt).toLocaleDateString()}
                                                </td>

                                                <td className="max-w-xs break-all font-mono text-xs">
                                                    {
                                                        transaction.transactionId
                                                    }
                                                </td>

                                            </tr>

                                        )
                                    )

                                )}

                            </tbody>



                        </table>

                    </div>

                </div>

            </motion.div>

        </AdminRoute>

    );
};

export default TransactionsPage;