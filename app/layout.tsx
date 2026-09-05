import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AIGuide from "@/components/AIGuide";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Enter India — Digital Museum of Indian Culture",
  description: "SIH PS26197: immersive digital museum of Indian culture and heritage",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#lobby"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:rounded-full focus:bg-amber-400 focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to museum content
        </a>
        {children}
        <Footer />
        <AIGuide />
      </body>
    </html>
  );
}
