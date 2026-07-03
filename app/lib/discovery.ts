import type { Event, Category } from "./events";
import * as mock from "./events";
import { scrapeEvents } from "./scrape";

// ---- Raw Discovery API shapes (only the fields we use) ----
type RawImage = { ratio?: string; url: string; width?: number; height?: number; fallback?: boolean };
type RawEvent = {
  id: string;
  name: string;
  url?: string;
  images?: RawImage[];
  dates?: {
    start?: {
      localDate?: string;
      localTime?: string;
      dateTBD?: boolean;
      dateTBA?: boolean;
      noSpecificTime?: boolean;
    };
  };
  classifications?: { segment?: { name?: string }; genre?: { name?: string } }[];
  _embedded?: {
    venues?: {
      name?: string;
      city?: { name?: string };
      state?: { stateCode?: string; name?: string };
    }[];
  };
};

const DISCOVERY_URL = "https://app.ticketmaster.com/discovery/v2/events.json";

const gradients = [
  "linear-gradient(135deg, #026cdf 0%, #00308a 100%)",
  "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
  "linear-gradient(135deg, #11998e 0%, #0b3866 100%)",
  "linear-gradient(135deg, #e1306c 0%, #2a0845 100%)",
  "linear-gradient(135deg, #f7971e 0%, #b8004a 100%)",
];

function gradientFor(id: string): string {
  let h = 0;
  for (let i = 0; i < id.length; i++) h += id.charCodeAt(i);
  return gradients[h % gradients.length];
}

function categoryFor(segment?: string): Category["key"] {
  switch (segment) {
    case "Sports":
      return "sports";
    case "Arts & Theatre":
      return "arts-theater";
    case "Family":
      return "family";
    default:
      return "concerts";
  }
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatDate(start?: RawEvent["dates"]): string {
  const s = start?.start;
  if (!s?.localDate || s.dateTBD || s.dateTBA) return "Date TBA";
  const [y, m, d] = s.localDate.split("-").map(Number);
  if (!y || !m || !d) return "Date TBA";
  const dt = new Date(y, m - 1, d);
  let out = `${DAYS[dt.getDay()]} · ${MONTHS[m - 1]} ${d}`;
  if (s.localTime && !s.noSpecificTime) {
    const [hh, mm] = s.localTime.split(":").map(Number);
    const ampm = hh >= 12 ? "PM" : "AM";
    const h12 = ((hh + 11) % 12) + 1;
    out += ` · ${h12}:${String(mm ?? 0).padStart(2, "0")} ${ampm}`;
  }
  return out;
}

function pickImage(images?: RawImage[]): string | undefined {
  if (!images?.length) return undefined;
  const wide = images.filter((i) => i.ratio === "16_9");
  const pool = wide.length ? wide : images;
  const sorted = [...pool].sort((a, b) => (b.width ?? 0) - (a.width ?? 0));
  return (sorted.find((i) => !i.fallback) ?? sorted[0])?.url;
}

function mapEvent(raw: RawEvent): Event | null {
  if (!raw?.id || !raw?.name) return null;
  const venue = raw._embedded?.venues?.[0];
  const city = venue?.city?.name;
  const state = venue?.state?.stateCode ?? venue?.state?.name;
  const segment = raw.classifications?.[0]?.segment?.name;
  const genre = raw.classifications?.[0]?.genre?.name;

  return {
    id: raw.id,
    name: raw.name,
    subtitle: genre && genre !== "Undefined" ? genre : undefined,
    date: formatDate(raw.dates),
    venue: venue?.name ?? "Venue TBA",
    city: [city, state].filter(Boolean).join(", ") || "Location TBA",
    category: categoryFor(segment),
    gradient: gradientFor(raw.id),
    image: pickImage(raw.images),
    url: raw.url,
  };
}

/** Fetch + map live events. Returns [] when no key is set or the request fails. */
export async function getEvents(
  params: Record<string, string> = {},
): Promise<Event[]> {
  const apikey = process.env.TICKETMASTER_API_KEY;
  if (!apikey) return [];

  const qs = new URLSearchParams({
    apikey,
    countryCode: "US",
    size: "50",
    sort: "relevance,desc",
    ...params,
  });

  try {
    const res = await fetch(`${DISCOVERY_URL}?${qs.toString()}`, {
      next: { revalidate: 3600 }, // cache 1h
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { _embedded?: { events?: RawEvent[] } };
    const raw = data._embedded?.events ?? [];
    return raw.map(mapEvent).filter((e): e is Event => e !== null);
  } catch {
    return [];
  }
}

export type HomeSections = {
  featured: Event[];
  justAnnounced: Event[];
  forYou: Event[];
  sports: Event[];
  presales: Event[];
  source: "api" | "scrape" | "mock";
};

const withBadge = (arr: Event[], badge: Event["badge"]): Event[] =>
  arr.map((e) => ({ ...e, badge }));

const dedupeByName = (arr: Event[]): Event[] => {
  const seen = new Set<string>();
  return arr.filter((e) => {
    const k = e.name.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
};

/**
 * Home page sections. Source priority:
 *   1. Discovery API   (when TICKETMASTER_API_KEY is set)
 *   2. Public-site scrape (JSON-LD from the browse pages)
 *   3. Built-in mock data
 */
export async function getHomeSections(): Promise<HomeSections> {
  let live: Event[] = [];
  let source: HomeSections["source"] = "mock";

  if (process.env.TICKETMASTER_API_KEY) {
    live = await getEvents({ size: "80" });
    if (live.length) source = "api";
  }

  if (!live.length) {
    live = await scrapeEvents();
    if (live.length) source = "scrape";
  }

  live = dedupeByName(live);

  if (live.length < 6) {
    return {
      featured: mock.featured,
      justAnnounced: mock.justAnnounced,
      forYou: mock.forYou,
      sports: mock.sports,
      presales: mock.presales,
      source: "mock",
    };
  }

  const byCat = (c: Category["key"]) => live.filter((e) => e.category === c);
  const music = byCat("concerts");
  const sportsE = byCat("sports");
  const arts = byCat("arts-theater");
  const family = byCat("family");
  const pick = (arr: Event[], n: number) => (arr.length >= 3 ? arr : live).slice(0, n);

  // Prefer events that carry real artwork for the hero (API path); otherwise
  // any events work — imageFor() falls back to the local category pool.
  const withImg = live.filter((e) => e.image);
  const featuredSrc = withImg.length >= 3 ? withImg : live;

  return {
    featured: withBadge(featuredSrc.slice(0, 5), "On Sale"),
    justAnnounced: withBadge(pick(music, 12), "Just Announced"),
    forYou: pick([...arts, ...family, ...music, ...sportsE], 12),
    sports: pick(sportsE, 12),
    presales: withBadge(pick(music.slice(8), 8), "Presale"),
    source,
  };
}
