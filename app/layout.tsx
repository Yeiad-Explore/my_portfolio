import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/motion/motion-provider";
import { GradientBlobs } from "@/components/motion/gradient-blobs";
import { THEME_INIT_SCRIPT } from "@/lib/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kabid Yeiad - AI Engineer & Consultant",
  description: "Portfolio of Kabid Yeiad - AI Engineer and Consultant specializing in intelligent solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning is required and narrow in effect: it applies only
    // to <html>'s own attributes, which the pre-paint script below mutates
    // before React hydrates. It does not suppress warnings for any descendant.
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Runs blocking, before first paint, so the correct theme is on <html>
          by the time anything is painted — this is what avoids a flash of the
          wrong theme. It must stay inline and synchronous; deferring it or
          moving it into a component would reintroduce the flash.
        */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}
      >
        {/* Gradient blobs (top + bottom) applied to the entire website.
            Markup moved into <GradientBlobs /> so it can drift (H3) and respond
            to the cursor (H4); styling is unchanged. Rendered inside
            MotionProvider because it relies on LazyMotion's features. */}
        <MotionProvider>
          <GradientBlobs />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
