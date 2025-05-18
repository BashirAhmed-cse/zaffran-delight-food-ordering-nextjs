/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tw4qwq07h2.ufs.sh',
        pathname: '/f/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Google profile photos
      },
      {
        protocol: 'https',
        hostname: 'dawid-food-ordering.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'sea1.ingest.uploadthing.com', // Your uploadthing ingest domain
      },
    ],
  },
};

module.exports = nextConfig;
