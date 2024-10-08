import daisyui0 from 'daisyui/src/theming/themes';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    safelist: ['bg-noon', 'bg-evening', 'text-noon', 'text-evening', 'text-dark', 'bg-dark'],
    theme: {
        extend: {
            colors: {
                noon: '#F88F52',
                evening: '#1C5588',
                dark: '#030F2B',
            },
        },
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                default: {
                    ...daisyui0['light'],

                    '--rounded-btn': '0.3rem',
                    primary: '#7ACFB0',
                    'primary-content': '#030F2B',

                    secondary: '#FBCE9E',
                    'secondary-content': '#030F2B',

                    accent: '#fff',
                    'accent-focus': '#fff',
                    'accent-content': '#fff',
                },
            },
            'dark',
        ],
    },
};
