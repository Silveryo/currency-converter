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
    bg: '#1A202C',
    surface: '#2D3748',
    text: '#E2E8F0',
    textSecondary: '#A0AEC0',
    primary: '#63B3ED',
    border: '#4A5568',
  },
};

export { lightTheme, darkTheme };
