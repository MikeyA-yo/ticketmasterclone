import Link from "next/link";
import {
  ConcertsIcon,
  SportsIcon,
  ArtsIcon,
  FamilyIcon,
} from "./icons";

const tiles = [
  { key: "concerts", label: "Concerts", Icon: ConcertsIcon, gradient: "linear-gradient(135deg,#6a11cb,#2575fc)" },
  { key: "sports", label: "Sports", Icon: SportsIcon, gradient: "linear-gradient(135deg,#11998e,#0b3866)" },
  { key: "arts-theater", label: "Arts & Theater", Icon: ArtsIcon, gradient: "linear-gradient(135deg,#f12711,#4a148c)" },
  { key: "family", label: "Family", Icon: FamilyIcon, gradient: "linear-gradient(135deg,#f7971e,#b8004a)" },
];

export default function CategoryTiles() {
  return (
    <section className="mx-auto max-w-[1320px] px-4 py-7 lg:px-6">
      <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-tm-ink">
        Browse by Category
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {tiles.map(({ key, label, Icon, gradient }) => (
          <Link
            key={key}
            href={`/${key}`}
            className="group relative flex h-28 items-center gap-3 overflow-hidden rounded-xl px-5 text-white shadow-card transition hover:-translate-y-1 hover:shadow-pop sm:h-32"
            style={{ background: gradient }}
          >
            <div
              className="absolute inset-0 opacity-30 mix-blend-overlay"
              style={{
                backgroundImage:
                  "radial-gradient(60% 80% at 85% 10%, rgba(255,255,255,0.7), transparent 55%)",
              }}
            />
            <span className="relative grid h-12 w-12 place-items-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur">
              <Icon className="h-7 w-7" />
            </span>
            <span className="relative text-lg font-extrabold tracking-tight">{label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
