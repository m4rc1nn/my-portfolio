/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    reactStrictMode: true,
    basePath: '/my-portfolio',
    images: { unoptimized: true }
};

export default nextConfig;
