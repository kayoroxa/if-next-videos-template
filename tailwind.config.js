/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

const myClass = plugin(({ addUtilities }) => {
  addUtilities({
    '.rotate-y-180': {
      transform: 'rotateY(180deg)',
    },
    '.preserve-3d': {
      transformStyle: 'preserve-3d',
    },
    '.perspective': {
      perspective: '1000px',
    },
    '.backface-hidden': {
      backfaceVisibility: 'hidden',
    },
  })
})

const translateZ = plugin(function ({ matchUtilities, theme }) {
  matchUtilities(
    {
      'translate-z': value => ({
        '--tw-translate-z': value,
        transform: ` translate3d(var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`,
      }), // this is actual CSS
    },

    { values: theme('translate'), supportsNegativeValues: true }
  )
})

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        walk: {
          '0%': { transform: 'translateX(0px)' },
          '100%': { transform: 'translateX(-20px), scale(105)' },
        },
      },
      animation: {
        walk: 'walk 10s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [myClass, translateZ],
}
