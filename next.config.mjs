/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Add this to ignore specific hydration warnings
    onRecoverableError: (err) => {
      if (err.message.includes('Hydration failed')) {
        console.log('Ignoring hydration error:', err);
      } else {
        throw err;
      }
    },
  }
  
  export default nextConfig;