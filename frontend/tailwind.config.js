// /** @type {import('tailwindcss').Config} */

// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//     "node_modules/flowbite-react/lib/esm/**/*.js",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         mainColor: "#733945",
//         darkWhite: "#fbf9f5",
//       },
//     },
//   },
//   plugins: [require("flowbite/plugin")],
// };
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainColor: "#733945",
        darkWhite: "#fbf9f5",
      },
    },
  },
});
