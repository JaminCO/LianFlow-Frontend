import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '../components/navbar'
import Footer from '../components/Footer'
import { AuthProvider } from '@/hooks/useAuth';
import { AuthNew } from '@/contexts/AuthContext';
import { defaultMetadata } from './metadata';

// export const metadata = defaultMetadata;

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   );
// } 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LianFlow",
  description: "A Web3 B2B SaaS Platform for Seamless Crypto Payments on the NeoX Chain",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AuthNew>
        <AuthProvider>
        <Navbar />
        {children}
        <Footer />
        </AuthProvider>
        </AuthNew>
      </body>
    </html>
  );
}