import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, "../.env");

dotenv.config({ path: envPath });

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "opiniondrop-storage.s3.us-east-2.amazonaws.com",
        port: "",
        pathname: "/**", 
      },
    ],
  },
};

export default nextConfig;
