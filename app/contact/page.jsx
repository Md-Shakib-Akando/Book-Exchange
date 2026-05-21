"use client";

import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";

export default function ContactPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const update = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // static UI only (no API)
        alert("Message sent successfully!");
    };

    return (
        <div className="min-h-screen bg-[#1b1410] text-[#f5efe3] flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-10">

                {/* LEFT INFO PANEL */}
                <div className="bg-[#221a12] border border-white/5 p-8">
                    <h1 className="font-serif text-3xl mb-2">
                        Get in <span className="text-[#d4aa56] italic">Touch</span>
                    </h1>

                    <p className="text-[#7a7060] text-sm mb-8 leading-relaxed">
                        Have a question, suggestion, or want to collaborate?
                        We’d love to hear from you. Send us a message anytime.
                    </p>

                    <div className="space-y-5">

                        <div className="flex items-center gap-3">
                            <FiMail className="text-[#b8933a]" />
                            <span className="text-sm text-[#7a7060]">
                                support@bookexchange.com
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <FiPhone className="text-[#b8933a]" />
                            <span className="text-sm text-[#7a7060]">
                                +880 1XXX-XXXXXX
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <FiMapPin className="text-[#b8933a]" />
                            <span className="text-sm text-[#7a7060]">
                                Parbatipur, Rangpur, Bangladesh
                            </span>
                        </div>
                    </div>

                    <div className="mt-10 p-4 border border-white/5 bg-white/5">
                        <p className="text-xs text-[#7a7060] leading-relaxed">
                            “Building a community where books find new lives and readers find new stories.”
                        </p>
                    </div>
                </div>

                {/* RIGHT FORM */}
                <div className="bg-[#221a12] border border-white/5 p-8">

                    <h2 className="font-serif text-2xl mb-6">
                        Send a <span className="text-[#b8933a]">Message</span>
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div className="grid md:grid-cols-2 gap-4">

                            <input
                                value={form.name}
                                onChange={(e) => update("name", e.target.value)}
                                placeholder="Your Name"
                                className="w-full bg-white/5 border border-[#b8933a]/20 px-4 py-3 text-sm outline-none focus:border-[#d4aa56] transition"
                            />

                            <input
                                value={form.email}
                                onChange={(e) => update("email", e.target.value)}
                                placeholder="Your Email"
                                className="w-full bg-white/5 border border-[#b8933a]/20 px-4 py-3 text-sm outline-none focus:border-[#d4aa56] transition"
                            />
                        </div>

                        <input
                            value={form.subject}
                            onChange={(e) => update("subject", e.target.value)}
                            placeholder="Subject"
                            className="w-full bg-white/5 border border-[#b8933a]/20 px-4 py-3 text-sm outline-none focus:border-[#d4aa56] transition"
                        />

                        <textarea
                            value={form.message}
                            onChange={(e) => update("message", e.target.value)}
                            placeholder="Write your message..."
                            rows={6}
                            className="w-full bg-white/5 border border-[#b8933a]/20 px-4 py-3 text-sm outline-none focus:border-[#d4aa56] transition resize-none"
                        />

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 bg-[#b8933a] text-black py-3 text-xs uppercase tracking-widest hover:bg-[#d4aa56] transition"
                        >
                            <FiSend size={14} />
                            Send Message
                        </button>

                    </form>
                </div>

            </div>
        </div>
    );
}