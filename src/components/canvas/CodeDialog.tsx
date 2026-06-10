"use client";

import { useMemo, useState } from "react";
import { Copy, Check, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { generateReactCode } from "@/lib/codegen";
import type { AppNode } from "@/lib/types";

export function CodeDialog({
  node,
  open,
  onOpenChange,
}: {
  node: AppNode | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [copied, setCopied] = useState(false);

  const code = useMemo(
    () =>
      node ? generateReactCode(node.data.label, node.data.elements ?? []) : "",
    [node],
  );

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Couldn't copy — select and copy manually.");
    }
  }

  function download() {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const safe = (node?.data.label ?? "Screen").replace(/[^a-z0-9]/gi, "") || "Screen";
    a.href = url;
    a.download = `${safe}.tsx`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl">
        <DialogHeader className="flex-row items-start justify-between gap-4 space-y-0 border-b px-5 py-4">
          <div className="space-y-1">
            <DialogTitle className="flex items-center gap-2">
              Generated code
              <Badge variant="secondary" className="font-normal">
                React + Tailwind
              </Badge>
            </DialogTitle>
            <DialogDescription>
              Front-end code for <span className="font-medium text-foreground">{node?.data.label}</span>,
              compiled locally on demand.
            </DialogDescription>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button variant="outline" size="sm" onClick={download}>
              <Download className="size-3.5" /> .tsx
            </Button>
            <Button size="sm" onClick={copy}>
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </DialogHeader>

        <ScrollArea className="min-h-0 flex-1">
          <pre className="overflow-x-auto p-5 text-xs leading-relaxed">
            <code className="font-mono text-zinc-800">{code}</code>
          </pre>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
