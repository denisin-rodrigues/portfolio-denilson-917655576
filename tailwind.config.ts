import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background layers
        bg: {
          primary: "#050505",
          surface: "#0C0D10",
          card: "#12141A",
          elevated: "#111318",
        },
        // Border tokens
        border: {
          primary: "#171A1F",
          hover: "#232833",
          subtle: "rgba(255,255,255,0.06)",
        },
        // Text tokens
        text: {
          primary: "#F5F7FA",
          secondary: "#DCE3EE",
          body: "#AEB8C6",
          caption: "#B8C0CC",
          muted: "#9AA6B5",
          dim: "#7D8794",
        },
        // Accent palette
        accent: {
          blue: "#9ED8FF",
          "blue-mid": "#74C7FF",
          "blue-light": "#C8EAFF",
          gold: "#CFAE6E",
          "gold-light": "#D6C29A",
        },
      },
      fontFamily: {
        display: ["var(--font-michroma)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      fontSize: {
        // Design system scale
        "display-xl": ["6.6rem", { lineHeight: "0.9", letterSpacing: "-0.065em" }],
        "display-lg": ["5.8rem", { lineHeight: "0.9", letterSpacing: "-0.065em" }],
        "display-md": ["4.7rem", { lineHeight: "0.9", letterSpacing: "-0.065em" }],
        "display-sm": ["3.6rem", { lineHeight: "0.9", letterSpacing: "-0.065em" }],
        "display-xs": ["2.55rem", { lineHeight: "0.9", letterSpacing: "-0.065em" }],
        "heading-xl": ["3.2rem", { lineHeight: "0.98", letterSpacing: "-0.045em" }],
        "heading-lg": ["2.5rem", { lineHeight: "0.98", letterSpacing: "-0.045em" }],
        "heading-md": ["2rem", { lineHeight: "0.98", letterSpacing: "-0.045em" }],
        "heading-sm": ["1.4rem", { lineHeight: "1.2", letterSpacing: "-0.03em" }],
        "heading-xs": ["1.2rem", { lineHeight: "1.2", letterSpacing: "-0.03em" }],
        "body-lg": ["1rem", { lineHeight: "1.7" }],
        "body-md": ["0.95rem", { lineHeight: "1.7" }],
        "label-lg": ["11px", { lineHeight: "1.4", letterSpacing: "0.18em" }],
        "label-md": ["10px", { lineHeight: "1.4", letterSpacing: "0.18em" }],
        "label-sm": ["9px", { lineHeight: "1.4", letterSpacing: "0.16em" }],
      },
      letterSpacing: {
        display: "-0.065em",
        heading: "-0.045em",
        subheading: "-0.03em",
        label: "0.18em",
        "label-tight": "0.16em",
        "label-wide": "0.2em",
      },
      animation: {
        "marquee-left": "marquee-left 40s linear infinite",
        "marquee-right": "marquee-right 40s linear infinite",
        "spin-slow": "spin 4s linear infinite",
        "beam-slide": "beam-slide 3s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "fade-in": "fade-in 0.8s ease-out forwards",
      },
      keyframes: {
        "marquee-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "beam-slide": {
          "0%": { top: "-150px", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { top: "100%", opacity: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
