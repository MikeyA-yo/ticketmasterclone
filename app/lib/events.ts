export type Event = {
  id: string;
  name: string;
  subtitle?: string;
  date: string;
  venue: string;
  city: string;
  category: Category["key"];
  gradient: string;
  badge?: "Just Announced" | "Selling Fast" | "Hot" | "Verified Resale" | "Presale";
};

export type Category = {
  key: "concerts" | "sports" | "arts-theater" | "family";
  label: string;
};

export const categories: Category[] = [
  { key: "concerts", label: "Concerts" },
  { key: "sports", label: "Sports" },
  { key: "arts-theater", label: "Arts & Theater" },
  { key: "family", label: "Family" },
];

// Each event gets a distinct gradient to stand in for poster artwork.
const gradients = [
  "linear-gradient(135deg, #026cdf 0%, #00308a 100%)",
  "linear-gradient(135deg, #ff4e50 0%, #7a0e3a 100%)",
  "linear-gradient(135deg, #11998e 0%, #0b3866 100%)",
  "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
  "linear-gradient(135deg, #f7971e 0%, #b8004a 100%)",
  "linear-gradient(135deg, #1f262d 0%, #026cdf 100%)",
  "linear-gradient(135deg, #00b09b 0%, #1a2980 100%)",
  "linear-gradient(135deg, #e1306c 0%, #2a0845 100%)",
  "linear-gradient(135deg, #f12711 0%, #4a148c 100%)",
  "linear-gradient(135deg, #2b5876 0%, #4e4376 100%)",
];

const g = (i: number) => gradients[i % gradients.length];

export const featured: Event[] = [
  {
    id: "f1",
    name: "Olivia Rodrigo",
    subtitle: "GUTS World Tour 2026",
    date: "Fri · Aug 14 · 7:30 PM",
    venue: "Madison Square Garden",
    city: "New York, NY",
    category: "concerts",
    gradient: g(3),
    badge: "Selling Fast",
  },
  {
    id: "f2",
    name: "NBA Finals 2026",
    subtitle: "Game 5 · Championship Series",
    date: "Mon · Jun 15 · 8:00 PM",
    venue: "Chase Center",
    city: "San Francisco, CA",
    category: "sports",
    gradient: g(2),
    badge: "Hot",
  },
  {
    id: "f3",
    name: "Hamilton",
    subtitle: "An American Musical",
    date: "Now Playing · Nightly",
    venue: "Richard Rodgers Theatre",
    city: "New York, NY",
    category: "arts-theater",
    gradient: g(8),
  },
];

export const justAnnounced: Event[] = [
  { id: "ja1", name: "Coldplay", subtitle: "Music of the Spheres", date: "Sat · Sep 5 · 7:00 PM", venue: "MetLife Stadium", city: "East Rutherford, NJ", category: "concerts", gradient: g(0), badge: "Just Announced" },
  { id: "ja2", name: "Billie Eilish", subtitle: "Hit Me Hard and Soft Tour", date: "Thu · Oct 2 · 8:00 PM", venue: "Kia Forum", city: "Inglewood, CA", category: "concerts", gradient: g(7), badge: "Just Announced" },
  { id: "ja3", name: "Kendrick Lamar", subtitle: "The Pop Out Tour", date: "Wed · Nov 12 · 8:00 PM", venue: "United Center", city: "Chicago, IL", category: "concerts", gradient: g(5), badge: "Just Announced" },
  { id: "ja4", name: "Taylor Swift", subtitle: "The Eras Tour Finale", date: "Sat · Dec 6 · 7:00 PM", venue: "SoFi Stadium", city: "Los Angeles, CA", category: "concerts", gradient: g(4), badge: "Just Announced" },
  { id: "ja5", name: "Bad Bunny", subtitle: "Most Wanted Tour", date: "Fri · Jul 18 · 8:30 PM", venue: "American Airlines Center", city: "Dallas, TX", category: "concerts", gradient: g(1), badge: "Just Announced" },
  { id: "ja6", name: "SZA", subtitle: "SOS North America", date: "Tue · Aug 26 · 8:00 PM", venue: "TD Garden", city: "Boston, MA", category: "concerts", gradient: g(9), badge: "Just Announced" },
];

