const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f13a01',
        border: 'hsl(240, 5%, 84%)',
        ring: 'hsl(240, 5%, 64%)',
        background: 'hsl(0, 0%, 100%)',
        foreground: 'hsl(240, 10%, 4%)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(function ({ addVariant }) {
      addVariant('dark', '&:is(.dark *)');
    }),
  ],
}
