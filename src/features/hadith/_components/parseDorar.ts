export interface DorarHadith {
  id: string;
  text: string;
  narrator?: string;
  scholar?: string;
  source?: string;
  number?: string;
  grade?: string;
}

// Labels Dorar uses inside each `hadith-info` block
const INFO_LABELS: Record<Exclude<keyof DorarHadith, "id" | "text">, string> = {
  narrator: "الراوي",
  scholar: "المحدث",
  source: "المصدر",
  number: "الصفحة أو الرقم",
  grade: "خلاصة حكم المحدث",
};

const ENTITIES: Record<string, string> = {
  "&quot;": '"',
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&nbsp;": " ",
  "&#39;": "'",
};

function stripHtml(html: string) {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z#0-9]+;/gi, (e) => ENTITIES[e] ?? e)
    .replace(/\s+/g, " ")
    .trim();
}

/** Pulls every HTML string out of `{ ahadith: ... }`, whatever shape it arrives in */
function collectHtml(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(collectHtml).join("");
  if (value && typeof value === "object") {
    return Object.values(value).map(collectHtml).join("");
  }
  return "";
}

function parseInfo(infoHtml: string) {
  const info: Partial<DorarHadith> = {};
  // Each field runs from its label to the next label (or the end of the block)
  const parts = infoHtml.split(
    /<span[^>]*class=["']?info-subtitle["']?[^>]*>/i,
  );
  for (const part of parts) {
    const [labelHtml, ...rest] = part.split(/<\/span>/i);
    const label = stripHtml(labelHtml).replace(/:$/, "").trim();
    const key = (Object.keys(INFO_LABELS) as (keyof typeof INFO_LABELS)[]).find(
      (k) => INFO_LABELS[k] === label,
    );
    if (!key) continue;
    const value = stripHtml(rest.join(" "))
      .replace(/^[\s:]+|[\s\-–]+$/g, "")
      .replace(/^\[(.*)\]$/, "$1");
    if (value) info[key] = value;
  }
  return info;
}

export function parseDorarResponse(raw: string): DorarHadith[] {
  // Accept plain JSON as well as a JSONP wrapper: `callback({...})`
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("Unexpected Dorar response");

  const data = JSON.parse(raw.slice(start, end + 1));
  const html = collectHtml(data?.ahadith ?? data);

  const blocks = html
    .split(/<div[^>]*class=["']?hadith(?![\w-])["']?[^>]*>/i)
    .slice(1);

  return blocks
    .map((block, index) => {
      const [textHtml, ...after] = block.split(/<\/div>/i);
      const infoMatch = after
        .join("</div>")
        .match(/<div[^>]*class=["']?hadith-info["']?[^>]*>([\s\S]*)/i);

      return {
        id: String(index),
        text: stripHtml(textHtml).replace(/^\d+\s*-\s*/, ""),
        ...parseInfo(infoMatch?.[1] ?? ""),
      };
    })
    .filter((h) => h.text.length > 0);
}
