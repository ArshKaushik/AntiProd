"use client";

import { useEffect, useRef, useState } from "react";
import type { AppNode, ChatMessage } from "@/lib/types";

type ChatPanelProps = {
  node: AppNode;
  messages: ChatMessage[];
  isLoading: boolean;
  onSend: (command: string) => void;
  onClose: () => void;
};

/**
 * Right-side panel that opens when a screen is selected. The user types
 * commands here and the AI agent edits that screen's design in real time.
 */
export function ChatPanel({
  node,
  messages,
  isLoading,
  onSend,
  onClose,
}: ChatPanelProps) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Keep the conversation scrolled to the latest message.
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  function submit() {
    const command = input.trim();
    if (!command || isLoading) return;
    onSend(command);
    setInput("");
  }

  return (
    <aside className="absolute right-0 top-0 z-20 flex h-full w-80 flex-col border-l border-zinc-200 bg-white shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3">
        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-zinc-400">
            Designing
          </div>
          <div className="text-sm font-semibold text-zinc-900">
            {node.data.label}
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
          aria-label="Close chat"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <div className="rounded-lg bg-zinc-50 p-3 text-xs leading-relaxed text-zinc-500">
            Tell the AI what this screen should look like. Try:
            <ul className="mt-2 space-y-1">
              <li>• &ldquo;Make this a login screen&rdquo;</li>
              <li>• &ldquo;Add an email and password field&rdquo;</li>
              <li>• &ldquo;Add a primary &lsquo;Sign in&rsquo; button&rdquo;</li>
            </ul>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
          >
            <div
              className={
                m.role === "user"
                  ? "max-w-[85%] rounded-2xl rounded-br-sm bg-blue-600 px-3 py-2 text-xs text-white"
                  : "max-w-[85%] rounded-2xl rounded-bl-sm bg-zinc-100 px-3 py-2 text-xs text-zinc-800"
              }
            >
              {m.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-zinc-100 px-3 py-2.5">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400" />
            </div>
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="border-t border-zinc-100 p-3">
        <div className="flex items-end gap-2 rounded-xl border border-zinc-200 bg-white p-2 focus-within:border-blue-400">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            placeholder="Describe a change…"
            rows={1}
            className="max-h-32 flex-1 resize-none bg-transparent text-xs text-zinc-800 outline-none placeholder:text-zinc-400"
          />
          <button
            onClick={submit}
            disabled={!input.trim() || isLoading}
            className="rounded-lg bg-blue-600 p-1.5 text-white transition-colors hover:bg-blue-700 disabled:opacity-40"
            aria-label="Send"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}
