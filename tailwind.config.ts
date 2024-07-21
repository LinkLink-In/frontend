import { fontFamily } from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';

const config: Config = {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: ['dark'],
	theme: {
		colors: {
			light: {
				surface: {
					main: '#FBF8FF',
					container: '#EEECF8',
					'container-low': '#F4F2FE',
					'container-high': '#E9E7F3',
					'container-highest': '#E3E1ED',
					on: '#1A1B23'
				},
				primary: {
					main: '#394ED9',
					secondary: '#A1A3FC',
					'secondary-on': '#030668'
				},
				outline: '#A1A3FC',
				error: {
					container: '#FFDAD6',
					main: '#BA1A1A'
				}
			},
			dark: {
				surface: {
					main: '#12131B',
					container: '#1E1F27',
					'container-low': '#1A1B23',
					'container-high': '#292932',
					'container-highest': '#34343D',
					on: '#E3E1ED'
				},
				primary: {
					main: '#263BC5',
					secondary: '#343C72',
					'secondary-on': '#A1A3FC'
				},
				outline: '#343C72',
				error: {
					container: '#690005',
					main: '#FFB4AB'
				}
			},
			black: '#1A1B32',
			blue: '#394ED9',
			purple: '#A1A3FC',
			orange: '#F37C5A',
			bg_white: '#EEECF8'
		},
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border) / <alpha-value>)',
				input: 'hsl(var(--input) / <alpha-value>)',
				ring: 'hsl(var(--ring) / <alpha-value>)',
				background: 'hsl(var(--background) / <alpha-value>)',
				foreground: 'hsl(var(--foreground) / <alpha-value>)',
				primary: {
					DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
					foreground: 'hsl(var(--primary-foreground) / <alpha-value>)'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
					foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
					foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
					foreground: 'hsl(var(--muted-foreground) / <alpha-value>)'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
					foreground: 'hsl(var(--accent-foreground) / <alpha-value>)'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
					foreground: 'hsl(var(--popover-foreground) / <alpha-value>)'
				},
				card: {
					DEFAULT: 'hsl(var(--card) / <alpha-value>)',
					foreground: 'hsl(var(--card-foreground) / <alpha-value>)'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: [...fontFamily.sans]
			},
			screens: {
				sm: '0px',
				md: '750px'
			}
		}
	}
};

export default config;
