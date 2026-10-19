import React from "react";
import { BsArrowRight, BsInfoCircle } from "react-icons/bs";

export default function PetTransportPricing() {
  const zones = [
    {
      id: 1,
      name: "Zone 1",
      areas: "KOTA DENPASAR - SANUR - SEMINYAK - LEGIAN - KUTA",
      fixedRange: "0 - 5 KM",
      fixedRate: "IDR 50,000",
      kmRange: "5.1 - 15 KM",
      kmRate: "IDR 12,000/KM",
      waText:
        "Hi PawCab, I'd like to book a Pet Transport for Zone 1 (Kota Denpasar/Sanur/Seminyak/Legian/Kuta).",
    },
    {
      id: 2,
      name: "Zone 2",
      areas: "KUTA UTARA - SEMPIDI - DARMASABA - BATU BULAN",
      fixedRange: "0 - 5 KM",
      fixedRate: "IDR 65,000",
      kmRange: "5.1 - 15 KM",
      kmRate: "IDR 13,000/KM",
      waText:
        "Hi PawCab, I'd like to book a Pet Transport for Zone 2 (Kuta Utara/Sempidi/Darmasaba/Batu Bulan).",
    },
    {
      id: 3,
      name: "Zone 3",
      areas: "KUTA SELATAN - NUSA DUA",
      fixedRange: "0 - 5 KM",
      fixedRate: "IDR 70,000",
      kmRange: "5.1 - 15 KM",
      kmRate: "IDR 14,000/KM",
      waText:
        "Hi PawCab, I'd like to book a Pet Transport for Zone 3 (Kuta Selatan/Nusa Dua).",
    },
    {
      id: 4,
      name: "Zone 4",
      areas:
        "TANAH LOT - SESEH - TABANAN (KEDIRI, KERAMBITAN) - MENGWI - ABIANSEMAL - SUKAWATI - PECATU",
      fixedRange: "0 - 5 KM",
      fixedRate: "IDR 75,000",
      kmRange: "5.1 - 15 KM",
      kmRate: "IDR 15,000/KM",
      waText:
        "Hi PawCab, I'd like to book a Pet Transport for Zone 4 (Tanah Lot/Seseh/Tabanan (Kediri, Kerambitan)/Mengwi/Abiansemal/Sukawati/Pecatu).",
    },
  ];

  return (
    <section
      id="pricing"
      className="py-20 md:py-28 px-6 md:px-10 bg-soft-white border-t border-sand-beige/40"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-pawcab-gold inline-block" />
            <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-warm-taupe font-semibold">
              PRICING
            </p>
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-deep-midnight font-bold leading-tight mb-4">
            Zone-Based Fare
          </h2>
          <p className="text-deep-midnight/80 font-normal text-base md:text-lg leading-relaxed">
            Find your zone to see the fare for your trip.
          </p>
        </div>

        {/* 4 Zone Cards Grid */}
        <div className="grid max-w-4xl mx-auto grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {zones.map((zone) => (
            <div
              key={zone.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-sand-beige/40 shadow-sm hover:shadow-xl hover:border-pawcab-gold transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Shield Badge & Zone Header */}
                <div className="flex items-center gap-4 mb-5">
                  {/* SVG Shield Badge matching the design */}
                  <div className="relative w-12 h-14 sm:w-18 sm:h-18 flex flex-col items-center justify-center shrink-0">
                    <svg
                      viewBox="0 0 40 48"
                      className="absolute inset-0 w-full h-full text-pawcab-navy fill-current drop-shadow-sm group-hover:scale-105 transition-transform"
                    >
                      <path d="M20 0 L40 6 L40 28 C40 38 20 48 20 48 C20 48 0 38 0 28 L0 6 Z" />
                    </svg>
                    <div className="relative z-10 text-center text-soft-white">
                      <span className="block text-sm md:text-md font-bold tracking-widest uppercase leading-none">
                        ZONE
                      </span>
                      <span className="block text-sm md:text-2xl font-bold leading-none mt-1 font-playfair text-white">
                        {zone.id}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Covered Areas */}
                <div className="mb-6 pb-5 border-b border-sand-beige/30 min-h-[72px] flex items-center">
                  <p className="font-bold text-deep-midnight text-xs sm:text-sm tracking-wide uppercase leading-relaxed">
                    {zone.areas}
                  </p>
                </div>

                {/* Rates List with Road Perspective Icon */}
                <div className="space-y-4">
                  {/* Fixed Rate (0 - 5 KM) */}
                  <div className="flex items-center gap-3">
                    {/* Road Perspective SVG Icon */}
                    {/* <svg
                      viewBox="0 0 24 32"
                      className="w-5 h-7 text-warm-taupe/80 shrink-0 stroke-current"
                      fill="none"
                      strokeWidth="2.5"
                    >
                      <line x1="4" y1="30" x2="8" y2="2" />
                      <line x1="20" y1="30" x2="16" y2="2" />
                      <line
                        x1="12"
                        y1="8"
                        x2="12"
                        y2="12"
                        strokeDasharray="3 3"
                      />
                      <line
                        x1="12"
                        y1="18"
                        x2="12"
                        y2="22"
                        strokeDasharray="3 3"
                      />
                    </svg> */}

                    <div className="flex-grow flex items-baseline justify-between gap-2">
                      <span className="text-xs sm:text-sm text-deep-midnight/80 font-medium">
                        {zone.fixedRange}{" "}
                        <span className="text-[11px] text-warm-taupe italic">
                          (fixed rate)
                        </span>
                      </span>
                      <span className="font-bold text-deep-midnight text-sm sm:text-base">
                        {zone.fixedRate}
                      </span>
                    </div>
                  </div>

                  {/* Per KM Rate (5.1 - 15 KM) */}
                  <div className="flex items-center gap-3">
                    {/* Road Perspective SVG Icon */}
                    {/* <svg
                      viewBox="0 0 24 32"
                      className="w-5 h-7 text-warm-taupe/80 shrink-0 stroke-current"
                      fill="none"
                      strokeWidth="2.5"
                    >
                      <line x1="4" y1="30" x2="8" y2="2" />
                      <line x1="20" y1="30" x2="16" y2="2" />
                      <line x1="12" y1="8" x2="12" strokeDasharray="3 3" />
                      <line
                        x1="12"
                        y1="18"
                        x2="12"
                        y2="22"
                        strokeDasharray="3 3"
                      />
                    </svg> */}

                    <div className="flex-grow flex items-baseline justify-between gap-2">
                      <span className="text-xs sm:text-sm text-deep-midnight/80 font-medium">
                        {zone.kmRange}
                      </span>
                      <span className="font-bold text-deep-midnight text-sm sm:text-base text-right">
                        {zone.kmRate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Book Zone CTA */}
              <div className="mt-8 pt-5 border-t border-sand-beige/20">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(zone.waText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-warm-ivory text-deep-midnight group-hover:bg-deep-midnight group-hover:text-soft-white py-3 px-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300"
                >
                  Book Zone {zone.id}{" "}
                  <BsArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Note / Disclaimer Banner */}
        <div className="max-w-4xl mx-auto mb-10 p-5 rounded-2xl bg-warm-ivory/60 border border-sand-beige/40 flex items-start sm:items-center gap-3 text-xs text-deep-midnight/80">
          <BsInfoCircle className="text-base text-warm-taupe shrink-0 mt-0.5 sm:mt-0" />
          <p>
            Rates cover door-to-door private transport with AC and pet-safe
            cabin. For custom multi-stop routes or destinations outside listed
            zones, contact us for an instant personalized quotation.
          </p>
        </div>

        {/* Interactive Google MyMaps (Maps Paling Bawah) */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5">
            <div>
              <p className="text-xs uppercase tracking-widest text-warm-taupe font-semibold mb-1">
                Interactive Zone Map
              </p>
              <h3 className="font-playfair text-xl sm:text-2xl font-bold text-deep-midnight">
                Explore The Coverage Map
              </h3>
            </div>
            <p className="text-xs text-deep-midnight/70 font-normal max-w-sm sm:text-right">
              Pinch or scroll to zoom. Tap any highlighted area to verify your
              exact zone.
            </p>
          </div>

          <div className="w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-sand-beige/50 bg-white">
            <iframe
              src="https://www.google.com/maps/d/embed?mid=1ebzNOKwkJKVQrDPvSP931djaAh4fG50&ehbc=2E312F"
              width="100%"
              height="380"
              className="w-full h-[300px] sm:h-[350px] md:h-[380px] border-0"
              loading="lazy"
              title="PawCab Bali Zone Coverage Map"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
