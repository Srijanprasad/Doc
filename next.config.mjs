/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.VITE_SITE_URL,
    NEXT_PUBLIC_SUPABASE_URL:
      process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.VITE_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_ADMIN_EMAIL:
      process.env.NEXT_PUBLIC_ADMIN_EMAIL || process.env.VITE_ADMIN_EMAIL,
    NEXT_PUBLIC_EMAILJS_SERVICE_ID:
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || process.env.VITE_SERVICE_ID,
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID:
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || process.env.VITE_TEMPLATE_ID,
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY:
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || process.env.VITE_PUBLIC_KEY,
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    unoptimized: true,
  },
};

export default nextConfig;
