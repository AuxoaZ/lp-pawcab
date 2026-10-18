import React from "react";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";

export default function ServicesSection() {
  const services = [
    {
      id: "01",
      title: "Pet Transport",
      description: "Door-to-door private transportation across Bali.",
      href: "/services/pet-transport",
      image:
        "https://images.unsplash.com/photo-1638612844419-0a7a606290b1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    },
    {
      id: "02",
      title: "Dog Walking",
      description: "Little adventure away from home.",
      href: "#",
      image:
        "https://images.unsplash.com/photo-1659639237692-2442096a1f04?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    },
    {
      id: "03",
      title: "Pet Sitting",
      description: "Personal care while you're away.",
      href: "#",
      image:
        "https://plus.unsplash.com/premium_photo-1661342557114-a67e3c6679a8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    },
  ];

  return (
    <section id="services" className="bg-soft-white py-24 px-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <p className="uppercase tracking-[0.2em] text-sm text-warm-taupe font-semibold mb-4">
              Our Services
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl text-deep-midnight">
              Every Journey, A Better Day.
            </h2>
          </div>
          <div className="text-right">
            <p className="text-deep-midnight/80 font-light mb-2 max-w-sm ml-auto">
              From daily rides to special adventures, we&apos;re here for every step
              of their journey.
            </p>
            <a
              href="#services"
              className="inline-flex items-center gap-2 uppercase tracking-widest text-xs font-bold hover:text-pawcab-gold transition-colors"
            >
              View All Services <BsArrowRight />
            </a>
          </div>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className="bg-warm-ivory group cursor-pointer hover:shadow-xl transition-shadow duration-300 block"
            >
              <div className="h-44 md:h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-44 md:h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 relative">
                <h3 className="font-playfair text-2xl font-bold mb-3 group-hover:text-pawcab-navy transition-colors">
                  {service.title}
                </h3>
                <p className="text-deep-midnight/70 font-light max-w-[400px] text-sm mb-4">
                  {service.description}
                </p>

                <div className="flex justify-between items-end">
                  <span
                    className="inline-flex items-center gap-2 uppercase tracking-widest text-xs font-bold text-warm-taupe group-hover:text-pawcab-gold transition-colors"
                  >
                    Learn More <BsArrowRight />
                  </span>
                  <span className="font-playfair text-4xl text-warm-taupe/30 font-bold">
                    {service.id}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
