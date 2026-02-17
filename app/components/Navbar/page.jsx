export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 px-6 md:px-16 py-6 flex justify-between items-center bg-[#1e1512]/80 backdrop-blur-sm border-b border-white/10">

            <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-yellow-600 flex items-center justify-center font-serif text-yellow-600">
                    F
                </div>
                <div>
                    <h1 className="font-serif text-xl tracking-wide">Folio</h1>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-yellow-600">
                        Book Exchange
                    </p>
                </div>
            </div>

            <div className="hidden md:flex items-center gap-10 text-sm uppercase tracking-widest">
                <a href="#browse" className="hover:text-yellow-500 transition">
                    Browse
                </a>
                <a href="#how" className="hover:text-yellow-500 transition">
                    How It Works
                </a>
                <a
                    href="#"
                    className="border border-yellow-600 px-5 py-2 text-yellow-600 hover:bg-yellow-600 hover:text-black transition"
                >
                    Start Exchanging
                </a>
            </div>
        </nav>
    );
}
