"use client";

import { useEffect, useRef, useState } from "react";
import { Send, X, Copy, Code2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { AppNode, ChatMessage } from "@/lib/types";

type ChatPanelProps = {
  node: AppNode;
  messages: ChatMessage[];
  isLoading: boolean;
  onSend: (command: string) => void;
  onClose: () => void;
  onRename: (nodeId: string, name: string) => void;
  onFork: (nodeId: string) => void;
  onGenerateCode: (nodeId: string) => void;
};

const SUGGESTIONS = [
  "Make this a login screen",
  "Add an email and password field",
  "Add a primary 'Sign in' button",
];

/**
 * Right-side panel for the selected screen. Describe changes in natural
 * language; the local design agent rewrites the screen's elements in place.
 */
export function ChatPanel({
  node,
  messages,
  isLoading,
  onSend,
  onClose,
  onRename,
  onFork,
  onGenerateCode,
}: ChatPanelProps) {
  const [input, setInput] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState(node.data.label);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current?.querySelector(
      "[data-slot=scroll-area-viewport]",
    );
    el?.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  function submit(text?: string) {
    const command = (text ?? input).trim();
    if (!command || isLoading) return;
    onSend(command);
    setInput("");
  }

  function commitName() {
    const next = nameDraft.trim();
    if (next && next !== node.data.label) onRename(node.id, next);
    setEditingName(false);
  }

  return (
    <aside className="flex h-full w-80 shrink-0 flex-col border-l bg-background">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            Designing
          </div>
          {editingName ? (
            <Input
              autoFocus
              value={nameDraft}
              onChange={(e) => setNameDraft(e.target.value)}
              onBlur={commitName}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitName();
                if (e.key === "Escape") {
                  setNameDraft(node.data.label);
                  setEditingName(false);
                }
              }}
              className="h-7 text-sm font-semibold"
            />
          ) : (
            <button
              onClick={() => setEditingName(true)}
              className="group flex items-center gap-1.5 text-sm font-semibold"
            >
              <span className="truncate">{node.data.label}</span>
              <Pencil className="size-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          )}
        </div>
        <Button variant="ghost" size="icon" className="size-7" onClick={onClose}>
          <X className="size-4" />
        </Button>
      </div>

      {/* Quick actions */}
      <div className="flex gap-2 px-4 pb-3">
        <Button variant="outline" size="sm" className="flex-1" onClick={() => onFork(node.id)}>
          <Copy className="size-3.5" /> Fork
        </Button>
        <Button variant="outline" size="sm" className="flex-1" onClick={() => onGenerateCode(node.id)}>
          <Code2 className="size-3.5" /> Code
        </Button>
      </div>

      <Separator />

      {/* Messages */}
      <ScrollArea ref={scrollRef} className="flex-1">
        <div className="flex flex-col gap-3 p-4">
          {messages.length === 0 && (
            <div className="rounded-lg border bg-muted/40 p-3 text-xs leading-relaxed text-muted-foreground">
              Describe what this screen should look like. Try:
              <div className="mt-2 flex flex-col gap-1.5">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => submit(s)}
                    className="rounded-md bg-background px-2.5 py-1.5 text-left text-foreground shadow-sm ring-1 ring-border transition-colors hover:bg-accent"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={cn(
                "flex",
                m.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-3 py-2 text-xs",
                  m.role === "user"
                    ? "rounded-br-sm bg-primary text-primary-foreground"
                    : "rounded-bl-sm bg-muted text-foreground",
                )}
              >
                {m.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-muted px-3 py-2.5">
                <Dot delay="-0.3s" />
                <Dot delay="-0.15s" />
                <Dot delay="0s" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Composer */}
      <div className="p-3">
        <div className="flex items-end gap-2 rounded-xl border bg-background p-2 focus-within:ring-2 focus-within:ring-ring/40">
          <Textarea
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
            className="max-h-32 min-h-0 resize-none border-0 px-1 py-1 text-xs shadow-none focus-visible:ring-0 dark:bg-transparent"
          />
          <Button
            size="icon"
            className="size-7 shrink-0"
            disabled={!input.trim() || isLoading}
            onClick={() => submit()}
          >
            <Send className="size-3.5" />
          </Button>
        </div>
      </div>
    </aside>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="size-1.5 animate-bounce rounded-full bg-muted-foreground/60"
      style={{ animationDelay: delay }}
    />
  );
}
