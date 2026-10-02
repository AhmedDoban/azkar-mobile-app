const { withAndroidStyles } = require("expo/config-plugins");

module.exports = function withNoForceDark(config) {
  return withAndroidStyles(config, (config) => {
    const theme = config.modResults.resources.style?.find(
      (style) => style.$.name === "AppTheme",
    );
    if (theme) {
      theme.item = (theme.item ?? []).filter(
        (item) => item.$.name !== "android:forceDarkAllowed",
      );
      theme.item.push({
        $: { name: "android:forceDarkAllowed", "tools:targetApi": "q" },
        _: "false",
      });
    }
    return config;
  });
};
