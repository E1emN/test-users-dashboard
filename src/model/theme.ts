import { createDomain, sample } from 'effector';
import { appGate } from './main';

export type Theme = 'dark' | 'light';

const themeDomain = createDomain();

export const $theme = themeDomain.createStore<Theme>('dark');

export const themeChanged = themeDomain.createEvent<void>();
export const themeReceivedFromStorage = themeDomain.createEvent<Theme>();

const getThemeFx = themeDomain.createEffect<void, Theme>(() => {
  const savedTheme = localStorage.getItem('theme') as Theme | null;

  if (savedTheme) return savedTheme;

  if (typeof window === 'undefined') return 'dark';

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
});

sample({
  clock: appGate.open,
  target: getThemeFx,
});

$theme.on(getThemeFx.doneData, (_, theme) => theme);

sample({
  clock: themeChanged,
  source: $theme,
  fn: (currentTheme) => {
    const nextTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';

    localStorage.setItem('theme', nextTheme);

    return nextTheme;
  },
  target: $theme,
});

sample({
  clock: themeReceivedFromStorage,
  target: $theme,
});
