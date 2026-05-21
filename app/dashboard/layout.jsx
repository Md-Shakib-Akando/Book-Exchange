"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import {
    FiBook,
    FiRepeat,
    FiMessageSquare,
    FiUser,
    FiPlusSquare,
    FiGrid,
    FiLogOut,
    FiX,
} from "react-icons/fi";

import DashboardNavbar from "./DashboardNavbar";
import { useAuth } from "../context/AuthContext";

const NAV = [
    {
        href: "/dashboard",
        label: "Overview",
        icon: FiGrid,
    },
    {
        href: "/dashboard/my-books",
        label: "My Books",
        icon: FiBook,
    },
    {
        href: "/dashboard/add-books",
        label: "Add Book",
        icon: FiPlusSquare,
    },
    {
        href: "/dashboard/exchanges",
        label: "Exchanges",
        icon: FiRepeat,
    },
    {
        href: "/dashboard/messages",
        label: "Messages",
        icon: FiMessageSquare,
    },
    {
        href: "/dashboard/profile",
        label: "Profile",
        icon: FiUser,
    },
];

export default function DashboardLayout({ children }) {

    const pathname = usePathname();

    const [open, setOpen] = useState(false);

    // STATIC USER
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-[#1b1410] text-[#f5efe3] pt-16 flex">

            {/* Navbar */}
            <DashboardNavbar
                onMenuClick={() => setOpen(true)}
            />

            {/* Sidebar */}
            <aside
                className={`
                    fixed top-0 left-0 h-full w-72
                    bg-[#160e0c]
                    border-r border-white/5
                    z-50
                    transform transition-transform duration-300
                    ${open
                        ? "translate-x-0"
                        : "-translate-x-full"}
                    lg:translate-x-0 lg:top-16
                `}
            >

                {/* Mobile Close */}
                <div className="lg:hidden flex justify-end p-4">

                    <button
                        onClick={() => setOpen(false)}
                    >
                        <FiX size={20} />
                    </button>

                </div>

                {/* Profile */}
                <div className="p-6 border-b border-white/5">

                    {user ? (
                        <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-full bg-[#b8933a]/20 border border-[#b8933a]/40 flex items-center justify-center text-sm font-bold text-[#b8933a]">

                                {user?.name?.charAt(0).toUpperCase()}

                            </div>

                            <div>

                                <p className="text-sm font-semibold">
                                    {user?.name}
                                </p>

                                <p className="text-xs text-[#7a7060] truncate max-w-[130px]">
                                    {user?.email}
                                </p>

                            </div>

                        </div>
                    ) : (
                        <div className="text-sm text-[#7a7060]">
                            Loading user...
                        </div>
                    )}

                </div>

                {/* Navigation */}
                <nav className="flex-1 py-4 px-3">

                    {NAV.map(
                        ({
                            href,
                            label,
                            icon: Icon,
                        }) => {

                            const active =
                                pathname === href;

                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    onClick={() =>
                                        setOpen(false)
                                    }
                                    className={`
                                        flex items-center gap-3
                                        px-3 py-2.5 mb-1
                                        text-sm transition
                                        ${active
                                            ? "bg-[#b8933a]/15 text-[#d4aa56] border-l-2 border-[#b8933a]"
                                            : "text-[#7a7060] hover:text-[#f5efe3] hover:bg-white/5"}
                                    `}
                                >

                                    <Icon size={16} />

                                    {label}

                                </Link>
                            );
                        }
                    )}

                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-white/5">

                    <button
                        className="flex items-center gap-3 px-3 py-2 text-sm text-red-400 w-full"
                        onClick={handleLogout}
                    >

                        <FiLogOut size={16} />

                        Sign Out

                    </button>

                </div>

            </aside>

            {/* Mobile Overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 w-full lg:ml-64 p-4 sm:p-6 lg:p-8 px-18 mt-16 lg:mt-0">

                {children}

            </main>

        </div>
    );
}