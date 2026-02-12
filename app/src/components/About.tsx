import React from 'react'
import {BringUp} from "../../src/components/animations/BringUp";

const About = () => {
  return (
      <div className='bg-black/90 text-white px-6 pb-20 pt-5 mx-auto text-center font-serif'>
      {/* Story Section */}
        <BringUp>
      <section className='mb-24'>
        <h1 className='text-4xl md:text-5xl mb-10 tracking-widest uppercase'>About Us</h1>
        <p className='text-lg md:text-xl leading-relaxed font-light font-sans px-40'>
          Hey there! Welcome to cozy luxury🤍 We specialize in Beaded Weft Extensions 
          (hand tied extensions), Blonding and specialty colors! We are an extensively 
          trained luxury salon and have learned some of the most cutting edge techniques! 
          We continue to take many classes for cutting, extensions and coloring so 
          we can continue to provide the newest, best services. Book with us now!✨
        </p>
      </section>
      </BringUp>


      {/* Policy Section - Wrapped in a border for emphasis */}
      <section className='border-t border-white/10 pt-16 max-w-2xl mx-auto'>
      <BringUp>
        <h2 className='text-2xl mb-6 tracking-widest uppercase'>Cancellation Policy</h2>
        <p className='text-sm md:text-md font-sans font-light opacity-70 leading-loose italic'>
          A 50% cancellation fee for any reschedules, no-shows, or cancellations 
          within 24 hours of the scheduled appointment will be enforced.
        </p>
        </BringUp>
      </section>
    </div>
  )
}

export default About