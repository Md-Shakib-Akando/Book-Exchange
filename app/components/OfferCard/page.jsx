import React from 'react'

export default function OfferCard() {
    return (
        <section className="py-22 px-16 relative bg-[#1b1210]" >
            <div className='max-w-10/12 mx-auto'>

                <div className="flex items-center gap-4 mb-16">
                    <span className="inline-block w-8 h-px bg-[#B8933A]"></span>
                    <span className="text-lg tracking-widest uppercase text-[#B8933A]">What We Offer</span>

                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="group p-6 bg-[rgba(255,255,255,0.025)] relative overflow-hidden shadow-md  transform transition-transform duration-300 hover:scale-105">

                        <div className="absolute top-0 left-0 h-px w-0 bg-[#B8933A] group-hover:w-full transition-all duration-500"></div>


                        <div className="w-10 h-10 border border-[#B8933A] flex items-center justify-center font-serif text-xl mb-5 mt-3 rounded">
                            📚
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-[#f5efe3]">Curated Listings</h3>
                        <p className="text-[#7a7060] mb-4">
                            Browse thousands of books listed by readers like you — filtered by genre, condition, and location. Every book has a story; find your next one.
                        </p>
                        <a href="#" className="text-[#B8933A] font-semibold hover:underline">Browse Now →</a>
                    </div>

                    <div className="group p-6 bg-[rgba(255,255,255,0.025)] relative overflow-hidden shadow-md  transform transition-transform duration-300 hover:scale-105">

                        <div className="absolute top-0 left-0 h-px w-0 bg-[#B8933A] group-hover:w-full transition-all duration-500"></div>
                        <div className="w-10 h-10 border border-[#B8933A] flex items-center justify-center font-serif  text-xl mb-5 mt-3 text-white rounded">↕</div>
                        <h3 className="text-xl font-semibold mb-2 text-[#f5efe3]">Simple Exchange</h3>
                        <p className="text-[#7a7060] mb-4">
                            Request a book, send a message, and arrange the swap. No money changes hands — just good books finding good homes.
                        </p>
                        <a href="#" className="text-[#B8933A] font-semibold hover:underline">Learn More →</a>
                    </div>

                    <div className="group p-6 bg-[rgba(255,255,255,0.025)] relative overflow-hidden shadow-md  transform transition-transform duration-300 hover:scale-105">

                        <div className="absolute top-0 left-0 h-px w-0 bg-[#B8933A] group-hover:w-full transition-all duration-500"></div>
                        <div className="w-10 h-10 border border-[#B8933A] flex items-center justify-center font-serif  text-xl mb-5 mt-3 text-white rounded">♥</div>
                        <h3 className="text-xl font-semibold mb-2 text-[#f5efe3]">Personal Wishlist</h3>
                        <p className="text-[#7a7060] mb-4">
                            Save books you're longing to read. Get notified when a copy becomes available in your area. Your ideal library, built over time.
                        </p>
                        <a href="#" className="text-[#B8933A] font-semibold hover:underline">Start a Wishlist →</a>
                    </div>
                </div>
            </div>
        </section>

    )
}
