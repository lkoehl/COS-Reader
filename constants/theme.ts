/**
 * Central design tokens: colors, background gradients and the typography
 * scale. The UI renders white-on-gradient in both color schemes; the dark
 * scheme swaps in deep, desaturated background gradients.
 */

export const Colors = {
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.8)',
  textTertiary: 'rgba(255, 255, 255, 0.6)',
  success: '#34C759',
  error: '#FF8A80',
};

/**
 * Full-screen background gradients, per color scheme. The dark variants keep
 * the same hue identity but are deep and desaturated so the app feels native
 * in dark mode instead of just dimmed.
 */
export const BackgroundGradients = {
  light: {
    primary: ['#4F46E5', '#7C3AED'],
    cosmic: ['#7C3AED', '#A21CAF'],
    aurora: ['#2563EB', '#4F46E5'],
    ocean: ['#0EA5E9', '#2563EB'],
  },
  dark: {
    primary: ['#1E1B4B', '#3B0764'],
    cosmic: ['#2E1065', '#4A044E'],
    aurora: ['#172554', '#1E1B4B'],
    ocean: ['#082F49', '#172554'],
  },
} as const;

export type BackgroundVariant = keyof typeof BackgroundGradients.light;

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
