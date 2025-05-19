module.exports = {
  darkMode: 'class', // Dark mode enabled via class
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"], // ✅ updated from 'purge' to 'content'
  theme: {
    extend: {
      animation: {
        'fade-in-down': 'fadeInDown 0.6s ease-out',
      },
      keyframes: {
        fadeInDown: {
          '0%': { opacity: 0, transform: 'translateY(-20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
