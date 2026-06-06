type AthleteAvatarProps = {
  href: string;
  image: string;
  label: string;
  size?: "md" | "lg";
  tone?: "light" | "dark";
};

const sizeClass = {
  md: "h-12 w-12",
  lg: "h-14 w-14"
};

export function AthleteAvatar({ href, image, label, size = "md", tone = "light" }: AthleteAvatarProps) {
  return (
    <a
      href={href}
      className={`block shrink-0 overflow-hidden border-2 transition hover:-translate-y-0.5 ${
        sizeClass[size]
      } ${tone === "dark" ? "border-paper/25 bg-paper/10" : "border-asphalt bg-ember shadow-hard"}`}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
    >
      <img src={image} alt="Thuta Sann" className="h-full w-full object-cover" />
    </a>
  );
}
