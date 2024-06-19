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
          ...require("daisyui/src/theming/themes")["light"],

          "--rounded-btn": "0.3rem",
          "primary": '#192749',
          "primary-content": '#f0f3fa',

          "secondary": '#87a8c9',
          "secondary-focus": '#b1c9ef',
          "secondary-content": '#fff',

          "accent": '#fff',
          "accent-focus": '#fff',
          "accent-content": '#fff',
        },
      },
      "dark",
    ],
  }
}