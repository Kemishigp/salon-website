import React from 'react'

const Hero = () => {
  return (
    // Centers everything and makes it fill the page
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* 1. The Background Image Container */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
        style={{ backgroundImage: "url('/Salon.jpg')" }}
      >
        {/* 2. The Dark Overlay (Makes the white text pop) */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* 3. The Text Content */}
      <div className="relative z-10 text-center px-4 This centers the text">
        <h1 className="font-serif text-6xl md:text-8xl text-white tracking-tighter drop-shadow-2xl Stylizes the h1">
          Salon and co.
        </h1>
        <div className="mt-4 h-px w-24 bg-white/60 mx-auto" /> {/* Elegant divider line */}
        <p className="mt-4 text-white/90 font-light tracking-[0.3em] uppercase text-xs md:text-sm">
          Artistry • Luxury • Precision
        </p>
      </div>
    </section>
  )
}

export default Hero