"use client";
import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import AuthLayout from "../components/auth/AuthLayout";
import SignupForm from "../components/auth/RegisterForm";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";



export default function AuthPage() {
    const [mode, setMode] = useState("login");
    const [form, setForm] = useState({
        email: "",
        password: "",
        username: "",
        name: "",
        confirmPassword: "",
        acceptTerms: false,
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);

        setLoading(false);
    };


    const router = useRouter();
    const { setUser } = useAuth();

    const handleLogin = async (e) => {

        e.preventDefault();

        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: form.email,
                password: form.password,
            }),
        });

        const data = await res.json();

        if (res.ok) {

            setUser(data.user);

            router.push("/");
        }
    };
    return (
        <div className="bg-[#221a12]">
            <AuthLayout >
                {mode === "login" ? (
                    <LoginForm form={form} setForm={setForm} loading={loading} onSubmit={handleLogin} setMode={setMode} />
                ) : (
                    <SignupForm form={form} setForm={setForm} loading={loading} onSubmit={handleSubmit} setMode={setMode} />
                )}
            </AuthLayout>
        </div>
    );
}