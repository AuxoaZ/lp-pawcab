import React from "react";
import Button from "./Button";
import { BsArrowRight, BsWhatsapp } from "react-icons/bs";
import { PiCalendarBlank, PiChatText, PiCarProfile } from "react-icons/pi";

export default function HowItWorksSection() {
  const steps = [
    {
      id: "01",
      icon: <PiCalendarBlank className="text-2xl text-deep-midnight" />,
      title: "Choose your service",
      desc: "Transport, walking or sitting.",
    },
    {
      id: "02",
      icon: <PiChatText className="text-2xl text-deep-midnight" />,
      title: "Tell us",
      desc: "Share the details with our team.",
    },
    {
      id: "03",
      icon: <PiCarProfile className="text-2xl text-deep-midnight" />,
      title: "PawCab comes",
      desc: "Sit back and let us take care of the rest.",
    },
  ];

  return (
    <section className="bg-soft-white py-20 px-10 border-t border-sand-beige/30">
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center gap-12 xl:gap-8">
        {/* Title Area */}
        <div className="w-full xl:w-1/4 text-center xl:text-left">
          <p className="uppercase tracking-[0.2em] text-sm text-warm-taupe font-semibold mb-4">
            How It Works
          </p>
          <h2 className="font-playfair text-4xl text-deep-midnight">
            Booking a Ride <br className="hidden xl:block" /> is Easy.
          </h2>
        </div>

        {/* Steps */}
        <div className="w-full xl:w-1/2 flex flex-col md:flex-row gap-8 xl:gap-4 justify-between">
          {steps.map((step, idx) => (
            <div key={idx} className="flex-1 text-center xl:text-left">
              <div className="flex items-center justify-center xl:justify-start gap-4 mb-4">
                <span className="text-pawcab-gold font-bold text-xl">
                  {step.id}
                </span>
                <div className="w-10 h-10 rounded-full border border-sand-beige flex items-center justify-center">
                  {step.icon}
                </div>
              </div>
              <p className="font-medium text-deep-midnight text-lg mb-2">
                {step.title}
              </p>
              <p className="text-xs text-deep-midnight/70 max-w-[200px] mx-auto xl:mx-0">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Action Area */}
        <div className="w-full xl:w-1/4 flex flex-col items-center xl:items-end text-center xl:text-right">
          <Button
            variant="secondary"
            className="mb-4 w-full md:w-auto flex justify-between"
            icon={<BsArrowRight />}
          >
            <div className="flex items-center gap-2">
              <BsWhatsapp className="text-lg" />
              <span>Book Via WhatsApp</span>
            </div>
          </Button>
          <p className="text-xs text-deep-midnight/70 font-medium">
            Quick, easy, and pet-friendly. ♡
          </p>
        </div>
      </div>
    </section>
  );
}
