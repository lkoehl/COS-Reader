# COS-Reader

A modern React Native/Expo app for reading Mensa card balances via NFC. This is a complete redesign of the original COS-Reader app with modern UI/UX and updated technology stack.

## Features

- **NFC Card Reading**: Read Mensa card balances using Near Field Communication
- **Modern UI**: Clean, gradient-based design with smooth animations
- **Haptic Feedback**: Enhanced user experience with tactile feedback
- **Real-time Balance Display**: Large, easy-to-read balance with currency formatting
- **Transaction History**: Shows last transaction amount
- **Settings Screen**: App information, version details, and legal information
- **Dark/Light Mode**: Automatic theme switching based on device preferences

## Technology Stack

- **React Native** with **Expo SDK 54**
- **TypeScript** for type safety
- **Expo Router** for navigation
- **react-native-nfc-manager** for NFC functionality
- **expo-linear-gradient** for modern gradient effects
- **expo-haptics** for tactile feedback

## Screenshots

The new design features:
- Beautiful purple-blue gradients
- Large, readable balance display with Euro symbol
- Modern scan button with loading states
- Clean settings modal with app information
- Improved typography and spacing
- Smooth animations and haptic feedback

## Changes from Original

### Visual Design
- **New gradient theme**: Purple-blue gradients replacing the old blue-purple
- **Enhanced typography**: Better font weights and spacing
- **Modern components**: Updated buttons, cards, and layouts
- **Improved accessibility**: Better contrast and readable text sizes

### Technical Improvements
- **Expo SDK 54**: Latest Expo version with new features
- **TypeScript**: Full type safety throughout the app
- **Component architecture**: Modular, reusable components
- **Modern React patterns**: Hooks, functional components
- **Enhanced error handling**: Better user feedback for NFC errors

### User Experience
- **Haptic feedback**: Tactile responses for button presses
- **Loading states**: Visual feedback during card scanning
- **Improved navigation**: Cleaner modal presentation
- **Better error messages**: More informative error dialogs

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

## NFC Requirements

- **iOS**: Requires iOS 13+ with NFC capability
- **Android**: Requires Android with NFC enabled
- **Physical device**: NFC functionality requires real device testing

## License

GNU General Public License v3.0 - see original license terms in the settings screen.

## Original Project

The original COS-Reader project can be found in the `old project/` folder for reference.