module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'nativewind/babel',
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./'],
        alias: {
          '@src': './src',
          '@screens': './src/screens',
          '@data': './src/data',
        },
      },
    ],
  ],
};
