"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { ScreenNode as ScreenNodeType } from "@/lib/types";

/**
 * A node that renders as a small "screen" mockup. Connection handles are
 * exposed on all four sides so screens can be wired together in any direction.
 */
function ScreenNodeComponent({ data, selected }: NodeProps<ScreenNodeType>) {
  return (
    <div
      className={`w-56 rounded-xl border bg-white shadow-sm transition-shadow ${
        selected
          ? "border-blue-500 shadow-md ring-2 ring-blue-200"
          : "border-zinc-200 hover:shadow-md"
      }`}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 rounded-t-xl border-b border-zinc-100 bg-zinc-50 px-3 py-2">
        <span className="flex gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </span>
        <span className="truncate text-sm font-semibold text-zinc-800">
          {data.label}
        </span>
      </div>

      {/* Screen body */}
      <div className="min-h-24 px-3 py-3 text-xs text-zinc-500">
        {data.description ?? "Empty screen. Double-click to edit."}
      </div>

      {/* Connection handles on all four sides */}
      <Handle
        type="target"
        position={Position.Left}
        className="!h-3 !w-3 !border-2 !border-white !bg-blue-500"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!h-3 !w-3 !border-2 !border-white !bg-blue-500"
      />
      <Handle
        id="top"
        type="source"
        position={Position.Top}
        className="!h-3 !w-3 !border-2 !border-white !bg-blue-500"
      />
      <Handle
        id="bottom"
        type="target"
        position={Position.Bottom}
        className="!h-3 !w-3 !border-2 !border-white !bg-blue-500"
      />
    </div>
  );
}

export const ScreenNode = memo(ScreenNodeComponent);
