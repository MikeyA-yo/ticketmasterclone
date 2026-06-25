export default function PromoBanner() {
  return (
    <section className="mx-auto max-w-[1320px] px-4 py-7 lg:px-6">
      <div
        className="relative overflow-hidden rounded-2xl px-6 py-10 text-white sm:px-12 sm:py-14"
        style={{ background: "linear-gradient(120deg,#024ddf 0%,#026cdf 45%,#00308a 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(40% 80% at 90% 10%, rgba(255,255,255,0.7), transparent 55%), radial-gradient(40% 80% at 0% 100%, rgba(0,0,0,0.4), transparent 55%)",
          }}
        />
        <div className="relative max-w-2xl">
          <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-white/30">
            Fan Guarantee
          </span>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            Buy with confidence on Ticketmaster
          </h2>
          <p className="mt-3 text-lg text-white/90">
            Every ticket is backed by the 100% Verified Ticket guarantee — so you
            know your tickets are real and valid for entry. Get in, every time.
          </p>
          <button className="mt-6 rounded-full bg-white px-7 py-3 text-base font-bold text-tm-blue transition hover:bg-white/90 active:scale-[0.98]">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
