import { Breakpoints, BreakpointsOptions } from './createBreakpoints';
import { Mixins } from './createMixins';
import { Palette } from './createPalette';
import { Shadows } from './shadows';
import { Spacing } from './spacing';
import { Transitions } from './transitions';
import { Typography, TypographyOptions } from './createTypography';
import { ZIndex } from './zIndex';
import { StyleRules } from './withStyles'

export interface ThemeOptions {
  breakpoints?: Partial<BreakpointsOptions> & Partial<Breakpoints>;
  mixins?: Partial<Mixins>;
  palette?: Partial<Palette>;
  typography?: TypographyOptions | ((palette: Palette) => TypographyOptions);
  shadows?: Partial<Shadows>;
  transitions?: Partial<Transitions>;
  spacing?: Partial<Spacing>;
  zIndex?: Partial<ZIndex>;
  overrides?: { [name: string]: StyleRules };
}

export type Theme<T = {}> = {
  direction: 'ltr' | 'rtl';
  palette: Palette;
  typography: Typography;
  mixins: Mixins;
  breakpoints: Breakpoints;
  shadows: Shadows;
  transitions: Transitions;
  spacing: Spacing;
  zIndex: ZIndex;
  overrides?: { [name: string]: StyleRules; };
} & T;

export default function createMuiTheme<T = {}>(
  options?: ThemeOptions & T
): Theme<T>;
