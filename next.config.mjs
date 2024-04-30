/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "http://ec2-3-26-9-149.ap-southeast-2.compute.amazonaws.com/api/:path*",
      },
    ];
  },
  output: "standalone",
};

export default nextConfig;
