import {
  darken,
  lighten,
  emphasize,
  alpha,
  useThemeWithoutDefault as useTheme,
  createTheme as systemCreateTheme,
  unstable_defaultSxConfig as defaultSxConfig,
  unstable_styleFunctionSx as styleFunctionSx,
  private_safeColorChannel as safeColorChannel,
  private_safeAlpha as safeAlpha,
  private_safeDarken as safeDarken,
  private_safeLighten as safeLighten,
  private_safeEmphasize as safeEmphasize,
  unstable_createGetCssVar as systemCreateGetCssVar,
  unstable_prepareCssVars as prepareCssVars,
  hslToRgb,
  unstable_extendSxProp as extendSxProp,
} from '@mui/system';
