module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.js',
          '.ios.ts',
          '.android.js',
          '.android.ts',
          '.js',
          '.ts',
          '.tsx',
          '.json',
        ],
        alias: {
          '~': './src',
        },
      },
    ],
    ['@babel/plugin-proposal-decorators', {legacy: true}],
  ],
};
