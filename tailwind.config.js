/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            code: {
              "&::before": {
                content: "none !important",
              },
              "&::after": {
                content: "none !important",
              },
            },
          },
        },
      },
      fontFamily: {
        primary: ["Poppins", "sans-serif"],
      },
      screens: {
        std: "1440px",
      },
      colors: {
        "yaraa-primary": "#10b2b4",
      },
    },
  },
  plugins: [],
};
