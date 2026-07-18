import forms from '@tailwindcss/forms'
import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.tsx',
  ],
  safelist: [
    'shadow-surface',
    'shadow-nav',
    'shadow-card-lift',
    'shadow-cta-glow',
    'shadow-prism',
    'bg-hero-wash',
    'bg-hero-band',
    'bg-cta-wash',
    'bg-mint-lime',
    'bg-mint-blue',
    'bg-prism-surface',
    'bg-text-highlight',
    'display-hero',
    'display-xl',
    'display-lg',
    'heading-xl',
    'heading-lg',
    'body-lg',
    'body-md',
    'eyebrow',
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-body)', ...defaultTheme.fontFamily.sans],
        'id-font': ['FragmentMono-Regular', ...defaultTheme.fontFamily.sans],
        'h1-stop': ['var(--font-h1-1stop)', ...defaultTheme.fontFamily.sans],
        'h2-1stop': ['var(--font-h2-1stop)', ...defaultTheme.fontFamily.sans],
        'h3-1stop': ['var(--font-h3-1stop)', ...defaultTheme.fontFamily.sans],
        'subheader-1stop': ['var(--font-subheader-1stop)', ...defaultTheme.fontFamily.sans],
        'body-1stop': ['var(--font-body-1stop)', ...defaultTheme.fontFamily.sans],
        'small-1stop': ['var(--font-small-1stop)', ...defaultTheme.fontFamily.sans],
        'small-1stop-header': ['var(--font-small-1stop)', ...defaultTheme.fontFamily.sans],
        'xlmetric-1stop': ['var(--font-xlmetric-1stop)', ...defaultTheme.fontFamily.sans],
        'axial-label-1stop': ['var(--font-axial-label-1stop)', ...defaultTheme.fontFamily.sans],
        'data-xs-1stop': ['var(--font-data-xs-1stop)', ...defaultTheme.fontFamily.sans],
        'data-sm-1stop': ['var(--font-data-sm-1stop)', ...defaultTheme.fontFamily.sans],
        'data-md-1stop': ['var(--font-data-md-1stop)', ...defaultTheme.fontFamily.sans],
        'data-lg-1stop': ['var(--font-data-lg-1stop)', ...defaultTheme.fontFamily.sans],
        // Generic font utilities
        display: ['var(--font-display)', ...defaultTheme.fontFamily.sans],
        body: ['var(--font-body)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono],

        'font-awesome': ['Font Awesome 6 Free', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        spontaine: {
          accent: 'rgb(from var(--spontaine-accent) r g b / <alpha-value>)',
          'accent-hover': 'rgb(from var(--spontaine-accent-hover) r g b / <alpha-value>)',
          'accent-pressed': 'rgb(from var(--spontaine-accent-pressed) r g b / <alpha-value>)',
          'accent-dark': 'rgb(from var(--spontaine-accent-dark) r g b / <alpha-value>)',
          'accent-ink': 'rgb(from var(--spontaine-accent-ink) r g b / <alpha-value>)',
          highlight: 'rgb(from var(--spontaine-highlight) r g b / <alpha-value>)',
          'accent-soft': 'rgb(from var(--spontaine-accent-soft) r g b / <alpha-value>)',
          'accent-bright': 'rgb(from var(--spontaine-accent-bright) r g b / <alpha-value>)',
          'accent-ring': 'rgb(from var(--spontaine-accent-ring) r g b / <alpha-value>)',
          'accent-footer': 'rgb(from var(--spontaine-accent-footer) r g b / <alpha-value>)',

          'surface-cream': 'rgb(from var(--spontaine-surface-cream) r g b / <alpha-value>)',
          'surface-ice': 'rgb(from var(--spontaine-surface-ice) r g b / <alpha-value>)',
          'surface-paper': 'rgb(from var(--spontaine-surface-paper) r g b / <alpha-value>)',
          'surface-ink': 'rgb(from var(--spontaine-surface-ink) r g b / <alpha-value>)',
          'surface-ink-deep': 'rgb(from var(--spontaine-surface-ink-deep) r g b / <alpha-value>)',

          'text-accent-grey': 'rgb(from var(--spontaine-text-accent-grey) r g b / <alpha-value>)',
          'text-accent-dark': 'rgb(from var(--spontaine-text-accent-dark) r g b / <alpha-value>)',
          'text-primary': 'rgb(from var(--spontaine-text-primary) r g b / <alpha-value>)',
          'text-secondary': 'rgb(from var(--spontaine-text-secondary) r g b / <alpha-value>)',
          'text-tertiary': 'rgb(from var(--spontaine-text-tertiary) r g b / <alpha-value>)',
          'text-on-dark': 'rgb(from var(--spontaine-text-on-dark) r g b / <alpha-value>)',
          'text-on-dark-secondary':
            'rgb(from var(--spontaine-text-on-dark-secondary) r g b / <alpha-value>)',
          'text-on-accent': 'rgb(from var(--spontaine-text-on-accent) r g b / <alpha-value>)',

          'border-subtle': 'rgb(from var(--spontaine-border-subtle) r g b / <alpha-value>)',
          'border-medium': 'rgb(from var(--spontaine-border-medium) r g b / <alpha-value>)',
          'border-on-dark': 'rgb(from var(--spontaine-border-on-dark) r g b / <alpha-value>)',
          'border-glass-edge': 'rgb(from var(--spontaine-border-glass-edge) r g b / <alpha-value>)',
          'border-glass-edge-top':
            'rgb(from var(--spontaine-border-glass-edge-top) r g b / <alpha-value>)',

          success: 'rgb(from var(--spontaine-success) r g b / <alpha-value>)',
          warning: 'rgb(from var(--spontaine-warning) r g b / <alpha-value>)',
          error: 'rgb(from var(--spontaine-error) r g b / <alpha-value>)',
          'error-soft': 'rgb(from var(--spontaine-error-soft) r g b / <alpha-value>)',
          'overlay-scrim': 'rgb(from var(--spontaine-overlay-scrim) r g b / <alpha-value>)',

          dark: 'rgb(from var(--spontaine-dark) r g b / <alpha-value>)',
          'dark-bg': 'rgb(from var(--spontaine-dark-bg) r g b / <alpha-value>)',
          gray: 'rgb(from var(--spontaine-gray) r g b / <alpha-value>)',
          'gray-warm': 'rgb(from var(--spontaine-gray-warm) r g b / <alpha-value>)',
          'gray-cool': 'rgb(from var(--spontaine-gray-cool) r g b / <alpha-value>)',
          'gray-soft': 'rgb(from var(--spontaine-gray-soft) r g b / <alpha-value>)',
          'gray-muted': 'rgb(from var(--spontaine-gray-muted) r g b / <alpha-value>)',
          'gray-deep': 'rgb(from var(--spontaine-gray-deep) r g b / <alpha-value>)',

          light: 'rgb(from var(--spontaine-light) r g b / <alpha-value>)',
          'light-ice': 'rgb(from var(--spontaine-light-ice) r g b / <alpha-value>)',
          'light-blue': 'rgb(from var(--spontaine-light-blue) r g b / <alpha-value>)',

          white: 'rgb(from var(--spontaine-white) r g b / <alpha-value>)',
          'white-soft': 'rgb(from var(--spontaine-white-soft) r g b / <alpha-value>)',
          'white-faint': 'rgb(from var(--spontaine-white-faint) r g b / <alpha-value>)',

          'icon-bg': 'rgb(from var(--spontaine-icon-bg) r g b / <alpha-value>)',
          'icon-text': 'rgb(from var(--spontaine-icon-text) r g b / <alpha-value>)',

          'dpa-card': '#F7F7F7',
          'dpa-header': '#D1DAF0',
          'dpa-title': '#34495E',
          'dpa-accent': '#47A88E',
          'dpa-summary': '#333333',
          'dpa-muted': '#666666',
          'dpa-divider': '#DDDDDD',
          'resources-bg': 'rgb(from var(--spontaine-resources-bg) r g b / <alpha-value>)',
        },
        primary: {
          50: '#f1f4ff', //light gray
          100: '#e6ecff',
          200: '#d1ddff',
          300: '#acbfff',
          400: '#7d95ff',
          500: '#4962ff', //links
          600: '#2435ff',
          700: '#1220ef',
          800: '#0e1ac9',
          900: '#0c148d', // buttons
          950: '#051070', //title
        },
        secondary: {
          50: '#f8f8ee',
          100: '#ecedd4',
          200: '#ddddab',
          300: '#cac77a',
          400: '#b9b256',
          500: '#a49945', //gold
          600: '#92813c',
          700: '#766332',
          800: '#635230',
          900: '#56452d',
          950: '#312517', //body
        },
        tertiary: {
          50: '#f0f6fe',
          100: '#dce9fd',
          200: '#c1dafc',
          300: '#97c3f9',
          400: '#65a3f5',
          500: '#4181f0',
          600: '#2c63e4',
          700: '#234ed2',
          800: '#2341aa',
          900: '#223a86',
          950: '#17224b', //gradient backgroud dark (from)
        },
        neutral: {
          50: '#fcfdfd', //background color light
          100: '#ecf2f2',
          200: '#d5e2e1',
          300: '#b0c9c7',
          400: '#85aba8',
          500: '#66918d',
          600: '#517875',
          700: '#426260',
          800: '#395352',
          900: '#334746',
          950: '#222f2f',
        },

        beige: {
          50: '#f9f9f9', //alt backgroud color light
          100: '#efefef',
          200: '#dcdcdc',
          300: '#bdbdbd',
          400: '#989898',
          500: '#7c7c7c',
          600: '#656565',
          700: '#525252',
          800: '#464646',
          900: '#3d3d3d',
          950: '#292929',
        },

        'primary-dark': {
          50: '#f1f5fd',
          100: '#e0e9f9',
          200: '#c8d8f5',
          300: '#a2bfee',
          400: '#769de4',
          500: '#567ddb',
          600: '#4967d0', //gradient backgroud dark (to)
          700: '#384fbd',
          800: '#33429a',
          900: '#2e3b7a',
          950: '#20264b',
        },

        'primary-graige': {
          50: '#f1f7fd',
          100: '#e0eef9',
          200: '#c7e1f6',
          300: '#a1cfef',
          400: '#74b4e6',
          500: '#5497dd',
          600: '#3f7dd1',
          700: '#3669bf',
          800: '#31569c',
          900: '#2f4e83', //banner title
          950: '#1f2e4c',
        },

        'neutral-graige': {
          50: '#f9f9f9',
          100: '#f3f4f4',
          200: '#e9ebeb',
          300: '#d7d9db',
          400: '#c0c3c5',
          500: '#a5aaad',
          600: '#878c91', //description
          700: '#7c8185',
          800: '#686b6f',
          900: '#56595c',
          950: '#383a3d',
        },

        'black-secondary': {
          50: '#eff7fc',
          100: '#d6eaf7',
          200: '#b2d6ef',
          300: '#7db7e3',
          400: '#408fd0',
          500: '#2572b5',
          600: '#215c99',
          700: '#214c7d',
          800: '#234167',
          900: '#213858',
          950: '#020407', //Menu
        },

        'black-tertiary': {
          50: '#f1f4fe',
          100: '#e3e9fb',
          200: '#c0d1f7',
          300: '#88aaf1',
          400: '#487fe8',
          500: '#215fd6',
          600: '#1346b6',
          700: '#103794',
          800: '#12327a',
          900: '#142b66',
          950: '#010205', //Links, buttons, sub title
        },

        highlight: {
          50: '#fef3ef',
          100: '#fde7e0',
          200: '#fbd0c0',
          300: '#f8b8a1',
          400: '#f6a181',
          500: '#f48962',
          600: '#c36e4e',
          700: '#92523b',
          800: '#623727',
          900: '#311b14',
        },
        alert: {
          50: '#f6fcf8',
          100: '#eef9f0',
          200: '#dcf3e1',
          300: '#cbecd2',
          400: '#b9e6c3',
          500: '#a8e0b4',
          600: '#86b390',
          700: '#65866c',
          800: '#435a48',
          900: '#222d24',
        },
      },
      borderWidth: {
        3: '3px',
        5: '5px',
        10: '10px',
      },
      borderRadius: {
        'section-sm': 'var(--radius-section-sm)',
        'section-md': 'var(--radius-section-md)',
        'section-lg': 'var(--radius-section-lg)',
        'section-xl': 'var(--radius-section-xl)',
      },
      boxShadow: {
        'spontaine-dpa': '0 4px 15px rgba(0, 0, 0, 0.05)',
        surface: 'var(--shadow-surface)',
        nav: 'var(--shadow-nav)',
        'card-lift': 'var(--shadow-card-lift)',
        'cta-glow': 'var(--shadow-cta-glow)',
        prism: 'var(--shadow-prism)',
      },
      backgroundImage: {
        'hero-wash': 'var(--gradient-hero-wash)',
        'hero-band': 'var(--gradient-hero-band)',
        'cta-wash': 'var(--gradient-cta-wash)',
        'mint-lime': 'var(--gradient-mint-lime)',
        'mint-blue': 'var(--gradient-mint-blue)',
        'prism-surface': 'var(--gradient-prism-surface)',
        'text-highlight': 'var(--gradient-text-highlight)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        reveal: {
          '0%': {
            clipPath: 'inset(0 0 100% 0)',
            transform: 'translateY(20px)',
            opacity: '0',
          },
          '100%': {
            clipPath: 'inset(0 0 0 0)',
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        'ken-burns': {
          '0%': {
            transform: 'scale(1) translate(0px, 0px)',
          },
          '50%': {
            transform: 'scale(1.08) translate(-2px, -1px)',
          },
          '100%': {
            transform: 'scale(1.12) translate(-4px, -2px)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shimmer: 'shimmer 2s linear infinite',
        reveal: 'reveal 2.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'ken-burns': 'ken-burns 20s ease-out infinite alternate',
      },
    },
  },
  plugins: [forms, require('tailwindcss-animate')],
}
