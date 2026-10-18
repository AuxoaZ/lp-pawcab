import React from "react";
import Button from "./Button";
import { BsArrowRight } from "react-icons/bs";

export default function AboutSection() {
  return (
    <section className="relative w-full py-16 md:py-18 px-10 overflow-hidden bg-warm-ivory">
      {/* Background Image on the Right */}
      <div className="absolute z-10 right-0 top-0 bottom-0 w-full md:w-[60%] lg:w-[56%] h-full">
        <img
          src="/images/about.jpg"
          alt="Designed Around Them"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft edge blend gradient on the left edge of the image */}
        <div
          className="absolute inset-0 pointer-events-none hidden md:block"
          style={{
            background:
              "linear-gradient(to right, #F7F2E8 0%, rgba(247, 242, 232, 0.95) 12%, rgba(247, 242, 232, 0.6) 24%, rgba(247, 242, 232, 0) 42%)",
          }}
        />
        {/* Mobile overlay */}
        <div
          className="absolute inset-0 pointer-events-none md:hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgba(247, 242, 232, 0.96) 0%, rgba(247, 242, 232, 0.85) 50%, rgba(247, 242, 232, 0.2) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        {/* Text Content */}
        <div className="w-full md:w-1/2 lg:w-5/12">
          <p className="uppercase tracking-[0.2em] text-xs md:text-sm text-warm-taupe font-semibold mb-3">
            About The PawCab
          </p>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-4">
            Designed <br /> Around Them.
          </h2>
          <p className="text-sm md:text-base font-normal leading-relaxed mb-6 text-deep-midnight/80">
            The PawCab is a private pet mobility service created for pets who
            deserve a safer, calmer, and more comfortable journey — whether
            it&apos;s a vet visit, beach trip, grooming day, or just a little
            adventure around Bali.
          </p>
          <Button variant="secondary" icon={<BsArrowRight />}>
            Our Story
          </Button>
        </div>

        {/* Cursive Text Overlay at bottom right */}
      </div>
      {/* Bottom Text */}
      <div className="absolute bottom-10 right-10 text-right z-10 hidden md:block">
        <p className="text-soft-white/80 font-medium tracking-[0.2em] leading-loose text-base">
          Because <br />
          The best journey <br />
          include them
        </p>
      </div>
    </section>
  );
}
