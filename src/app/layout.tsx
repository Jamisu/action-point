import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar'
import Preloader from '@/components/Preloader'
import { TooltipProvider } from '@/contexts/TooltipContext'
import { DataProvider } from '@/contexts/DataContext'
import 'devicon/devicon.min.css'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Action-Point portfolio",
  description: "Action-Point portfolio",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TooltipProvider>
          <DataProvider>
            <Navbar />
            <Preloader />
            {children}
          </DataProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
