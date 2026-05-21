"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

const STATUS_STYLE = {
    pending: "border-yellow-500/30 text-yellow-400",
    accepted: "border-green-500/30 text-green-400",
    rejected: "border-red-500/30 text-red-400",
    completed: "border-blue-500/30 text-blue-400",
};

export default function ExchangesPage() {

    const { user } = useAuth();

    const [incoming, setIncoming] = useState([]);
    const [outgoing, setOutgoing] = useState([]);
    const [tab, setTab] = useState("incoming");
    const [loading, setLoading] = useState(true);

    // 🔥 FETCH FROM API
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                setLoading(true);

                const res = await fetch("/api/requests");
                const data = await res.json();

                const all = data.requests || [];

                const incomingData = all.filter(
                    r => r.ownerEmail === user?.email
                );

                const outgoingData = all.filter(
                    r => r.requesterEmail === user?.email
                );

                setIncoming(incomingData);
                setOutgoing(outgoingData);

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchRequests();
        }
    }, [user]);

    const updateStatus = async (id, status) => {
        try {
            const res = await fetch("/api/requests/status", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    requestId: id,
                    status
                })
            });

            const data = await res.json();

            if (data.success) {
                // UI instant update
                setIncoming(prev =>
                    prev.map(r =>
                        r._id === id ? { ...r, status } : r
                    )
                );

                setOutgoing(prev =>
                    prev.map(r =>
                        r._id === id ? { ...r, status } : r
                    )
                );
            }

        } catch (err) {
            console.error(err);
        }
    };

    const current =
        tab === "incoming" ? incoming : outgoing;

    const RequestCard = ({ req, isIncoming }) => (
        <div className="bg-[#221a12]  border border-white/5 hover:border-[#b8933a]/20 transition p-5">

            <div className="flex items-start justify-between gap-4">

                <div className="flex-1">

                    {/* Status */}
                    <div className="flex items-center gap-2 mb-2">

                        <span
                            className={`text-xs px-2 py-0.5 border ${STATUS_STYLE[req.status] ||
                                "border-white/10 text-[#7a7060]"
                                }`}
                        >
                            {req.status}
                        </span>

                        <span className="text-xs text-[#7a7060]">
                            {new Date(req.createdAt).toLocaleDateString()}
                        </span>

                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-[#f5efe3] mb-1">
                        {req.bookTitle}
                    </h3>



                    {/* User */}
                    <p className="text-xs text-[#7a7060]">

                        {isIncoming
                            ? `From: ${req.requesterName}`
                            : `To: ${req.ownerEmail}`}

                    </p>

                    {/* Message */}
                    {req.message && (
                        <p className="text-xs text-[#9c8f7a] mt-2 bg-white/5 p-2 italic">
                            "{req.message}"
                        </p>
                    )}

                </div>

            </div>

            {/* Incoming Pending */}
            {isIncoming && req.status === "pending" && (
                <div className="flex gap-2 mt-4">

                    <button
                        onClick={() => updateStatus(req._id, "accepted")}
                        className="flex-1 bg-green-700/20 border border-green-500/30 text-green-400 py-1.5 text-xs hover:bg-green-700/30 transition"
                    >
                        Accept
                    </button>

                    <button
                        onClick={() => updateStatus(req._id, "rejected")}
                        className="flex-1 bg-red-700/20 border border-red-500/30 text-red-400 py-1.5 text-xs hover:bg-red-700/30 transition"
                    >
                        Reject
                    </button>

                    <Link
                        href="/dashboard/messages"
                        className="px-3 border border-[#b8933a]/30 text-[#b8933a] py-1.5 text-xs hover:bg-[#b8933a]/10 transition"
                    >
                        Message
                    </Link>

                </div>
            )}

            {/* Incoming Accepted */}
            {isIncoming && req.status === "accepted" && (
                <div className="flex gap-2 mt-4">

                    <button
                        onClick={() => updateStatus(req._id, "completed")}
                        className="flex-1 bg-blue-700/20 border border-blue-500/30 text-blue-400 py-1.5 text-xs hover:bg-blue-700/30 transition"
                    >
                        Mark Completed
                    </button>

                    <Link
                        href="/dashboard/messages"
                        className="px-3 border border-[#b8933a]/30 text-[#b8933a] py-1.5 text-xs hover:bg-[#b8933a]/10 transition"
                    >
                        Message
                    </Link>

                </div>
            )}

            {/* Outgoing */}
            {!isIncoming && (
                <div className="flex gap-2 mt-4">

                    <Link
                        href="/dashboard/messages"
                        className="border border-[#b8933a]/30 text-[#b8933a] px-3 py-1.5 text-xs hover:bg-[#b8933a]/10 transition"
                    >
                        Message Owner
                    </Link>

                </div>
            )}

        </div>
    );

    if (loading) {
        return (
            <div className="text-center py-20 text-[#7a7060]">
                Loading requests...
            </div>
        );
    }

    return (
        <div className="px-5">

            {/* Header */}
            <div className="mb-8">

                <h1 className="font-serif text-2xl text-[#f5efe3]">
                    Exchange Requests
                </h1>

                <p className="text-[#7a7060] text-sm mt-1">
                    Manage your incoming and outgoing book exchange requests.
                </p>

            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 mb-6">

                {[
                    ["incoming", `Incoming (${incoming.length})`],
                    ["outgoing", `Outgoing (${outgoing.length})`],
                ].map(([key, label]) => (

                    <button
                        key={key}
                        onClick={() => setTab(key)}
                        className={`px-6 py-3 text-sm uppercase tracking-widest transition ${tab === key
                            ? "text-[#d4aa56] border-b-2 border-[#b8933a]"
                            : "text-[#7a7060] hover:text-[#f5efe3]"
                            }`}
                    >
                        {label}
                    </button>

                ))}

            </div>

            {/* Cards */}
            {current.length === 0 ? (

                <div className="bg-[#221a12] border border-white/5 p-16 text-center">

                    <div className="text-5xl mb-4">📬</div>

                    <p className="text-[#7a7060]">
                        No {tab} requests yet.
                    </p>

                </div>

            ) : (

                <div className="grid md:grid-cols-2 gap-4">

                    {current.map((req) => (
                        <RequestCard
                            key={req._id}
                            req={req}
                            isIncoming={tab === "incoming"}
                        />
                    ))}

                </div>

            )}

        </div>
    );
}