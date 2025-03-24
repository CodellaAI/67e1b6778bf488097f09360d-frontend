
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'localhost'],
  },
  reactStrictMode: true,
}

if (process.env.NEXT_PUBLIC_API_URL) {
  try {
    // Extract just the hostname part
    const hostname = process.env.NEXT_PUBLIC_API_URL.replace(/^https?:\/\//, '').split('/')[0];
    if (!nextConfig.images.domains.includes(hostname)) {
      nextConfig.images.domains.push(hostname);
    }
  } catch (error) {
    console.warn(`Error adding API domain to images`);
  }
}

module.exports = nextConfig
