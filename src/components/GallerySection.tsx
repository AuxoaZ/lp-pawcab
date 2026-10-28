"use client";

import React, { useState, useEffect, useCallback } from "react";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";

const galleryImages = [
  "/gallery/APPA_result.webp",
  "/gallery/BATMAN_result.webp",
  "/gallery/BILLIE%20BELLA_result.webp",
  "/gallery/BIRU_result.webp",
  "/gallery/BISCUIT_result.webp",
  "/gallery/BRADY%20MANDY_result.webp",
  "/gallery/BUBI_result.webp",
  "/gallery/CHRISTMAS%20EVE%20BOXY_result.webp",
  "/gallery/COCO_result.webp",
  "/gallery/DARK_result.webp",
  "/gallery/HACHIKO_result.webp",
  "/gallery/JUMBO_result.webp",
  "/gallery/LUNA_result.webp",
  "/gallery/MUFASA_result.webp",
  "/gallery/MUGU%20NANA_result.webp",
  "/gallery/POM_result.webp",
  "/gallery/RYUU_result.webp",
  "/gallery/SUSAN_result.webp",
];

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const showNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % galleryImages.length : 0
    );
  }, [lightboxIndex]);

  const showPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + galleryImages.length) % galleryImages.length
        : 0
    );
  }, [lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        showNext();
      } else if (e.key === "ArrowLeft") {
        showPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [lightboxIndex, showNext, showPrev]);

  return (
    <section id="gallery" className="bg-soft-white py-16 md:py-20 px-6 md:px-10 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 md:mb-12">
          <p className="uppercase tracking-[0.2em] text-xs md:text-sm text-warm-taupe font-semibold mb-2">
            Gallery
          </p>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-deep-midnight">
            Our Passengers
          </h2>
        </div>

        {/* Gallery Grid - All 18 Images */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
          {galleryImages.map((src, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-sand-beige/20 border border-sand-beige/40 shadow-sm hover:shadow-xl hover:border-pawcab-gold/70 transition-all duration-300 cursor-pointer group"
            >
              <img
                src={src}
                alt={`PawCab Passenger ${idx + 1}`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-deep-midnight/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 select-none"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setLightboxIndex(null)}
            aria-label="Close image preview"
            className="absolute top-4 right-4 md:top-6 md:right-8 w-11 h-11 rounded-full bg-soft-white/10 hover:bg-soft-white/20 text-soft-white flex items-center justify-center transition-colors cursor-pointer z-20"
          >
            <IoClose className="text-2xl" />
          </button>

          {/* Previous Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous image"
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-13 md:h-13 rounded-full bg-soft-white/10 hover:bg-soft-white/25 text-soft-white flex items-center justify-center transition-all cursor-pointer z-20 backdrop-blur-sm"
          >
            <IoChevronBack className="text-2xl" />
          </button>

          {/* Next Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next image"
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-13 md:h-13 rounded-full bg-soft-white/10 hover:bg-soft-white/25 text-soft-white flex items-center justify-center transition-all cursor-pointer z-20 backdrop-blur-sm"
          >
            <IoChevronForward className="text-2xl" />
          </button>

          {/* Full Image */}
          <div
            className="relative overflow-hidden rounded-2xl shadow-2xl border border-soft-white/15 max-h-[85vh] max-w-[90vw] aspect-[4/5] bg-deep-midnight"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[lightboxIndex]}
              alt={`PawCab Passenger ${lightboxIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </section>
  );
}
