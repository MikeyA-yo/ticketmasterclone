export type PerformerCategory = "music" | "sports" | "arts";

export type Performer = {
  id: string;
  name: string;
  category: PerformerCategory;
  genre?: string;
  image: string;
};

export const musicGenres = ["Rock", "Country", "Pop", "Hip-Hop/Rap", "Dance/EDM"];

const pools: Record<PerformerCategory, string[]> = {
  music: [
    "/images/fav-1.jpg",
    "/images/fav-2.jpg",
    "/images/fav-3.jpg",
    "/images/fav-4.jpg",
    "/images/fav-5.jpg",
    "/images/fav-6.jpg",
  ],
  sports: ["/images/sports-1.jpg", "/images/sports-2.jpg"],
  arts: ["/images/theater-1.jpg", "/images/theater-2.jpg"],
};

type Seed = { name: string; genre?: string };

function build(category: PerformerCategory, seeds: Seed[]): Performer[] {
  const pool = pools[category];
  return seeds.map((s, i) => ({
    id: `${category}-${i}`,
    name: s.name,
    category,
    genre: s.genre,
    image: pool[i % pool.length],
  }));
}

const music = build("music", [
  { name: "Jackson Browne", genre: "Rock" },
  { name: "Cole Swindell", genre: "Country" },
  { name: "Brett Young", genre: "Country" },
  { name: "Monica", genre: "Pop" },
  { name: "Kenny G", genre: "Pop" },
  { name: "Arijit Singh", genre: "Pop" },
  { name: "Ja Rule", genre: "Hip-Hop/Rap" },
  { name: "Miguel", genre: "Pop" },
  { name: "COIN", genre: "Pop" },
  { name: "The String Cheese Incident", genre: "Rock" },
  { name: "Caamp", genre: "Rock" },
  { name: "Mandy Moore", genre: "Pop" },
  { name: "Phil Lesh & Friends", genre: "Rock" },
  { name: "Raekwon", genre: "Hip-Hop/Rap" },
  { name: "Ty Dolla $ign", genre: "Hip-Hop/Rap" },
  { name: "Kaskade", genre: "Dance/EDM" },
  { name: "ILLENIUM", genre: "Dance/EDM" },
  { name: "Luke Combs", genre: "Country" },
]);

const sports = build("sports", [
  { name: "Los Angeles Lakers" },
  { name: "Los Angeles Dodgers" },
  { name: "LA Rams" },
  { name: "LA Kings" },
  { name: "LA Clippers" },
  { name: "LA Galaxy" },
]);

const arts = build("arts", [
  { name: "Hamilton" },
  { name: "Wicked" },
  { name: "The Lion King" },
  { name: "Cirque du Soleil" },
  { name: "Blue Man Group" },
  { name: "Riverdance" },
]);

export const performers: Performer[] = [...music, ...sports, ...arts];
