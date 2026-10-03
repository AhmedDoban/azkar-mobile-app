const { withAndroidManifest, AndroidConfig } = require("expo/config-plugins");

const LAUNCHER = "android.intent.category.LAUNCHER";

const isLauncher = (filter) =>
  (filter.category ?? []).some((c) => c.$["android:name"] === LAUNCHER);

module.exports = function withDefaultIconAlias(config, { name }) {
  return withAndroidManifest(config, (config) => {
    const app = AndroidConfig.Manifest.getMainApplicationOrThrow(
      config.modResults,
    );
    const main = app.activity?.find(
      (activity) => activity.$["android:name"] === ".MainActivity",
    );
    if (main) {
      main["intent-filter"] = (main["intent-filter"] ?? []).filter(
        (filter) => !isLauncher(filter),
      );
    }
    const aliasName = `.MainActivity${name}`;
    const alias = {
      $: {
        "android:name": aliasName,
        "android:enabled": "true",
        "android:exported": "true",
        "android:icon": "@mipmap/ic_launcher",
        "android:roundIcon": "@mipmap/ic_launcher_round",
        "android:targetActivity": ".MainActivity",
      },
      "intent-filter": [
        {
          action: [{ $: { "android:name": "android.intent.action.MAIN" } }],
          category: [{ $: { "android:name": LAUNCHER } }],
        },
      ],
    };
    app["activity-alias"] = [
      alias,
      ...(app["activity-alias"] ?? []).filter(
        (item) => item.$["android:name"] !== aliasName,
      ),
    ];
    return config;
  });
};
