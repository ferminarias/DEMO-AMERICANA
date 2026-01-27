/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        // Permitir embedding del iframe en cualquier dominio
        source: '/voice/embed',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL', // Permitir embedding en cualquier dominio
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' *.wordpress.com *.wordpress.org localhost:* *", // Permite WordPress y localhost
          },
        ],
      },
    ];
  },
}

export default nextConfig
