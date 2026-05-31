// Homepage warm-cream design tokens — shared across all HP components.
// Using inline style constants keeps these values isolated from the
// dashboard CSS variables so neither theme affects the other.

export const HP = {
  cream:      "#F5F1EB",
  gold:       "#C89A5E",
  goldHover:  "#A87840",
  dark:       "#1A1610",
  surface:    "#FEFCF9",
  muted:      "#8B7F6F",
  sage:       "#7FA896",
  rose:       "#A87C7C",
  border:     "rgba(200,154,94,0.18)",
  borderSage: "rgba(127,168,150,0.3)",
  borderRose: "rgba(168,124,124,0.3)",
  orbGold:    "rgba(200,154,94,0.08)",
} as const;
