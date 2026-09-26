import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { CommandMenu } from "@/components/command-menu";
import { Footer } from "@/components/footer";
import { GlassFilter } from "@/components/glass-filter";
import { MotionProvider } from "@/components/motion";
import { Nav } from "@/components/nav";
import { getProjects } from "@/lib/projects";
import { site } from "@/lib/site";
import { siteUrl } from "@/lib/site-url";
import { themeInitScript } from "@/lib/theme-script";
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
  metadataBase: new URL(siteUrl),
  // Pages set a short title ("Projects"); the template adds the name.
  title: { default: `${site.name} — ${site.role}`, template: `%s — ${site.name}` },
  description: `${site.tagline} NLP, machine-learning and data-analysis projects by ${site.name}.`,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.links.linkedin }],
  keywords: ["AI engineer", "machine learning engineer", "NLP", "data analysis", "Python", "scikit-learn", "portfolio", site.name],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F6F4" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0B0C" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the theme script may add `dark` before React loads.
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <a
          href="#main"
          className="glass sr-only z-[60] rounded-full px-4 py-2 text-sm focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <GlassFilter />
        <MotionProvider>
          <Nav />
          <main id="main" className="flex-1 pt-24">
            {children}
          </main>
          <Footer />
          <CommandMenu projects={getProjects().map(({ slug, title, tags }) => ({ slug, title, tags }))} />
        </MotionProvider>
      </body>
    </html>
  );
}
