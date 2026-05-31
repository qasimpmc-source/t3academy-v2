import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "T3 Mind Score | T3 Academy",
  description:
    "Take the T3 Mind Score test. A standardised adaptive cognitive ability assessment covering abstract reasoning, working memory, processing speed and more.",
};

export default function IqTestLayout({ children }: { children: React.ReactNode }) {
  // Standalone layout: no dashboard nav, no shared header.
  // Uses its own warm-cream design system via inline styles.
  return <>{children}</>;
}
