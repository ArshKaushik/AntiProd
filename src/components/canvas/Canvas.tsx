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
import { toast } from "sonner";

import "@xyflow/react/dist/style.css";

import { ScreenNode } from "./ScreenNode";
import { TopBar } from "./TopBar";
import { ChatPanel } from "./ChatPanel";
import { CodeDialog } from "./CodeDialog";
import { ModelSettingsSheet, useModelSettings } from "./ModelSettings";
import { CanvasActionsProvider, type CanvasActions } from "./canvas-context";
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
    data: {
      label: "Home",
      elements: [
        { id: "h1", type: "badge", text: "Self-hosted" },
        { id: "h2", type: "heading", text: "Design inside your firewall" },
        { id: "h3", type: "text", text: "Generate, fork, and ship — on your own model." },
        { id: "h4", type: "button", text: "Start building", variant: "primary" },
      ],
    },
  },
  {
    id: "screen-2",
    type: "screen",
    position: { x: 400, y: 60 },
    data: { label: "Login" },
  },
];

const initialEdges: AppEdge[] = [
  { id: "e1-2", source: "screen-1", target: "screen-2", animated: true },
];

const nodeTypes: NodeTypes = { screen: ScreenNode };

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<AppEdge>(initialEdges);
  const idCounter = useRef(initialNodes.length);
  const { screenToFlowPosition } = useReactFlow();

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [chatsByNode, setChatsByNode] = useState<Record<string, ChatMessage[]>>({});
  const [loadingNodeId, setLoadingNodeId] = useState<string | null>(null);
  const [codeNodeId, setCodeNodeId] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const { settings, save: saveSettings } = useModelSettings();

  const selectedNode = useMemo(
    () => nodes.find((n) => n.id === selectedNodeId) ?? null,
    [nodes, selectedNodeId],
  );
  const codeNode = useMemo(
    () => nodes.find((n) => n.id === codeNodeId) ?? null,
    [nodes, codeNodeId],
  );

  const onConnect = useCallback<OnConnect>(
    (connection: Connection) =>
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback<NodeMouseHandler>((_, node) => {
    setSelectedNodeId(node.id);
  }, []);

  // Centre of the current viewport, in flow coordinates.
  const viewportCenter = useCallback(
    () =>
      screenToFlowPosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      }),
    [screenToFlowPosition],
  );

  const nextId = useCallback(() => {
    idCounter.current += 1;
    return `screen-${idCounter.current}`;
  }, []);

  // --- Design generation (local, via the /api/design seam) ----------------

  const runDesign = useCallback(
    async (nodeId: string, command: string) => {
      const node = nodes.find((n) => n.id === nodeId);
      if (!node) return;

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

        setNodes((nds) =>
          nds.map((n) => {
            if (n.id !== nodeId) return n;
            return {
              ...n,
              data: {
                ...n.data,
                ...(data.elements ? { elements: data.elements } : {}),
                // Only adopt a suggested name if the user hasn't named it.
                label:
                  data.screenName && /^Screen \d+$/.test(n.data.label)
                    ? data.screenName
                    : n.data.label,
              },
            };
          }),
        );

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
            { role: "assistant", content: "Sorry — the design agent is unreachable." },
          ],
        }));
      } finally {
        setLoadingNodeId((curr) => (curr === nodeId ? null : curr));
      }
    },
    [nodes, chatsByNode, setNodes],
  );

  // --- Node-level actions --------------------------------------------------

  const addBlank = useCallback(() => {
    const id = nextId();
    setNodes((nds) => [
      ...nds,
      {
        id,
        type: "screen",
        position: viewportCenter(),
        data: { label: `Screen ${idCounter.current}` },
      },
    ]);
    setSelectedNodeId(id);
  }, [nextId, viewportCenter, setNodes]);

  const generateScreen = useCallback(
    (prompt: string) => {
      const id = nextId();
      setNodes((nds) => [
        ...nds,
        {
          id,
          type: "screen",
          position: viewportCenter(),
          data: { label: `Screen ${idCounter.current}` },
        },
      ]);
      setSelectedNodeId(id);
      void runDesign(id, prompt);
    },
    [nextId, viewportCenter, setNodes, runDesign],
  );

  const fork = useCallback(
    (nodeId: string) => {
      const source = nodes.find((n) => n.id === nodeId);
      if (!source) return;
      const id = nextId();
      const variantName = source.data.label.replace(/ \(variant.*\)$/, "");
      setNodes((nds) => [
        ...nds,
        {
          id,
          type: "screen",
          position: { x: source.position.x + 300, y: source.position.y + 40 },
          data: {
            label: `${variantName} (variant ${idCounter.current})`,
            elements: source.data.elements
              ? source.data.elements.map((e) => ({ ...e }))
              : undefined,
          },
        },
      ]);
      // Carry the conversation so the variant keeps context.
      setChatsByNode((prev) => ({ ...prev, [id]: [...(prev[nodeId] ?? [])] }));
      setSelectedNodeId(id);
      toast.success("Forked a variant", {
        description: "Iterate freely — the original is untouched.",
      });
    },
    [nodes, nextId, setNodes],
  );

  const remove = useCallback(
    (nodeId: string) => {
      setNodes((nds) => nds.filter((n) => n.id !== nodeId));
      setEdges((eds) =>
        eds.filter((e) => e.source !== nodeId && e.target !== nodeId),
      );
      setSelectedNodeId((curr) => (curr === nodeId ? null : curr));
      setCodeNodeId((curr) => (curr === nodeId ? null : curr));
    },
    [setNodes, setEdges],
  );

  const rename = useCallback(
    (nodeId: string, name: string) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === nodeId ? { ...n, data: { ...n.data, label: name } } : n,
        ),
      );
    },
    [setNodes],
  );

  const actions = useMemo<CanvasActions>(
    () => ({
      fork,
      remove,
      generateCode: (id) => setCodeNodeId(id),
      openChat: (id) => setSelectedNodeId(id),
    }),
    [fork, remove],
  );

  return (
    <CanvasActionsProvider value={actions}>
      <div className="flex h-full w-full flex-col">
        <TopBar
          onGenerate={generateScreen}
          onAddBlank={addBlank}
          settings={settings}
          onOpenSettings={() => setSettingsOpen(true)}
        />

        <div className="relative flex min-h-0 flex-1">
          <div className="min-w-0 flex-1">
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
              className="bg-muted/30"
            >
              <Background
                variant={BackgroundVariant.Dots}
                gap={20}
                size={1}
                color="var(--border)"
              />
              <Controls />
              <MiniMap pannable zoomable className="!bg-background" />
            </ReactFlow>
          </div>

          {selectedNode && (
            <ChatPanel
              key={selectedNode.id}
              node={selectedNode}
              messages={chatsByNode[selectedNode.id] ?? []}
              isLoading={loadingNodeId === selectedNode.id}
              onSend={(command) => runDesign(selectedNode.id, command)}
              onClose={() => setSelectedNodeId(null)}
              onRename={rename}
              onFork={fork}
              onGenerateCode={(id) => setCodeNodeId(id)}
            />
          )}
        </div>
      </div>

      <CodeDialog
        node={codeNode}
        open={codeNodeId !== null}
        onOpenChange={(open) => !open && setCodeNodeId(null)}
      />
      <ModelSettingsSheet
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        settings={settings}
        onSave={saveSettings}
      />
    </CanvasActionsProvider>
  );
}

export function Canvas() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
