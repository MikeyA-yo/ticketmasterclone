import Link from "next/link";
import Logo from "./logo";

const columns: { title: string; links: string[] }[] = [
  {
    title: "Helpful Links",
    links: ["Help / FAQ", "My Account", "Gift Cards", "Sell", "VIP & Premium Seats", "Accessible Seating"],
  },
  {
    title: "Our Network",
    links: ["Ticketmaster", "Live Nation", "House of Blues", "Front Gate Tickets", "Festicket", "TicketWeb"],
  },
  {
    title: "Things To Do",
    links: ["Concert Tickets", "Sports Tickets", "Theater Tickets", "Family Events", "Festivals", "Last Minute Deals"],
  },
  {
    title: "Top Cities",
    links: ["New York", "Los Angeles", "Chicago", "Las Vegas", "Boston", "Dallas"],
  },
];

const socials = ["Facebook", "Instagram", "X", "TikTok", "YouTube"];

export default function SiteFooter() {
  return (
    <footer className="mt-6 bg-tm-ink text-white">
      {/* Newsletter strip */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-4 px-4 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-6">
          <div>
            <h3 className="text-xl font-extrabold tracking-tight">
              Never miss your favorite events
            </h3>
            <p className="mt-1 text-sm text-white/70">
              Get presale alerts, recommendations, and event news straight to your inbox.
            </p>
          </div>
          <form
            className="flex w-full max-w-md gap-2"
            action="#"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="h-11 flex-1 rounded-full border border-white/20 bg-white/10 px-4 text-sm text-white placeholder:text-white/50 outline-none focus:border-white focus:bg-white/15"
            />
            <button
              type="submit"
              className="h-11 shrink-0 rounded-full bg-tm-blue px-6 text-sm font-bold text-white transition hover:bg-tm-blue-dark"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {/* Link columns */}
      <div className="mx-auto grid max-w-[1320px] grid-cols-2 gap-8 px-4 py-12 sm:grid-cols-3 lg:grid-cols-5 lg:px-6">
        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <Logo variant="white" />
          <p className="mt-3 max-w-xs text-sm text-white/60">
            The official source for tickets to concerts, sports, theater, and family events.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {socials.map((s) => (
              <Link
                key={s}
                href="#"
                aria-label={s}
                className="grid h-9 min-w-9 place-items-center rounded-full bg-white/10 px-3 text-xs font-semibold text-white/80 transition hover:bg-white/20"
              >
                {s}
              </Link>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white/80">
              {col.title}
            </h4>
            <ul className="mt-3 space-y-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-sm text-white/60 transition hover:text-white"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Legal bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-3 px-4 py-6 text-xs text-white/50 lg:flex-row lg:items-center lg:justify-between lg:px-6">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {["Privacy Policy", "Terms of Use", "Cookie Settings", "Your Privacy Choices", "Accessibility", "Do Not Sell My Info"].map(
              (l) => (
                <Link key={l} href="#" className="transition hover:text-white">
                  {l}
                </Link>
              )
            )}
          </div>
          <p>© {2026} Ticketmaster. Clone for demo purposes only.</p>
        </div>
      </div>
    </footer>
  );
}
