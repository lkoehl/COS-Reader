# MensaScan OS (COS-Reader)

A modern React Native/Expo app for reading Mensa card balances via NFC (MIFARE DESFire).

## Features

- **NFC Card Reading**: Read Mensa card balances using Near Field Communication
- **Tap-to-Launch (Android)**: Holding the card against the phone launches the app and scans automatically
- **Scan History**: Every scan is stored locally; a history screen shows the balance over time with deltas
- **Modern UI**: Clean, gradient-based glassmorphism design with smooth animations
- **Dark/Light Mode**: Dedicated dark-mode gradients, switching automatically with the device theme
- **Haptic Feedback**: Tactile responses for interactions
- **Settings Screen**: App information, version details, and legal information

## Technology Stack

- **React Native** with **Expo SDK 57** (Expo Router)
- **TypeScript**
- **react-native-nfc-manager** for NFC (DESFire APDUs)
- **expo-linear-gradient**, **expo-blur**, **react-native-reanimated** for the UI
- **@react-native-async-storage/async-storage** for the local scan history

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

The native `ios/` and `android/` folders are generated — regenerate them after config changes with:

```bash
npx expo prebuild --clean
```

## NFC Requirements

- **iOS**: Requires iOS 16.4+ with NFC capability
- **Android**: Requires Android with NFC enabled
- **Physical device**: NFC functionality requires real device testing

## License

GNU General Public License v3.0 — see license terms in the settings screen.
