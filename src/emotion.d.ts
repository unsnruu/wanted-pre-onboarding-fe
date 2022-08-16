import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    color: {
      primary: string;
      secondary: string;
      highlight: string;
      dark: string;
      deepDark: string;
      warning: string;
    };
  }
}
