import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#07101A",
        surface: {
          DEFAULT: "#0B1620",
          elevated: "#0F1E2C",
          glass: "rgba(255, 255, 255, 0.05)",
        },
        accent: {
          cyan: "#22D3EE",
          indigo: "#6366F1",
          violet: "#8B5CF6",
          teal: "#159A9C",
        },
        paper: {
          dark: "#07101A",
          surface: "#0B1620",
          subtle: "#0F1E2C",
          border: "rgba(255, 255, 255, 0.10)",
        },
        teal: {
          400: "#22d3ee",
          500: "#159a9c",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
          950: "#042f2e",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        "cyan-subtle": "0 0 20px -5px rgba(34, 211, 238, 0.2)",
        "cyan-soft": "0 10px 25px -5px rgba(34, 211, 238, 0.25)",
        "indigo-subtle": "0 0 20px -5px rgba(99, 102, 241, 0.2)",
        "ai-glow": "0 0 30px -10px rgba(99, 102, 241, 0.18), 0 0 20px -5px rgba(34, 211, 238, 0.18)",
        "teal-subtle": "0 0 20px -5px rgba(34, 211, 238, 0.2)",
        "teal-soft": "0 10px 25px -5px rgba(34, 211, 238, 0.25)",
        "card-depth": "0 10px 30px -10px rgba(0, 0, 0, 0.6)",
        "card-hover": "0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 25px -5px rgba(34, 211, 238, 0.15)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-reverse": "floatReverse 9s ease-in-out infinite",
        "shimmer": "shimmer 2.5s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        floatReverse: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(10px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
