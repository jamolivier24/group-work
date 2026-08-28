import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, type ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?:
  | 'default'
  | 'title'
  | 'small'
  | 'smallBold'
  | 'subtitle'
  | 'link'
  | 'linkPrimary'
  | 'code';
  themeColor?: ThemeColor;
};

export function ThemedText({
  style,
  type = 'default',
  themeColor,
  ...rest
}: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[
        {
          color: theme[themeColor ?? 'text'],
        },
        type === 'default' && styles.default,
        type === 'title' && styles.title,
        type === 'small' && styles.small,
        type === 'smallBold' && styles.smallBold,
        type === 'subtitle' && styles.subtitle,
        type === 'link' && styles.link,
        type === 'linkPrimary' && styles.linkPrimary,
        type === 'code' && styles.code,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  },

  small: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },

  smallBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },

  subtitle: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
  },

  link: {
    fontSize: 14,
    lineHeight: 20,
  },

  linkPrimary: {
    fontSize: 14,
    lineHeight: 20,
    color: '#00D09E',
  },

  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({
      android: '700',
      default: '500',
    }),
    fontSize: 12,
  },
});