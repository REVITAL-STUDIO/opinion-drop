/** @type {import('next').NextConfig} */
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const envPath = path.resolve(__dirname, '../.env');

dotenv.config({ path: envPath });

const nextConfig = {};


export default nextConfig;
