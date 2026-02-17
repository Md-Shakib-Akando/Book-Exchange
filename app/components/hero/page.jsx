import React from 'react'

export default function Hero() {
    return (
        <section className="min-h-screen grid md:grid-cols-2 items-center px-6 md:px-16  relative bg-[radial-gradient(circle_at_bottom_right,#2b1f1b_20%,#1e1512_50%)]">

            <div>
                <p className="uppercase tracking-[0.3em] text-yellow-600 text-xs mb-6">
                    A Literary Community
                </p>

                <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-6">
                    Every book <br />
                    deserves a <br />
                    <span className="italic text-yellow-500">new</span>
                    <strong className="block">reader.</strong>
                </h1>

                <p className="text-gray-400 max-w-md mb-8">
                    Trade stories with neighbours and fellow readers. Give your books a
                    second life — and discover your next obsession.
                </p>

                <div className="flex gap-6 ">
                    <button className="bg-yellow-600 text-black px-8 py-3 uppercase text-xs tracking-widest hover:bg-yellow-500 transition">
                        Browse Collection
                    </button>
                    <a href="#how" className="text-sm text-gray-300 hover:text-white">
                        See how it works →
                    </a>
                </div>
            </div>

            <section className="hero relative">


                <div className="hero-right relative z-20 h-screen flex items-center justify-center">
                    <div className="book-stack relative w-[320px] h-[440px]">

                        {/* Book 1 */}
                        <div className=" absolute left-20 top-10 w-50 h-70 rounded-lg flex flex-col justify-center px-4 py-5 shadow-2xl bg-gradient-to-b from-[#5a4535] to-[#3a2820] border-l-8 border-[#7a5a40] transform -rotate-8 transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:z-10 hover:-translate-y-3 hover:scale-[1.03] cursor-pointer">
                            <div className="book-title-text font-serif text-[12px] font-semibold text-[#f5efe3cc] leading-5 tracking-[0.03em]">
                                The Midnight Library
                            </div>
                            <div className="book-spine-deco h-[1px] w-full bg-white/10 my-2"></div>
                            <div className="book-author-text text-[9px] text-white/40 mt-1 tracking-widest">
                                Matt Haig
                            </div>
                        </div>

                        {/* Book 2 */}
                        <div className="book b2 absolute left-28 top-17 w-45 h-65 rounded-lg flex flex-col justify-center px-4 py-5 shadow-2xl bg-gradient-to-b from-[#2c4a3c] to-[#1a3028] border-l-8 border-[#4a7a60] transform rotate-3 transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:z-10 hover:-translate-y-3 hover:scale-[1.03] cursor-pointer">
                            <div className="book-title-text font-serif text-[12px] font-semibold text-[#f5efe3cc] leading-5 tracking-[0.03em]">
                                Braiding Sweetgrass
                            </div>
                            <div className="book-spine-deco h-[1px] w-full bg-white/10 my-2"></div>
                            <div className="book-author-text text-[9px] text-white/40 mt-1 tracking-widest">
                                Robin W. Kimmerer
                            </div>
                        </div>

                        {/* Book 3 */}
                        <div className=" absolute left-15 top-25 w-48 h-68 rounded-lg flex flex-col justify-center px-4 py-5 shadow-2xl bg-gradient-to-b from-[#3a3060] to-[#221a40] border-l-8 border-[#5a4a90] transform -rotate-3 transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:z-10 hover:-translate-y-3 hover:scale-[1.03] cursor-pointer">
                            <div className="book-title-text font-serif text-[12px] font-semibold text-[#f5efe3cc] leading-5 tracking-[0.03em]">
                                Project Hail Mary
                            </div>
                            <div className="book-spine-deco h-[1px] w-full bg-white/10 my-2"></div>
                            <div className="book-author-text text-[9px] text-white/40 mt-1 tracking-widest">
                                Andy Weir
                            </div>
                        </div>

                        {/* Book 4 */}
                        <div className="book b4 absolute left-33 top-33 w-42 h-62 rounded-lg flex flex-col justify-center px-4 py-5 shadow-2xl bg-gradient-to-b from-[#60302a] to-[#401a14] border-l-8 border-[#904540] transform rotate-6 transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:z-10 hover:-translate-y-3 hover:scale-[1.03] cursor-pointer">
                            <div className="book-title-text font-serif text-[12px] font-semibold text-[#f5efe3cc] leading-5 tracking-[0.03em]">
                                Normal People
                            </div>
                            <div className="book-spine-deco h-[1px] w-full bg-white/10 my-2"></div>
                            <div className="book-author-text text-[9px] text-white/40 mt-1 tracking-widest">
                                Sally Rooney
                            </div>
                        </div>

                        {/* Book 5 */}
                        <div className="book b5 absolute left-23 top-38 w-40 h-64 rounded-lg flex flex-col justify-center px-4 py-5 shadow-2xl bg-gradient-to-b from-[#2a4060] to-[#162535] border-l-8 border-[#406090] transform -rotate-12 transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:z-10 hover:-translate-y-3 hover:scale-[1.03] cursor-pointer">
                            <div className="book-title-text font-serif text-[12px] font-semibold text-[#f5efe3cc] leading-5 tracking-[0.03em]">
                                The Name of the Wind
                            </div>
                            <div className="book-spine-deco h-[1px] w-full bg-white/10 my-2"></div>
                            <div className="book-author-text text-[9px] text-white/40 mt-1 tracking-widest">
                                Patrick Rothfuss
                            </div>
                        </div>

                        {/* Floating Quote */}
                        <div className="  -bottom-72 -left-30 bg-[#1b1410e6] border border-yellow-700/20 p-4 max-w-[220px] backdrop-blur-md animate-[floatY_6s_ease-in-out_infinite] relative">
                            <p className="font-serif italic text-[12px] text-gray-300 leading-6">A reader lives a thousand lives before he dies.</p>
                            <span className="text-yellow-500 text-[10px] block mt-2">— George R.R. Martin</span>
                        </div>

                        {/* Floating Stat */}
                        <div className=" absolute top-6 -right-17 text-right animate-[floatY_7s_ease-in-out_1s_infinite]">
                            <div className="text-[56px] font-serif font-light text-yellow-500 leading-none tracking-tight">4.2k</div>
                            <div className="text-[9px] uppercase tracking-wider text-gray-400">Books Available</div>
                        </div>
                    </div>
                </div>
            </section>

        </section>
    );
}
