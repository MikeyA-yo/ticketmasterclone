import { Construction } from "lucide-react";

export default function ComingSoon({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-28 text-center">
      <Construction className="h-10 w-10 text-tm-ink-soft" strokeWidth={1.5} />
      <p className="mt-4 text-lg font-bold text-tm-ink">{label}</p>
      <p className="mt-1 text-sm text-tm-ink-soft">
        This screen is coming soon — share the screenshot and I&apos;ll build it.
      </p>
    </div>
  );
}
