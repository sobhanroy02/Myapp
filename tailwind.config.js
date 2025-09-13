module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e6f6ff',
          200: '#bfe9ff',
          300: '#7fd6ff',
          400: '#39b6ff',
          500: '#0b84e6',
          600: '#0966b4',
          700: '#084f8a',
          800: '#063a62',
          900: '#04283f'
        },
        secondary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d'
        },
        accent: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a'
        },
        warning: {
          50: '#fffbea',
          100: '#fff3c4',
          200: '#fce588',
          300: '#f9d44b',
          400: '#f7c948',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f'
        }
      },
      borderRadius: {
        'xl-2': '1.25rem'
      },
      boxShadow: {
        'soft-lg': '0 10px 30px rgba(2,6,23,0.08)'
      }
    }
  },
  plugins: [],
}
