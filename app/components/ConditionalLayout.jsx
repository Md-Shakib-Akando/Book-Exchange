"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar/page";
import Footer from "./Footer/page";


export default function ConditionalLayout({ children }) {
    const pathname = usePathname();

    const hideLayout = pathname.startsWith("/dashboard");

    return (
        <>
            {!hideLayout && <Navbar />}
            {children}
            {!hideLayout && <Footer />}
        </>
    );
}