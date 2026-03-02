"use client";

const TESTIMONIALS = [
    {
        name: "Sofia M.",
        initials: "SM",
        city: "Brooklyn, NY",
        exchanges: 42,
        rating: 5,
        message: "I've exchanged over forty books in six months. Every swap comes with a handwritten note. It feels like a secret literary society.",
    },
    {
        name: "James T.",
        initials: "JT",
        city: "Austin, TX",
        exchanges: 28,
        rating: 5,
        message: "Found a first-edition copy of Dune I'd been hunting for years. The owner just wanted my copy of Sapiens in return. Perfect.",
    },
    {
        name: "Lena B.",
        initials: "LB",
        city: "Chicago, IL",
        exchanges: 65,
        rating: 5,
        message: "Folio turned my overflowing bookshelf into a travelling library. My books live on in so many homes now – I love that.",
    },
];

export default function ReviewSection() {
    return (
        <section className="py-16 bg-[#1b1410] text-[#f5efe3] px-4 sm:px-6 ">
            <div className="md:max-w-10/12 md:mx-auto">

                <div className="max-w-3xl mx-auto text-center mb-12">
                    <div className="text-sm text-[#b8933a] tracking-widest mb-2">READERS SAY</div>
                    <h2 className="text-3xl sm:text-4xl font-serif text-[#faf6ee]">What Our Users Think</h2>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {TESTIMONIALS.map((t, i) => (
                        <div key={i} className="border border-[#b8933a]/20 p-6 rounded-xl bg-[#221a12] hover:shadow-xl transition">
                            <div className="flex items-center mb-4">
                                <div className="flex space-x-1 text-[#b8933a]">
                                    {Array.from({ length: t.rating }).map((_, idx) => <span key={idx}>★</span>)}
                                </div>
                            </div>
                            <p className="text-[#faf6ee]/90 italic mb-4 text-sm">{t.message}</p>
                            <div className="flex items-center space-x-3 mt-4">
                                <div className="w-10 h-10 rounded-full bg-[#b8933a]/20 flex items-center justify-center text-sm font-semibold">
                                    {t.initials}
                                </div>
                                <div>
                                    <div className="text-[#faf6ee] font-semibold">{t.name}</div>
                                    <div className="text-[#7a7060] text-sm">{t.city} · {t.exchanges} exchanges</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center bg-[#221a12] p-8 rounded-xl border border-[#b8933a]/20">
                    <div>
                        <div className="text-2xl sm:text-3xl font-serif text-[#b8933a]">4.2k</div>
                        <div className="text-sm text-[#7a7060]">BOOKS LISTED</div>
                    </div>
                    <div>
                        <div className="text-2xl sm:text-3xl font-serif text-[#b8933a]">1.8k</div>
                        <div className="text-sm text-[#7a7060]">READERS</div>
                    </div>
                    <div>
                        <div className="text-2xl sm:text-3xl font-serif text-[#b8933a]">12k</div>
                        <div className="text-sm text-[#7a7060]">EXCHANGES MADE</div>
                    </div>
                    <div>
                        <div className="text-2xl sm:text-3xl font-serif text-[#b8933a]">48</div>
                        <div className="text-sm text-[#7a7060]">CITIES</div>
                    </div>
                </div>
            </div>
        </section>
    );
}