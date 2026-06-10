import type { Node, Edge } from "@xyflow/react";

/**
 * Data carried by a "screen" node — one screen of the app being designed.
 */
export type ScreenNodeData = {
  /** Display name of the screen, e.g. "Login" or "Dashboard". */
  label: string;
  /** Optional short description of what the screen does. */
  description?: string;
};

/** A node on the canvas representing a single screen of the app. */
export type ScreenNode = Node<ScreenNodeData, "screen">;

/** Any node type the canvas understands. Extend this union as we add more. */
export type AppNode = ScreenNode;

/** An edge represents a connection/transition between two screens. */
export type AppEdge = Edge;
