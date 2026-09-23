import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "@prisma/client/edge", "@thronova/database"]
};

export default nextConfig;
