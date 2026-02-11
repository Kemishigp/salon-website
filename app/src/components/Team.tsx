import React from 'react'
import Link from 'next/link'

const stylists = [
  {
    name: "Dave",
    role: "Master Colorist",
    desc: "Specializing in balayage and lived-in blonde techniques with 10 years of artistry.",
    image: "/team1.jpeg" 
  },
  {
    name: "Alison",
    role: "Creative Director",
    desc: "Expert in precision cutting and avant-garde styling for the modern individual.",
    image: "/team2.jpeg"
  },
  {
    name: "Ashley",
    role: "Extension Specialist",
    desc: "Certified in premium hand-tied extensions to create seamless length and volume.",
    image: "/team3.jpg"
  },
  {
    name: "Olivia",
    role: "Senior Stylist",
    desc: "Dedicated to bridal hair and specialized treatments for hair health and shine.",
    image: "/team4.jpeg"
  }
];

const Team = () => {
  return (
    <section className=" bg-gray-900 text-white py-12 pb-30 px-8">
      <div className="text-center ">
        <h2 className="font-serif text-5xl mb-4">Meet Our Team</h2>
        <p className="font-light pb-4 tracking-widest uppercase text-xs text-white/60">The hands behind the art</p>
      </div>

      {/* 1. The Grid Container */}
      <div className="max-w-md md:max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {stylists.map((stylist, index) => (
          <div key={index} className="flex flex-col group">
            {/* 2. Image Wrapper */}
            <div className="relative aspect-[3/4] overflow-hidden mb-6 border border-white/10">
              <img 
                src={stylist.image} 
                alt={stylist.name}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110" 
              />
            </div>

            {/* 3. Text Info */}
            <h3 className="font-serif text-2xl mb-1">{stylist.name}</h3>
            <p className="text-sm font-bold uppercase tracking-tighter text-white/50 mb-3">{stylist.role}</p>
            <p className="text-sm text-white/70 font-light leading-relaxed mb-6">
              {stylist.desc}
            </p>

            {/* 4. Small Action Link */}
            <Link href ='/booking'>
            <button className="mt-auto text-left text-xs font-bold uppercase tracking-widest border-b border-white/20 pb-2 w-fit hover:border-white transition-colors">
              Book with {stylist.name}
            </button>
            </Link>
          </div>
        ))}

      </div>
    </section>
  )
}

export default Team