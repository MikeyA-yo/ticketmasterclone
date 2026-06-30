"use client";

import { useState } from "react";
import type { ComponentType, ReactNode } from "react";
import {
  Mail,
  Bell,
  MapPin,
  Navigation,
  Heart,
  SquarePen,
  ShieldCheck,
  Wallet,
  CircleQuestionMark,
  MessageSquareText,
  ScrollText,
  ChevronRight,
  type LucideProps,
} from "lucide-react";
import FlagUS from "./flag-us";

type Icon = ComponentType<LucideProps>;

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="py-5">
      <h2 className="mb-1.5 text-xl font-extrabold tracking-tight text-tm-ink">
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}

function RowShell({
  icon: Icon,
  iconNode,
  label,
  badge,
  right,
}: {
  icon?: Icon;
  iconNode?: ReactNode;
  label: string;
  badge?: number;
  right: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3.5 py-3.5">
      <span className="grid h-6 w-6 shrink-0 place-items-center text-tm-ink">
        {iconNode ?? (Icon ? <Icon className="h-6 w-6" strokeWidth={1.75} /> : null)}
      </span>
      <span className="flex flex-1 items-center gap-2 text-[17px] text-tm-ink">
        {label}
        {badge ? (
          <span className="grid h-5 min-w-5 place-items-center rounded-full bg-rose-600 px-1 text-xs font-bold text-white">
            {badge}
          </span>
        ) : null}
      </span>
      {right}
    </div>
  );
}

function LinkRow(props: { icon?: Icon; iconNode?: ReactNode; label: string; badge?: number; href?: string }) {
  return (
    <a href={props.href ?? "#"} className="block active:bg-black/[0.03]">
      <RowShell
        {...props}
        right={<ChevronRight className="h-5 w-5 shrink-0 text-tm-ink-soft" />}
      />
    </a>
  );
}

function ValueRow({
  icon,
  iconNode,
  label,
  value,
}: {
  icon?: Icon;
  iconNode?: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <RowShell
      icon={icon}
      iconNode={iconNode}
      label={label}
      right={
        <button type="button" className="flex items-center gap-1.5 text-tm-blue">
          <span className="text-[17px] font-bold">{value}</span>
          <SquarePen className="h-5 w-5" strokeWidth={1.75} />
        </button>
      }
    />
  );
}

function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setOn((v) => !v)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
        on ? "bg-tm-blue" : "bg-tm-surface-2"
      }`}
    >
      <span
        className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all ${
          on ? "left-[1.375rem]" : "left-0.5"
        }`}
      />
    </button>
  );
}

function ToggleRow({ icon, label, defaultOn }: { icon: Icon; label: string; defaultOn?: boolean }) {
  return <RowShell icon={icon} label={label} right={<Toggle defaultOn={defaultOn} />} />;
}

function Divider() {
  return <hr className="border-tm-line" />;
}

function AppIconGlyph() {
  return (
    <span className="grid h-6 w-6 place-items-center rounded-md border border-tm-ink text-[13px] font-bold italic leading-none">
      t
    </span>
  );
}

export default function AccountScreen() {
  return (
    <div className="px-4">
      <Section title="Notifications">
        <LinkRow icon={Mail} label="My Notifications" badge={1} />
        <ToggleRow icon={Bell} label="Receive Notifications?" />
      </Section>
      <Divider />

      <Section title="Location Settings">
        <ValueRow icon={MapPin} label="My Location" value="Los Angeles, CA" />
        <ValueRow
          iconNode={<FlagUS className="h-6 w-6 rounded-full ring-1 ring-black/10" />}
          label="My Country"
          value="United States"
        />
        <ToggleRow icon={Navigation} label="Location Based Content" />
      </Section>
      <Divider />

      <Section title="Preferences">
        <LinkRow icon={Heart} label="My Favorites" />
        <LinkRow icon={SquarePen} label="Edit Details" />
        <LinkRow icon={ShieldCheck} label="Security" />
        <LinkRow icon={Wallet} label="Saved Payment Methods" />
        <LinkRow iconNode={<AppIconGlyph />} label="Change App Icon" />
      </Section>
      <Divider />

      <Section title="Help &amp; Guidance">
        <LinkRow icon={CircleQuestionMark} label="Need Help?" />
        <LinkRow icon={MessageSquareText} label="Give Us Feedback" />
        <LinkRow icon={ShieldCheck} label="Privacy" />
        <LinkRow icon={ScrollText} label="Legal" />
      </Section>
    </div>
  );
}
