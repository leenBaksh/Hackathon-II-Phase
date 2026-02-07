import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
       colors: {
         background: "var(--background)",
         foreground: "var(--foreground)",
         brand: {
           50: "#eff6ff",
           100: "#dbeafe", 
           200: "#bfdbfe",
           300: "#93c5fd",
           400: "#60a5fa",
           500: "#3b82f6",
           600: "#2563eb",
           700: "#1d4ed8",
           800: "#1e40af",
           900: "#1e3a8a",
           950: "#172554",
         },
         cyan: {
           50: "#ecfeff",
           100: "#cffafe",
           200: "#a5f3fc",
           300: "#67e8f9",
           400: "#22d3ee",
           500: "#06b6d4",
           600: "#0891b2",
           700: "#0e7490",
           800: "#155e75",
           900: "#164e63",
           950: "#083344",
         },
         teal: {
           50: "#f0fdfa",
           100: "#ccfbf1",
           200: "#99f6e4",
           300: "#5eead4",
           400: "#2dd4bf",
           500: "#14b8a6",
           600: "#0d9488",
           700: "#0f766e",
           800: "#115e59",
           900: "#134e4a",
           950: "#042f2e",
         },
       },
    },
  },
  plugins: [],
};

export default config;
