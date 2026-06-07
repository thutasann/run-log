import { NavLink, Outlet } from "react-router-dom";
import { AthleteAvatar } from "../atoms/AthleteAvatar";
import { CommandPalette } from "./CommandPalette";
import { athleteImage, athleteUrl } from "../../lib/dashboard-data";

const links = [
  { label: "Overview", to: "/" },
  { label: "Goals", to: "/goals" },
  { label: "Activity", to: "/activity" }
];

export function AppShell() {
  return (
    <main className="min-h-screen overflow-hidden bg-paper text-asphalt">
      <CommandPalette />
      <header className="sticky top-0 z-30 border-b-2 border-asphalt bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <AthleteAvatar href={athleteUrl} image={athleteImage} label="Open Thuta Sann on Strava" />
            <div>
              <p className="font-display text-lg font-black uppercase leading-none">Run Log</p>
              <p className="text-xs font-bold uppercase tracking-[.24em] text-copper">Thuta Sann</p>
            </div>
          </div>
          <nav className="hidden items-center gap-2 md:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `border-2 border-asphalt px-4 py-2 font-display text-xs font-black uppercase shadow-hard transition hover:-translate-y-0.5 ${
                    isActive ? "bg-ember text-paper" : "bg-white text-asphalt"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <nav className="mx-auto grid max-w-7xl grid-cols-3 border-t-2 border-asphalt md:hidden">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-2 py-3 text-center font-display text-[11px] font-black uppercase ${
                  isActive ? "bg-ember text-paper" : "bg-paper text-asphalt"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <Outlet />
    </main>
  );
}
