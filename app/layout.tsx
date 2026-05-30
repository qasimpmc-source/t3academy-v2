import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "T3 Academy | Test. Teach. Test again.",
  description:
    "Your one stop solution for all exam preparation. Verified question banks, timed mock exams, and a trained AI tutor for every subject.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable} h-full bg-bg`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
