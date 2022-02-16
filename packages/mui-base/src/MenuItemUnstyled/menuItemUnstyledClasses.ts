import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface MenuItemUnstyledClasses {
  root: string;
  disabled: string;
}

export type MenuItemUnstyledClassKey = keyof MenuItemUnstyledClasses;

export function getMenuItemUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenuItemUnstyled', slot);
}

const menuItemUnstyledClasses: MenuItemUnstyledClasses = generateUtilityClasses(
  'MuiMenuItemUnstyled',
  ['root', 'disabled'],
);

export default menuItemUnstyledClasses;
