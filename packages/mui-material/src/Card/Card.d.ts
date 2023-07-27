import * as React from 'react';
import { SxProps } from '@mui/system';
import { DistributiveOmit } from '@mui/types';
import { OverridableComponent, OverrideProps } from '@mui/material/OverridableComponent';
import { Theme } from '..';
import { PaperProps } from '../Paper';
import { CardClasses } from './cardClasses';

// TODO: v6 remove this interface, it is not used
export interface CardPropsColorOverrides {}

export interface CardTypeMap<
  AdditionalProps = {},
  DefaultComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps &
    DistributiveOmit<PaperProps, 'classes'> & {
      /**
       * Override or extend the styles applied to the component.
       */
      classes?: Partial<CardClasses>;
      /**
       * If `true`, the card will use raised styling.
       * @default false
       */
      raised?: boolean;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps<Theme>;
    };
  defaultComponent: DefaultComponent;
}

/**
 *
 * Demos:
 *
 * - [Card](https://mui.com/material-ui/react-card/)
 *
 * API:
 *
 * - [Card API](https://mui.com/material-ui/api/card/)
 * - inherits [Paper API](https://mui.com/material-ui/api/paper/)
 */

declare const Card: OverridableComponent<CardTypeMap>;

export type CardProps<
  RootComponent extends React.ElementType = CardTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<CardTypeMap<AdditionalProps, RootComponent>, RootComponent>;

export default Card;
