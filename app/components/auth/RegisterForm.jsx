"use client";
import { useState, useEffect } from "react";

function getStrength(password) {
    if (!password) return { label: "", score: 0 };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    const levels = ["Weak", "Fair", "Good", "Strong"];
    return { label: levels[score - 1] || "Weak", score };
}

export default function SignupForm({ form, setForm, loading, onSubmit, setMode }) {
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const passwordsMatch = form.password && form.password === form.confirmPassword;
    const strength = getStrength(form.password);

    const handleRegister = async () => {
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            alert("Account created!");
            setMode("login");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleRegister();
            }}
            className="space-y-6"
        >
            <div className="space-y-2 ">
                <h2 className="font-serif text-3xl">Create your account</h2>
                <p className="text-sm text-[#9c8f7a]">Join the library and start exchanging books</p>
            </div>

            <div className="space-y-2">
                <label className="text-xs tracking-widest text-[#b8933a] uppercase">Full Name</label>
                <input
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full bg-white/5 border border-[#b8933a]/30 px-4 py-3 outline-none focus:border-[#d4aa56] transition"
                />
            </div>


            <div className="space-y-2">
                <label className="text-xs tracking-widest text-[#b8933a] uppercase">Email</label>
                <input
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full bg-white/5 border border-[#b8933a]/30 px-4 py-3 outline-none focus:border-[#d4aa56] transition"
                />
            </div>




            <div className="space-y-2">
                <label className="text-xs tracking-widest text-[#b8933a] uppercase">Password</label>
                <div className="relative">
                    <input
                        type={showPass ? "text" : "password"}
                        required
                        autoComplete="new-password"
                        placeholder="Enter password"
                        value={form.password}
                        onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))}
                        className="w-full bg-white/5 border border-[#b8933a]/30 px-4 py-3 pr-12 outline-none focus:border-[#d4aa56] transition"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPass(s => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#b8933a]"
                    >
                        {showPass ? "Hide" : "Show"}
                    </button>
                </div>

                {mounted && form.password && (
                    <>
                        <div className="h-1 bg-white/10 rounded mt-1">
                            <div
                                className="h-1 bg-[#b8933a] rounded transition-all"
                                style={{ width: `${strength.score * 25}%` }}
                            />
                        </div>
                        <p className="text-xs text-[#7a7060]">Strength: {strength.label}</p>
                    </>
                )}
            </div>


            <div className="space-y-2">
                <label className="text-xs tracking-widest text-[#b8933a] uppercase">Confirm Password</label>
                <div className="relative">
                    <input
                        type={showConfirm ? "text" : "password"}
                        required
                        autoComplete="new-password"
                        placeholder="Re-enter password"
                        value={form.confirmPassword}
                        onChange={(e) => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
                        className={`w-full bg-white/5 border px-4 py-3 pr-12 outline-none transition ${form.confirmPassword && !passwordsMatch
                            ? "border-red-400"
                            : "border-[#b8933a]/30 focus:border-[#d4aa56]"
                            }`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirm(s => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#b8933a]"
                    >
                        {showConfirm ? "Hide" : "Show"}
                    </button>
                </div>
                {form.confirmPassword && !passwordsMatch && (
                    <p className="text-xs text-red-400">Passwords do not match</p>
                )}
            </div>


            <label className="flex items-start gap-3 text-sm text-[#9c8f7a]">
                <input
                    type="checkbox"
                    required
                    checked={form.acceptTerms || false}
                    onChange={(e) => setForm(f => ({ ...f, acceptTerms: e.target.checked }))}
                    className="mt-1 accent-[#b8933a]"
                />
                I agree to the Terms of Service and Privacy Policy
            </label>

            <button
                type="submit"
                disabled={loading || !passwordsMatch || !form.acceptTerms}
                className="w-full py-3 bg-gradient-to-r from-[#b8933a] to-[#9a7a30] text-black uppercase tracking-widest text-xs disabled:opacity-50"
            >
                {loading ? "Creating account…" : "Sign Up"}
            </button>

            <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-[#b8933a]/30" />
                <span className="text-xs text-[#7a7060]">OR SIGN UP WITH</span>
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
                Already have an account?{" "}
                <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="text-[#b8933a] cursor-pointer hover:underline"
                >
                    Sign In
                </button>
            </p>
        </form>
    );
}