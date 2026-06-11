"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const OwlParticles = dynamic(() => import("./_components/OwlParticles"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

/* ── design tokens ─────────────────────────────────────────── */
const C = {
  bg: "#022c22",
  bgDeep: "#011a13",
  surface: "#0a2a1e",
  surfaceHigh: "#0d3326",
  primary: "#95d3ba",
  primaryDim: "#80bea6",
  onPrimary: "#003829",
  gold: "#e9c349",
  goldDeep: "#d4a017",
  onGold: "#3c2f00",
  text: "#e5e2e1",
  text2: "#bfc9c3",
  text3: "#89938d",
  line: "rgba(149,211,186,0.14)",
  goldLine: "rgba(233,195,73,0.25)",
};
const font = "var(--font-montserrat), 'Montserrat', system-ui, sans-serif";

/* ── magnetic button ───────────────────────────────────────── */
function Magnetic({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      gsap.to(el, { x: x * strength, y: y * strength, duration: 0.4, ease: "power3.out" });
    };
    const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [strength]);
  return <div ref={ref} style={{ display: "inline-block" }}>{children}</div>;
}

const btnPrimary: React.CSSProperties = {
  background: `linear-gradient(135deg, ${C.gold}, ${C.goldDeep})`,
  color: C.onGold, border: "none", borderRadius: 999, padding: "16px 36px",
  fontSize: 15, fontWeight: 800, letterSpacing: "0.02em", cursor: "pointer",
  fontFamily: font, boxShadow: "0 12px 40px -8px rgba(233,195,73,0.45)",
};
const btnGhost: React.CSSProperties = {
  background: "transparent", color: C.primary, borderRadius: 999, padding: "15px 34px",
  fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: font,
  border: `1.5px solid rgba(149,211,186,0.4)`,
};

