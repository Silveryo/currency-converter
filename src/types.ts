const ThemeModes = ['light', 'dark'] as const;
type ThemeMode = (typeof ThemeModes)[number];

export { ThemeModes };
export type { ThemeMode };