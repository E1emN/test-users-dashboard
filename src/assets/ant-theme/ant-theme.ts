import { type ThemeConfig, theme } from 'antd';

const { darkAlgorithm, defaultAlgorithm } = theme;

const COLORS = {
  dark: {
    bgPrimary: '#181A20',
    textPrimary: '#FFFFFF',
    textSecondary: '#8D93A3',
    iconPrimary: '#FFFFFF',
    red: '#FF3C3C',
  },
  light: {
    bgPrimary: '#FAF9FF',
    textPrimary: '#181A20',
    textSecondary: '#7B8091',
    iconPrimary: '#181A20',
    red: '#FF3C3C',
  },
} as const;

export const getTheme = (theme: 'dark' | 'light') => {
  const themeMode: ThemeConfig = {
    algorithm: theme === 'dark' ? darkAlgorithm : defaultAlgorithm,
    token: {
      colorBgLayout: COLORS[theme].bgPrimary,
      colorText: COLORS[theme].textPrimary,
      colorTextSecondary: COLORS[theme].textSecondary,
      colorErrorText: COLORS[theme].red,
      colorIcon: COLORS[theme].iconPrimary,
      fontSizeIcon: 17,
    },
  };
  return themeMode;
};
