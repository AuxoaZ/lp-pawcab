import React from 'react';
import Image from 'next/image';
import { BsInstagram, BsFacebook } from 'react-icons/bs';

export default function Footer() {
  return (
    <footer className="bg-deep-midnight text-soft-white py-12 px-10 border-t border-soft-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image 
            src="/images/logo-pawcab.png" 
            alt="The PawCab Logo" 
            width={36} 
            height={36} 
            className="object-contain"
          />
          <div className="flex flex-col">
            <span 
              className="font-elmessiri text-xl font-bold tracking-wide"
              style={{ fontFamily: "'El Messiri', serif" }}
            >
              The PawCab
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-xs uppercase tracking-widest font-medium text-soft-white/70">
          <a href="#" className="hover:text-pawcab-gold transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-pawcab-gold transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-pawcab-gold transition-colors">Contact</a>
        </div>

        {/* Social & Copyright */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex gap-4">
            <a href="#" className="text-soft-white/70 hover:text-pawcab-gold transition-colors">
              <BsInstagram className="text-xl" />
            </a>
            <a href="#" className="text-soft-white/70 hover:text-pawcab-gold transition-colors">
              <BsFacebook className="text-xl" />
            </a>
          </div>
          <p className="text-[0.65rem] text-soft-white/40 tracking-wider">
            &copy; 2026 The PawCab. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
