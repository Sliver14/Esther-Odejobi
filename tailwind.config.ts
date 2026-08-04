import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // if you have a src folder
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", "class"],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			'primary-foreground': 'hsl(var(--primary-foreground))',
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			'secondary-foreground': 'hsl(var(--secondary-foreground))',
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			'accent-foreground': 'hsl(var(--accent-foreground))',
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			'muted-foreground': 'hsl(var(--muted-foreground))',
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			'destructive-foreground': 'hsl(var(--destructive-foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			'card-foreground': 'hsl(var(--card-foreground))',
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			'popover-foreground': 'hsl(var(--popover-foreground))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			'rich-black': 'hsl(var(--rich-black))',
  			'dark-green': 'hsl(var(--dark-green))',
  			'bangladesh-green': 'hsl(var(--bangladesh-green))',
  			'mountain-meadow': 'hsl(var(--mountain-meadow))',
  			'caribbean-green': 'hsl(var(--caribbean-green))',
  			'anti-flash-white': 'hsl(var(--anti-flash-white))',
  			pine: 'hsl(var(--pine))',
  			basil: 'hsl(var(--basil))',
  			forest: 'hsl(var(--forest))',
  			frog: 'hsl(var(--frog))',
  			mint: 'hsl(var(--mint))',
  			'sidebar-background': 'hsl(var(--sidebar-background))',
  			'sidebar-foreground': 'hsl(var(--sidebar-foreground))',
  			'sidebar-primary': 'hsl(var(--sidebar-primary))',
  			'sidebar-primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  			'sidebar-accent': 'hsl(var(--sidebar-accent))',
  			'sidebar-accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  			'sidebar-border': 'hsl(var(--sidebar-border))',
  			'sidebar-ring': 'hsl(var(--sidebar-ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
        gold: '#FFA300',
        'gold-hover': '#D98B00',
        orange: '#FF3C00',
        'royal-blue': '#00684A',
        'royal-blue-dark': '#004D36',
        'brand-green': '#004BB7',
        'brand-green-dark': '#002D6E',
        'brand-gray': '#ebebed',
        ink: '#001333',
        paper: '#ffffff',
        'paper-2': '#f8fafc'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			sans: [
  				'Outfit',
  				'system-ui',
  				'sans-serif'
  			],
        lexendDeca: [
          'var(--font-lexend-deca)',
          'sans-serif'
        ]
  		},
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite'
      },
      keyframes: {
        floaty: {
          '0%, 100%': {
            transform: 'translateY(0px) rotate(0deg)'
          },
          '50%': {
            transform: 'translateY(-12px) rotate(1.5deg)'
          }
        },
        marquee: {
          '0%': {
            transform: 'translateX(0)'
          },
          '100%': {
            transform: 'translateX(-50%)'
          }
        }
      }
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;