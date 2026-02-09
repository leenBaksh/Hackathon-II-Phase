import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
theme: {
    extend: {
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
        // Custom breakpoints for specific devices
        'mobile-s': '320px',
        'mobile-m': '375px',
        'mobile-l': '425px',
        'tablet': '768px',
        'tablet-l': '1024px',
        'desktop': '1280px',
        'desktop-l': '1440px',
        'desktop-xl': '1920px',
        // Ultra-wide displays
        'ultrawide': '2560px',
        // Print and special devices
        'print': { 'raw': 'print' },
        'screen': { 'raw': 'screen' },
        // Orientation breakpoints
        'portrait': { 'raw': '(orientation: portrait)' },
        'landscape': { 'raw': '(orientation: landscape)' },
        // High DPI displays
        'retina': { 'raw': '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)' },
        // Touch devices
        'touch': { 'raw': '(hover: none) and (pointer: coarse)' },
        'mouse': { 'raw': '(hover: hover) and (pointer: fine)' },
        // Dark/Light mode
        'dark': { 'raw': '(prefers-color-scheme: dark)' },
        'light': { 'raw': '(prefers-color-scheme: light)' },
        // Reduced motion
        'motion': { 'raw': '(prefers-reduced-motion: no-preference)' },
        'motion-safe': { 'raw': '(prefers-reduced-motion: reduce)' },
      },
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
