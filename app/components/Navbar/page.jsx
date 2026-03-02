"use client"
import { useState } from "react"
import Link from "next/link"
import { FiMenu, FiX } from "react-icons/fi"

export default function Navbar() {
    const [open, setOpen] = useState(false)

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-[#1e1512]/80 backdrop-blur-sm border-y border-white/10">
            <div className="xl:max-w-10/12 xl:mx-auto px-6 xl:px-0">
                <nav className="h-20 flex justify-between items-center">

                    {/* Logo */}
                    <Link href="/" >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 border border-yellow-600 flex items-center justify-center font-serif text-yellow-600">
                                F
                            </div>
                            <div>
                                <h1 className="font-serif text-xl tracking-wide text-white">Folio</h1>
                                <p className="text-[10px] tracking-[0.3em] uppercase text-yellow-600">
                                    Book Exchange
                                </p>
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-10 text-sm uppercase tracking-widest text-white">
                        <Link href="/browse" className="hover:text-yellow-500 transition">
                            Browse
                        </Link>

                        <Link href="/" className="hover:text-yellow-500 transition">
                            DashBoard
                        </Link>
                        <Link href="/contact" className="hover:text-yellow-500 transition">
                            Contact Us
                        </Link>

                        <Link
                            href="auth"
                            className="border border-yellow-600 px-5 py-2 text-yellow-600 hover:bg-yellow-600 hover:text-black transition"
                        >
                            Start Exchanging
                        </Link>
                    </div>

                    {/* Mobile Icon */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="lg:hidden text-yellow-600"
                    >
                        {open ? <FiX size={26} /> : <FiMenu size={26} />}
                    </button>
                </nav>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="px-6 pb-6 pt-6 flex flex-col  gap-5 text-sm uppercase tracking-widest text-white  border-t border-white/10 ">
                    <Link href="/browse" onClick={() => setOpen(false)} className="hover:text-yellow-500 transition">
                        Browse
                    </Link>

                    <Link href="#how" onClick={() => setOpen(false)} className="hover:text-yellow-500 transition">
                        How It Works
                    </Link>

                    <Link
                        href="#"
                        onClick={() => setOpen(false)}
                        className="border border-yellow-600 px-5 py-2 text-yellow-600 hover:bg-yellow-600 hover:text-black transition text-center"
                    >
                        Start Exchanging
                    </Link>
                </div>
            </div>
        </header>
    )
}
