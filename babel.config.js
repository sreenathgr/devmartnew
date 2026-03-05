module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // In SDK 54/55 + Reanimated 4, use the worklets plugin instead
      'react-native-worklets/plugin',
    ],
  };
};
