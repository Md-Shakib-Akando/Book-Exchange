"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMenu, FiX, FiMessageSquare } from "react-icons/fi";
import { useAuth } from "@/app/context/AuthContext";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    // ✅ profile dropdown state
    const [profileOpen, setProfileOpen] = useState(false);

    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-[#1e1512]/80 backdrop-blur-sm border-y border-white/10">

            <div className="xl:max-w-10/12 xl:mx-auto px-6 xl:px-0">

                <nav className="h-20 flex justify-between items-center">

                    {/* LOGO */}
                    <Link href="/">
                        <div className="flex items-center gap-4">

                            <div className="w-10 h-10 border border-yellow-600 flex items-center justify-center font-serif text-yellow-600">
                                F
                            </div>

                            <div>
                                <h1 className="font-serif text-xl tracking-wide text-white">
                                    Folio
                                </h1>
                                <p className="text-[10px] tracking-[0.3em] uppercase text-yellow-600">
                                    Book Exchange
                                </p>
                            </div>

                        </div>
                    </Link>

                    {/* DESKTOP MENU */}
                    <div className="hidden lg:flex items-center gap-8 text-sm uppercase tracking-widest text-white">

                        <Link href="/browse" className="hover:text-yellow-500 transition">
                            Browse
                        </Link>

                        <Link href="/contact" className="hover:text-yellow-500 transition">
                            Contact Us
                        </Link>

                        {user ? (
                            <>
                                <Link href="/dashboard" className="hover:text-yellow-500 transition">
                                    Dashboard
                                </Link>

                                <Link href="/dashboard/messages" className="hover:text-yellow-500 transition">
                                    <FiMessageSquare size={18} />
                                </Link>

                                {/* PROFILE DROPDOWN */}
                                <div
                                    className="relative"
                                    onMouseEnter={() => setProfileOpen(true)}
                                    onMouseLeave={() => setProfileOpen(false)}
                                >
                                    <button className="flex items-center gap-2 text-[#b8933a]">

                                        <div className="w-8 h-8 rounded-full bg-[#b8933a]/20 border border-[#b8933a]/40 flex items-center justify-center text-xs font-bold">
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </div>

                                    </button>

                                    {/* DROPDOWN */}
                                    {profileOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-[#221a12] border border-[#b8933a]/30 py-2">

                                            <Link
                                                href="/dashboard/profile"
                                                className="block px-4 py-2 text-xs hover:text-[#b8933a] normal-case"
                                            >
                                                Profile
                                            </Link>

                                            <Link
                                                href="/dashboard/my-books"
                                                className="block px-4 py-2 text-xs hover:text-[#b8933a] normal-case"
                                            >
                                                My Books
                                            </Link>

                                            <Link
                                                href="/dashboard/exchanges"
                                                className="block px-4 py-2 text-xs hover:text-[#b8933a] normal-case"
                                            >
                                                Exchanges
                                            </Link>

                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-xs text-red-400 hover:text-red-300"
                                            >
                                                Sign Out
                                            </button>

                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <Link
                                href="/auth"
                                className="border border-yellow-600 px-5 py-2 text-yellow-600 hover:bg-yellow-600 hover:text-black transition"
                            >
                                Start Exchanging
                            </Link>
                        )}
                    </div>

                    {/* MOBILE ICON */}
                    <button onClick={() => setOpen(!open)} className="lg:hidden text-yellow-600">
                        {open ? <FiX size={26} /> : <FiMenu size={26} />}
                    </button>

                </nav>
            </div>

            {/* MOBILE MENU */}
            <div className={`lg:hidden overflow-hidden transition-all duration-500 ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>

                <div className="px-6 pb-6 pt-6 flex flex-col gap-5 text-sm uppercase tracking-widest text-white border-t border-white/10">

                    <Link href="/browse" onClick={() => setOpen(false)}>
                        Browse
                    </Link>

                    {user ? (
                        <>
                            <Link href="/dashboard" onClick={() => setOpen(false)}>
                                Dashboard
                            </Link>

                            <Link href="/dashboard/messages" onClick={() => setOpen(false)}>
                                Messages
                            </Link>

                            <Link href="/dashboard/profile" onClick={() => setOpen(false)}>
                                Profile
                            </Link>

                            <button onClick={handleLogout} className="text-left text-red-400">
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/contact" onClick={() => setOpen(false)}>
                                Contact Us
                            </Link>

                            <Link
                                href="/auth"
                                onClick={() => setOpen(false)}
                                className="border border-yellow-600 px-5 py-2 text-yellow-600 text-center"
                            >
                                Start Exchanging
                            </Link>
                        </>
                    )}

                </div>
            </div>

        </header>
    );
}