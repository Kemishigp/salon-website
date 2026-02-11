"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { usePathname } from 'next/navigation'; // Import the hook

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isHomePage = pathname === '/';

  const containerStyles = isHomePage
    ? "mt-7 max-w-4xl rounded-full px-4" // Pill
    : "top-0 w-full border-b border-white/10 px-6";   // Rectangle

  return (
    <header className="fixed w-full flex font-semibold text-md justify-center font-serif z-50">
      {/* Desktop Version */}
      {/* Pill - Full header verions logic */}
        <div className={`hidden md:flex left-0  flex bg-black backdrop-blur-md py-4 flex items-center justify-between gap-10 border border-white/10 shadow-2xl text-white ${containerStyles}`}>
          <Link href='/' className={`${isHomePage ? 'hidden': 'text-white text-2xl text-bold'}`}>Salon and Co.</Link>
        <nav className={`left-0 ${isHomePage ? 'contents' : 'flex flex-1 justify-around'}`}>
          {/* Hide logo on homepage */}
        {/* Contents vs Flex spacing */}

          <div className='gap-8 flex justify-around text-md'>
            <Link href="/about" className="font-medium hover:underline underline-offset-4 whitespace-nowrap  lg:text-lg">
              About
            </Link>
            <Link href="/services" className="font-medium hover:underline underline-offset-4 whitespace-nowrap  lg:text-lg">
              Services
            </Link>
            <Link href="/team" className="font-medium hover:underline underline-offset-4 whitespace-nowrap  lg:text-lg">
              Team
            </Link>
            {/* <Link href="/portfolio" className="font-medium hover:underline underline-offset-4 whitespace-nowrap    md:text-md">
              Portfolio
            </Link> */}
            {/* <Link href="/shop" className="font-medium hover:underline underline-offset-4 whitespace-nowrap lg:text-lg">
              Shop
            </Link> */}
              <Link href="/contact" className="font-medium hover:underline underline-offset-4 whitespace-nowrap  lg:text-lg">
              Contact
            </Link>
{/* <Link href="/cart" className="text-white hover:opacity-70 transition flex items-center">
  <FontAwesomeIcon icon={faCartShopping} className="w-4 h-4" />
</Link> */}
          </div>
        </nav>



        {/* <LoginLink> */}
          <Link href='/booking'>

        
          <button className="cursor-pointer bg-white text-black px-14 py-4 rounded-full dark:bg-white dark:text-black hover:bg-gray-200">
          {/* <button className="border border-white/40 px-6 py-2 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all"> */}
            Book Now
          </button>
        {/* </Link> */}
        {/* </LoginLink> */}
          </Link>
        </div>

{/* Mobile version */}
    <div className="md:hidden w-full relative z-[100] bg-black text-white flex justify-between px-4 py-4">
      <Link href="/" className="text-xl font-bold z-[60]">S&C</Link>
      
      <div className='flex gap-2'>
      <Link href="/cart" className="hover:opacity-70 transition">
        <FontAwesomeIcon icon={faCartShopping} className="w-4 h-4" />
      </Link>
          {/* Burger Toggle Button */}
          <button onClick={() => setIsOpen(!isOpen)}>
            <FontAwesomeIcon icon={isOpen ? faXmark : faBars} />
          </button>
      </div>
      <div className={`
          absolute top-full left-0 w-full h-[300px] bg-black rounded-[2rem] border border-white/10
          flex flex-col items-center justify-center gap-6 transition-all duration-300
          ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}
          md:hidden
        `}>
          <Link href="/services" onClick={() => setIsOpen(false)} className="font-serif text-2xl">Services</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="font-serif text-2xl">About</Link>
          <Link href="/team" onClick={() => setIsOpen(false)} className="font-serif text-2xl">Team</Link>
          <Link href="/team" onClick={() => setIsOpen(false)} className="font-serif text-2xl">Contact</Link>
          <button className="cursor-pointer bg-white text-black px-8 py-2 rounded-full font-bold">Book Now</button>
        </div>
  </div>
    </header>
  );
}


