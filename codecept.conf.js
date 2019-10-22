exports.config = {
  tests: './**/*.test.ts',
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost',
      show: true,
      waitForAction: 30 * 1000,
      waitForTimeout: 30 * 1000,
    },
  },
  include: {
    I: './steps_file.js',
  },
  bootstrap: null,
  mocha: {},
  name: 'project-auction-sniper',
  require: ['ts-node/register'],
};