/* ── nav ───────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const item: React.CSSProperties = {
    display: "block", padding: "10px 16px", fontSize: 13, fontWeight: 600,
    color: C.text2, textDecoration: "none", fontFamily: font, borderRadius: 10,
  };

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: scrolled ? "12px 6vw" : "22px 6vw",
        background: scrolled ? "rgba(1,26,19,0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.line}` : "1px solid transparent",
        transition: "all .45s cubic-bezier(.16,1,.3,1)", fontFamily: font,
      }}
      onMouseLeave={() => setOpen(null)}
    >
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <span style={{
          width: 36, height: 36, borderRadius: 12, display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 18, background: "rgba(6,78,59,0.8)",
          border: `1px solid rgba(149,211,186,0.25)`,
        }}>🦉</span>
        <span style={{ fontSize: 19, fontWeight: 800, color: C.primary, letterSpacing: "-0.03em" }}>
          T3 <em style={{ fontStyle: "normal", color: C.gold }}>Academy</em>
        </span>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="t3-nav-links">
        {[
          { label: "Courses", key: "courses" },
          { label: "Resources", key: "resources" },
        ].map(({ label, key }) => (
          <div key={key} style={{ position: "relative" }} onMouseEnter={() => setOpen(key)}>
            <button style={{
              background: "transparent", border: "none", cursor: "pointer", color: C.text2,
              fontSize: 13.5, fontWeight: 600, padding: "10px 14px", fontFamily: font,
            }}>
              {label} <span style={{ fontSize: 10, opacity: 0.7 }}>▾</span>
            </button>
            {open === key && (
              <div style={{
                position: "absolute", top: "100%", left: 0, minWidth: 200, padding: 8,
                background: "rgba(10,42,30,0.96)", backdropFilter: "blur(20px)",
                border: `1px solid ${C.line}`, borderRadius: 16,
                boxShadow: "0 24px 60px -12px rgba(0,0,0,0.6)",
              }}>
                {key === "courses" ? (
                  <>
                    <Link href="/dashboard" style={item}>11 Plus</Link>
                    <Link href="/auth/signup" style={item}>GCSE</Link>
                    <Link href="/auth/signup" style={item}>Other Medical Exams</Link>
                  </>
                ) : (
                  <>
                    <a href="https://www.bbc.co.uk/bitesize" target="_blank" rel="noopener noreferrer" style={item}>BBC Bitesize</a>
                    <a href="https://www.britannica.com" target="_blank" rel="noopener noreferrer" style={item}>Britannica</a>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
        <Link href="/iq-test" style={{ ...item, padding: "10px 14px" }}>IQ Test</Link>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Link href="/auth/login" style={{
          color: C.text2, fontSize: 13.5, fontWeight: 700, textDecoration: "none", padding: "10px 14px",
        }}>Log in</Link>
        <Magnetic strength={0.25}>
          <button onClick={() => router.push("/auth/signup")} style={{ ...btnPrimary, padding: "11px 24px", fontSize: 13.5 }}>
            Start Free
          </button>
        </Magnetic>
      </div>
    </nav>
  );
}

/* ── hero ──────────────────────────────────────────────────── */
function Hero() {
  const router = useRouter();
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-word", { yPercent: 110, opacity: 0 }, {
        yPercent: 0, opacity: 1, stagger: 0.08, duration: 1.1, ease: "power4.out", delay: 0.25,
      });
      gsap.fromTo(".hero-fade", { y: 28, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.12, duration: 1, ease: "power3.out", delay: 0.9,
      });
      gsap.to(".hero-owl", {
        yPercent: 18, ease: "none",
        scrollTrigger: { trigger: scope.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  const words = ["Where", "bright", "minds"];
  const words2 = ["take", "flight."];

  return (
    <header ref={scope} style={{
      position: "relative", minHeight: "100vh", display: "grid",
      gridTemplateColumns: "minmax(0,1.05fr) minmax(0,0.95fr)",
      alignItems: "center", padding: "120px 6vw 60px", gap: 24,
      maxWidth: 1500, margin: "0 auto", fontFamily: font, overflow: "hidden",
    }} className="t3-hero">
      {/* ambient glows */}
      <div aria-hidden style={{
        position: "absolute", top: "-10%", right: "-5%", width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(149,211,186,0.10), transparent 65%)", pointerEvents: "none",
      }} />
      <div aria-hidden style={{
        position: "absolute", bottom: "-20%", left: "-10%", width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(233,195,73,0.07), transparent 65%)", pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 2 }}>
        <div className="hero-fade" style={{
          display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px",
          borderRadius: 999, border: `1px solid ${C.goldLine}`, background: "rgba(233,195,73,0.08)",
          color: C.gold, fontSize: 12.5, fontWeight: 700, letterSpacing: "0.12em",
          textTransform: "uppercase", marginBottom: 28, opacity: 0,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: C.gold, boxShadow: `0 0 12px ${C.gold}` }} />
          100% Free, Forever
        </div>

        <h1 style={{ fontSize: "clamp(44px, 5.6vw, 84px)", lineHeight: 1.02, fontWeight: 800, letterSpacing: "-0.04em", margin: 0, color: C.text }}>
          <span style={{ display: "block", overflow: "hidden" }}>
            {words.map((w) => (
              <span key={w} className="hero-word" style={{ display: "inline-block", marginRight: "0.26em" }}>{w}</span>
            ))}
          </span>
          <span style={{ display: "block", overflow: "hidden" }}>
            {words2.map((w, i) => (
              <span key={w} className="hero-word" style={{
                display: "inline-block", marginRight: "0.26em",
                background: i === 1 ? `linear-gradient(110deg, ${C.primary}, ${C.gold})` : "none",
                WebkitBackgroundClip: i === 1 ? "text" : undefined,
                WebkitTextFillColor: i === 1 ? "transparent" : undefined,
              }}>{w}</span>
            ))}
          </span>
        </h1>

        <p className="hero-fade" style={{ maxWidth: 520, fontSize: 17.5, lineHeight: 1.7, color: C.text2, margin: "26px 0 38px", opacity: 0 }}>
          AI-powered 11+ and GCSE preparation with infinite practice questions,
          proctored mocks, and a tutor that never sleeps. Built by educators.
          Loved by parents. Free for every child.
        </p>

        <div className="hero-fade" style={{ display: "flex", gap: 16, flexWrap: "wrap", opacity: 0 }}>
          <Magnetic>
            <button onClick={() => router.push("/auth/signup")} style={btnPrimary}>Start Learning Free →</button>
          </Magnetic>
          <Magnetic strength={0.2}>
            <button onClick={() => router.push("/dashboard")} style={btnGhost}>Explore the 11+ Hub</button>
          </Magnetic>
        </div>

        <div className="hero-fade" style={{ display: "flex", gap: 36, marginTop: 56, opacity: 0 }}>
          {[["50K+", "Questions generated"], ["98%", "Parent satisfaction"], ["£0", "Now & always"]].map(([v, l]) => (
            <div key={l}>
              <div style={{ fontSize: 26, fontWeight: 800, color: C.primary, letterSpacing: "-0.03em" }}>{v}</div>
              <div style={{ fontSize: 12, color: C.text3, fontWeight: 600, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-owl" style={{ position: "relative", height: "min(78vh, 720px)", zIndex: 1 }}>
        <OwlParticles />
      </div>
    </header>
  );
}

/* ── marquee ───────────────────────────────────────────────── */
function Marquee() {
  const items = ["Infinite AI Questions", "Proctored Mock Exams", "24/7 AI Tutor", "Parent Dashboard", "Verbal Reasoning", "Non-Verbal Reasoning", "Maths", "English"];
  return (
    <div style={{ overflow: "hidden", borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`, padding: "18px 0", background: "rgba(1,26,19,0.5)" }}>
      <div className="t3-marquee" style={{ display: "flex", gap: 0, width: "max-content" }}>
        {[...items, ...items].map((it, i) => (
          <span key={i} style={{
            fontFamily: font, fontSize: 13, fontWeight: 700, letterSpacing: "0.18em",
            textTransform: "uppercase", color: i % 2 ? C.text3 : C.primaryDim,
            padding: "0 28px", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 28,
          }}>
            {it} <span style={{ color: C.gold, fontSize: 9 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── reveal helper ─────────────────────────────────────────── */
function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".rv").forEach((node, i) => {
        gsap.fromTo(node, { y: 48, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 86%" },
          delay: (i % 3) * 0.08,
        });
      });
    }, el);
    return () => ctx.revert();
  }, [ref]);
}

function SectionTitle({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="rv" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 64px", fontFamily: font }}>
      <p style={{ color: C.gold, fontSize: 12.5, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 16 }}>{kicker}</p>
      <h2 style={{ fontSize: "clamp(32px,3.6vw,52px)", fontWeight: 800, letterSpacing: "-0.035em", color: C.text, lineHeight: 1.1, margin: 0 }}>{title}</h2>
      {sub && <p style={{ color: C.text2, fontSize: 16.5, lineHeight: 1.7, marginTop: 18 }}>{sub}</p>}
    </div>
  );
}

const sectionPad: React.CSSProperties = { padding: "110px 6vw", maxWidth: 1400, margin: "0 auto", fontFamily: font };

/* ── bento products ────────────────────────────────────────── */
function Products() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const router = useRouter();

  const card = (extra: React.CSSProperties = {}): React.CSSProperties => ({
    position: "relative", borderRadius: 28, padding: 36, overflow: "hidden",
    background: `linear-gradient(160deg, ${C.surfaceHigh}, ${C.surface})`,
    border: `1px solid ${C.line}`, cursor: "pointer",
    transition: "transform .45s cubic-bezier(.16,1,.3,1), border-color .3s, box-shadow .45s",
    ...extra,
  });

  return (
    <section ref={ref} style={sectionPad}>
      <SectionTitle kicker="The Platform" title="Everything they need to ace exam day"
        sub="One account unlocks the full T3 experience — no tiers, no upsells, no locked content." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 18 }} className="t3-bento">
        {/* 11+ flagship */}
        <div className="rv t3-card" style={{ ...card({ gridColumn: "span 7", minHeight: 340 }) }} onClick={() => router.push("/dashboard")}>
          <div aria-hidden style={{ position: "absolute", top: -80, right: -80, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(149,211,186,0.18), transparent 70%)" }} />
          <p style={{ color: C.primary, fontSize: 12, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14 }}>Flagship · 11 Plus</p>
          <h3 style={{ fontSize: 32, fontWeight: 800, color: C.text, letterSpacing: "-0.03em", margin: "0 0 14px" }}>The 11+ Mastery Hub</h3>
          <p style={{ color: C.text2, fontSize: 15.5, lineHeight: 1.7, maxWidth: 460 }}>
            English, Maths, Verbal and Non-Verbal Reasoning — 26 topics with adaptive AI questions
            that get harder as your child gets sharper. Real GL & CEM exam styles.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 26, flexWrap: "wrap" }}>
            {["English", "Maths", "VR", "NVR"].map((s) => (
              <span key={s} style={{ padding: "7px 16px", borderRadius: 999, fontSize: 12.5, fontWeight: 700, color: C.primary, background: "rgba(149,211,186,0.1)", border: `1px solid ${C.line}` }}>{s}</span>
            ))}
          </div>
          <span style={{ position: "absolute", bottom: 30, right: 34, color: C.gold, fontWeight: 800, fontSize: 14 }}>Explore →</span>
        </div>

        {/* IQ test */}
        <div className="rv t3-card" style={card({ gridColumn: "span 5", minHeight: 340, background: `linear-gradient(160deg, #1e1600, #0f0b00)`, border: `1px solid ${C.goldLine}` })} onClick={() => router.push("/iq-test")}>
          <div aria-hidden style={{ position: "absolute", bottom: -60, left: -60, width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle, rgba(233,195,73,0.16), transparent 70%)" }} />
          <p style={{ color: C.gold, fontSize: 12, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14 }}>Free Assessment</p>
          <h3 style={{ fontSize: 28, fontWeight: 800, color: C.text, letterSpacing: "-0.03em", margin: "0 0 14px" }}>The T3 IQ Test</h3>
          <p style={{ color: C.text2, fontSize: 15, lineHeight: 1.7 }}>
            A 20-minute baseline that maps your child's reasoning profile and builds their personal study plan.
          </p>
          <span style={{ position: "absolute", bottom: 30, right: 34, color: C.gold, fontWeight: 800, fontSize: 14 }}>Take the Test →</span>
        </div>

        {/* GCSE */}
        <div className="rv t3-card" style={card({ gridColumn: "span 4", minHeight: 250 })} onClick={() => router.push("/auth/signup")}>
          <p style={{ color: C.primary, fontSize: 12, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14 }}>GCSE</p>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: C.text, margin: "0 0 12px", letterSpacing: "-0.02em" }}>GCSE Science & Maths</h3>
          <p style={{ color: C.text2, fontSize: 14.5, lineHeight: 1.65 }}>Exam-board-aligned practice with instant AI marking and model answers.</p>
          <span style={{ position: "absolute", bottom: 26, right: 30, color: C.gold, fontWeight: 800, fontSize: 13.5 }}>Join →</span>
        </div>

        {/* Mock exams */}
        <div className="rv t3-card" style={card({ gridColumn: "span 4", minHeight: 250 })} onClick={() => router.push("/dashboard/mock")}>
          <p style={{ color: C.primary, fontSize: 12, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14 }}>Mock Exams</p>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: C.text, margin: "0 0 12px", letterSpacing: "-0.02em" }}>Proctored Mocks</h3>
          <p style={{ color: C.text2, fontSize: 14.5, lineHeight: 1.65 }}>Timed, invigilated conditions with full percentile ranking against the cohort.</p>
          <span style={{ position: "absolute", bottom: 26, right: 30, color: C.gold, fontWeight: 800, fontSize: 13.5 }}>Sit one →</span>
        </div>

        {/* Tutor */}
        <div className="rv t3-card" style={card({ gridColumn: "span 4", minHeight: 250, background: `linear-gradient(160deg, #064e3b, #022c22)` })} onClick={() => router.push("/auth/signup")}>
          <p style={{ color: C.gold, fontSize: 12, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14 }}>Ollie · AI Tutor</p>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: C.text, margin: "0 0 12px", letterSpacing: "-0.02em" }}>A tutor that never sleeps</h3>
          <p style={{ color: C.text2, fontSize: 14.5, lineHeight: 1.65 }}>Stuck at 9pm before a mock? Ollie explains every wrong answer, step by step.</p>
          <span style={{ position: "absolute", bottom: 26, right: 30, color: C.gold, fontWeight: 800, fontSize: 13.5 }}>Meet Ollie →</span>
        </div>
      </div>
    </section>
  );
}

/* ── comparison ────────────────────────────────────────────── */
function Comparison() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const rows: [string, boolean, boolean, boolean][] = [
    ["Infinite AI-generated questions", true, false, false],
    ["Adaptive difficulty engine", true, false, false],
    ["Proctored mock exams", true, true, false],
    ["24/7 tutor support", true, false, false],
    ["Parent progress dashboard", true, false, true],
    ["Price", true, false, false],
  ];
  const cell: React.CSSProperties = { padding: "18px 20px", fontSize: 14.5, fontFamily: font };
  const yes = <span style={{ color: C.primary, fontWeight: 800 }}>✓</span>;
  const no = <span style={{ color: "rgba(248,113,113,0.7)", fontWeight: 700 }}>✗</span>;

  return (
    <section ref={ref} style={sectionPad}>
      <SectionTitle kicker="Why T3" title="Private tutoring quality, without the £40/hour" />
      <div className="rv" style={{
        borderRadius: 24, overflow: "hidden", border: `1px solid ${C.line}`,
        background: `linear-gradient(180deg, ${C.surfaceHigh}, ${C.surface})`,
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.line}` }}>
              <th style={{ ...cell, textAlign: "left", color: C.text3, fontWeight: 700, fontSize: 12.5, textTransform: "uppercase", letterSpacing: "0.14em" }}>Feature</th>
              <th style={{ ...cell, color: C.gold, fontWeight: 800 }}>T3 Academy</th>
              <th style={{ ...cell, color: C.text3, fontWeight: 700 }}>Private Tutor</th>
              <th style={{ ...cell, color: C.text3, fontWeight: 700 }}>Workbooks</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, a, b, c], i) => (
              <tr key={label} style={{ borderBottom: i < rows.length - 1 ? `1px solid rgba(149,211,186,0.07)` : "none" }}>
                <td style={{ ...cell, color: C.text2, textAlign: "left", fontWeight: 600 }}>{label}</td>
                <td style={{ ...cell, textAlign: "center", background: "rgba(233,195,73,0.04)" }}>
                  {label === "Price" ? <strong style={{ color: C.gold }}>£0 forever</strong> : a ? yes : no}
                </td>
                <td style={{ ...cell, textAlign: "center", color: C.text3 }}>{label === "Price" ? "£30–60/hr" : b ? yes : no}</td>
                <td style={{ ...cell, textAlign: "center", color: C.text3 }}>{label === "Price" ? "£8–15 each" : c ? yes : no}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ── science / counters ────────────────────────────────────── */
function Science() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".counter").forEach((node) => {
        const target = Number(node.dataset.target ?? 0);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target, duration: 2, ease: "power2.out",
          scrollTrigger: { trigger: node, start: "top 88%" },
          onUpdate: () => { node.textContent = Math.round(obj.v).toLocaleString() + (node.dataset.suffix ?? ""); },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const blocks = [
    { n: 26, suffix: "", label: "Curriculum topics", desc: "mapped to GL & CEM specifications" },
    { n: 50000, suffix: "+", label: "Questions generated", desc: "every one unique, never recycled" },
    { n: 92, suffix: "%", label: "Accuracy uplift", desc: "average gain after 8 weeks of practice" },
    { n: 24, suffix: "/7", label: "Tutor availability", desc: "Ollie answers in seconds, any hour" },
  ];

  return (
    <section ref={ref} style={{ ...sectionPad, position: "relative" }}>
      <SectionTitle kicker="The Science" title="Spaced repetition meets adaptive AI"
        sub="T3 schedules every question using retrieval-practice research — the same techniques behind the world's best-performing students." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18 }}>
        {blocks.map((b) => (
          <div key={b.label} className="rv" style={{
            padding: "36px 30px", borderRadius: 24, textAlign: "center",
            background: `linear-gradient(170deg, ${C.surfaceHigh}, ${C.surface})`, border: `1px solid ${C.line}`,
          }}>
            <div className="counter" data-target={b.n} data-suffix={b.suffix}
              style={{ fontSize: 44, fontWeight: 800, color: C.primary, letterSpacing: "-0.04em", fontVariantNumeric: "tabular-nums" }}>0</div>
            <div style={{ fontSize: 14.5, fontWeight: 800, color: C.gold, marginTop: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>{b.label}</div>
            <p style={{ fontSize: 13.5, color: C.text3, lineHeight: 1.6, marginTop: 10 }}>{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── testimonials ──────────────────────────────────────────── */
function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const quotes = [
    { q: "My daughter went from dreading verbal reasoning to asking for 'one more set'. She passed for her first-choice grammar school.", who: "Sarah M.", role: "Parent, Kent" },
    { q: "The proctored mocks were the difference. By the real exam, the format held zero fear for him.", who: "Ade O.", role: "Parent, Birmingham" },
    { q: "I use Ollie when I get stuck at night. It explains things better than my school teacher, honestly.", who: "Priya, 10", role: "Year 6 student" },
  ];
  return (
    <section ref={ref} style={sectionPad}>
      <SectionTitle kicker="Results" title="Families that flew with us" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: 18 }}>
        {quotes.map((t) => (
          <figure key={t.who} className="rv t3-card" style={{
            margin: 0, padding: 34, borderRadius: 24, position: "relative",
            background: `linear-gradient(170deg, ${C.surfaceHigh}, ${C.surface})`, border: `1px solid ${C.line}`,
            transition: "transform .45s cubic-bezier(.16,1,.3,1), border-color .3s",
          }}>
            <div style={{ color: C.gold, fontSize: 30, lineHeight: 1, marginBottom: 18, fontWeight: 800 }}>"</div>
            <blockquote style={{ margin: 0, fontSize: 15.5, lineHeight: 1.75, color: C.text2 }}>{t.q}</blockquote>
            <figcaption style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{
                width: 40, height: 40, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(149,211,186,0.12)", border: `1px solid ${C.line}`, color: C.primary, fontWeight: 800, fontSize: 15,
              }}>{t.who[0]}</span>
              <span>
                <span style={{ display: "block", fontWeight: 800, color: C.text, fontSize: 14 }}>{t.who}</span>
                <span style={{ display: "block", color: C.text3, fontSize: 12.5 }}>{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ── pricing (single free plan) ────────────────────────────── */
function Pricing() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const router = useRouter();
  const perks = [
    "Infinite AI question generation",
    "Unlimited proctored mock exams",
    "24/7 priority AI tutor access",
    "Full parent dashboard",
    "Mobile app included",
    "Everything — no paywalls, ever",
  ];
  return (
    <section ref={ref} style={sectionPad} id="pricing">
      <SectionTitle kicker="Pricing" title="Free. Forever. For everyone."
        sub="We believe a child's future shouldn't depend on what their parents can spend. Every feature, every question, every mock — £0." />
      <div className="rv glow-card glow-card--gold" style={{
        maxWidth: 560, margin: "0 auto", borderRadius: 32, padding: "52px 48px", textAlign: "center",
        background: `linear-gradient(165deg, ${C.surfaceHigh}, ${C.bgDeep})`,
      }}>
        <p style={{ color: C.gold, fontSize: 12.5, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", margin: 0 }}>The Only Plan</p>
        <div style={{ margin: "22px 0 6px", display: "flex", alignItems: "baseline", justifyContent: "center", gap: 8 }}>
          <span style={{ fontSize: 88, fontWeight: 800, letterSpacing: "-0.05em", background: `linear-gradient(120deg, ${C.primary}, ${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>£0</span>
          <span style={{ color: C.text3, fontSize: 18, fontWeight: 700 }}>/ forever</span>
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: "34px 0 38px", display: "grid", gap: 14, textAlign: "left" }}>
          {perks.map((p) => (
            <li key={p} style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 15, color: C.text2, fontWeight: 600 }}>
              <span style={{
                width: 26, height: 26, borderRadius: 999, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(149,211,186,0.14)", color: C.primary, fontSize: 13, fontWeight: 800, border: `1px solid ${C.line}`,
              }}>✓</span>
              {p}
            </li>
          ))}
        </ul>
        <Magnetic>
          <button onClick={() => router.push("/auth/signup")} style={{ ...btnPrimary, width: "100%", padding: "18px 36px", fontSize: 16 }}>
            Claim Your Free Account
          </button>
        </Magnetic>
        <p style={{ color: C.text3, fontSize: 12.5, marginTop: 18 }}>No card. No trial clock. No catch.</p>
      </div>
    </section>
  );
}

/* ── FAQ ───────────────────────────────────────────────────── */
function FAQ() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [
    ["Is it really completely free?", "Yes. Every feature — infinite questions, proctored mocks, the AI tutor, the parent dashboard — is free forever. No premium tier exists."],
    ["Which 11+ exam boards do you cover?", "Both GL Assessment and CEM styles across English, Maths, Verbal Reasoning and Non-Verbal Reasoning — 26 topics in total."],
    ["How do the AI-generated questions work?", "Our engine creates brand-new questions matched to your child's current level, so they never see a recycled paper and difficulty adapts as they improve."],
    ["Can parents track progress?", "Yes — the parent dashboard shows accuracy by topic, streaks, mock percentiles and where to focus next, updated in real time."],
    ["What ages is T3 suitable for?", "The 11+ hub targets Years 4–6; GCSE content covers Years 10–11. The IQ test works for any age from 8 up."],
  ];
  return (
    <section ref={ref} style={{ ...sectionPad, maxWidth: 860 }}>
      <SectionTitle kicker="FAQ" title="Questions, answered" />
      <div style={{ display: "grid", gap: 12 }}>
        {faqs.map(([q, a], i) => {
          const isOpen = open === i;
          return (
            <div key={q} className="rv" style={{
              borderRadius: 18, border: `1px solid ${isOpen ? C.goldLine : C.line}`,
              background: isOpen ? "rgba(233,195,73,0.04)" : `linear-gradient(170deg, ${C.surfaceHigh}, ${C.surface})`,
              overflow: "hidden", transition: "border-color .3s, background .3s",
            }}>
              <button onClick={() => setOpen(isOpen ? null : i)} style={{
                width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "22px 26px", background: "transparent", border: "none", cursor: "pointer",
                color: C.text, fontSize: 16, fontWeight: 700, fontFamily: font, textAlign: "left", gap: 16,
              }}>
                {q}
                <span style={{
                  color: C.gold, fontSize: 20, fontWeight: 400, flexShrink: 0,
                  transform: isOpen ? "rotate(45deg)" : "none", transition: "transform .35s cubic-bezier(.16,1,.3,1)",
                }}>+</span>
              </button>
              <div style={{
                maxHeight: isOpen ? 220 : 0, opacity: isOpen ? 1 : 0, overflow: "hidden",
                transition: "max-height .45s cubic-bezier(.16,1,.3,1), opacity .35s",
              }}>
                <p style={{ padding: "0 26px 24px", margin: 0, color: C.text2, fontSize: 14.5, lineHeight: 1.75 }}>{a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ── final CTA ─────────────────────────────────────────────── */
function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const router = useRouter();
  return (
    <section ref={ref} style={{ ...sectionPad, textAlign: "center", position: "relative" }}>
      <div aria-hidden style={{
        position: "absolute", inset: "10% 15%", borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(233,195,73,0.08), transparent 70%)", pointerEvents: "none",
      }} />
      <div className="rv">
        <div style={{ fontSize: 56, marginBottom: 18 }}>🦉</div>
        <h2 style={{ fontSize: "clamp(36px,4.5vw,64px)", fontWeight: 800, letterSpacing: "-0.04em", color: C.text, margin: "0 0 20px", lineHeight: 1.05 }}>
          Their place at the<br />
          <span style={{ background: `linear-gradient(110deg, ${C.primary}, ${C.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            school of their dreams
          </span> starts tonight.
        </h2>
        <p style={{ color: C.text2, fontSize: 17, maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.7 }}>
          Set up takes two minutes. The first practice set takes ten. The confidence lasts a lifetime.
        </p>
        <Magnetic>
          <button onClick={() => router.push("/auth/signup")} style={{ ...btnPrimary, padding: "20px 52px", fontSize: 18 }}>
            Start for Free →
          </button>
        </Magnetic>
      </div>
    </section>
  );
}

/* ── footer ────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.line}`, padding: "48px 6vw", fontFamily: font }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ fontSize: 20, fontWeight: 800, color: C.primary, letterSpacing: "-0.03em", textDecoration: "none" }}>
          T3 <em style={{ fontStyle: "normal", color: C.gold }}>Academy</em>
        </Link>
        <div style={{ display: "flex", gap: 26, flexWrap: "wrap" }}>
          {[["11 Plus", "/dashboard"], ["GCSE", "/auth/signup"], ["IQ Test", "/iq-test"], ["Log in", "/auth/login"]].map(([l, h]) => (
            <Link key={l} href={h} style={{ fontSize: 13, fontWeight: 600, color: C.text3, textDecoration: "none" }}>{l}</Link>
          ))}
        </div>
        <p style={{ color: C.text3, fontSize: 12, margin: 0 }}>© {new Date().getFullYear()} T3 Academy · Free for every child, forever.</p>
      </div>
    </footer>
  );
}

/* ── page ──────────────────────────────────────────────────── */
export default function LandingPage() {
  useEffect(() => {
    // refresh triggers once the owl canvas settles layout
    const t = setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <main style={{ background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bgDeep} 100%)`, minHeight: "100vh", color: C.text, overflowX: "hidden" }}>
      <Nav />
      <Hero />
      <Marquee />
      <Products />
      <Comparison />
      <Science />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
