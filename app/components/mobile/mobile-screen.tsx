import type { ReactNode } from "react";
import MobileTitleHeader from "./mobile-title-header";
import MobileTabBar from "./mobile-tabbar";

export default function MobileScreen({
  title,
  backHref,
  header,
  children,
}: {
  title?: string;
  backHref?: string;
  header?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[600px] flex-col bg-tm-surface pb-24 text-tm-ink">
      {header ?? (title ? <MobileTitleHeader title={title} backHref={backHref} /> : null)}
      <main className="flex-1">{children}</main>
      <MobileTabBar />
    </div>
  );
}
