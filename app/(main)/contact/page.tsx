import React from 'react'

const pages = () => {
return (
    <section className="bg-black text-white py-24 px-6 lg:px-16 border-t border-white/10">
      <div className="mt-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Left Side: Information */}
        <div className="space-y-12">
          <div>
            <h2 className="text-5xl md:text-7xl font-serif uppercase tracking-tighter mb-8">
              Contact
            </h2>
            <p className="text-gray-400 font-sans max-w-md leading-relaxed">
              Have questions about our services or need help booking your transformation? 
              Reach out and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 font-sans">
            <div className="space-y-4">
              <h3 className="uppercase text-xs tracking-widest font-bold text-gray-500">Location</h3>
              <p className="text-sm">123 Stylist Lane<br />Suite 100<br />Beverly Hills, CA 90210</p>
            </div>
            <div className="space-y-4">
              <h3 className="uppercase text-xs tracking-widest font-bold text-gray-500">Hours</h3>
              <p className="text-sm">Tues — Sat: 9am - 7pm<br />Sun — Mon: Closed</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="uppercase text-xs tracking-widest font-bold text-gray-500">Follow Us</h3>
            <div className="flex gap-6 text-sm underline underline-offset-4 decoration-white/20 hover:decoration-white transition-all">
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
              <a href="#">TikTok</a>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <form className="space-y-8 bg-white/5 p-8 md:p-12 rounded-2xl border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">First Name</label>
              <input type="text" className="bg-transparent border-b border-white/20 py-2 outline-none focus:border-white transition-colors" placeholder="" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">Last Name</label>
              <input type="text" className="bg-transparent border-b border-white/20 py-2 outline-none focus:border-white transition-colors" placeholder="" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest font-bold">Email Address</label>
            <input type="email" className="bg-transparent border-b border-white/20 py-2 outline-none focus:border-white transition-colors" placeholder="" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest font-bold">Message</label>
            <textarea rows={4} className="bg-transparent border-b border-white/20 py-2 outline-none focus:border-white transition-colors resize-none" placeholder="Tell us about your hair goals..." />
          </div>

          <button className="w-full bg-white text-black py-4 rounded-full uppercase text-xs tracking-[0.2em] font-bold hover:bg-gray-200 transition-colors">
            Send Message
          </button>
        </form>
        
      </div>
    </section>
  );
}

export default pages