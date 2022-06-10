import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    switchColor: string;
    textColor: string;
    headerColor: string;
    itemBgColor: string;
    titleColor: string;
    bgColor: string;
    accentColor: string;
    listColor: string;
  }
}
