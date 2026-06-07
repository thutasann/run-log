import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const commands = [
  { label: "Overview", path: "/" },
  { label: "Goals", path: "/goals" },
  { label: "Year rewind", path: "/goals#year-rewind" },
  { label: "Streak story", path: "/goals#streak-story" },
  { label: "Activity feed", path: "/activity" },
  { label: "Timeline", path: "/activity#timeline" },
  { label: "Routes", path: "/activity#routes" },
  { label: "Share card", path: "/#share-card" }
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const filteredCommands = commands.filter((command) => command.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }

      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const jumpTo = (path: string) => {
    const [pathname, hash] = path.split("#");
    navigate(pathname);
    window.setTimeout(() => {
      if (hash) document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
    setOpen(false);
    setQuery("");
  };

  return (
    <>
      <button
        type="button"
        className="fixed bottom-5 right-5 z-40 hidden border-2 border-asphalt bg-volt px-4 py-3 font-display text-xs font-black uppercase shadow-hard transition hover:-translate-y-0.5 sm:inline-flex"
        onClick={() => setOpen(true)}
      >
        Cmd K
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-asphalt/70 px-5 py-20 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div
            className="mx-auto max-w-xl border-2 border-asphalt bg-paper p-4 shadow-hard"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-2 border-asphalt bg-white px-3 py-2">
              <Search size={18} />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full bg-transparent font-display text-sm font-black uppercase outline-none"
                placeholder="Jump to..."
              />
              <button type="button" onClick={() => setOpen(false)} aria-label="Close command palette">
                <X size={18} />
              </button>
            </div>
            <div className="mt-3 grid gap-2">
              {filteredCommands.map((command) => (
                <button
                  key={command.path}
                  type="button"
                  className="flex items-center justify-between border-2 border-asphalt bg-white px-4 py-3 text-left font-display text-sm font-black uppercase transition hover:bg-volt"
                  onClick={() => jumpTo(command.path)}
                >
                  {command.label}
                  <span className="text-asphalt/40">Enter</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
