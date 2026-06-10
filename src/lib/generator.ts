import type { ScreenElement } from "./types";

/** An element without its id — the generator's output shape. */
export type ElementSpec = Omit<ScreenElement, "id">;

export type GenerationResult = {
  elements: ElementSpec[];
  reply: string;
  /** Suggested screen name, when the prompt clearly implies one. */
  screenName?: string;
};

/**
 * AntiProd's local, zero-egress design "generator". It does NOT call any model
 * — it interprets the prompt with heuristics and templates so the front end is
 * fully workable offline. This is the seam that a configurable model endpoint
 * will later replace; the rest of the app only depends on its shape.
 */

const el = (
  type: ScreenElement["type"],
  text?: string,
  variant?: ScreenElement["variant"],
): ElementSpec => ({ type, ...(text ? { text } : {}), ...(variant ? { variant } : {}) });

// ---------------------------------------------------------------------------
// Screen templates, keyed by detected intent.
// ---------------------------------------------------------------------------

type Template = {
  keywords: string[];
  name: string;
  build: () => ElementSpec[];
};

const TEMPLATES: Template[] = [
  {
    keywords: ["login", "log in", "sign in", "signin"],
    name: "Login",
    build: () => [
      el("heading", "Welcome back"),
      el("text", "Sign in to continue to your account."),
      el("input", "Email address"),
      el("input", "Password"),
      el("button", "Sign in", "primary"),
      el("button", "Sign in with SSO", "secondary"),
      el("text", "Forgot your password?"),
    ],
  },
  {
    keywords: ["signup", "sign up", "register", "create account", "join"],
    name: "Sign up",
    build: () => [
      el("heading", "Create your account"),
      el("text", "Start building in minutes."),
      el("input", "Full name"),
      el("input", "Work email"),
      el("input", "Password"),
      el("button", "Create account", "primary"),
      el("divider"),
      el("text", "Already have an account? Sign in"),
    ],
  },
  {
    keywords: ["dashboard", "analytics", "overview", "metrics", "admin"],
    name: "Dashboard",
    build: () => [
      el("heading", "Dashboard"),
      el("text", "Here's what's happening today."),
      el("badge", "Live"),
      el("subheading", "Revenue · $48,200"),
      el("subheading", "Active users · 1,284"),
      el("subheading", "Conversion · 3.4%"),
      el("divider"),
      el("subheading", "Recent activity"),
      el("text", "12 new sign-ups in the last hour"),
      el("button", "View full report", "secondary"),
    ],
  },
  {
    keywords: ["settings", "preferences", "account settings"],
    name: "Settings",
    build: () => [
      el("heading", "Settings"),
      el("subheading", "Profile"),
      el("input", "Display name"),
      el("input", "Email address"),
      el("divider"),
      el("subheading", "Preferences"),
      el("text", "Email notifications"),
      el("text", "Two-factor authentication"),
      el("button", "Save changes", "primary"),
    ],
  },
  {
    keywords: ["profile", "account page", "my account"],
    name: "Profile",
    build: () => [
      el("image", "Avatar"),
      el("heading", "Jordan Rivera"),
      el("text", "Design Engineer · San Francisco"),
      el("badge", "Pro"),
      el("divider"),
      el("subheading", "About"),
      el("text", "Building self-hosted tools for regulated teams."),
      el("button", "Edit profile", "primary"),
      el("button", "Share", "secondary"),
    ],
  },
  {
    keywords: ["pricing", "plans", "subscription", "billing"],
    name: "Pricing",
    build: () => [
      el("heading", "Simple, transparent pricing"),
      el("text", "Run AntiProd inside your own network."),
      el("divider"),
      el("subheading", "Team — $0 / self-hosted"),
      el("text", "Unlimited screens and variants"),
      el("button", "Get started", "primary"),
      el("divider"),
      el("subheading", "Enterprise — Custom"),
      el("text", "Dedicated support and deployment help"),
      el("button", "Contact sales", "secondary"),
    ],
  },
  {
    keywords: ["landing", "hero", "marketing", "home page", "homepage"],
    name: "Landing",
    build: () => [
      el("badge", "Self-hosted"),
      el("heading", "Design engineering, inside your firewall"),
      el("text", "Generate screens, fork variants, and ship front-end code — on your own model, on your own infra."),
      el("button", "Start building", "primary"),
      el("button", "Watch demo", "secondary"),
      el("image", "Product preview"),
    ],
  },
  {
    keywords: ["checkout", "payment", "cart", "purchase"],
    name: "Checkout",
    build: () => [
      el("heading", "Checkout"),
      el("subheading", "Order summary"),
      el("text", "Pro plan — billed annually"),
      el("text", "Total · $290.00"),
      el("divider"),
      el("subheading", "Payment details"),
      el("input", "Card number"),
      el("input", "MM / YY"),
      el("input", "CVC"),
      el("button", "Pay $290.00", "primary"),
    ],
  },
  {
    keywords: ["feed", "list", "inbox", "messages", "notifications", "timeline"],
    name: "Feed",
    build: () => [
      el("heading", "Inbox"),
      el("input", "Search messages"),
      el("divider"),
      el("subheading", "Alex Chen"),
      el("text", "Sent you the updated mockups…"),
      el("subheading", "Security team"),
      el("text", "Approved the on-prem deployment"),
      el("subheading", "Jordan Rivera"),
      el("text", "Let's converge on variant B"),
    ],
  },
  {
    keywords: ["contact", "form", "feedback", "support"],
    name: "Contact",
    build: () => [
      el("heading", "Get in touch"),
      el("text", "We'll get back to you within one business day."),
      el("input", "Your name"),
      el("input", "Email"),
      el("input", "How can we help?"),
      el("button", "Send message", "primary"),
    ],
  },
  {
    keywords: ["search", "results", "explore"],
    name: "Search",
    build: () => [
      el("heading", "Search"),
      el("input", "Search anything…"),
      el("button", "Search", "primary"),
      el("divider"),
      el("text", "Showing 24 results"),
      el("subheading", "Result one"),
      el("text", "A short description of the matching item."),
      el("subheading", "Result two"),
      el("text", "Another matching item description."),
    ],
  },
];

