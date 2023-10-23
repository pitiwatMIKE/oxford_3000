import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "custom-primary": "#f3d2c1",
        "custom-secondary": "#8bd3dd",

        "custom-bg": "#fef6e4",
        "custom-btn": "#f582ae",
        "custom-text": "#001858",
        "custom-paragraph": "#172c66",
      },
    },
  },
  plugins: [],
};
export default config;
