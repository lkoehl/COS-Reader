/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#667eea';
const tintColorDark = '#764ba2';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    // Card reader specific colors
    gradientStart: '#667eea',
    gradientEnd: '#764ba2',
    cardBackground: 'rgba(255, 255, 255, 0.1)',
    textPrimary: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.8)',
    textTertiary: 'rgba(255, 255, 255, 0.6)',
    buttonBackground: '#007AFF',
    buttonBackgroundSecondary: '#5856D6',
    success: '#34C759',
    error: '#FF3B30',
    warning: '#FF9500',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    // Card reader specific colors
    gradientStart: '#667eea',
    gradientEnd: '#764ba2',
    cardBackground: 'rgba(255, 255, 255, 0.1)',
    textPrimary: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.8)',
    textTertiary: 'rgba(255, 255, 255, 0.6)',
    buttonBackground: '#007AFF',
    buttonBackgroundSecondary: '#5856D6',
    success: '#34C759',
    error: '#FF3B30',
    warning: '#FF9500',
  },
};

export const Gradients = {
  primary: ['#667eea', '#764ba2'],
  primaryDark: ['#5a67d8', '#6b46c1'],
  button: ['#007AFF', '#5856D6'],
  buttonHover: ['#0051D5', '#4338CA'],
  success: ['#34C759', '#30D158'],
  error: ['#FF3B30', '#FF453A'],
  warning: ['#FF9500', '#FF9F0A'],
  card: ['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0.1)'],
  cardDark: ['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)'],

  // New sophisticated gradients
  sunset: ['#FF8A80', '#FF5722'],
  ocean: ['#4FC3F7', '#2196F3'],
  forest: ['#81C784', '#4CAF50'],
  cosmic: ['#BA68C8', '#9C27B0'],
  aurora: ['#64B5F6', '#42A5F5', '#2196F3'],

  // Glass morphism variants
  glassLight: ['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.1)'],
  glassDark: ['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.1)'],
  glassAccent: ['rgba(103, 126, 234, 0.3)', 'rgba(118, 75, 162, 0.2)'],
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New York', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace",
  },
});

export const Typography = {
  // Display styles for large, prominent text
  display: {
    fontSize: 64,
    fontWeight: '100' as const,
    lineHeight: 72,
    letterSpacing: -1,
  },

  // Headline styles for section headers
  headline: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
    letterSpacing: -0.5,
  },

  // Title styles for card headers and important labels
  title: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
    letterSpacing: -0.2,
  },

  // Body text for regular content
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
    letterSpacing: 0,
  },

  // Caption text for small details
  caption: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16,
    letterSpacing: 0.5,
  },

  // Balance display - special large number display
  balance: {
    fontSize: 48,
    fontWeight: '200' as const,
    lineHeight: 56,
    letterSpacing: 1,
  },

  // Currency symbol
  currency: {
    fontSize: 24,
    fontWeight: '300' as const,
    lineHeight: 32,
    letterSpacing: 0,
  },
};
