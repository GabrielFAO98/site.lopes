/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lopes: {
          blue: {
            DEFAULT: '#0A5C9C',
            50: '#F0F7FD',
            100: '#E0F0FA',
            200: '#B8DBF4',
            300: '#8AC1ED',
            400: '#4D9FE3',
            500: '#1D82D6',
            600: '#0A5C9C', // Cor primária do logotipo
            700: '#08487A',
            800: '#06365C',
            900: '#04223A',
          },
          orange: {
            DEFAULT: '#F37321', // Laranja do logotipo
            50: '#FFF7ED',
            100: '#FFEDD5',
            200: '#FED7AA',
            300: '#FDBA74',
            400: '#FB923C',
            500: '#F37321',
            600: '#EA580C',
            700: '#C2410C',
            800: '#9A3412',
            900: '#7C2D12',
          },
          whatsapp: {
            DEFAULT: '#25D366',
            hover: '#20BA5A',
            dark: '#128C7E',
          }
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
