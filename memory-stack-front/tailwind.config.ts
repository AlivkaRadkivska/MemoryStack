import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    height: {
      md: '30rem',
      full: '100%',
    },
    width: {
      md: '26rem',
      full: '100%',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      gray: '#BDBDBD',
      black: '#000000',
      white: '#FFFFFF',
      green: '#20423C',
      lime: '#17AB64',
      red: '#CA3030',
      blue: '#060C27',
      indigo: '#2A28AA',
      yellow: '#b9A84f',
      purple: '#7930A6',
      purpleGray: '#5F5267',
    }
  },
  plugins: [],
}
export default config
