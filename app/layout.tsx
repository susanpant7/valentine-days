import type { Metadata } from "next";
import { Geist, Dancing_Script } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rose Day Surprise 🌹",
  description: "A special Valentine's wish full of love",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body 
        className={`${geistSans.variable} ${dancingScript.variable} antialiased bg-[#0f0101] text-white overflow-hidden`}
        // This style block ensures any injected Vercel/Next toolbars are hidden
        style={{ position: 'relative' }} 
      >
        {/* Deep Red Vignette Overlay for Valentine atmosphere */}
        <div className="fixed inset-0 bg-linear-to-t from-red-950/60 via-transparent to-red-950/60 pointer-events-none z-50" />
        
        {children}

        {/* CSS Hack to hide the 'N' or Vercel icon if standard methods fail */}
        <style dangerouslySetInnerHTML={{ __html: `
          #vercel-live-feedback, #vercel-toolbar, .nextjs-toast-errors-parent { 
            display: none !important; 
          }
        `}} />
      </body>
    </html>
  );
}