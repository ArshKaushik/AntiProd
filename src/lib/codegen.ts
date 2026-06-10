import type { ScreenElement } from "./types";

/**
 * Compiles a screen's design (its element list) into a self-contained React +
 * Tailwind component. This is a deterministic, local transform — code is
 * produced on demand for a single chosen node and never leaves the network.
 */

function toComponentName(label: string): string {
  const cleaned = label.replace(/[^a-zA-Z0-9 ]/g, "").trim();
  const pascal = cleaned
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
  const name = pascal || "Screen";
  return /^[A-Za-z]/.test(name) ? `${name}Screen` : `Screen`;
}

/** Escape a string for safe placement inside JSX text or a JS string. */
function esc(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\{/g, "{'{'}").replace(/\}/g, "{'}'}");
}

/** JSX-safe attribute value (double-quoted). */
function attr(text: string): string {
  return text.replace(/"/g, "&quot;");
}

function renderElement(elx: ScreenElement, indent: string): string {
  const t = elx.text ?? "";
  switch (elx.type) {
    case "heading":
      return `${indent}<h1 className="text-2xl font-bold tracking-tight text-zinc-900">${esc(t || "Heading")}</h1>`;
    case "subheading":
      return `${indent}<h2 className="text-base font-semibold text-zinc-800">${esc(t || "Subheading")}</h2>`;
    case "text":
      return `${indent}<p className="text-sm leading-relaxed text-zinc-500">${esc(t || "Text")}</p>`;
    case "button":
      return elx.variant === "secondary"
        ? `${indent}<button className="w-full rounded-lg border border-blue-600 px-4 py-2.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50">${esc(t || "Button")}</button>`
        : `${indent}<button className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">${esc(t || "Button")}</button>`;
    case "input":
      return `${indent}<input\n${indent}  type="text"\n${indent}  placeholder="${attr(t || "Input")}"\n${indent}  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"\n${indent}/>`;
    case "image":
      return `${indent}<div className="flex h-40 items-center justify-center rounded-lg bg-zinc-100 text-sm text-zinc-400">${esc(t || "Image")}</div>`;
    case "divider":
      return `${indent}<hr className="border-zinc-200" />`;
    case "badge":
      return `${indent}<span className="inline-block w-fit rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">${esc(t || "Badge")}</span>`;
    default:
      return "";
  }
}

export function generateReactCode(
  label: string,
  elements: ScreenElement[],
): string {
  const componentName = toComponentName(label);
  const indent = "        ";

  const body =
    elements.length > 0
      ? elements.map((e) => renderElement(e, indent)).join("\n")
      : `${indent}<p className="text-sm text-zinc-400">Empty screen.</p>`;

  return `export default function ${componentName}() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 p-6">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4">
${body}
        </div>
      </div>
    </main>
  );
}
`;
}
