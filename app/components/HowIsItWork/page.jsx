"use client"
import React from 'react'
import { motion } from "framer-motion";
export default function HowIsItWork() {
    return (
        <section className="pt-72 md:py-25 px-15 bg-[#211918] ">
            <div className=' md:max-w-10/12 md:mx-auto'>
                <div className="flex flex-col-reverse md:flex-row justify-around md:gap-80 items-center">

                    <div className='mt-35 md:mt-0 md:-ml-20'>
                        <div className="flex items-center gap-4 mb-8 mt-10 md:mt-0 md:mb-16">
                            <span className="inline-block w-8 h-px bg-[#B8933A]"></span>
                            <span className="text-lg tracking-widest uppercase text-[#B8933A]">How It Works</span>

                        </div>

                        <div className=" mb-10">
                            <h2 className="font-serif text-4xl font-light leading-[1.05] text-[#f5efe3] mb-6">
                                Exchange is <br className='hidden md:block' />
                                as easy as <br />
                                <em className="italic text-[#d4aa56]">turning a page.</em>
                            </h2>

                            <p className="text-[14px] leading-[1.8] text-[#7a7060]">
                                No fees, no shipping complications. Just a community of readers sharing what they love, one book at a time.
                            </p>
                        </div>

                        <div className="flex flex-col">


                            <div className=" flex gap-7 py-7 border-b border-white/10 group">
                                <div className="font-serif text-[48px] font-light text-[#b8933a]/20 w-12.5 transition-colors group-hover:text-[#b8933a]/50">
                                    01
                                </div>
                                <div>
                                    <h4 className="font-serif text-[20px] font-semibold text-[#f5efe3] mb-2">
                                        List Your Books
                                    </h4>
                                    <p className="text-[13px] leading-[1.7] text-[#7a7060]">
                                        Add books from your shelf that are ready for a new home. Include condition notes and a brief description.
                                    </p>
                                </div>
                            </div>


                            <div className="  flex gap-7 py-7 border-b border-white/10 group">
                                <div className="font-serif text-[48px] font-light text-[#b8933a]/20 w-12.5 transition-colors group-hover:text-[#b8933a]/50">
                                    02
                                </div>
                                <div>
                                    <h4 className="font-serif text-[20px] font-semibold text-[#f5efe3] mb-2">
                                        Browse & Request
                                    </h4>
                                    <p className="text-[13px] leading-[1.7] text-[#7a7060]">
                                        Find books you'd love to read. Send an exchange request with a personal message to the owner.
                                    </p>
                                </div>
                            </div>


                            <div className="  flex gap-7 py-7 group">
                                <div className="font-serif text-[48px] font-light text-[#b8933a]/20 w-12.5 transition-colors group-hover:text-[#b8933a]/50">
                                    03
                                </div>
                                <div>
                                    <h4 className="font-serif text-[20px] font-semibold text-[#f5efe3] mb-2">
                                        Meet & Swap
                                    </h4>
                                    <p className="text-[13px] leading-[1.7] text-[#7a7060]">
                                        Agree on a handoff — in person, by post, or drop-off. Stories find new shelves, and friendships begin.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>


                    <div className="relative  flex items-center justify-center">

                        <div className="relative flex items-center justify-center">

                            <motion.div
                                className="absolute w-72 h-72 rounded-full border border-[#b8933a]/30 border-t-transparent border-l-transparent"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                            />

                            <motion.div
                                className="absolute w-60 h-60 rounded-full border border-[#b8933a]/40 border-b-transparent border-r-transparent"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                            />


                            <motion.div
                                className="absolute w-48 h-48 rounded-full border border-[#b8933a]/50 border-t-transparent border-r-transparent"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            />



                            <motion.div
                                className="text-7xl"
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                📖
                            </motion.div>


                            <div className="absolute -top-48 text-center">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm shadow-lg"
                                    style={{ background: "linear-gradient(135deg,#4a3a5a,#2a1a3a)" }}>
                                    SK
                                </div>
                                <div className="text-xs text-[#c8c0b0] mt-1">Shakib.</div>
                            </div>


                            <div className="absolute -bottom-30 -left-38 text-center">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm shadow-lg"
                                    style={{ background: "linear-gradient(135deg,#3a5a4a,#1a3a2a)" }}>
                                    SA
                                </div>
                                <div className="text-xs text-[#c8c0b0] mt-1">Akando.</div>
                            </div>


                            <div className="absolute -bottom-30 -right-38 text-center">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm shadow-lg"
                                    style={{ background: "linear-gradient(135deg,#5a3a3a,#3a1a1a)" }}>
                                    RR
                                </div>
                                <div className="text-xs text-[#c8c0b0] mt-1">Ratul.</div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>

    )
}
