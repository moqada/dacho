require('babel-core/register')({
  ignore: /node_modules/,
  plugins: ['espower', 'transform-es2015-classes'],
  presets: ['es2015']
});
