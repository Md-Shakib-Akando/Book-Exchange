"use client";

import { FiMenu, FiBell } from "react-icons/fi";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function DashboardNavbar({
    onMenuClick,
}) {

    const { user } = useAuth();

    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-[#160e0c] border-b border-white/5 z-50 flex items-center justify-between px-4 lg:px-6">

            {/* Left Side */}
            <div className="flex items-center gap-3">

                {/* Mobile Menu */}
                <button
                    onClick={onMenuClick}
                    className="lg:hidden text-[#f5efe3]"
                >
                    <FiMenu size={22} />
                </button>

                {/* Logo */}
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

            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">

                {/* Notification */}
                <button className="text-[#7a7060] hover:text-[#f5efe3] transition">

                    <FiBell size={18} />

                </button>

                {/* User */}
                <div className="flex items-center gap-2">

                    <div className="w-8 h-8 rounded-full bg-[#b8933a]/20 border border-[#b8933a]/40 flex items-center justify-center text-xs font-bold text-[#b8933a]">

                        {user?.name?.charAt(0).toUpperCase()}

                    </div>

                    <div className="hidden sm:block">

                        <p className="text-xs text-[#f5efe3]">
                            {user?.name}
                        </p>

                        <p className="text-[10px] text-[#7a7060]">
                            {user?.email}
                        </p>

                    </div>

                </div>

            </div>

        </header>
    );
}