"use client"
import React from 'react'

export default function Marquee() {
    return (
        <div className="overflow-hidden border-t border-b border-yellow-700/20 py-4 bg-[#1e1512]">
            <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite]">
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex">
                        {[
                            "Fiction",
                            "Non-Fiction",
                            "Science Fiction",
                            "Fantasy",
                            "Mystery",
                            "Biography",
                            "History",
                            "Romance",
                            "Poetry",
                            "Thriller",
                            "Self-Help",
                            "Science",
                            "Children's",
                            "Art & Design",
                        ].map((genre) => (
                            <div
                                key={genre}
                                className="flex items-center gap-7 px-7 text-sm tracking-[0.22em] uppercase text-gray-400"
                            >
                                <span className="~w-[4px] ~h-[4px] rounded-full bg-yellow-600 opacity-50"></span>
                                {genre}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Inline keyframes */}
            <style jsx>{`
    @keyframes marquee {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
  `}</style>
        </div>

    )
}
