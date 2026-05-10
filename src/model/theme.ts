import { createDomain, sample } from 'effector';
import { appGate } from './main';

type Theme = 'dark' | 'light';

const themeDomain = createDomain();

export const $theme = themeDomain.store<Theme>('dark');
export const themeChanged = themeDomain.createEvent();

const getThemeFx = themeDomain.createEffect<void, Theme>(() => {
  const savedTheme = localStorage.getItem('theme') as Theme | null;
  if (savedTheme) return savedTheme;

  if (typeof window === 'undefined') return 'dark';

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
});

$theme
  .on(getThemeFx.doneData, (_, theme) => theme)
  .on(themeChanged, (currentTheme) => {
    const nextTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', nextTheme);
    return nextTheme;
  });

sample({
  clock: appGate.open,
  target: getThemeFx,
});
