"use client";
import { useState } from "react";

export default function LoginForm({ form, setForm, loading, onSubmit, setMode }) {
    const [showPass, setShowPass] = useState(false);


    return (
        <form
            onSubmit={onSubmit}
            className="space-y-6 "
        >

            <div className="space-y-2">
                <h2 className="font-serif text-3xl">Sign in to your library</h2>
                <p className="text-sm text-[#9c8f7a]">
                    Access your books and exchanges
                </p>
            </div>


            <div className="space-y-2">
                <label className="text-xs tracking-widest text-[#b8933a] uppercase">
                    Email
                </label>
                <input
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className="w-full bg-white/5 border border-[#b8933a]/30 px-4 py-3 outline-none
                     focus:border-[#d4aa56] transition"
                />
            </div>

            <div className="space-y-2">
                <label className="text-xs tracking-widest text-[#b8933a] uppercase">
                    Password
                </label>
                <div className="relative">
                    <input
                        type={showPass ? "text" : "password"}
                        required
                        autoComplete="current-password"
                        placeholder="Enter password"
                        value={form.password}
                        onChange={(e) =>
                            setForm((f) => ({ ...f, password: e.target.value }))
                        }
                        className="w-full bg-white/5 border border-[#b8933a]/30 px-4 py-3 pr-12 outline-none
                       focus:border-[#d4aa56] transition"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPass((s) => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#b8933a]"
                    >
                        {showPass ? "Hide" : "Show"}
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-[#9c8f7a]">
                    <input type="checkbox" className="accent-[#b8933a]" />
                    Remember me
                </label>
                <button type="button" className="text-[#b8933a] hover:underline">
                    Forgot password?
                </button>
            </div>


            <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-[#b8933a] to-[#9a7a30]
                   text-black uppercase tracking-widest text-xs disabled:opacity-50"
            >
                {loading ? "Signing in…" : "Sign In"}
            </button>


            <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-[#b8933a]/30" />
                <span className="text-xs text-[#7a7060]">OR CONTINUE WITH</span>
                <div className="flex-1 h-px bg-[#b8933a]/30" />
            </div>


            <div className="grid grid-cols-2 gap-3">
                <button type="button" className="border border-[#b8933a]/30 py-3 text-sm hover:bg-white/5 transition">
                    Google
                </button>
                <button type="button" className="border border-[#b8933a]/30 py-3 text-sm hover:bg-white/5 transition">
                    GitHub
                </button>
            </div>

            <p className="text-center text-sm text-[#7a7060]">
                Don’t have an account?{" "}
                <button
                    type="button"
                    onClick={() => setMode("register")}
                    className="text-[#b8933a] cursor-pointer hover:underline"
                >
                    Sign Up
                </button>
            </p>
        </form>
    );
}