import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok, faFacebookF } from '@fortawesome/free-brands-svg-icons';


export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10 px-6 lg:px-16 border-t border-white/10 font-serif">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Large Branding */}
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase mb-6">
            Salon and Co.
          </h2>
          <div className="flex gap-8 text-xs uppercase tracking-[0.3em] font-sans opacity-60">
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/team" className="hover:text-white transition-colors">Team</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>

        {/* Middle Section: Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-12 border-y border-white/5 font-sans">
          {/* Column 1: Address */}
          <div className="text-center md:text-left space-y-4">
            <h3 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Visit Us</h3>
            <p className="text-sm leading-relaxed">
              123 Stylist Lane, Suite 100<br />
              Beverly Hills, CA 90210
            </p>
          </div>

          {/* Column 2: Newsletter/Social */}
          <div className="text-center space-y-6">
            <h3 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Stay Connected</h3>
            <div className="flex justify-center gap-6">
              <a href="#" className="hover:opacity-50 transition-opacity">
                <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
              </a>
              <a href="#" className="hover:opacity-50 transition-opacity">
                <FontAwesomeIcon icon={faTiktok} className="w-5 h-5" />
              </a>
              <a href="#" className="hover:opacity-50 transition-opacity">
                <FontAwesomeIcon icon={faFacebookF} className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 3: Booking Info */}
          <div className="text-center md:text-right space-y-4">
            <h3 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Reservations</h3>
            <p className="text-sm">
              hello@salonandco.com<br />
              (555) 123-4567
            </p>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-gray-600 font-sans">
          <p>© 2026 Salon and Co. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gray-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-400">Terms of Service</Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
}