"use client"
import React from "react"
import { motion } from "framer-motion"

export default function Hero() {
    return (
        <section className="bg-[radial-gradient(circle_at_bottom_right,#2b1f1b_20%,#1e1512_50%)] pt-38 pb-26 overflow-hidden ">
            <div className=" md:max-w-10/12 md:mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">


                <div className="text-center md:text-left">
                    <div className="flex items-center gap-3 mb-6">

                        <div className="w-20 h-px bg-yellow-600"></div>

                        <p className="uppercase tracking-[0.3em] text-yellow-600 text-xs">
                            A Literary Community
                        </p>



                    </div>


                    <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl leading-tight mb-6 text-white">
                        Every book <br className="hidden md:block" />
                        deserves a <br />
                        <span className="italic text-yellow-500">new</span>
                        <strong className="block">reader.</strong>
                    </h1>



                    <div className="flex flex-row gap-4 justify-center md:justify-start items-center">
                        <button className="bg-yellow-600 text-black px-8 py-3 uppercase text-xs tracking-widest hover:bg-yellow-500 transition cursor-pointer">
                            Browse Collection
                        </button>

                        <a href="#how" className="text-xs uppercase px-8 py-2.5 border border-yellow-600 text-gray-300 hover:text-white">
                            See how it works →
                        </a>
                    </div>
                </div>

                {/* RIGHT BOOK STACK */}
                <div className="relative flex justify-center items-center min-h-105 md:min-h-130">

                    <div className="relative w-65 h-105 md:w-[320px] md:h-130">

                        {/* Book 1 */}
                        <Book
                            title="The Midnight Library"
                            author="Matt Haig"
                            className="left-12 top-6 md:left-20 md:top-10 -rotate-8 from-[#5a4535] to-[#3a2820] border-[#7a5a40]"
                        />

                        {/* Book 2 */}
                        <Book
                            title="Braiding Sweetgrass"
                            author="Robin W. Kimmerer"
                            className="left-20 top-12 md:left-28 md:top-17 rotate-3 from-[#2c4a3c] to-[#1a3028] border-[#4a7a60]"
                        />

                        {/* Book 3 */}
                        <Book
                            title="Project Hail Mary"
                            author="Andy Weir"
                            className="left-6 top-24 md:left-15 md:top-25 -rotate-3 from-[#3a3060] to-[#221a40] border-[#5a4a90]"
                        />

                        {/* Book 4 */}
                        <Book
                            title="Normal People"
                            author="Sally Rooney"
                            className="left-24 top-32 md:left-33 md:top-33 rotate-6 from-[#60302a] to-[#401a14] border-[#904540]"
                        />

                        {/* Book 5 */}
                        <Book
                            title="The Name of the Wind"
                            author="Patrick Rothfuss"
                            className="left-14 top-40 md:left-23 md:top-38 -rotate-12 from-[#2a4060] to-[#162535] border-[#406090]"
                        />

                        <motion.div
                            initial={{ y: 0 }}
                            animate={{ y: [-6, 12, -6] }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute -bottom-5 md:bottom-10 -left-20 bg-[#1b1410e6] border border-yellow-700/20 p-4 w-52 backdrop-blur-md"
                        >
                            <p className="font-serif italic text-xs text-gray-300 leading-6">
                                A reader lives a thousand lives before he dies.
                            </p>
                            <span className="text-yellow-500 text-[10px] block mt-2">
                                — George R.R. Martin
                            </span>
                        </motion.div>


                        <motion.div
                            initial={{ y: 0 }}
                            animate={{ y: [10, -14, 10] }}
                            transition={{
                                duration: 7,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute top-10 -right-3 md:-right-14 text-right"
                        >
                            <div className="text-4xl md:text-5xl font-serif text-yellow-500 leading-none">
                                4.2k
                            </div>
                            <div className="text-[9px] uppercase tracking-wider text-gray-400">
                                Books Available
                            </div>
                        </motion.div>


                    </div>
                </div>
            </div>
        </section>
    )
}


function Book({ title, author, className }) {
    return (
        <div
            className={`absolute w-36 h-56 md:w-48 md:h-68 rounded-lg flex flex-col justify-center px-4 py-5 shadow-2xl bg-gradient-to-b border-l-8 transform transition-transform duration-300 hover:z-10 hover:-translate-y-3 hover:scale-105 cursor-pointer ${className}`}
        >
            <div className="font-serif text-xs font-semibold text-[#f5efe3cc] leading-5">
                {title}
            </div>
            <div className="h-px w-full bg-white/10 my-2"></div>
            <div className="text-[9px] text-white/40 mt-1 tracking-widest">
                {author}
            </div>
        </div>
    )
}
