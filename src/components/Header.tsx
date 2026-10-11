"use client";

import React, { useState, useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-10 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-deep-midnight/95 backdrop-blur-md shadow-lg"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center text-soft-white">
        {/* Logo Area */}
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo-pawcab.png"
            alt="The PawCab Logo"
            width={48}
            height={48}
            className="object-contain shrink-0"
          />
          <div className="flex items-center">
            <span
              className="font-elmessiri text-xl md:text-3xl font-bold leading-none tracking-wide"
              style={{ fontFamily: "'El Messiri', serif" }}
            >
              THE PAWCAB
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm tracking-widest font-medium uppercase">
          <a href="#" className="hover:text-pawcab-gold transition-colors">
            Home
          </a>
          <a href="#" className="hover:text-pawcab-gold transition-colors">
            Services
          </a>
          <a href="#" className="hover:text-pawcab-gold transition-colors">
            Zones & Rates
          </a>
          <a href="#" className="hover:text-pawcab-gold transition-colors">
            About
          </a>
          <a href="#" className="hover:text-pawcab-gold transition-colors">
            FAQ
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <button className="border border-soft-white rounded-full px-5 py-2 text-xs md:text-sm uppercase tracking-wider flex items-center gap-2 hover:bg-soft-white hover:text-deep-midnight transition-colors">
            Book a Ride <BsArrowRight />
          </button>
          {/* <div className="text-xs md:text-sm tracking-widest font-medium hidden sm:block">
            <span className="cursor-pointer font-bold">EN</span>{" "}
            <span className="opacity-50">|</span>{" "}
            <span className="cursor-pointer opacity-50 hover:opacity-100">
              ID
            </span>
          </div> */}
        </div>
      </div>
    </header>
  );
}
