import type { Node, Edge } from "@xyflow/react";

/** The kinds of UI elements an AI-designed screen can contain. */
export type ScreenElementType =
  | "heading"
  | "subheading"
  | "text"
  | "button"
  | "input"
  | "image"
  | "divider"
  | "badge";

/**
 * A single UI element rendered inside a screen node. The AI agent produces and
 * edits a list of these in response to chat commands.
 */
export type ScreenElement = {
  /** Stable id, assigned server-side. */
  id: string;
  type: ScreenElementType;
  /** Visible text / label / placeholder. Unused for divider and image. */
  text?: string;
  /** For buttons: filled (primary) or outline (secondary). */
  variant?: "primary" | "secondary";
};

/**
 * Data carried by a "screen" node — one screen of the app being designed.
 */
export type ScreenNodeData = {
  /** Display name of the screen, e.g. "Login" or "Dashboard". */
  label: string;
  /** Optional short description of what the screen does. */
  description?: string;
  /** The screen's design, edited in real time by the AI agent. */
  elements?: ScreenElement[];
};

/** A node on the canvas representing a single screen of the app. */
export type ScreenNode = Node<ScreenNodeData, "screen">;

/** Any node type the canvas understands. Extend this union as we add more. */
export type AppNode = ScreenNode;

/** An edge represents a connection/transition between two screens. */
export type AppEdge = Edge;

/** A single message in a screen's chat conversation with the AI agent. */
export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

/**
 * Configurable model layer. AntiProd never hardcodes a provider or key — the
 * customer points it at their own private endpoint. Stored locally only; no
 * data leaves the deployment.
 */
export type ModelSettings = {
  provider: "azure" | "bedrock" | "anthropic" | "self-hosted";
  endpoint: string;
  model: string;
};

/** Request body for the /api/design endpoint. */
export type DesignRequest = {
  screenName: string;
  command: string;
  elements: ScreenElement[];
  history: ChatMessage[];
};

/** Response body from the /api/design endpoint. */
export type DesignResponse = {
  reply: string;
  /** The full updated element list, or null if the agent only chatted. */
  elements: ScreenElement[] | null;
  /** Suggested screen name, when the prompt implies one. */
  screenName?: string;
};
