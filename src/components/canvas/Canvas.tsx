"use client";

import { useCallback, useMemo, useRef, useState } from "react";
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
  type NodeMouseHandler,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { ScreenNode } from "./ScreenNode";
import { Toolbar } from "./Toolbar";
import { ChatPanel } from "./ChatPanel";
import type {
  AppNode,
  AppEdge,
  ChatMessage,
  DesignResponse,
} from "@/lib/types";

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
    position: { x: 380, y: 120 },
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

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [chatsByNode, setChatsByNode] = useState<Record<string, ChatMessage[]>>(
    {},
  );
  const [loadingNodeId, setLoadingNodeId] = useState<string | null>(null);

  const nodeTypes = useMemo<NodeTypes>(() => ({ screen: ScreenNode }), []);

  // Derive the selected node live so the panel reflects design updates.
  const selectedNode = useMemo(
    () => nodes.find((n) => n.id === selectedNodeId) ?? null,
    [nodes, selectedNodeId],
  );

  const onConnect = useCallback<OnConnect>(
    (connection: Connection) =>
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback<NodeMouseHandler>((_, node) => {
    setSelectedNodeId(node.id);
  }, []);

  const addScreen = useCallback(() => {
    idCounter.current += 1;
    const id = `screen-${idCounter.current}`;
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
    setSelectedNodeId(id);
  }, [screenToFlowPosition, setNodes]);

  // Send a command to the AI design agent and apply the result to the node.
  const handleSend = useCallback(
    async (command: string) => {
      const node = nodes.find((n) => n.id === selectedNodeId);
      if (!node) return;
      const nodeId = node.id;

      const history = chatsByNode[nodeId] ?? [];
      setChatsByNode((prev) => ({
        ...prev,
        [nodeId]: [...history, { role: "user", content: command }],
      }));
      setLoadingNodeId(nodeId);

      try {
        const res = await fetch("/api/design", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            screenName: node.data.label,
            command,
            elements: node.data.elements ?? [],
            history,
          }),
        });
        const data = (await res.json()) as DesignResponse;

        // Apply the design change to the node — this re-renders the preview.
        if (data.elements) {
          setNodes((nds) =>
            nds.map((n) =>
              n.id === nodeId
                ? { ...n, data: { ...n.data, elements: data.elements! } }
                : n,
            ),
          );
        }

        setChatsByNode((prev) => ({
          ...prev,
          [nodeId]: [
            ...(prev[nodeId] ?? []),
            { role: "assistant", content: data.reply },
          ],
        }));
      } catch {
        setChatsByNode((prev) => ({
          ...prev,
          [nodeId]: [
            ...(prev[nodeId] ?? []),
            {
              role: "assistant",
              content: "Sorry — I couldn't reach the design agent.",
            },
          ],
        }));
      } finally {
        setLoadingNodeId((curr) => (curr === nodeId ? null : curr));
      }
    },
    [nodes, selectedNodeId, chatsByNode, setNodes],
  );

  return (
    <div className="relative h-full w-full">
      <Toolbar onAddScreen={addScreen} />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
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

      {selectedNode && (
        <ChatPanel
          node={selectedNode}
          messages={chatsByNode[selectedNode.id] ?? []}
          isLoading={loadingNodeId === selectedNode.id}
          onSend={handleSend}
          onClose={() => setSelectedNodeId(null)}
        />
      )}
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
