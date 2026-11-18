import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    const services = ["dog-walking", "pet-sitting", "pet-transport"];
    return services.flatMap((s) => [
      { source: `/${s}`, destination: `/services/${s}`, permanent: true },
      { source: `/service/${s}`, destination: `/services/${s}`, permanent: true },
    ]);
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
