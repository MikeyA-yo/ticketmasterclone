type LogoProps = {
  /** "blue" wordmark on light bg, or "white" wordmark on dark bg */
  variant?: "blue" | "white";
  className?: string;
  withIcon?: boolean;
  registered?: boolean;
};

export default function Logo({
  variant = "blue",
  className = "",
  withIcon = true,
  registered = false,
}: LogoProps) {
  const color = variant === "white" ? "#ffffff" : "var(--color-tm-blue)";
  return (
    <span
      className={`inline-flex items-center gap-2 ${className}`}
      aria-label="Ticketmaster"
    >
      {withIcon && (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden style={{ color }}>
          <path
            fill="currentColor"
            d="M3.2 7.8 11.4 4a1.6 1.6 0 0 1 1.3 0l8.1 3.8c.7.3.7 1.3 0 1.6l-8.1 3.8a1.6 1.6 0 0 1-1.3 0L3.2 9.4c-.7-.3-.7-1.3 0-1.6Z"
          />
          <path
            fill="currentColor"
            opacity="0.55"
            d="m4 13.2 7.4 3.4a1.6 1.6 0 0 0 1.3 0l7.4-3.4-1.9-.9-5.5 2.5a1.6 1.6 0 0 1-1.3 0L5.9 12.3 4 13.2Z"
          />
        </svg>
      )}
      <span
        className="font-bold italic lowercase tracking-tight"
        style={{ color, fontSize: "1.35rem", letterSpacing: "-0.02em" }}
      >
        ticketmaster
        {registered && (
          <sup className="not-italic" style={{ fontSize: "0.5em", top: "-0.9em" }}>
            ®
          </sup>
        )}
      </span>
    </span>
  );
}
