import type { ReactNode } from "react";

export function MobileSectionHeading({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <div>
        <span className="mb-2 block h-1 w-9 rounded-full bg-tm-ink" />
        <h2 className="text-2xl font-extrabold uppercase leading-none tracking-tight text-tm-ink">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}
