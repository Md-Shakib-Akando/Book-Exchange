import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 px-6 md:px-16 py-14 bg-[#130e0c] text-gray-400">


            <div className="md:max-w-10/12 md:mx-auto ">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">


                    <div>
                        <Link href="/" className="flex items-center gap-3 no-underline">
                            <div className="w-10 h-10 flex items-center justify-center bg-yellow-600 text-black font-bold rounded-full">
                                F
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white text-lg font-semibold">
                                    Folio
                                </span>
                                <span className="text-xs tracking-widest uppercase text-yellow-600">
                                    Book Exchange
                                </span>
                            </div>
                        </Link>

                        <p className="mt-5 text-sm text-white leading-relaxed max-w-xs">
                            A community-driven platform where books find new readers and shelves
                            find new stories.
                        </p>
                    </div>


                    <div>
                        <h6 className="text-xs tracking-[0.25em] uppercase text-yellow-600 mb-6">
                            Discover
                        </h6>
                        <div className="space-y-3  text-sm flex flex-col">
                            <Link href="/books" className="hover:text-white transition">
                                Browse Books
                            </Link>
                            <Link href="/new-arrivals" className="hover:text-white transition">
                                New Arrivals
                            </Link>
                            <Link href="/genres" className="hover:text-white transition">
                                Popular Genres
                            </Link>
                            <Link href="/near-me" className="hover:text-white transition">
                                Near Me
                            </Link>
                        </div>
                    </div>


                    <div>
                        <h6 className="text-xs tracking-[0.25em] uppercase text-yellow-600 mb-6">
                            Exchange
                        </h6>
                        <div className="space-y-3 text-sm flex flex-col">
                            <Link href="/list-book" className="hover:text-white transition">
                                List a Book
                            </Link>
                            <Link href="/wishlist" className="hover:text-white transition">
                                My Wishlist
                            </Link>
                            <Link href="/requests" className="hover:text-white transition">
                                My Requests
                            </Link>
                            <Link href="/exchange-tips" className="hover:text-white transition">
                                Exchange Tips
                            </Link>
                        </div>
                    </div>


                    <div>
                        <h6 className="text-xs tracking-[0.25em] uppercase text-yellow-600 mb-6">
                            Company
                        </h6>
                        <div className="space-y-3 text-sm flex flex-col">
                            <Link href="/about" className="hover:text-white transition">
                                About Folio
                            </Link>
                            <Link href="/community" className="hover:text-white transition">
                                Community
                            </Link>
                            <Link href="/privacy" className="hover:text-white transition">
                                Privacy
                            </Link>
                            <Link href="/contact" className="hover:text-white transition">
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>


                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5 text-xs">
                    <span>
                        © 2026 Folio Book Exchange. Made with love for readers.
                    </span>

                    <span className="italic text-yellow-600 text-sm font-serif">
                        So many books, so little time
                    </span>
                </div>
            </div>
        </footer>
    );
}
