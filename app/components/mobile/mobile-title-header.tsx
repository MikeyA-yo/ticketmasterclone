import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function MobileTitleHeader({
  title,
  backHref,
}: {
  title: string;
  backHref?: string;
}) {
  return (
    <div className="bg-black text-white">
      <div className="relative flex h-12 items-center justify-center px-4">
        {backHref && (
          <Link
            href={backHref}
            aria-label="Back"
            className="absolute left-2 grid h-9 w-9 place-items-center rounded-full hover:bg-white/10"
          >
            <ChevronLeft className="h-6 w-6" />
          </Link>
        )}
        <h1 className="text-[17px] font-semibold">{title}</h1>
      </div>
    </div>
  );
}
