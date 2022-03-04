import * as React from 'react';
import { OverrideProps } from '@mui/types';
import { SxProps } from '../styles/defaultTheme';

export interface FormLabelTypeMap<P = {}, D extends React.ElementType = 'label'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * The content at the end of the label (or after the asterisk if required).
     */
    endDecorator?: React.ReactNode;
    /**
     * The asterisk is added if required=`true`
     */
    required?: boolean;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  };
  defaultComponent: D;
}

export type FormLabelProps<
  D extends React.ElementType = FormLabelTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<FormLabelTypeMap<P, D>, D>;
