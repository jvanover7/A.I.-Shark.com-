import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAF7F2",
        ink: "#1A1614",
        "ink-soft": "#5E574E",
        "ink-mute": "#8A8276",
        rule: "#E8E1D5",
        chrome: "#C9BFAE",
        cond: {
          glass: "#1B4D6E",
          prime: "#2D6A4F",
          rideable: "#6B8E3D",
          bumpy: "#B8860B",
          choppy: "#C4571A",
          blown: "#8B2500",
          danger: "#8B0000",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "Helvetica Neue",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
    },
  },
  plugins: [],
};

export default config;
