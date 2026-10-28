import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#081421',
        mist: '#edf2f7',
        sand: '#f9f3ea',
        brand: {
          50: '#f0f5ff',
          100: '#dfeafe',
          200: '#bfd7ff',
          300: '#93bcff',
          400: '#5f93ff',
          500: '#2d64eb',
          600: '#1f4ec5',
          700: '#1d3f9e',
          800: '#1d346d',
          900: '#1b2b50'
        }
      },
      boxShadow: {
        soft: '0 18px 40px rgba(15, 23, 42, 0.15)'
      },
      backgroundImage: {
        glow: 'radial-gradient(circle at top, rgba(59,130,246,0.28), transparent 38%)'
      }
    }
  },
  plugins: []
};

export default config;
