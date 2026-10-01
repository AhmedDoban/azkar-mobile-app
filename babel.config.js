module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    overrides: [
      {
        exclude: (filename) =>
          !!filename && /node_modules[\\/]react-native-web[\\/]/.test(filename),
        presets: ["nativewind/babel"],
      },
    ],
  };
};
