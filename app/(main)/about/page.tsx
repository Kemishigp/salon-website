import React from 'react'
import About from "../../src/components/About"

const page = () => {
  return (
    // pt-24 (96px) or pt-32 (128px) ensures the "ABOUT US" title 
    // clears the bottom of the fixed header.
    <main className="pt-28 min-h-screen bg-black/90">
      <About />
    </main>
  )
}

export default page