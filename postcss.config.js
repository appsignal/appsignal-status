const enablePurgeCSS =
  process.env.NEXT_PURGE_CSS === "enabled" ||
  process.env.NODE_ENV === "production";

module.exports = {
  plugins: [
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        autoprefixer: {
          flexbox: "no-2009",
        },
        stage: 3,
        features: {
          "custom-properties": false,
        },
      },
    ],

    [
      "@fullhuman/postcss-purgecss",
      enablePurgeCSS
        ? {
            content: [
              "./components/**/*.{js,ts,jsx,tsx}",
              "./data/**/*.{js,ts,jsx,tsx}",
              "./pages/**/*.{js,ts,jsx,tsx}",
              "./lib/**/*.{js,ts,jsx,tsx}",
            ],
            safelist: [/fa(.*)/, /svg(.*)/, "hidden", "body", "html"],
            defaultExtractor: (content) => {
              // Capture as liberally as possible, including things like `h-(screen-1.5)`
              const broadMatches =
                content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
              // Capture classes within other delimiters like .block(class="w-1/2") in Pug
              const innerMatches =
                content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
              return broadMatches.concat(innerMatches);
            },
          }
        : false,
    ],
  ],
};
