import type { ScoreResult } from "./scoring";

// Lazy-import jsPDF only on the client
async function getJsPDF() {
  const { jsPDF } = await import("jspdf");
  return jsPDF;
}

async function imageToBase64(url: string): Promise<string> {
  const res = await fetch(url);
  const blob = await res.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

async function qrCodeDataUrl(text: string): Promise<string> {
  const QRCode = (await import("qrcode")).default;
  return QRCode.toDataURL(text, { width: 140, margin: 1, color: { dark: "#1A1610", light: "#FDFBF7" } });
}

// Colours
const C = {
  bg: [253, 251, 247] as [number, number, number],
  gold: [184, 112, 22] as [number, number, number],
  dark: [26, 22, 16] as [number, number, number],
  muted: [120, 108, 90] as [number, number, number],
  lightGold: [248, 237, 214] as [number, number, number],
};

/** Draw the radar/bar domain chart directly in jsPDF.
 *  Positioned at (cx, cy) with given radius. */
function drawRadar(
  doc: InstanceType<Awaited<ReturnType<typeof getJsPDF>>>,
  cx: number,
  cy: number,
  radius: number,
  scores: { label: string; pct: number }[]
) {
  const n = scores.length;
  if (n < 3) return;

  const angle = (i: number) => (i / n) * 2 * Math.PI - Math.PI / 2;
  const pt = (i: number, r: number) => ({
    x: cx + r * Math.cos(angle(i)),
    y: cy + r * Math.sin(angle(i)),
  });

  // Grid rings
  doc.setLineWidth(0.2);
  for (const fraction of [0.25, 0.5, 0.75, 1.0]) {
    doc.setDrawColor(...C.lightGold);
    for (let i = 0; i < n; i++) {
      const from = pt(i, radius * fraction);
      const to = pt((i + 1) % n, radius * fraction);
      doc.line(from.x, from.y, to.x, to.y);
    }
  }

  // Axis spokes
  doc.setDrawColor(...C.muted);
  doc.setLineWidth(0.3);
  for (let i = 0; i < n; i++) {
    const end = pt(i, radius);
    doc.line(cx, cy, end.x, end.y);
  }

  // Data polygon (outline only)
  doc.setDrawColor(...C.gold);
  doc.setLineWidth(1.2);
  for (let i = 0; i < n; i++) {
    const from = pt(i, radius * (scores[i].pct / 100));
    const to = pt((i + 1) % n, radius * (scores[(i + 1) % n].pct / 100));
    doc.line(from.x, from.y, to.x, to.y);
  }

  // Data dots
  doc.setFillColor(...C.gold);
  for (let i = 0; i < n; i++) {
    const p = pt(i, radius * (scores[i].pct / 100));
    doc.circle(p.x, p.y, 1.2, "F");
  }

  // Axis labels
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(...C.dark);
  for (let i = 0; i < n; i++) {
    const labelPt = pt(i, radius + 7);
    // Short label
    const shortLabel = scores[i].label.replace("Reasoning", "Rsng.").replace("Working Memory", "W. Memory");
    doc.text(shortLabel, labelPt.x, labelPt.y, { align: "center" });
  }
}

export async function generateCertificate(
  scoreResult: ScoreResult,
  candidateName: string
): Promise<void> {
  const JsPDF = await getJsPDF();

  // Portrait A4
  const doc = new JsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = 210;
  const H = 297;

  // ── Background ────────────────────────────────────────────────────────────
  doc.setFillColor(...C.bg);
  doc.rect(0, 0, W, H, "F");

  // ── Double gold border ────────────────────────────────────────────────────
  doc.setDrawColor(...C.gold);
  doc.setLineWidth(2);
  doc.rect(8, 8, W - 16, H - 16);
  doc.setLineWidth(0.5);
  doc.rect(11, 11, W - 22, H - 22);

  // ── Einstein image (top right) ─────────────────────────────────────────────
  let einsteinLoaded = false;
  try {
    const einsteinB64 = await imageToBase64("/api/iq-test/einstein");
    doc.addImage(einsteinB64, "JPEG", W - 58, 15, 42, 52);
    // Subtle gold frame around Einstein
    doc.setDrawColor(...C.gold);
    doc.setLineWidth(0.4);
    doc.rect(W - 59, 14, 44, 54);
    einsteinLoaded = true;
  } catch {
    // Einstein image failed - continue without it
  }
  void einsteinLoaded;

  // ── Logo (top left) ───────────────────────────────────────────────────────
  doc.setFont("times", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...C.gold);
  doc.text("T3 Academy", 18, 28);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...C.muted);
  doc.text("Test. Teach. Test again.", 18, 35);

  // ── Gold horizontal rule ──────────────────────────────────────────────────
  doc.setDrawColor(...C.gold);
  doc.setLineWidth(0.8);
  doc.line(14, 52, W - 14, 52);
  doc.setLineWidth(0.2);
  doc.line(14, 54.5, W - 14, 54.5);

  // ── Certificate title ─────────────────────────────────────────────────────
  doc.setFont("times", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...C.dark);
  doc.text("T3 MIND SCORE CERTIFICATE", W / 2, 65, { align: "center" });

  doc.setFont("times", "italic");
  doc.setFontSize(10);
  doc.setTextColor(...C.muted);
  doc.text("A standardised cognitive ability assessment", W / 2, 73, { align: "center" });

  // ── Gold rule ─────────────────────────────────────────────────────────────
  doc.setDrawColor(...C.lightGold);
  doc.setLineWidth(0.5);
  doc.line(14, 79, W - 14, 79);

  // ── Candidate section ─────────────────────────────────────────────────────
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...C.muted);
  doc.text("This certifies that", W / 2, 93, { align: "center" });

  const displayName = candidateName.trim() || "Anonymous Candidate";
  doc.setFont("times", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...C.dark);
  doc.text(displayName, W / 2, 105, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...C.muted);
  doc.text("completed the T3 IQ Assessment and achieved a T3 Mind Score of", W / 2, 117, { align: "center" });

  // ── Score (large, gold) ───────────────────────────────────────────────────
  doc.setFont("times", "bold");
  doc.setFontSize(64);
  doc.setTextColor(...C.gold);
  doc.text(String(scoreResult.composite), W / 2, 147, { align: "center" });

  // Score band label
  doc.setFont("times", "bold");
  doc.setFontSize(15);
  doc.setTextColor(...C.dark);
  doc.text(scoreResult.band + " Intelligence", W / 2, 158, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...C.muted);
  doc.text(scoreResult.bandDescription, W / 2, 165, { align: "center", maxWidth: 150 });

  // ── Gold rule ─────────────────────────────────────────────────────────────
  doc.setDrawColor(...C.gold);
  doc.setLineWidth(0.6);
  doc.line(14, 173, W - 14, 173);

  // ── Domain chart ─────────────────────────────────────────────────────────
  const chartScores = scoreResult.domains.map((d) => ({
    label: d.label,
    pct: d.pct,
  }));

  if (chartScores.length >= 3) {
    // Radar chart centred in the lower half
    const cx = W / 2;
    const cy = 212;
    const r = scoreResult.ageBand === "adult" ? 28 : 30;
    drawRadar(doc, cx, cy, r, chartScores);
  }

  // Domain score list (right of chart)
  const listX = scoreResult.ageBand === "adult" ? 130 : 128;
  let listY = 184;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(...C.dark);
  doc.text("Domain Scores", listX, listY);
  listY += 6;

  doc.setLineWidth(0.2);
  for (const d of scoreResult.domains) {
    // Bar background
    doc.setFillColor(...C.lightGold);
    doc.rect(listX, listY - 3, 46, 4.5, "F");
    // Bar fill
    const barW = Math.max(2, (d.pct / 100) * 46);
    doc.setFillColor(...C.gold);
    doc.rect(listX, listY - 3, barW, 4.5, "F");
    // Label
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...C.dark);
    doc.text(d.label, listX, listY + 5);
    // Score number
    doc.setFont("helvetica", "bold");
    doc.text(`IQ ${d.iq}`, listX + 38, listY + 5);
    listY += 14;
  }

  // ── Gold rule ─────────────────────────────────────────────────────────────
  doc.setDrawColor(...C.gold);
  doc.setLineWidth(0.6);
  doc.line(14, 257, W - 14, 257);

  // ── Footer row: date + site + QR ─────────────────────────────────────────
  const dateStr = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...C.muted);
  doc.text(`Issued: ${dateStr}`, 18, 267);

  doc.setFont("times", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...C.gold);
  doc.text("t3academy.co.uk", W / 2, 267, { align: "center" });

  // QR code
  try {
    const qrB64 = await qrCodeDataUrl("https://t3academy.co.uk");
    doc.addImage(qrB64, "PNG", W - 42, 259, 28, 28);
  } catch {
    // QR failed silently
  }

  // Footer text
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...C.muted);
  doc.text(
    "This certificate is issued by T3 Academy. Results are based on an adaptive online assessment.",
    W / 2,
    281,
    { align: "center", maxWidth: 160 }
  );

  // Save
  const safeName = displayName.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 30);
  doc.save(`T3_Mind_Score_${safeName}_${scoreResult.composite}.pdf`);
}
