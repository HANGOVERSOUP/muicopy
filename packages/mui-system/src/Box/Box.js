'use client';
import PropTypes from 'prop-types';
import ClassNameGenerator from '@mui/utils/ClassNameGenerator';
import createBox from '../createBox';
import boxClasses from './boxClasses';

const Box = createBox({
  defaultClassName: boxClasses.root,
  generateClassName: ClassNameGenerator.generate,
});

Box.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.func,
    PropTypes.shape({
      '__@iterator@111': PropTypes.func.isRequired,
      anchor: PropTypes.func.isRequired,
      at: PropTypes.func.isRequired,
      big: PropTypes.func.isRequired,
      blink: PropTypes.func.isRequired,
      bold: PropTypes.func.isRequired,
      charAt: PropTypes.func.isRequired,
      charCodeAt: PropTypes.func.isRequired,
      codePointAt: PropTypes.func.isRequired,
      concat: PropTypes.func.isRequired,
      endsWith: PropTypes.func.isRequired,
      fixed: PropTypes.func.isRequired,
      fontcolor: PropTypes.func.isRequired,
      fontsize: PropTypes.func.isRequired,
      includes: PropTypes.func.isRequired,
      indexOf: PropTypes.func.isRequired,
      italics: PropTypes.func.isRequired,
      lastIndexOf: PropTypes.func.isRequired,
      length: PropTypes.number.isRequired,
      link: PropTypes.func.isRequired,
      localeCompare: PropTypes.func.isRequired,
      match: PropTypes.func.isRequired,
      matchAll: PropTypes.func.isRequired,
      normalize: PropTypes.func.isRequired,
      padEnd: PropTypes.func.isRequired,
      padStart: PropTypes.func.isRequired,
      repeat: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired,
      search: PropTypes.func.isRequired,
      slice: PropTypes.func.isRequired,
      small: PropTypes.func.isRequired,
      split: PropTypes.func.isRequired,
      startsWith: PropTypes.func.isRequired,
      strike: PropTypes.func.isRequired,
      sub: PropTypes.func.isRequired,
      substr: PropTypes.func.isRequired,
      substring: PropTypes.func.isRequired,
      sup: PropTypes.func.isRequired,
      toLocaleLowerCase: PropTypes.func.isRequired,
      toLocaleUpperCase: PropTypes.func.isRequired,
      toLowerCase: PropTypes.func.isRequired,
      toString: PropTypes.func.isRequired,
      toUpperCase: PropTypes.func.isRequired,
      trim: PropTypes.func.isRequired,
      trimEnd: PropTypes.func.isRequired,
      trimLeft: PropTypes.func.isRequired,
      trimRight: PropTypes.func.isRequired,
      trimStart: PropTypes.func.isRequired,
      valueOf: PropTypes.func.isRequired,
    }),
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default Box;
