"use client";

import { useState, useEffect, useRef } from "react";
import { FiSend } from "react-icons/fi";
import { socket } from "@/lib/socket";
import { useAuth } from "@/app/context/AuthContext";

export default function MessagesPage() {

    const { user } = useAuth();

    const [conversations, setConversations] = useState([]);
    const [activeConvo, setActiveConvo] = useState(null);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");

    const bottomRef = useRef(null);
    const activeConvoRef = useRef(null);

    useEffect(() => {
        activeConvoRef.current = activeConvo;
    }, [activeConvo]);

    //  LOAD CONVERSATIONS
    useEffect(() => {
        if (!user?.email) return;

        const fetchConvos = async () => {
            try {
                const res = await fetch(`/api/conversations?user=${user.email}`);
                const data = await res.json();
                setConversations(data.conversations || []);
            } catch (err) {
                console.error(err);
            }
        };

        fetchConvos();
    }, [user?.email]);

    // 🔥 OPEN CONVERSATION
    const openConvo = async (c) => {
        setActiveConvo(c);
        setMessages([]);

        socket.emit("joinRoom", c._id);

        try {
            const res = await fetch(`/api/messages?conversationId=${c._id}`);
            const data = await res.json();
            setMessages(data.messages || []);
        } catch (err) {
            console.error(err);
        }
    };

    // 🔥 REALTIME RECEIVE (FIXED CLEANUP)
    useEffect(() => {

        const handler = (msg) => {

            const currentConvo = activeConvoRef.current;

            // 🔥 always latest convo check
            if (!currentConvo || msg.conversationId !== currentConvo._id) return;

            setMessages((prev) => [...prev, msg]);
        };

        socket.on("receiveMessage", handler);

        return () => {
            socket.off("receiveMessage", handler);
        };

    }, []);

    //  SEND MESSAGE
    const sendMessage = async () => {

        if (!text.trim() || !activeConvo) return;

        const msg = {
            conversationId: activeConvo._id,
            senderId: user.email,
            text,
            timestamp: Date.now(),
        };

        // 1. instant UI
        setMessages(prev => [...prev, msg]);

        // 2. socket send
        socket.emit("sendMessage", msg);

        // 3. DB save
        await fetch("/api/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(msg),
        });

        setText("");
    };

    return (
        <div className="w-full px-5">

            {/* HEADER */}
            <div className="mb-4">
                <h1 className="font-serif text-2xl text-[#f5efe3]">
                    Messages
                </h1>
                <p className="text-[#7a7060] text-sm">
                    Chat with other readers about book exchanges.
                </p>
            </div>

            {/* WRAPPER */}
            <div className="flex flex-col md:flex-row bg-[#160e0c] border border-white/5 h-[calc(100vh-220px)]">

                {/* LEFT */}
                <div className="w-full md:w-72 border-r border-white/5 flex flex-col">

                    {conversations.map((c) => (
                        <button
                            key={c._id}
                            onClick={() => openConvo(c)}
                            className={`w-full text-left p-4 border-b border-white/5 transition
        ${activeConvo?._id === c._id
                                    ? "bg-[#b8933a]/20 border-l-4 border-[#b8933a]"
                                    : "hover:bg-white/5"
                                }`}
                        >
                            <div className="text-sm text-[#f5efe3]">
                                {c.user?.name || "Unknown"}
                            </div>

                            <div className="text-xs text-[#7a7060] truncate">
                                {c.lastMessage?.text || ""}
                            </div>
                        </button>
                    ))}

                </div>

                {/* RIGHT */}
                <div className="flex-1 flex flex-col">

                    {!activeConvo ? (
                        <div className="flex-1 flex items-center justify-center text-[#7a7060]">
                            Select a conversation
                        </div>
                    ) : (
                        <>
                            {/* MESSAGES */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-3">

                                {messages.map((msg, i) => (
                                    <div
                                        key={i}
                                        className={`flex ${msg.senderId === user?.email
                                            ? "justify-end"
                                            : "justify-start"
                                            }`}
                                    >
                                        <div className="px-4 py-2 text-sm bg-white/10 text-[#f5efe3] rounded">
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}

                                <div ref={bottomRef} />
                            </div>

                            {/* INPUT */}
                            <div className="p-4 border-t border-white/5 flex gap-3">

                                <input
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    className="flex-1 bg-white/5 px-4 py-2 text-sm outline-none"
                                    placeholder="Type message..."
                                />

                                <button
                                    onClick={sendMessage}
                                    className="bg-[#b8933a] px-4 text-black"
                                >
                                    <FiSend />
                                </button>

                            </div>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}