// tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // pode adicionar customizações aqui
    },
  },
  plugins: [require("tailwindcss-animate")], // ✅ aqui sim!
};

export default config;
