import type { ReactNode } from "react";

type IconButtonProps = {
  label: string;
  children: ReactNode;
  onClick: () => void;
  variant?: "dark" | "light";
};

export function IconButton({ label, children, onClick, variant = "dark" }: IconButtonProps) {
  return (
    <button
      type="button"
      className={`grid h-9 w-9 place-items-center border-2 border-asphalt transition hover:-translate-y-0.5 ${
        variant === "dark" ? "bg-asphalt text-paper" : "bg-paper text-asphalt hover:bg-volt"
      }`}
      onClick={onClick}
      aria-label={label}
    >
      {children}
    </button>
  );
}
