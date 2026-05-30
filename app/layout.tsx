import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "T3 Academy — Test. Teach. Test Again.",
  description:
    "An online exam preparation platform with a dedicated AI tutor for every subject. 11+ and GCSE prep, verified question banks, mock exams, and progress reports.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} h-full bg-[var(--color-bg)]`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
