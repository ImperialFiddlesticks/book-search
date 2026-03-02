const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Zustand v5 ESM build uses `import.meta.env` which Metro doesn't support on web.
// Removing the "import" condition forces Metro to use the CJS build instead.
config.resolver.unstable_conditionNames = [
  "react-native",
  "browser",
  "require",
];

module.exports = config;
