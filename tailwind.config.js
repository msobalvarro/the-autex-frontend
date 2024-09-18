const { nextui } = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(date-input|date-picker|popover|skeleton|button|ripple|spinner|calendar).js"
  ],
  theme: {
    extend: {
      transitionProperty: {
        multiple: "width , height , backgroundColor , border-radius"
      }
    },
  },
  plugins: [nextui()],
}

