import type { Event, Category } from "./events";

// Public Ticketmaster browse pages embed schema.org Event data as JSON-LD
// (for SEO). We read that structured JSON straight from the static HTML —
// no API key, no headless browser, no DOM traversal needed.

const BROWSE: Record<Category["key"], string> = {
  concerts: "https://www.ticketmaster.com/discover/concerts",
  sports: "https://www.ticketmaster.com/discover/sports",
  "arts-theater": "https://www.ticketmaster.com/discover/arts-theater",
  family: "https://www.ticketmaster.com/discover/family",
};

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const gradients = [
  "linear-gradient(135deg, #026cdf 0%, #00308a 100%)",
  "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
  "linear-gradient(135deg, #11998e 0%, #0b3866 100%)",
  "linear-gradient(135deg, #e1306c 0%, #2a0845 100%)",
  "linear-gradient(135deg, #f7971e 0%, #b8004a 100%)",
];

function hashId(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h.toString(36);
}

function gradientFor(s: string): string {
  return gradients[Math.abs([...s].reduce((a, c) => a + c.charCodeAt(0), 0)) % gradients.length];
}

function formatIsoDate(iso?: string): string {
  if (!iso) return "Date TBA";
  const [datePart, timePart] = iso.split("T");
  const [y, m, d] = datePart.split("-").map(Number);
  if (!y || !m || !d) return "Date TBA";
  const dt = new Date(y, m - 1, d);
  let out = `${DAYS[dt.getDay()]} · ${MONTHS[m - 1]} ${d}`;
  if (timePart) {
    const [hh, mm] = timePart.split(":").map(Number);
    const ampm = hh >= 12 ? "PM" : "AM";
    const h12 = ((hh + 11) % 12) + 1;
    out += ` · ${h12}:${String(mm || 0).padStart(2, "0")} ${ampm}`;
  }
  return out;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractLdEvents(html: string): any[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const out: any[] = [];
  const re =
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    try {
      const parsed = JSON.parse(m[1].trim());
      for (const o of Array.isArray(parsed) ? parsed : [parsed]) {
        if (o && typeof o["@type"] === "string" && o["@type"].includes("Event")) {
          out.push(o);
        }
      }
    } catch {
      // skip malformed block
    }
  }
  return out;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapEvent(o: any, category: Category["key"]): Event | null {
  if (!o?.name) return null;
  // Names often carry marketing suffixes: "Artist | Official ... Packages"
  const name = String(o.name).split(" | ")[0].trim();
  if (!name) return null;

  const loc = o.location ?? {};
  const addr = loc.address ?? {};
  const city =
    [addr.addressLocality, addr.addressRegion].filter(Boolean).join(", ") ||
    "Location TBA";
  const url = typeof o.url === "string" ? o.url.split("?")[0] : undefined;

  return {
    id: `scr-${hashId(url ?? name)}`,
    name,
    date: formatIsoDate(o.startDate),
    venue: loc.name ?? "Venue TBA",
    city,
    category,
    gradient: gradientFor(name),
    url,
    // No artwork in the SEO payload → imageFor() falls back to the local pool.
  };
}

async function fetchHtml(url: string, attempts = 2): Promise<string | null> {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": UA,
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
        next: { revalidate: 3600 }, // cache 1h; be polite to the source
      });
      if (res.ok) return await res.text();
    } catch {
      // transient network error — retry
    }
  }
  return null;
}

async function scrapeCategory(category: Category["key"]): Promise<Event[]> {
  const html = await fetchHtml(BROWSE[category]);
  if (!html) return [];
  return extractLdEvents(html)
    .map((o) => mapEvent(o, category))
    .filter((e): e is Event => e !== null);
}

/** Scrape events across all browse categories. Resilient to per-page failures. */
export async function scrapeEvents(): Promise<Event[]> {
  const cats = Object.keys(BROWSE) as Category["key"][];
  const results = await Promise.all(cats.map((c) => scrapeCategory(c)));
  return results.flat();
}
