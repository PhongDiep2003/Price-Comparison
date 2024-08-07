import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  weight: ['300','400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "Ecommerce Price Tracker",
  description: "Track prices of your favorite products from different ecommerce websites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="max-w-10xl mx-auto">
          <Navbar/>
          <ToastContainer />
          {children}
        </main>
        
      </body>
    </html>
  );
}
