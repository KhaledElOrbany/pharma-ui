const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    '@shared': path.resolve(__dirname, 'src/shared'),
  })
);
