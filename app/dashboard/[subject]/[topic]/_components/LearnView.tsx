"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_PROMPTS = [
  { icon: "📘", label: "Example",  text: "Can you give me a worked example?" },
  { icon: "🧠", label: "Strategy", text: "What is the best strategy for this topic?" },
  { icon: "⚠️", label: "Traps",    text: "What mistakes do students commonly make?" },
  { icon: "✏️", label: "Try one",  text: "Give me a practice question on this" },
];

interface Props {
  subjectLabel: string;
  topicLabel: string;
  subjectColor: string;
  topicHref: string;
}

export default function LearnView({ subjectLabel, topicLabel, subjectColor, topicHref }: Props) {
  const context = `Subject: ${subjectLabel}. Topic: ${topicLabel}.`;
  const welcome: Message = {
    role: "assistant",
    content: `Hey! 👋 Ready to work on ${topicLabel}? What do you already know about it — or shall I kick things off?`,
  };

  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(text: string) {
    if (!text.trim() || streaming) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setStreaming(true);
    setMessages([...history, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tutor: "ollie",
          // Strip the hardcoded welcome so the model doesn't inherit its old style
          messages: history
            .filter((m) => m.content !== welcome.content)
            .map(({ role, content }) => ({ role, content })),
          context,
        }),
      });
      if (!res.ok || !res.body) throw new Error();
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: acc }]);
      }
    } catch {
      setMessages([...history, { role: "assistant", content: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setStreaming(false);
    }
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Chat column */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <span className="text-xl mt-0.5 flex-shrink-0">🦉</span>
              )}
              <div
                className="max-w-[680px] rounded-2xl px-4 py-3 text-sm leading-relaxed"
                style={
                  msg.role === "user"
                    ? { background: "var(--color-text)", color: "#fff", borderBottomRightRadius: 4 }
                    : { background: "var(--color-card)", color: "var(--color-text)", border: "1px solid var(--color-border)", borderBottomLeftRadius: 4 }
                }
              >
                {msg.content === "" && streaming ? (
                  <span className="flex gap-1 items-center py-0.5">
                    {[0,1,2].map(d => (
                      <span key={d} className="w-1.5 h-1.5 rounded-full inline-block"
                        style={{ background: "var(--color-text3)", animation: `bounce 1.2s ease-in-out ${d*0.2}s infinite` }} />
                    ))}
                  </span>
                ) : (
                  <span style={{ whiteSpace: "pre-wrap" }}>{msg.content}</span>
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Quick prompts */}
        <div className="flex gap-2 px-6 py-2 overflow-x-auto" style={{ borderTop: "1px solid var(--color-border)" }}>
          {QUICK_PROMPTS.map(({ icon, label, text }) => (
            <button key={label} onClick={() => send(text)} disabled={streaming}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg whitespace-nowrap flex-shrink-0 disabled:opacity-40 transition-colors"
              style={{ background: "var(--color-bg3)", border: "1px solid var(--color-border)", color: "var(--color-text2)", cursor: "pointer" }}>
              {icon} {label}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-end gap-3 px-6 py-4" style={{ borderTop: "1px solid var(--color-border)" }}>
          <textarea rows={1} value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
            disabled={streaming}
            placeholder={`Ask Ollie about ${topicLabel}…`}
            className="flex-1 resize-none rounded-xl px-4 py-3 text-sm outline-none"
            style={{ background: "var(--color-bg)", border: "1px solid var(--color-border)", color: "var(--color-text)", maxHeight: 96, lineHeight: 1.5 }}
            onInput={e => { const t = e.currentTarget; t.style.height = "auto"; t.style.height = Math.min(t.scrollHeight, 96) + "px"; }} />
          <button onClick={() => send(input)} disabled={streaming || !input.trim()}
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 disabled:opacity-40 transition-colors"
            style={{ background: subjectColor, color: "#fff", border: "none", cursor: "pointer" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 13L13 7L1 1V5.5L9 7L1 8.5V13Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>

      {/* Side CTA (desktop) */}
      <div className="hidden lg:flex flex-col w-64 flex-shrink-0 p-6 gap-4"
        style={{ borderLeft: "1px solid var(--color-border)", background: "var(--color-bg)" }}>
        <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "var(--color-text3)" }}>
          Ready to test yourself?
        </div>
        <p className="text-sm" style={{ color: "var(--color-text2)" }}>
          Once you feel confident with {topicLabel}, move to Quiz mode to try real GL Assessment questions.
        </p>
        <Link href={topicHref}
          className="w-full text-center text-sm font-semibold py-2.5 rounded-xl no-underline transition-all"
          style={{ background: subjectColor, color: "#fff" }}>
          Start Quiz →
        </Link>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}
