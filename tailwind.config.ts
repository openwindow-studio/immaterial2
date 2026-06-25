import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'immaterial-yellow': '#FFE279',
      },
      fontFamily: {
        'linux-libertine': ['Linux Libertine', 'serif'],
        'linux-libertine-display': ['Linux Libertine Display', 'serif'],
        'radice': ['Radice', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config