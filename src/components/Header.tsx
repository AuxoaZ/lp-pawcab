"use client";

import React, { useState, useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  theme?: "dark" | "light";
}

export default function Header({ theme = "dark" }: HeaderProps) {
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

  const isLight = theme === "light" && !isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-6 md:px-10 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-deep-midnight/95 backdrop-blur-md shadow-lg text-soft-white"
          : isLight
            ? "py-6 bg-transparent text-deep-midnight"
            : "py-6 bg-transparent text-soft-white"
      }`}
    >
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        {/* Logo Area */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/images/logo-pawcab.png"
            alt="The PawCab Logo"
            width={48}
            height={48}
            className="object-contain shrink-0 group-hover:scale-105 transition-transform"
          />
          <div className="flex items-center">
            <span
              className="font-elmessiri text-xl md:text-3xl font-bold leading-none tracking-wide"
              style={{ fontFamily: "'El Messiri', serif" }}
            >
              THE PAWCAB
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm tracking-widest font-medium uppercase">
          <Link href="/" className="hover:text-pawcab-gold transition-colors">
            Home
          </Link>
          <Link
            href="/#services"
            className="hover:text-pawcab-gold transition-colors"
          >
            Services
          </Link>
          {/* <Link
            href="/#coverage"
            className="hover:text-pawcab-gold transition-colors"
          >
            Zones & Rates
          </Link> */}
          {/* <Link
            href="/#gallery"
            className="hover:text-pawcab-gold transition-colors"
          >
            Gallery
          </Link> */}
          <Link
            href="/stories"
            className="hover:text-pawcab-gold transition-colors"
          >
            Stories
          </Link>
          <Link
            href="/#about"
            className="hover:text-pawcab-gold transition-colors"
          >
            About
          </Link>
          {/* <Link href="/#faq" className="hover:text-pawcab-gold transition-colors">
            FAQ
          </Link> */}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <button
            className={`border rounded-full px-5 py-2 text-xs md:text-sm uppercase tracking-wider flex items-center gap-2 transition-colors ${
              isLight
                ? "border-deep-midnight text-deep-midnight hover:bg-deep-midnight hover:text-soft-white"
                : "border-soft-white text-soft-white hover:bg-soft-white hover:text-deep-midnight"
            }`}
          >
            Book a Ride <BsArrowRight />
          </button>
        </div>
      </div>
    </header>
  );
}
