module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    overrides: [
      {
        // The react-native-css import rewrite must not touch react-native-web's
        // own files: it makes them import the wrapped components, which import
        // react-native-web again, and web crashes on load with a FlatList cycle.
        exclude: (filename) =>
          !!filename && /node_modules[\\/]react-native-web[\\/]/.test(filename),
        presets: ["nativewind/babel"],
      },
    ],
  };
};
