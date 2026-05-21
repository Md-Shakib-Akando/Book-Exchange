"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getUser = async () => {

            try {

                const res = await fetch("/api/me");

                const data = await res.json();

                setUser(data.user);

            } catch (error) {

                setUser(null);

            } finally {

                setLoading(false);
            }
        };

        getUser();

    }, []);

    const logout = async () => {

        await fetch("/api/logout", {
            method: "POST",
        });

        setUser(null);
    };
    const updateUser = (newUser) => {
        setUser(newUser);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                logout,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);