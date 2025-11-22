import { ThemeModes } from "../types";

const base = {
  mobile: '768px',
  desktop: '1024px',
};

const lightTheme = {
  ...base,
  mode: ThemeModes[0],
  colors: {
    bg: '#F5F7FA',
    surface: '#FFFFFF',
    text: '#1A202C',
    textSecondary: '#4A5568',
    primary: '#3182CE',
    border: '#E2E8F0',
  },
};

const darkTheme = {
  ...base,
  mode: ThemeModes[1],
  colors: {
    bg: '#121212',
    surface: '#1e1e1e',
    text: '#e0e0e0',
    textSecondary: '#e0e0e0',
    primary: '#3182CE',
    border: '#2D2D2D',
  },
};

export { lightTheme, darkTheme };
