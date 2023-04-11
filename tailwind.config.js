const plugin = require('tailwindcss/plugin');
const BgPatterns = require('tailwindcss-bg-patterns');

const CardFlipPlugin = plugin(function ({ addUtilities }) {
  addUtilities({
    ".flip-1-start": {
      transform: "perspective(2000px) rotateY(0deg)",
    },
    ".flip-1-end": {
      transform: "perspective(1000px) rotateY(180deg)",
    },
    ".flip-2-start": {
      transform: "perspective(1000px) rotateY(-180deg)"
    },
    ".flip-2-end": {
      transform: "perspective(1000px) rotateY(0deg)"
    },
    ".rotate-y-0": {
      transform: "rotateY(0)",
    },
    ".rotate-y-180": {
      transform: "rotateY(180deg)",
    },
    ".-rotate-y-180": {
      transform: "rotateY(-180deg)",
    },
    ".preserve-3d": {
      transformStyle: "preserve-3d",
    },
    ".perspective-1000": {
      perspective: "1000px",
    },
    ".perspective-2000": {
      perspective: "2000px",
    },
    ".backface-hidden": {
      backfaceVisibility: "hidden",
    },
    ".rotate-x-0": {
      transform: "rotateX(0deg)",
    },
  });
});


/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      aspectRatio: {
        '2/3': '2 / 3',
      },
      colors: {
        'craft-blue': '#3555ff',
        'craft-purple': '#8313db',
      },
      animation: {
        'gradient-x':'gradient-x 15s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
              'background-size':'200% 200%',
              'background-position': 'left center'
          },
          '50%': {
              'background-size':'200% 200%',
              'background-position': 'right center'
          }
        },
      },
    },
  },
  plugins: [
    CardFlipPlugin,
    BgPatterns,
  ],
}

