import * as React from 'react';
import getInitColorSchemeScript from './getInitColorSchemeScript';
import { Mode, Result } from './useCurrentColorScheme';

export interface ColorSchemeContextValue<SupportedColorScheme extends string>
  extends Result<SupportedColorScheme> {
  allColorSchemes: SupportedColorScheme[];
}

export interface CssVarsProviderConfig<ColorScheme extends string> {
  /**
   * DOM attribute for applying color scheme
   * @default 'data-color-scheme'
   */
  attribute?: string;
  /**
   * localStorage key used to store application `mode`
   * @default 'mode'
   */
  modeStorageKey?: string;
  /**
   * localStorage key used to store `colorScheme`
   * @default 'color-scheme'
   */
  colorSchemeStorageKey?: string;
  /**
   * Design system default color scheme.
   * - provides string if the design system has one default color scheme (either light or dark)
   * - provides object if the design system has default light & dark color schemes
   */
  defaultColorScheme: ColorScheme | { light: ColorScheme; dark: ColorScheme };
  /**
   * Design system default mode
   * @default 'light'
   */
  defaultMode?: Mode;
  /**
   * Disable CSS transitions when switching between modes or color schemes
   * @default false
   */
  disableTransitionOnChange?: boolean;
  /**
   * A function to determine if the key, value should be attached as CSS Variable
   * `keys` is an array that represents the object path keys.
   *  Ex, if the theme is { foo: { bar: 'var(--test)' } }
   *  then, keys = ['foo', 'bar']
   *        value = 'var(--test)'
   */
  shouldSkipGeneratingVar?: (keys: string[], value: string | number) => boolean;
}

export interface CreateCssVarsProviderResult<ColorScheme extends string> {
  CssVarsProvider: (
    props: React.PropsWithChildren<
      Partial<CssVarsProviderConfig<ColorScheme>> & {
        theme?: {
          cssVarPrefix?: string;
          colorSchemes: Record<ColorScheme, Record<string, any>>;
        };
        /**
         * The document used to perform `disableTransitionOnChange` feature
         * @default document
         */
        documentNode?: Document | null;
        /**
         * The node used to attach the color-scheme attribute
         * @default document
         */
        colorSchemeNode?: Document | HTMLElement | null;
        /**
         * The CSS selector for attaching the generated custom properties
         * @default ':root'
         */
        colorSchemeSelector?: string;
        /**
         * The window that attaches the 'storage' event listener
         * @default window
         */
        storageWindow?: Window | null;
      }
    >,
  ) => React.ReactElement;
  useColorScheme: () => ColorSchemeContextValue<ColorScheme>;
  useCssThemeVars: <T = {}>(options?: {
    /**
     * Design system default color scheme.
     * - provides string if the design system has one default color scheme (either light or dark)
     * - provides object if the design system has default light & dark color schemes
     */
    defaultColorScheme?: ColorScheme | { light: ColorScheme; dark: ColorScheme };
    /**
     * Design system default mode
     * @default 'light'
     */
    defaultMode?: Mode;
    /**
     * The CSS selector for attaching the generated CSS theme variables.
     */
    selector?: {
      /**
       * The selector for attaching CSS variables that are not specific to any color scheme.
       * @default ':root'
       */
      root: string;
      /**
       * The selector for the default color scheme CSS variables
       * @default (key) => `[data-color-scheme="${key}"]`
       */
      colorScheme: (key: ColorScheme) => string;
    };
    /**
     * A function to determine if the key, value should be attached as CSS Variable
     * `keys` is an array that represents the object path keys.
     *  Ex, if the theme is { foo: { bar: 'var(--test)' } }
     *  then, keys = ['foo', 'bar']
     *        value = 'var(--test)'
     */
    shouldSkipGeneratingVar?: (keys: string[], value: string | number) => boolean;
    /**
     * Controlled mode. If not provided, it will try to read the value from the upper CssVarsProvider.
     */
    mode?: Mode;
    /**
     * Controlled color scheme. If not provided, it will try to read the value from the upper CssVarsProvider.
     */
    colorScheme?: ColorScheme;
    theme?: {
      cssVarPrefix?: string;
      colorSchemes: Record<ColorScheme, Record<string, any>>;
    };
  }) => {
    /**
     * The theme with extra fields
     * - `vars`
     * - `getColorSchemeSelector`
     */
    theme: T;
    /**
     * The stylesheet (in JS object format) that contains the generated CSS theme variables.
     */
    styles: Record<string, any>;
  };
  getInitColorSchemeScript: typeof getInitColorSchemeScript;
}

export default function createCssVarsProvider<ColorScheme extends string>(
  options: CssVarsProviderConfig<ColorScheme> & {
    /**
     * Design system default theme
     *
     * The structure inside `theme.colorSchemes[colorScheme]` should be exactly the same in all color schemes because
     * those object of the color scheme will be used when the color scheme is active.
     *
     *  {
     *    colorSchemes: {
     *      light: { ...lightColorSchemeValues },
     *      dark: { ...darkColorSchemeValues }
     *    }
     *  }
     *
     *  If colorScheme is 'light', the `lightColorSchemeValues` will be merged to theme as `{ ...theme, ...lightColorSchemeValues }`
     *  likewise, if colorScheme is 'dark', the `darkColorSchemeValues` will be merged to theme as `{ ...theme, ...darkColorSchemeValues }`
     *
     *  !!! Don't provided the same keys as in colorSchemes to theme because they will be replaced internally when the selected colorScheme is calculated.
     *  Ex. {
     *    colorSchemes: {
     *      light: { palette: { ... } },
     *      dark: { palette: { ... } }
     *    },
     *    palette: { ... }, // This values will be replaced by the `palette` from the light | dark color scheme at runtime.
     *  }
     */
    theme: any;
    /**
     * A function to be called after the CSS variables are attached. The result of this function will be the final theme pass to ThemeProvider.
     *
     * The example usage is the variant generation in Joy. We need to combine the token from user-input and the default theme first, then generate
     * variants from those tokens.
     */
    resolveTheme?: (theme: any) => any; // the type is any because it depends on the design system.
    /**
     * @internal
     * A function that returns a list of variables that will be excluded from the `colorSchemeSelector` (:root by default)
     *
     * Some variables are intended to be used in a specific color scheme only. They should be excluded when the default mode is set to the color scheme.
     * This is introduced to fix https://github.com/mui/material-ui/issues/34084
     */
    excludeVariablesFromRoot?: (cssVarPrefix: string) => string[];
  },
): CreateCssVarsProviderResult<ColorScheme>;

// disable automatic export
export {};
