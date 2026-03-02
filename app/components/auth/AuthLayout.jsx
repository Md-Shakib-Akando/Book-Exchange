"use client";

import Image from "next/image";
import heroImg from "../../../public/authImg.png";

export default function AuthLayout({ children }) {
    return (
        <div className=" xl:max-w-10/12 xl:mx-auto px-6 xl:px-0">
            <div className=" grid lg:grid-cols-2 text-[#f5efe3] pt-20">


                <div className="hidden lg:flex relative ">

                    <Image
                        src={heroImg}
                        alt="Library hero"
                        className="object-cover w-full h-full"
                        fill
                        priority
                    />


                </div>


                <div className="flex items-center justify-center p-10 ">
                    <div className="w-full max-w-md">{children}</div>
                </div>
            </div>
        </div>
    );
}