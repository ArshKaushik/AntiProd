"use client";

import { memo } from "react";
import { Handle, Position, NodeToolbar, type NodeProps } from "@xyflow/react";
import { Copy, Code2, MessageSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useCanvasActions } from "./canvas-context";
import type {
  ScreenNode as ScreenNodeType,
  ScreenElement,
} from "@/lib/types";

/** Renders a single design element inside the screen preview. */
function ElementPreview({ element }: { element: ScreenElement }) {
  switch (element.type) {
    case "heading":
      return <div className="text-sm font-bold text-zinc-900">{element.text}</div>;
    case "subheading":
      return (
        <div className="text-xs font-semibold text-zinc-700">{element.text}</div>
      );
    case "text":
      return (
        <div className="text-[11px] leading-snug text-zinc-500">{element.text}</div>
      );
    case "button":
      return (
        <div
          className={
            element.variant === "secondary"
              ? "rounded-md border border-blue-500 px-3 py-1.5 text-center text-[11px] font-medium text-blue-600"
              : "rounded-md bg-blue-600 px-3 py-1.5 text-center text-[11px] font-medium text-white"
          }
        >
          {element.text ?? "Button"}
        </div>
      );
    case "input":
      return (
        <div className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-[11px] text-zinc-400">
          {element.text ?? "Input"}
        </div>
      );
    case "image":
      return (
        <div className="flex h-16 items-center justify-center rounded-md bg-zinc-100 text-[10px] text-zinc-400">
          {element.text ?? "Image"}
        </div>
      );
    case "divider":
      return <div className="my-1 h-px bg-zinc-200" />;
    case "badge":
      return (
        <div className="inline-block w-fit rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700">
          {element.text ?? "Badge"}
        </div>
      );
    default:
      return null;
  }
}

const handleClass =
  "!h-3 !w-3 !border-2 !border-white !bg-blue-500 transition-transform hover:!scale-125";

function ScreenNodeComponent({ id, data, selected }: NodeProps<ScreenNodeType>) {
  const actions = useCanvasActions();
  const elements = data.elements ?? [];

  return (
    <>
      {/* Floating action toolbar — shown when the node is selected */}
      <NodeToolbar isVisible={selected} position={Position.Top} offset={8}>
        <div className="flex items-center gap-0.5 rounded-lg border border-zinc-200 bg-white p-1 shadow-md">
          <NodeAction
            label="Edit with AI"
            icon={<MessageSquare className="size-3.5" />}
            onClick={() => actions.openChat(id)}
          />
          <NodeAction
            label="Fork variant"
            icon={<Copy className="size-3.5" />}
            onClick={() => actions.fork(id)}
          />
          <NodeAction
            label="Generate code"
            icon={<Code2 className="size-3.5" />}
            onClick={() => actions.generateCode(id)}
          />
          <NodeAction
            label="Delete"
            icon={<Trash2 className="size-3.5" />}
            destructive
            onClick={() => actions.remove(id)}
          />
        </div>
      </NodeToolbar>

      <div
        className={`w-60 overflow-hidden rounded-xl border bg-white shadow-sm transition-shadow ${
          selected
            ? "border-blue-500 shadow-md ring-2 ring-blue-200"
            : "border-zinc-200 hover:shadow-md"
        }`}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-zinc-100 bg-zinc-50 px-3 py-2">
          <span className="flex gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          </span>
          <span className="truncate text-sm font-semibold text-zinc-800">
            {data.label}
          </span>
        </div>

        {/* Live design preview */}
        <div className="flex min-h-28 flex-col gap-2 px-3 py-3">
          {elements.length > 0 ? (
            elements.map((el) => <ElementPreview key={el.id} element={el} />)
          ) : (
            <div className="flex flex-1 items-center justify-center py-4 text-center text-[11px] text-zinc-400">
              Select this screen and describe it to the AI.
            </div>
          )}
        </div>
      </div>

      <Handle type="target" position={Position.Left} className={handleClass} />
      <Handle type="source" position={Position.Right} className={handleClass} />
      <Handle id="top" type="source" position={Position.Top} className={handleClass} />
      <Handle id="bottom" type="target" position={Position.Bottom} className={handleClass} />
    </>
  );
}

function NodeAction({
  label,
  icon,
  onClick,
  destructive,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  destructive?: boolean;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className={`size-7 ${destructive ? "text-red-500 hover:bg-red-50 hover:text-red-600" : "text-zinc-600"}`}
            onClick={onClick}
          >
            {icon}
          </Button>
        }
      />
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

export const ScreenNode = memo(ScreenNodeComponent);
