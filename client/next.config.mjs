/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "s3-bucket-box.s3.ca-central-1.amazonaws.com",
                port: "",
                pathname: "/**",
            }
        ]
    }
};

export default nextConfig;
