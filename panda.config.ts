import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  theme: {
    extend: {
      tokens: {
        colors: {
          wine: {
            50: { value: '#fdf3f4' },
            100: { value: '#fbe4e6' },
            200: { value: '#f6cdd2' },
            300: { value: '#eda7b0' },
            400: { value: '#e07686' },
            500: { value: '#ce4a5e' },
            600: { value: '#b52f44' },
            700: { value: '#982234' },
            800: { value: '#802030' },
            900: { value: '#6b1f2b' },
            950: { value: '#3f0d16' },
          },
          gold: {
            400: { value: '#F3D250' },
            500: { value: '#D4AF37' },
            600: { value: '#AA8C2C' },
            700: { value: '#806921' },
          },
          charcoal: {
            900: { value: '#0f0f13' },
            800: { value: '#16161b' },
            700: { value: '#22222a' },
          }
        },
        fonts: {
          heading: { value: 'Inter, sans-serif' },
          body: { value: 'Inter, sans-serif' }
        }
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'blur(8px)' },
          '50%': { opacity: '1', filter: 'blur(12px)' },
        }
      }
    },
  },
  outdir: "styled-system",
});
