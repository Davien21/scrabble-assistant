module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  media: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          100: "E5ECFF",
          200: "#00bdff",
          300: "#668eff",
          400: "#0043ff",
          450: "#00268F",
          500: "#001e73",
          600: "#11163b",
          800: "#00081f",
        },
        gray: {
          100: "#f8f8f8",
          400: "#cfcfcf",
        },
        green: {
          200: "#00cf8e",
        },
        pink: { 100: "#d0c4c4" },
        orange: "#ff9900",
      },
      fontFamily: {
        coolvetica: ["Coolvetica", "sans-serif"],
        roboto: ["Roboto", "helvetica"],
      },
      screens: {
        sm: "768px",
        md: "1024px",
        lg: "1280px",
        xl: "1440px",
        "2xl": "1536px",
        "3xl": "1600px",
        "4xl": "1720px",
        "5xl": "1800px",
        "6xl": "2160px",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1.20rem",
        sm: "1.20rem",
        lg: "4rem",
        xl: "6rem",
        "2xl": "10rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          "@screen sm": {
            maxWidth: "768px",
          },
          "@screen md": {
            maxWidth: "1024px",
          },
          "@screen lg": {
            maxWidth: "1280px",
          },
          "@screen xl": {
            maxWidth: "1440px",
          },
          "@screen 2xl": {
            maxWidth: "1536px",
          },
          "@screen 3xl": {
            maxWidth: "1600px",
          },
          "@screen 4xl": {
            maxWidth: "1720px",
          },
          "@screen 5xl": {
            maxWidth: "1800px",
          },
          "@screen 6xl": {
            maxWidth: "2160px",
          },
        },
      });
    },
  ],
};
