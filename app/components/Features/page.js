import React from 'react'

const features = [
    {
        title: "Curated Listings",
        desc: "Browse thousands of books listed by readers like you.",
        icon: "📚",
    },
    {
        title: "Simple Exchange",
        desc: "Request a book and arrange the swap easily.",
        icon: "↕",
    },
    {
        title: "Personal Wishlist",
        desc: "Save books you're longing to read.",
        icon: "♥",
    },
];

export default function Features() {
    return (
        <section className="py-24 px-6 md:px-16 bg-[#1e1814]">
            <div className="grid md:grid-cols-3 gap-8">
                {features.map((item, i) => (
                    <div
                        key={i}
                        className="bg-white/5 p-10 hover:bg-white/10 transition group"
                    >
                        <div className="text-3xl mb-6">{item.icon}</div>
                        <h3 className="font-serif text-2xl mb-4 group-hover:text-yellow-500 transition">
                            {item.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

