"use client";

import { useState } from "react";
import { Plus, Sparkles, Server, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ModelSettings } from "@/lib/types";

export function TopBar({
  onGenerate,
  onAddBlank,
  settings,
  onOpenSettings,
}: {
  onGenerate: (prompt: string) => void;
  onAddBlank: () => void;
  settings: ModelSettings;
  onOpenSettings: () => void;
}) {
  const [prompt, setPrompt] = useState("");

  function submit() {
    const p = prompt.trim();
    if (!p) return;
    onGenerate(p);
    setPrompt("");
  }

  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b bg-background px-4">
      {/* Brand */}
      <div className="flex items-center gap-2">
        <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Sparkles className="size-4" />
        </div>
        <div className="leading-none">
          <div className="text-sm font-bold tracking-tight">AntiProd</div>
          <div className="hidden text-[10px] text-muted-foreground sm:block">
            the design-engineer canvas
          </div>
        </div>
      </div>

      {/* Generate-a-screen prompt */}
      <div className="mx-auto flex w-full max-w-xl items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-lg border bg-background px-3 focus-within:ring-2 focus-within:ring-ring/40">
          <Sparkles className="size-3.5 shrink-0 text-muted-foreground" />
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Generate a screen…  e.g. “a login screen with SSO”"
            className="h-9 border-0 px-0 shadow-none focus-visible:ring-0 dark:bg-transparent"
          />
        </div>
        <Button onClick={submit} disabled={!prompt.trim()} className="gap-1.5">
          <Sparkles className="size-3.5" /> Generate
        </Button>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button variant="outline" size="icon" onClick={onAddBlank}>
                <Plus className="size-4" />
              </Button>
            }
          />
          <TooltipContent>Add a blank screen</TooltipContent>
        </Tooltip>
      </div>

      {/* Right: zero-egress posture + model endpoint */}
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger
            render={
              <Badge variant="outline" className="hidden gap-1 border-emerald-200 bg-emerald-50 text-emerald-700 lg:flex">
                <Lock className="size-3" /> Zero egress
              </Badge>
            }
          />
          <TooltipContent>
            Runs entirely in your network. No outbound calls except your model endpoint.
          </TooltipContent>
        </Tooltip>
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenSettings}
          className="gap-1.5 font-normal"
        >
          <Server className="size-3.5 text-muted-foreground" />
          <span className="max-w-32 truncate">{settings.model}</span>
        </Button>
      </div>
    </header>
  );
}
