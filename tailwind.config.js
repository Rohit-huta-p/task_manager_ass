module.exports = {
    content: [
      './index.html', 
      './src/**/*.{js,ts,jsx,tsx}', // Ensure this matches the location of your components
    ],
    theme: {
      extend: {
        keyframes: {
          flash: {
            "0%": { opacity: "0.2" },
            "20%": { opacity: "1" },
            "100%": { opacity: "0.2" },
          },
        },
        animation: {
          flash: "flash 1.4s infinite linear",
        },
      },
    },
    plugins: [],
  };
  