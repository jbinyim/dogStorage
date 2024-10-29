import { CSSProp } from "styled-components";
import { Theme } from "./theme";

declare module "styled-components" {
  export interface defaultTheme extends Theme {}
}
