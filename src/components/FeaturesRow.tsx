import React from "react";
import {
  PiCarProfile,
  PiSnowflake,
  PiUser,
  PiPawPrint,
  PiMapPin,
} from "react-icons/pi";

export default function FeaturesRow() {
  const features = [
    {
      icon: <PiCarProfile className="text-3xl text-pawcab-gold" />,
      title: "Private Ride",
      subtitle: "No shared pets",
    },
    {
      icon: <PiSnowflake className="text-3xl text-pawcab-gold" />,
      title: "Air Conditioned",
      subtitle: "Comfortable cabin",
    },
    {
      icon: <PiUser className="text-3xl text-pawcab-gold" />,
      title: "Owner Welcome",
      subtitle: "Ride together",
    },
    {
      icon: <PiPawPrint className="text-3xl text-pawcab-gold" />,
      title: "Large-Dog Friendly",
      subtitle: "All breeds & sizes",
    },
    {
      icon: <PiMapPin className="text-3xl text-pawcab-gold" />,
      title: "Door to Door",
      subtitle: "Across Bali",
    },
  ];

  return (
    <section className="bg-deep-midnight border-t border-soft-white/10 py-6 px-10">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-8 md:gap-4">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-4 text-soft-white">
            <div>{feature.icon}</div>
            <div>
              <h4 className=" text-white tracking-wider text-base font-semibold">
                {feature.title}
              </h4>
              <p className="text-xs text-soft-white/70 font-normal mt-1">
                {feature.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
