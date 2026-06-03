import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        asphalt: "#171614",
        ember: "#fc4c02",
        copper: "#b9632f",
        volt: "#d8ff4f",
        paper: "#fff8ea",
        fog: "#e9e2d3"
      },
      fontFamily: {
        display: ["Sora", "ui-sans-serif", "system-ui"],
        body: ["Manrope", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        hard: "8px 8px 0 #171614",
        glow: "0 24px 90px rgba(252, 76, 2, 0.18)"
      },
      backgroundImage: {
        grid:
          "linear-gradient(rgba(23,22,20,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(23,22,20,.08) 1px, transparent 1px)",
        noise:
          "radial-gradient(circle at 1px 1px, rgba(23,22,20,.13) 1px, transparent 0)"
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        pulseLine: {
          "0%, 100%": { opacity: ".55", transform: "scaleX(.92)" },
          "50%": { opacity: "1", transform: "scaleX(1)" }
        }
      },
      animation: {
        rise: "rise .7s ease both",
        "pulse-line": "pulseLine 2.2s ease-in-out infinite"
      }
    }
  },
  plugins: []
} satisfies Config;
