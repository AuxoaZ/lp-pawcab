import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BsInstagram, BsWhatsapp, BsLock } from "react-icons/bs";
import contentData from "@/lib/content";

export default function Footer() {
  const footer = contentData.footer;
  const site = contentData.site;

  return (
    <footer id="footer" className="bg-deep-midnight text-soft-white py-12 px-10 border-t border-soft-white/10">
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
              {site.name || "The PawCab"}
            </span>
            <span className="text-[10px] text-soft-white/50 tracking-wider">
              {site.tagline}
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs uppercase tracking-widest font-medium text-soft-white/70">
          <Link href="/services/pet-transport" className="hover:text-pawcab-gold transition-colors">
            Transport
          </Link>
          <Link href="/services/dog-walking" className="hover:text-pawcab-gold transition-colors">
            Walking
          </Link>
          <Link href="/services/pet-sitting" className="hover:text-pawcab-gold transition-colors">
            Sitting
          </Link>
          <Link href="/stories" className="hover:text-pawcab-gold transition-colors">
            Stories
          </Link>
          <Link
            href="/login"
            className="hover:text-pawcab-gold transition-colors inline-flex items-center gap-1 opacity-60 hover:opacity-100"
          >
            <BsLock className="text-[10px]" /> CMS Admin
          </Link>
        </div>

        {/* Social & Copyright */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex gap-4">
            {site.instagramUrl && (
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-soft-white/70 hover:text-pawcab-gold transition-colors"
                title={`Instagram: ${site.instagram}`}
              >
                <BsInstagram className="text-xl" />
              </a>
            )}
            {site.whatsapp && (
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-soft-white/70 hover:text-pawcab-gold transition-colors"
                title={`WhatsApp: ${site.phone}`}
              >
                <BsWhatsapp className="text-xl" />
              </a>
            )}
          </div>
          <p className="text-[0.65rem] text-soft-white/40 tracking-wider">
            {footer.copyrightText || "© 2026 The PawCab. All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
}