export const sports: Event[] = [
  { id: "sp1", name: "Lakers vs. Celtics", date: "Sat · Jan 17 · 5:30 PM", venue: "Crypto.com Arena", city: "Los Angeles, CA", category: "sports", gradient: g(2) },
  { id: "sp2", name: "Yankees vs. Red Sox", date: "Sun · Apr 12 · 1:05 PM", venue: "Yankee Stadium", city: "Bronx, NY", category: "sports", gradient: g(0) },
  { id: "sp3", name: "UFC 320", subtitle: "Main Card", date: "Sat · Oct 4 · 10:00 PM", venue: "T-Mobile Arena", city: "Las Vegas, NV", category: "sports", gradient: g(5), badge: "Selling Fast" },
  { id: "sp4", name: "Chiefs vs. Bills", date: "Sun · Nov 23 · 4:25 PM", venue: "Arrowhead Stadium", city: "Kansas City, MO", category: "sports", gradient: g(6) },
  { id: "sp5", name: "Premier League: NYCFC", date: "Sat · Mar 7 · 3:00 PM", venue: "Yankee Stadium", city: "Bronx, NY", category: "sports", gradient: g(3) },
  { id: "sp6", name: "WNBA: Liberty vs. Aces", date: "Fri · Jun 26 · 7:00 PM", venue: "Barclays Center", city: "Brooklyn, NY", category: "sports", gradient: g(7), badge: "Hot" },
];

export const forYou: Event[] = [
  { id: "fy1", name: "The Weeknd", subtitle: "After Hours Til Dawn", date: "Wed · Sep 30 · 8:00 PM", venue: "Allegiant Stadium", city: "Las Vegas, NV", category: "concerts", gradient: g(6) },
  { id: "fy2", name: "Cirque du Soleil: OVO", date: "Various Dates", venue: "Barclays Center", city: "Brooklyn, NY", category: "family", gradient: g(2) },
  { id: "fy3", name: "Disney On Ice", subtitle: "Find Your Hero", date: "Sat · Feb 21 · 11:00 AM", venue: "Prudential Center", city: "Newark, NJ", category: "family", gradient: g(4) },
  { id: "fy4", name: "Wicked", subtitle: "Broadway", date: "Now Playing · Nightly", venue: "Gershwin Theatre", city: "New York, NY", category: "arts-theater", gradient: g(8), badge: "Selling Fast" },
  { id: "fy5", name: "Dua Lipa", subtitle: "Radical Optimism Tour", date: "Thu · Jul 9 · 8:00 PM", venue: "Wells Fargo Center", city: "Philadelphia, PA", category: "concerts", gradient: g(1) },
  { id: "fy6", name: "Hans Zimmer Live", date: "Sun · May 24 · 7:30 PM", venue: "Hollywood Bowl", city: "Los Angeles, CA", category: "arts-theater", gradient: g(9) },
];

export const presales: Event[] = [
  { id: "ps1", name: "Santana & The Doobie Brothers", subtitle: "Oneness Tour 2026", date: "Thu · Aug 13 · 7:00 PM", venue: "Hollywood Bowl", city: "Hollywood, CA", category: "concerts", gradient: g(3), badge: "Presale" },
  { id: "ps2", name: "Foo Fighters", subtitle: "Everything Or Nothing At All", date: "Sat · Sep 19 · 7:30 PM", venue: "BMO Stadium", city: "Los Angeles, CA", category: "concerts", gradient: g(8), badge: "Presale" },
  { id: "ps3", name: "Tyler, The Creator", subtitle: "Chromakopia: The World Tour", date: "Tue · Oct 7 · 8:00 PM", venue: "Crypto.com Arena", city: "Los Angeles, CA", category: "concerts", gradient: g(5), badge: "Presale" },
];

export type RecentItem = { id: string; name: string; gradient: string };

export const recentlyViewed: RecentItem[] = [
  { id: "rv1", name: "Ariana Grande", gradient: g(7) },
  { id: "rv2", name: "Drake", gradient: g(5) },
  { id: "rv3", name: "Olivia Rodrigo", gradient: g(3) },
];

export const cities = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Las Vegas, NV",
  "Boston, MA",
  "Dallas, TX",
];
