import { generateUtilityClasses, generateUtilityClass } from '@material-ui/unstyled';

export function getFormControlUtilityClasses(slot) {
  return generateUtilityClass('MuiFormControl', slot);
}

const formControlClasses = generateUtilityClasses('MuiFormControl', [
  'root',
  'marginNormal',
  'marginDense',
  'fullWidth',
]);

export default formControlClasses;
