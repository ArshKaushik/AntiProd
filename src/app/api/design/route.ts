import { generateDesign } from "@/lib/generator";
import type { DesignRequest, DesignResponse, ScreenElement } from "@/lib/types";

// Runs on the server, fully local. This is the seam where a configurable model
// endpoint will later be proxied — today it calls the local generator so the
// app is workable offline with ZERO outbound network calls.
export const runtime = "nodejs";

function newId() {
  return `el-${Math.random().toString(36).slice(2, 10)}`;
}

export async function POST(request: Request): Promise<Response> {
  let body: DesignRequest;
  try {
    body = (await request.json()) as DesignRequest;
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { command, elements } = body;
  if (!command?.trim()) {
    return Response.json({ error: "Missing command." }, { status: 400 });
  }

  const result = generateDesign(command, elements ?? []);

  const withIds: ScreenElement[] = result.elements.map((e) => ({
    ...e,
    id: newId(),
  }));

  return Response.json({
    reply: result.reply,
    elements: withIds,
    screenName: result.screenName,
  } satisfies DesignResponse);
}
