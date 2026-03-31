import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          darkBrown: "#4B3F36",
          terracotta: "#C97C5D",
          sand: "#E6D3B3",
          cream: "#F7F3EC",
          gray: "#8A8A8A",
          softGray: "#B0B0B0",
          black: "#1A1A1A",
          white: "#FFFFFF"
        }
      }
    }
  },
  plugins: []
};

export default config;
