export interface FormControlClasses {
  root: string;
  marginNormal: string;
  marginDense: string;
  fullWidth: string;
}

declare const formControlClasses: FormControlClasses;

export function getFormControlUtilityClasses(slot: string): string;

export default formControlClasses;
