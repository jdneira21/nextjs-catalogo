import type { Config } from 'tailwindcss'

const config: Config = {
  prefix: 'tw-',
  mode: 'jit',
  corePlugins: {
    preflight: false
  },
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      // animation: {
      //   bounce: 'bounce 1s infinite',
      // },
    }
  },
  plugins: []
}
export default config
