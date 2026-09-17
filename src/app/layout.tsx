import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tootler.ai"),
  title: {
    default: "Tootler | Bleeding-Edge STEM Intelligence & Research Retention",
    template: "%s | Tootler STEM",
  },
  description:
    "Curated breakthroughs from arXiv to production silicon across Artificial Intelligence, Quantum Physics, Advanced Semiconductors, and Biotechnology with integrated cognitive spaced repetition (SM-2).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} font-sans antialiased bg-[#F8F8F9] text-neutral-900 min-h-screen flex flex-col`}>
        <StoreProvider>
          <Navbar />
          <main className="flex-1 pb-20 md:pb-12">
            {children}
          </main>
          <BottomNav />
        </StoreProvider>
      </body>
    </html>
  );
}