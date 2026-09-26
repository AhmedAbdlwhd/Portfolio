import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GlassFilter } from "@/components/glass-filter";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahmed — Machine Learning Engineer",
  description: "I build machine-learning tools people can actually use.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <GlassFilter />
        {children}
      </body>
    </html>
  );
}
