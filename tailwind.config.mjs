/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "fp-navy":   "#0a0e1a",
        "fp-purple": "#2d1b69",
        "fp-dark":   "#050810",
        "fp-gold":   "#c9a84c",
        "fp-pearl":  "#e8e0d0",
        "fp-glow":   "#8ba7d9",
      },
      fontFamily: {
        serif: ["Georgia", "Yu Mincho", "YuMincho", "serif"],
        sans:  ["system-ui", "Hiragino Kaku Gothic ProN", "sans-serif"],
      },
      lineHeight: {
        relaxed: "1.8",
        loose:   "2.0",
      },
    },
  },
  plugins: [],
};
