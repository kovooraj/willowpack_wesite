// Client for the Willowpack AI quote engine (n8n), same protocol as the quote-chat app:
//   POST WEBHOOK {action:'sendMessage', sessionId, chatInput, metadata} -> {output, quote?}
// Replies are markdown; quick replies arrive as [[options: a | b | c]] (★ marks the recommended one).

export const QUOTE_WEBHOOK =
  process.env.NEXT_PUBLIC_QUOTE_WEBHOOK || "https://n8n.sinaprinting.com/webhook/willowpack-quote-chat";

export type Lead = { first_name: string; last_name: string; company: string; email: string; phone: string };
export type Quote = {
  id: string;
  total: number;
  discounted_total?: number | null;
  currency?: string;
  quantity?: number;
  summary?: string;
  outcome?: string;
};
export type Reply = { text: string; options: { label: string; rec: boolean }[]; quote: Quote | null };

export function newSessionId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return "s-" + Date.now().toString(36) + Math.random().toString(36).slice(2);
  }
}

function baseMetadata(campaign: string) {
  const m: Record<string, string> = { page_url: location.href.split("#")[0], referrer: document.referrer || "", surface: "website" };
  const u = new URLSearchParams(location.search);
  ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((k) => {
    const v = u.get(k);
    if (v) m[k] = v;
  });
  if (campaign) m.campaign = campaign;
  try {
    m.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  } catch {}
  return m;
}

export async function sendToQuoteEngine(sessionId: string, text: string, lead: Lead, campaign: string): Promise<Reply> {
  const metadata = { ...baseMetadata(campaign), carry: lead };
  const res = await fetch(QUOTE_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "sendMessage", sessionId, chatInput: text, metadata }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  let d = await res.json();
  if (Array.isArray(d)) d = d[0] || {};
  const raw = String(d.output || d.text || "I didn't catch that. Could you rephrase?");
  return { ...splitOptions(raw), quote: d.quote && d.quote.id && d.quote.total != null ? d.quote : null };
}

export function splitOptions(text: string) {
  const m = text.match(/\[\[options:\s*([^\]]*)\]\]/i);
  if (!m) return { text, options: [] };
  const options = m[1]
    .split("|")
    .map((x) => x.trim())
    .filter(Boolean)
    .map((x) => ({ label: x.replace(/\s*★\s*/g, "").trim(), rec: /★/.test(x) }));
  return { text: (text.slice(0, m.index) + text.slice(m.index! + m[0].length)).replace(/\n{3,}/g, "\n\n").trim(), options };
}

export function money(n: number, cur = "CAD") {
  try {
    return new Intl.NumberFormat("en-CA", { style: "currency", currency: cur }).format(n);
  } catch {
    return `$${n.toFixed(2)}`;
  }
}

// Minimal, safe markdown → HTML (escapes first): paragraphs, lists, tables, **bold**, *italic*, links.
export function md(src: string): string {
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const inline = (s: string) =>
    s
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^*])\*(?!\s)(.+?)\*(?!\*)/g, "$1<em>$2</em>")
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  let html = "";
  let para: string[] = [];
  let list: "ul" | "ol" | null = null;
  let tbl: { head: string[]; rows: string[][] } | null = null;
  const cells = (l: string) => l.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => inline(c.trim()));
  const fp = () => {
    if (para.length) html += `<p>${inline(para.join("<br>"))}</p>`;
    para = [];
  };
  const fl = () => {
    if (list) html += `</${list}>`;
    list = null;
  };
  const ft = () => {
    if (!tbl) return;
    html += `<div class="tbl"><table><thead><tr>${tbl.head.map((c) => `<th>${c}</th>`).join("")}</tr></thead><tbody>${tbl.rows
      .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`)
      .join("")}</tbody></table></div>`;
    tbl = null;
  };
  esc(src)
    .split(/\r?\n/)
    .forEach((l) => {
      if (/^\s*\|.*\|\s*$/.test(l)) {
        fp();
        fl();
        if (/^\s*\|[\s:|-]+\|\s*$/.test(l)) return;
        if (!tbl) tbl = { head: cells(l), rows: [] };
        else tbl.rows.push(cells(l));
        return;
      }
      ft();
      const ul = l.match(/^\s*[-*•]\s+(.*)$/);
      const ol = l.match(/^\s*\d+[.)]\s+(.*)$/);
      if (ul || ol) {
        fp();
        const t = ul ? "ul" : "ol";
        if (list !== t) {
          fl();
          html += `<${t}>`;
          list = t;
        }
        html += `<li>${inline((ul || ol)![1])}</li>`;
      } else if (!l.trim()) {
        fp();
        fl();
      } else {
        fl();
        para.push(l.replace(/^#{1,6}\s+/, ""));
      }
    });
  ft();
  fp();
  fl();
  return html;
}
