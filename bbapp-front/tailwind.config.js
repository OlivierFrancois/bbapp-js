import daisyui0 from "daisyui/src/theming/themes";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        default : {
          ...daisyui0["light"],

          "--rounded-btn": "0.3rem",
          "primary": '#7ACFB0',
          "primary-content": '#030F2B',

          "secondary": '#FBCE9E',
          "secondary-content": '#030F2B',

          "accent": '#fff',
          "accent-focus": '#fff',
          "accent-content": '#fff',
        },
      },
      "dark",
    ],
  }
}