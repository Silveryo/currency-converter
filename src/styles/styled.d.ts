import 'styled-components';
import { ThemeMode } from '../types';

declare module 'styled-components' {
  export interface DefaultTheme {
    mode: ThemeMode;
    mobile: string;
    desktop: string;
    colors: {
      bg: string;
      surface: string;
      text: string;
      textSecondary: string;
      primary: string;
      border: string;
    };
  }
}
