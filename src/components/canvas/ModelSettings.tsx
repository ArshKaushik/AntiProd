"use client";

import { useEffect, useState, useCallback } from "react";
import { ShieldCheck } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import type { ModelSettings } from "@/lib/types";

const STORAGE_KEY = "antiprod.modelSettings";

const DEFAULT_SETTINGS: ModelSettings = {
  provider: "self-hosted",
  endpoint: "http://localhost:8000/v1",
  model: "your-private-model",
};

const PROVIDERS: { value: ModelSettings["provider"]; label: string }[] = [
  { value: "self-hosted", label: "Self-hosted" },
  { value: "azure", label: "Azure OpenAI" },
  { value: "bedrock", label: "AWS Bedrock" },
  { value: "anthropic", label: "Anthropic" },
];

/** Reads/persists model settings from localStorage (no network). */
export function useModelSettings() {
  const [settings, setSettings] = useState<ModelSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // Sync from the external store (localStorage) on mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(raw) });
    } catch {
      /* ignore malformed storage */
    }
  }, []);

  const save = useCallback((next: ModelSettings) => {
    setSettings(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
  }, []);

  return { settings, save };
}

export function ModelSettingsSheet({
  open,
  onOpenChange,
  settings,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: ModelSettings;
  onSave: (next: ModelSettings) => void;
}) {
  const [draft, setDraft] = useState<ModelSettings>(settings);

  // Re-sync the editable draft from saved settings whenever the sheet opens.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (open) setDraft(settings);
  }, [open, settings]);

  function handleSave() {
    onSave(draft);
    onOpenChange(false);
    toast.success("Model endpoint saved", {
      description: "Stored locally in this deployment. Nothing was sent anywhere.",
    });
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full gap-0 sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Model endpoint</SheetTitle>
          <SheetDescription>
            Point AntiProd at your own inference endpoint. Configuration is stored
            locally in this deployment.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-5 px-4 py-2">
          <div className="flex flex-col gap-2">
            <Label>Provider</Label>
            <div className="grid grid-cols-2 gap-2">
              {PROVIDERS.map((p) => (
                <Button
                  key={p.value}
                  type="button"
                  variant={draft.provider === p.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDraft((d) => ({ ...d, provider: p.value }))}
                >
                  {p.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="endpoint">Endpoint URL</Label>
            <Input
              id="endpoint"
              value={draft.endpoint}
              onChange={(e) => setDraft((d) => ({ ...d, endpoint: e.target.value }))}
              placeholder="https://your-endpoint.internal/v1"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="model">Model name</Label>
            <Input
              id="model"
              value={draft.model}
              onChange={(e) => setDraft((d) => ({ ...d, model: e.target.value }))}
              placeholder="llama-3.1-70b-instruct"
            />
          </div>

          <Separator />

          <div className="flex items-start gap-2.5 rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-600" />
            <p>
              AntiProd makes no outbound calls except to this endpoint. No
              telemetry, no analytics, no data retention beyond your deployment.
              <span className="mt-1 block font-medium text-foreground">
                Note: generation currently runs on a local mock — wiring this
                endpoint to live inference is the next milestone.
              </span>
            </p>
          </div>
        </div>

        <SheetFooter>
          <Button onClick={handleSave}>Save endpoint</Button>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
