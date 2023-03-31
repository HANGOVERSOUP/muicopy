import { createStyled } from '@mui/system';
import { Theme } from './types';
import defaultTheme from './defaultTheme';
import THEME_ID from './identifier';

const styled = createStyled<Theme>({ defaultTheme, identifier: THEME_ID });

export default styled;
