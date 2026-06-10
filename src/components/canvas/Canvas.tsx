"use client";

import { useCallback, useMemo, useRef } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  type Connection,
  type NodeTypes,
  type OnConnect,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { ScreenNode } from "./ScreenNode";
import { Toolbar } from "./Toolbar";
import type { AppNode, AppEdge } from "@/lib/types";

const initialNodes: AppNode[] = [
  {
    id: "screen-1",
    type: "screen",
    position: { x: 0, y: 0 },
    data: { label: "Home", description: "Landing screen of the app." },
  },
  {
    id: "screen-2",
    type: "screen",
    position: { x: 360, y: 120 },
    data: { label: "Login", description: "Email + password sign in." },
  },
];

const initialEdges: AppEdge[] = [
  { id: "e1-2", source: "screen-1", target: "screen-2", animated: true },
];

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<AppEdge>(initialEdges);
  const idCounter = useRef(initialNodes.length);
  const { screenToFlowPosition } = useReactFlow();

  const nodeTypes = useMemo<NodeTypes>(() => ({ screen: ScreenNode }), []);

  const onConnect = useCallback<OnConnect>(
    (connection: Connection) =>
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds)),
    [setEdges],
  );

  const addScreen = useCallback(() => {
    idCounter.current += 1;
    const id = `screen-${idCounter.current}`;

    // Drop the new screen near the centre of the current viewport.
    const position = screenToFlowPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    const newNode: AppNode = {
      id,
      type: "screen",
      position,
      data: { label: `Screen ${idCounter.current}` },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [screenToFlowPosition, setNodes]);

  return (
    <div className="relative h-full w-full">
      <Toolbar onAddScreen={addScreen} />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.1}
        maxZoom={4}
        proOptions={{ hideAttribution: true }}
        className="bg-zinc-50"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#d4d4d8"
        />
        <Controls />
        <MiniMap pannable zoomable className="!bg-white" />
      </ReactFlow>
    </div>
  );
}

/** Public entry point — wraps the flow in its provider so hooks work. */
export function Canvas() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
