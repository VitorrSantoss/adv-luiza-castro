/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Identidade visual (Instagram @luizadecastroadv)
        rose: {
          DEFAULT: '#C9A39B', // cor principal
          deep: '#9E6F65', // rosé escurecido para texto
        },
        blush: '#F5E6E3', // fundo
        cream: '#FAF7F5', // cards e inputs
        ink: {
          DEFAULT: '#1A1A1A', // texto
          soft: '#4A4240', // texto secundário (AA)
        },
        gold: {
          DEFAULT: '#B8956A', // detalhes, bordas e foco
          deep: '#85663F', // dourado para texto pequeno
        },
        danger: '#9B3B34', // mensagens de erro (AA sobre blush/cream)
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        script: ['"Pinyon Script"', 'cursive'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(26, 26, 26, 0.04), 0 4px 14px rgba(138, 93, 83, 0.08)',
        lift: '0 2px 4px rgba(26, 26, 26, 0.05), 0 12px 28px rgba(138, 93, 83, 0.16)',
      },
      borderRadius: {
        '2xl': '1.125rem',
      },
    },
  },
  plugins: [],
};
