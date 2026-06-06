import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  icon?: ReactNode;
  tone?: "light" | "dark";
};

export function SectionHeading({ eyebrow, title, icon, tone = "light" }: SectionHeadingProps) {
  return (
    <div className="flex items-end justify-between gap-5">
      <div>
        <p
          className={`font-display text-xs font-black uppercase tracking-[.22em] ${
            tone === "dark" ? "text-volt" : "text-copper"
          }`}
        >
          {eyebrow}
        </p>
        <h2 className="mt-2 font-display text-4xl font-black uppercase">{title}</h2>
      </div>
      {icon}
    </div>
  );
}
