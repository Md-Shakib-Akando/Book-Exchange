"use client";
import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import AuthLayout from "../components/auth/AuthLayout";
import SignupForm from "../components/auth/RegisterStep1";


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

    return (
        <div className="bg-[#221a12]">
            <AuthLayout >
                {mode === "login" ? (
                    <LoginForm form={form} setForm={setForm} loading={loading} onSubmit={handleSubmit} setMode={setMode} />
                ) : (
                    <SignupForm form={form} setForm={setForm} loading={loading} onSubmit={handleSubmit} setMode={setMode} />
                )}
            </AuthLayout>
        </div>
    );
}