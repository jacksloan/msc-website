module.exports = {
  // purge: [
  //   './src/**/*.svelte',
  //   './src/**/*.svelte',
  // ],
  // purge: {
  //   mode: 'all',
  //   content: ['./src/**/*.html', './src/**/*.svelte'],

  //   options: {
  //     whitelistPatterns: [/svelte-/],
  //     defaultExtractor: (content) =>
  //       [...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(([_match, group, ..._rest]) => group),
  //   },
  // },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled']
    }
  },
  plugins: [],
};
