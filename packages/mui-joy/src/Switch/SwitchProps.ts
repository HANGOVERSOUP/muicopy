import * as React from 'react';
import { OverridableStringUnion } from '@mui/types';
import { UseSwitchProps } from '@mui/base/SwitchUnstyled';
import { SwitchClasses } from './switchClasses';
import { SxProps } from '../styles/defaultTheme';
import { ColorPaletteProp, VariantProp } from '../styles/types';

export type SwitchSlot = 'root' | 'input' | 'track' | 'thumb';

export interface SwitchPropsVariantOverrides {}

export interface SwitchPropsColorOverrides {}

export interface SwitchPropsSizeOverrides {}

export interface SwitchProps
  extends UseSwitchProps,
    Omit<React.HTMLAttributes<HTMLSpanElement>, keyof UseSwitchProps> {
  /**
   * Class name applied to the root element.
   */
  className?: string;
  /**
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   */
  component?: React.ElementType;
  /**
   * The props used for each slot inside the Switch.
   * @default {}
   */
  componentsProps?: {
    thumb?: React.HTMLAttributes<HTMLSpanElement>;
    input?: React.InputHTMLAttributes<HTMLInputElement>;
    track?: React.HTMLAttributes<HTMLSpanElement>;
  };
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<SwitchClasses>;
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color?: OverridableStringUnion<Exclude<ColorPaletteProp, 'context'>, SwitchPropsColorOverrides>;
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  checkedColor?: OverridableStringUnion<
    Exclude<ColorPaletteProp, 'context'>,
    SwitchPropsColorOverrides
  >;
  /**
   * The variant to use.
   * @default 'contained'
   */
  checkedVariant?: OverridableStringUnion<
    Exclude<VariantProp, 'text'>,
    SwitchPropsVariantOverrides
  >;
  /**
   * The size of the component.
   * @default 'md'
   */
  size?: OverridableStringUnion<'sm' | 'md' | 'lg', SwitchPropsSizeOverrides>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps;
  /**
   * The variant to use.
   * @default 'contained'
   */
  variant?: OverridableStringUnion<Exclude<VariantProp, 'text'>, SwitchPropsVariantOverrides>;
}