// ---------------------------------------------------------------------------
// Incremental edit parsing ("add a primary button labeled Save", etc.)
// ---------------------------------------------------------------------------

const EDIT_VERBS = ["add", "remove", "delete", "clear", "change", "rename", "make"];

function looksLikeEdit(prompt: string): boolean {
  const p = prompt.toLowerCase().trim();
  return EDIT_VERBS.some((v) => p.startsWith(v) || p.includes(` ${v} `));
}

function extractLabel(prompt: string): string | undefined {
  // "labeled X", "label X", "that says X", "called X", "titled X", or quotes.
  const quoted = prompt.match(/["“'']([^"”'']+)["”'']/);
  if (quoted) return quoted[1].trim();
  const m = prompt.match(/(?:labell?ed|label|that says|called|titled|named|saying)\s+(.+)$/i);
  if (m) return m[1].replace(/[.?!]+$/, "").trim();
  return undefined;
}

function applyEdit(prompt: string, current: ScreenElement[]): GenerationResult | null {
  const p = prompt.toLowerCase();
  const elements: ElementSpec[] = current.map(({ type, text, variant }) => ({
    type,
    ...(text ? { text } : {}),
    ...(variant ? { variant } : {}),
  }));

  // Clear / remove all
  if (/(clear|remove|delete)\s+(everything|all)/.test(p) || p.trim() === "clear") {
    return { elements: [], reply: "Cleared the screen." };
  }

  // Remove the last element
  if (/(remove|delete)\s+(the\s+)?last/.test(p)) {
    if (elements.length === 0) return { elements, reply: "There's nothing to remove." };
    const removed = elements.pop()!;
    return { elements, reply: `Removed the last element (${removed.type}).` };
  }

  if (p.startsWith("add") || p.includes(" add ")) {
    const label = extractLabel(prompt);
    const variant: ScreenElement["variant"] = p.includes("secondary") || p.includes("outline")
      ? "secondary"
      : "primary";

    if (p.includes("button")) {
      elements.push(el("button", label ?? "Button", variant));
      return { elements, reply: `Added a ${variant} button${label ? ` labeled "${label}"` : ""}.` };
    }
    if (p.includes("password")) {
      elements.push(el("input", "Password"));
      return { elements, reply: "Added a password field." };
    }
    if (p.includes("email")) {
      elements.push(el("input", "Email address"));
      return { elements, reply: "Added an email field." };
    }
    if (p.includes("input") || p.includes("field") || p.includes("text box")) {
      elements.push(el("input", label ?? "Input"));
      return { elements, reply: `Added an input${label ? ` for "${label}"` : ""}.` };
    }
    if (p.includes("heading") || p.includes("title")) {
      elements.push(el("heading", label ?? "Heading"));
      return { elements, reply: `Added a heading${label ? `: "${label}"` : ""}.` };
    }
    if (p.includes("subheading") || p.includes("subtitle")) {
      elements.push(el("subheading", label ?? "Subheading"));
      return { elements, reply: "Added a subheading." };
    }
    if (p.includes("divider") || p.includes("separator") || p.includes("line")) {
      elements.push(el("divider"));
      return { elements, reply: "Added a divider." };
    }
    if (p.includes("badge") || p.includes("tag") || p.includes("chip")) {
      elements.push(el("badge", label ?? "Badge"));
      return { elements, reply: "Added a badge." };
    }
    if (p.includes("image") || p.includes("photo") || p.includes("picture") || p.includes("avatar")) {
      elements.push(el("image", label ?? "Image"));
      return { elements, reply: "Added an image placeholder." };
    }
    if (p.includes("text") || p.includes("paragraph") || p.includes("description")) {
      elements.push(el("text", label ?? "Some descriptive text."));
      return { elements, reply: "Added a line of text." };
    }
    // Generic "add X" → treat X as a text line.
    if (label) {
      elements.push(el("text", label));
      return { elements, reply: `Added "${label}".` };
    }
  }

  return null; // Not an edit we recognise — fall through to template/generic.
}

// ---------------------------------------------------------------------------
// Generic fallback — turns an arbitrary prompt into a plausible screen.
// ---------------------------------------------------------------------------

function titleCase(s: string): string {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

function genericScreen(prompt: string): GenerationResult {
  const clean = prompt.replace(/^(generate|create|design|build|make)\s+(a|an|the)?\s*/i, "").trim();
  const title = titleCase(clean.split(/[.,\n]/)[0].slice(0, 40)) || "New screen";
  return {
    screenName: title,
    elements: [
      el("heading", title),
      el("text", clean ? `A screen for: ${clean}.` : "Describe this screen in the chat to refine it."),
      el("input", "Primary input"),
      el("button", "Continue", "primary"),
    ],
    reply: `Generated a starting layout for "${title}". Tell me what to add or change.`,
  };
}

// ---------------------------------------------------------------------------
// Public entry point.
// ---------------------------------------------------------------------------

export function generateDesign(
  prompt: string,
  current: ScreenElement[] = [],
): GenerationResult {
  const p = prompt.toLowerCase();

  // 1. Strong template match wins — generate (replace) that screen.
  const template = TEMPLATES.find((t) => t.keywords.some((k) => p.includes(k)));
  if (template) {
    return {
      elements: template.build(),
      reply: `Generated a ${template.name.toLowerCase()} screen. Fork it to explore variants, or tell me what to tweak.`,
      screenName: template.name,
    };
  }

  // 2. Incremental edit of an existing design.
  if (current.length > 0 && looksLikeEdit(prompt)) {
    const edited = applyEdit(prompt, current);
    if (edited) return edited;
  }

  // 3. Fallback: build a plausible screen from the prompt.
  return genericScreen(prompt);
}
