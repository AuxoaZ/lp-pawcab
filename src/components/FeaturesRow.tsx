import React from "react";
import {
  PiCarProfile,
  PiSnowflake,
  PiUser,
  PiPawPrint,
  PiMapPin,
  PiHeart,
  PiShieldCheck,
} from "react-icons/pi";
import contentData from "@/lib/content";

const iconMap: Record<string, React.ReactNode> = {
  car: <PiCarProfile className="text-3xl text-pawcab-gold" />,
  snowflake: <PiSnowflake className="text-3xl text-pawcab-gold" />,
  user: <PiUser className="text-3xl text-pawcab-gold" />,
  paw: <PiPawPrint className="text-3xl text-pawcab-gold" />,
  pin: <PiMapPin className="text-3xl text-pawcab-gold" />,
  heart: <PiHeart className="text-3xl text-pawcab-gold" />,
  shield: <PiShieldCheck className="text-3xl text-pawcab-gold" />,
};

export default function FeaturesRow() {
  const contentFeatures = contentData.home?.features || [];
  const defaultFeatures = [
    { title: "Private Ride", subtitle: "No shared pets", icon: "car" },
    { title: "Air Conditioned", subtitle: "Comfortable cabin", icon: "snowflake" },
    { title: "Owner Welcome", subtitle: "Ride together", icon: "user" },
    { title: "Large-Dog Friendly", subtitle: "All breeds & sizes", icon: "paw" },
    { title: "Door to Door", subtitle: "Across Bali", icon: "pin" },
  ];

  const list = contentFeatures.length > 0 ? contentFeatures : defaultFeatures;

  return (
    <section className="bg-deep-midnight border-t border-soft-white/10 py-6 px-10">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-8 md:gap-4">
        {list.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-4 text-soft-white">
            <div>
              {iconMap[feature.icon || ""] || <PiPawPrint className="text-3xl text-pawcab-gold" />}
            </div>
            <div>
              <h4 className="text-white tracking-wider text-base font-semibold">
                {feature.title}
              </h4>
              <p className="text-xs text-soft-white/70 font-normal mt-1">
                {"description" in feature && feature.description ? feature.description : (feature as { subtitle?: string }).subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
