export default function FlagUS({ className = "h-5 w-7 rounded-[3px]" }: { className?: string }) {
  return (
    <span className={`inline-block shrink-0 overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 24 16"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-label="United States"
      >
        <rect width="24" height="16" fill="#B22234" />
        <g fill="#fff">
          <rect y="1.85" width="24" height="1.23" />
          <rect y="4.31" width="24" height="1.23" />
          <rect y="6.77" width="24" height="1.23" />
          <rect y="9.23" width="24" height="1.23" />
          <rect y="11.69" width="24" height="1.23" />
          <rect y="14.15" width="24" height="1.23" />
        </g>
        <rect width="10.5" height="8.62" fill="#3C3B6E" />
      </svg>
    </span>
  );
}
