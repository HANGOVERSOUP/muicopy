import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface ButtonClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the root element if `color="neutral"`. */
  colorNeutral: string;
  /** Styles applied to the root element if `color="danger"`. */
  colorDanger: string;
  /** Styles applied to the root element if `color="info"`. */
  colorInfo: string;
  /** Styles applied to the root element if `color="success"`. */
  colorSuccess: string;
  /** Styles applied to the root element if `color="warning"`. */
  colorWarning: string;
  /** Styles applied to the root element if `variant="text"`. */
  variantText: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Styles applied to the root element if `variant="light"`. */
  variantLight: string;
  /** Styles applied to the root element if `variant="contained"`. */
  variantContained: string;
  /** State class applied to the ButtonBase root element if the button is keyboard focused. */
  focusVisible: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Styles applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Styles applied to the root element if `size="lg"`. */
  sizeLg: string;
  /** Styles applied to the root element if `fullWidth={true}`. */
  fullWidth: string;
  /** Styles applied to the root element if `square={true}`. */
  square: string;
  /** Styles applied to the startIcon element if supplied. */
  startIcon: string;
  /** Styles applied to the endIcon element if supplied. */
  endIcon: string;
}

export type ButtonClassKey = keyof ButtonClasses;

export function getButtonUtilityClass(slot: string): string {
  return generateUtilityClass('MuiButton', slot);
}

const buttonClasses: ButtonClasses = generateUtilityClasses('MuiButton', [
  'root',
  'colorPrimary',
  'colorNeutral',
  'colorDanger',
  'colorInfo',
  'colorSuccess',
  'colorWarning',
  'variantText',
  'variantOutlined',
  'variantLight',
  'variantContained',
  'focusVisible',
  'disabled',
  'sizeSm',
  'sizeMd',
  'sizeLg',
  'fullWidth',
  'square',
  'startIcon',
  'endIcon',
]);

export default buttonClasses;
