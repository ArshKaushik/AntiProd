import Anthropic from "@anthropic-ai/sdk";
import type {
  DesignRequest,
  DesignResponse,
  ScreenElement,
} from "@/lib/types";

// This route talks to Claude, so it must run on the Node.js server, not the edge.
export const runtime = "nodejs";

const MODEL = "claude-opus-4-8";

const SYSTEM_PROMPT = `You are the design agent inside AntiProd, a visual app builder where each "screen" of an app is a node on an infinite canvas.

Your job: turn the user's natural-language requests into the screen's UI design. A screen is a vertical stack of simple UI elements rendered top-to-bottom, like a phone/app screen mockup.

When the user asks you to add, change, remove, or rearrange anything on the screen, call the \`update_screen_design\` tool with the COMPLETE new element list — include the existing elements you are keeping, in order, plus your changes. Never return only the delta. Generate clean, realistic, well-structured screens (e.g. a login screen has a heading, two inputs, and a primary button).

If the user only asks a question or chats without requesting a design change, just reply in text and do not call the tool.

Keep replies to the user short and friendly — one or two sentences describing what you changed.`;

const updateTool: Anthropic.Tool = {
  name: "update_screen_design",
  description:
    "Set the complete visual design of the current screen. Provide the full ordered list of UI elements (top to bottom). Call this whenever the user requests any change to what the screen shows.",
  input_schema: {
    type: "object",
    properties: {
      elements: {
        type: "array",
        description: "The complete ordered list of UI elements for the screen.",
        items: {
          type: "object",
          properties: {
            type: {
              type: "string",
              enum: [
                "heading",
                "subheading",
                "text",
                "button",
                "input",
                "image",
                "divider",
                "badge",
              ],
              description: "The kind of UI element.",
            },
            text: {
              type: "string",
              description:
                "Visible text/label/placeholder. Omit for 'divider' and 'image'.",
            },
            variant: {
              type: "string",
              enum: ["primary", "secondary"],
              description:
                "For 'button' only: primary (filled) or secondary (outline).",
            },
          },
          required: ["type"],
        },
      },
      reply: {
        type: "string",
        description: "A short, friendly note to the user about what changed.",
      },
    },
    required: ["elements", "reply"],
  },
};

function newId() {
  return `el-${Math.random().toString(36).slice(2, 10)}`;
}

export async function POST(request: Request): Promise<Response> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      {
        reply:
          "The design agent isn't configured yet — set ANTHROPIC_API_KEY in your .env.local and restart the dev server.",
        elements: null,
      } satisfies DesignResponse,
      { status: 200 },
    );
  }

  let body: DesignRequest;
  try {
    body = (await request.json()) as DesignRequest;
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { screenName, command, elements, history } = body;
  if (!command?.trim()) {
    return Response.json({ error: "Missing command." }, { status: 400 });
  }

  const client = new Anthropic();

  // Recent conversation, then the current request with the live design state.
  const messages: Anthropic.MessageParam[] = [
    ...(history ?? []).slice(-10).map((m) => ({
      role: m.role,
      content: m.content,
    })),
    {
      role: "user" as const,
      content: `Screen name: "${screenName}".
Current design (JSON elements, top to bottom):
${JSON.stringify(elements ?? [], null, 2)}

User request: ${command}`,
    },
  ];

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 16000,
      thinking: { type: "adaptive" },
      system: SYSTEM_PROMPT,
      tools: [updateTool],
      messages,
    });

    let reply = "";
    let newElements: ScreenElement[] | null = null;

    for (const block of response.content) {
      if (block.type === "text") {
        reply += block.text;
      } else if (
        block.type === "tool_use" &&
        block.name === "update_screen_design"
      ) {
        const input = block.input as {
          elements: Omit<ScreenElement, "id">[];
          reply?: string;
        };
        newElements = (input.elements ?? []).map((e) => ({
          ...e,
          id: newId(),
        }));
        if (input.reply) reply = input.reply;
      }
    }

    return Response.json({
      reply: reply.trim() || "Done.",
      elements: newElements,
    } satisfies DesignResponse);
  } catch (err) {
    console.error("Design agent error:", err);
    const message =
      err instanceof Anthropic.APIError
        ? `The design agent hit an error (${err.status}). ${err.message}`
        : "The design agent hit an unexpected error.";
    return Response.json(
      { reply: message, elements: null } satisfies DesignResponse,
      { status: 200 },
    );
  }
}
