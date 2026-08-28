export const Colors = {
  light: {
    text: '#101828',
    textSecondary: '#667085',
    background: '#E8FCEF',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#00D09E',
    tint: '#00D09E',
    icon: '#101828',
    iconSecondary: '#667085',
  },

  dark: {
    text: '#FFFFFF',
    textSecondary: '#98A2B3',
    background: '#071A1C',
    backgroundElement: '#102A2C',
    backgroundSelected: '#00D09E',
    tint: '#00D09E',
    icon: '#FFFFFF',
    iconSecondary: '#98A2B3',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light;

export const Fonts = {
  regular: 'System',
  medium: 'System',
  semiBold: 'System',
  bold: 'System',
  mono: 'Courier',
} as const;

export const Spacing = {
  one: 4,
  two: 8,
  three: 12,
  four: 16,
  five: 20,
  six: 24,
  seven: 28,
  eight: 32,
} as const;

export const MaxContentWidth = 600;
export const BottomTabInset = 90;

export const FinoraColors = {
  primary: '#00D09E',
  primaryDark: '#052224',
  primaryLight: '#DFF7E2',

  background: '#E8FCEF',
  darkBackground: '#071A1C',

  card: '#FFFFFF',
  surface: '#FFFFFF',

  text: '#101828',
  textWhite: '#FFFFFF',
  dark: '#101828',

  textSecondary: '#667085',
  textMuted: '#98A2B3',

  border: '#D9F2E5',

  income: '#00D09E',
  expense: '#0068FF',

  blue: '#0068FF',
  blueMedium: '#3299FF',
  blueLight: '#6DB6FE',

  navBackground: '#DFF7E2',
  white: '#FFFFFF',

  header: '#00D09E',
} as const;

export const FinoraCategoryColors: Record<string, string> = {
  shopping: '#F79009',
  food: '#2E90FA',
  transport: '#0068FF',
  entertainment: '#7A5AF8',
  salary: '#00D09E',
  freelance: '#0BA5EC',
  bills: '#2E90FA',
  other: '#6DB6FE',
};

export const FinoraRadius = {
  sm: 10,
  md: 14,
  lg: 24,
  pill: 999,
} as const;

export const FinoraSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;