import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin CMS | The PawCab Bali",
  description: "Internal Content Management System for The PawCab Bali",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-neutral-950 text-neutral-100">{children}</div>;
}

