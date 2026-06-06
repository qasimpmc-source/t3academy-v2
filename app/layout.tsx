import type { Metadata } from "next";
import {
  Playfair_Display,
  Plus_Jakarta_Sans,
  Space_Grotesk,
  Montserrat,
  Hanken_Grotesk,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

// Dashboard fonts
const playfair    = Playfair_Display({ variable: "--font-serif",    subsets: ["latin"], display: "swap" });
const jakarta     = Plus_Jakarta_Sans({ variable: "--font-sans",     subsets: ["latin"], display: "swap" });
const spaceGrotesk = Space_Grotesk({ variable: "--font-display",   subsets: ["latin"], display: "swap" });

// Homepage fonts
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});
const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  variable: "--font-mono-brand",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "T3 Academy | Test. Teach. Test again.",
  description:
    "Your one stop solution for all exam preparation. Verified question banks, timed mock exams, and a trained AI tutor for every subject.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={[
        playfair.variable,
        jakarta.variable,
        spaceGrotesk.variable,
        montserrat.variable,
        hanken.variable,
        jetbrains.variable,
        "h-full",
      ].join(" ")}
    >
      <head>
        {/* Material Symbols — icon font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
