"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useEffect, useState } from "react";

export default function ProfilePage() {

    const { user, updateUser } = useAuth();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        location: "",
        bio: "",
        profileImage: "",
    });

    // ✅ sync user → form
    useEffect(() => {
        if (user) {
            setForm({
                name: user.name || "",
                location: user.location || "",
                bio: user.bio || "",
                profileImage: user.profileImage || "",
            });
        }
    }, [user]);

    const update = (key, val) => {
        setForm((f) => ({
            ...f,
            [key]: val,
        }));
    };

    // ✅ save to DB
    const handleSave = async () => {
        try {
            setLoading(true);

            const res = await fetch("/api/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok) {
                updateUser(data.user); // 🔥 sync navbar + dashboard
                alert("Profile updated successfully");
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">

            {/* Header */}
            <div className="mb-8">
                <h1 className="font-serif text-2xl text-[#f5efe3]">
                    Profile Settings
                </h1>
                <p className="text-[#7a7060] text-sm mt-1">
                    Update your personal information.
                </p>
            </div>

            {/* Profile Card */}
            <div className="flex items-center gap-5 mb-8 p-5 bg-[#221a12] border border-white/5">

                {/* Avatar */}
                <div className="w-16 h-16 rounded-full overflow-hidden bg-[#b8933a]/20 border border-[#b8933a]/40 flex items-center justify-center text-2xl font-bold text-[#b8933a]">

                    {form.profileImage ? (
                        <img
                            src={form.profileImage}
                            alt="profile"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        user?.name?.charAt(0).toUpperCase()
                    )}

                </div>

                {/* User Info */}
                <div>

                    <p className="text-[#f5efe3] font-medium">
                        {form.name || user?.name}
                    </p>

                    <p className="text-[#7a7060] text-sm">
                        {user?.email}
                    </p>

                    <p className="text-xs text-[#7a7060] mt-1">
                        Member since 2025
                    </p>

                </div>

            </div>

            {/* Form */}
            <form className="space-y-5">

                {/* Name */}
                <div>
                    <label className="text-xs tracking-widest text-[#b8933a] uppercase mb-1 block">
                        Full Name
                    </label>
                    <input
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        className="w-full bg-white/5 border border-[#b8933a]/30 px-4 py-3 text-sm outline-none focus:border-[#d4aa56] transition"
                    />
                </div>

                {/* Location */}
                <div>
                    <label className="text-xs tracking-widest text-[#b8933a] uppercase mb-1 block">
                        Location
                    </label>
                    <input
                        value={form.location}
                        onChange={(e) => update("location", e.target.value)}
                        placeholder="e.g. Dhaka, Bangladesh"
                        className="w-full bg-white/5 border border-[#b8933a]/30 px-4 py-3 text-sm outline-none focus:border-[#d4aa56] transition"
                    />
                </div>

                {/* Bio */}
                <div>
                    <label className="text-xs tracking-widest text-[#b8933a] uppercase mb-1 block">
                        Bio
                    </label>
                    <textarea
                        value={form.bio}
                        onChange={(e) => update("bio", e.target.value)}
                        rows={3}
                        placeholder="Tell the community about yourself..."
                        className="w-full bg-white/5 border border-[#b8933a]/30 px-4 py-3 text-sm outline-none focus:border-[#d4aa56] transition resize-none"
                    />
                </div>

                {/* Image */}
                <div>
                    <label className="text-xs tracking-widest text-[#b8933a] uppercase mb-1 block">
                        Profile Image URL
                    </label>
                    <input
                        value={form.profileImage}
                        onChange={(e) => update("profileImage", e.target.value)}
                        placeholder="https://..."
                        className="w-full bg-white/5 border border-[#b8933a]/30 px-4 py-3 text-sm outline-none focus:border-[#d4aa56] transition"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="text-xs tracking-widest text-[#b8933a] uppercase mb-1 block">
                        Email (read-only)
                    </label>
                    <input
                        value={user?.email || ""}
                        readOnly
                        className="w-full bg-white/3 border border-white/5 px-4 py-3 text-sm text-[#7a7060] cursor-not-allowed"
                    />
                </div>

                {/* Button */}
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-[#b8933a] text-black px-8 py-3 text-xs uppercase tracking-widest hover:bg-[#d4aa56] transition disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save Changes"}
                </button>

            </form>

        </div>
    );
}