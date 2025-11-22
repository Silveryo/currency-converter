import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    // theme ?
    mode: "light" | "dark";
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