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
        paper: {
          dark: "#0a0d12",
          surface: "#0f141c",
          subtle: "#151b26",
          border: "rgba(255, 255, 255, 0.08)",
        },
        teal: {
          400: "#2dd4bf",
          500: "#14b8a6",
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
        "teal-subtle": "0 0 20px -5px rgba(20, 184, 166, 0.2)",
        "teal-soft": "0 10px 25px -5px rgba(15, 118, 110, 0.25)",
        "card-depth": "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
        "card-hover": "0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 25px -5px rgba(20, 184, 166, 0.15)",
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
