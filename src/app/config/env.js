// Environment variables configuration
export const env = {
  // Variables with NEXT_PUBLIC_ prefix are available in the browser
  apiUrl: process.env.NEXT_PUBLIC_API_URL,

  
  // You can add computed values
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production'
}; 