"use client";

import { createContext, useContext } from "react";

/** Actions a node can trigger on the canvas, keyed by the node's id. */
export type CanvasActions = {
  fork: (nodeId: string) => void;
  remove: (nodeId: string) => void;
  generateCode: (nodeId: string) => void;
  openChat: (nodeId: string) => void;
};

const CanvasActionsContext = createContext<CanvasActions | null>(null);

export const CanvasActionsProvider = CanvasActionsContext.Provider;

export function useCanvasActions(): CanvasActions {
  const ctx = useContext(CanvasActionsContext);
  if (!ctx) {
    throw new Error("useCanvasActions must be used within CanvasActionsProvider");
  }
  return ctx;
}
