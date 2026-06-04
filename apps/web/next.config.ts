import "@aria/env/web";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  images: {
    // Mascottes/badges/cartes : assets de marque immuables → on garde l'image
    // optimisée en cache un an pour éviter toute ré-optimisation à froid en prod.
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
