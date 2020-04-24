const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/dropdown.js'),
  output: {
    library: 'LitElementDropDown',
    path: path.resolve(__dirname, 'dist'),
    filename: 'lit-element-drop-down.js',
  },
};
