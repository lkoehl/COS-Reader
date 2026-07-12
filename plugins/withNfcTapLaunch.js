const {
  AndroidConfig,
  withAndroidManifest,
  withDangerousMod,
} = require("expo/config-plugins");
const fs = require("fs");
const path = require("path");

// Registers the app for android.nfc.action.TECH_DISCOVERED so that holding a
// MensaCard (MIFARE DESFire → NfcA/IsoDep) against the phone launches the app.

const TECH_FILTER_CONTENT = `<?xml version="1.0" encoding="utf-8"?>
<resources xmlns:xliff="urn:oasis:names:tc:xliff:document:1.2">
    <tech-list>
        <tech>android.nfc.tech.NfcA</tech>
    </tech-list>
    <tech-list>
        <tech>android.nfc.tech.IsoDep</tech>
    </tech-list>
</resources>
`;

function withTechFilterResource(config) {
  return withDangerousMod(config, [
    "android",
    async (config) => {
      const resXmlDir = path.join(
        config.modRequest.platformProjectRoot,
        "app",
        "src",
        "main",
        "res",
        "xml"
      );
      fs.mkdirSync(resXmlDir, { recursive: true });
      fs.writeFileSync(
        path.join(resXmlDir, "nfc_tech_filter.xml"),
        TECH_FILTER_CONTENT
      );
      return config;
    },
  ]);
}

function withNfcIntentFilter(config) {
  return withAndroidManifest(config, (config) => {
    const mainActivity = AndroidConfig.Manifest.getMainActivityOrThrow(
      config.modResults
    );

    mainActivity["intent-filter"] = mainActivity["intent-filter"] || [];
    const hasTechDiscovered = mainActivity["intent-filter"].some((filter) =>
      (filter.action || []).some(
        (action) =>
          action.$["android:name"] === "android.nfc.action.TECH_DISCOVERED"
      )
    );
    if (!hasTechDiscovered) {
      mainActivity["intent-filter"].push({
        action: [
          { $: { "android:name": "android.nfc.action.TECH_DISCOVERED" } },
        ],
        category: [
          { $: { "android:name": "android.intent.category.DEFAULT" } },
        ],
      });
    }

    mainActivity["meta-data"] = mainActivity["meta-data"] || [];
    const hasTechFilterMeta = mainActivity["meta-data"].some(
      (metaData) =>
        metaData.$["android:name"] === "android.nfc.action.TECH_DISCOVERED"
    );
    if (!hasTechFilterMeta) {
      mainActivity["meta-data"].push({
        $: {
          "android:name": "android.nfc.action.TECH_DISCOVERED",
          "android:resource": "@xml/nfc_tech_filter",
        },
      });
    }

    return config;
  });
}

module.exports = function withNfcTapLaunch(config) {
  config = withTechFilterResource(config);
  config = withNfcIntentFilter(config);
  return config;
};
