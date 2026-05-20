"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_PROMPTS = [
  { icon: "💡", label: "Hint", text: "Give me a hint" },
  { icon: "🧠", label: "Strategy", text: "Explain the strategy for this type of question" },
  { icon: "⚠️", label: "Traps", text: "What are the common traps to avoid here?" },
  { icon: "📘", label: "Example", text: "Give me a similar example to practise" },
];

const WELCOME: Message = {
  role: "assistant",
  content: "Hey! 👋 I'm Ollie. What are you working on today?",
};

export default function OllieChat() {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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

    // Placeholder for streaming assistant reply
    setMessages([...history, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tutor: "ollie",
          // Skip the hardcoded welcome — only send real conversation turns to the API
          messages: history
            .filter((m) => m.content !== WELCOME.content)
            .map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!res.ok || !res.body) throw new Error("Request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: accumulated }]);
      }
    } catch {
      setMessages([
        ...history,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setStreaming(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  return (
    <div
      className="flex flex-col h-full"
      style={{ background: "var(--color-card)" }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
          style={{
            background: "var(--color-amber-bg)",
            border: "1px solid rgba(212,134,10,0.2)",
          }}
        >
          🦉
        </div>
        <div>
          <div className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>
            Ollie
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#22c55e" }}
            />
            <span className="text-xs" style={{ color: "var(--color-text3)" }}>
              Online · 11+ tutor
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <span className="text-base mr-2 mt-0.5 flex-shrink-0">🦉</span>
            )}
            <div
              className="max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed"
              style={
                msg.role === "user"
                  ? {
                      background: "var(--color-text)",
                      color: "#fff",
                      borderBottomRightRadius: "4px",
                    }
                  : {
                      background: "var(--color-bg3)",
                      color: "var(--color-text)",
                      borderBottomLeftRadius: "4px",
                      border: "1px solid var(--color-border)",
                    }
              }
            >
              {msg.content === "" && streaming ? (
                <span className="flex items-center gap-1 py-0.5">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="w-1.5 h-1.5 rounded-full inline-block"
                      style={{
                        background: "var(--color-text3)",
                        animation: `bounce 1.2s ease-in-out ${d * 0.2}s infinite`,
                      }}
                    />
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
      <div
        className="flex gap-1.5 px-4 py-2 overflow-x-auto flex-shrink-0"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        {QUICK_PROMPTS.map(({ icon, label, text }) => (
          <button
            key={label}
            onClick={() => send(text)}
            disabled={streaming}
            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors flex-shrink-0 disabled:opacity-40"
            style={{
              background: "var(--color-bg3)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text2)",
              cursor: "pointer",
            }}
          >
            {icon} {label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div
        className="flex items-end gap-2 px-4 py-3 flex-shrink-0"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <textarea
          ref={inputRef}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={streaming}
          placeholder="Ask Ollie anything…"
          className="flex-1 resize-none rounded-xl px-3.5 py-2.5 text-sm outline-none transition-colors"
          style={{
            background: "var(--color-bg)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text)",
            maxHeight: "96px",
            lineHeight: "1.5",
          }}
          onInput={(e) => {
            const t = e.currentTarget;
            t.style.height = "auto";
            t.style.height = Math.min(t.scrollHeight, 96) + "px";
          }}
        />
        <button
          onClick={() => send(input)}
          disabled={streaming || !input.trim()}
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors disabled:opacity-40"
          style={{
            background: "var(--color-amber)",
            color: "#fff",
            cursor: "pointer",
            border: "none",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 13L13 7L1 1V5.5L9 7L1 8.5V13Z" fill="currentColor" />
          </svg>
        </button>
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
