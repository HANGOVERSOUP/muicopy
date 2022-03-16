import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import { unstable_extendSxProp as extendSxProp } from '@mui/system';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { TypographyTypeMap, TypographyProps } from './TypographyProps';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getTypographyUtilityClass } from './typographyClasses';

const useUtilityClasses = (ownerState: TypographyProps) => {
  const { gutterBottom, noWrap, level } = ownerState;

  const slots = {
    root: ['root', level, gutterBottom && 'gutterBottom', noWrap && 'noWrap'],
  };

  return composeClasses(slots, getTypographyUtilityClass, {});
};

export const TypographyRoot = styled('span', {
  name: 'MuiTypography',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: TypographyProps }>(({ theme, ownerState }) => ({
  '--Icon-fontSize': '1.25em',
  margin: 0,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  fontFamily: theme.vars.fontFamily.body,
  ...(ownerState.component === 'span' && {
    display: 'inline-flex',
  }),
  ...(ownerState.level && ownerState.level !== 'inherit' && theme.typography[ownerState.level]),
  ...(ownerState.noWrap && {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }),
  ...(ownerState.gutterBottom && {
    marginBottom: '0.35em',
  }),
}));

const defaultVariantMapping: Record<string, string> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body1: 'p',
  body2: 'p',
  body3: 'p',
  inherit: 'p',
};

const Typography = React.forwardRef(function Typography(inProps, ref) {
  const themeProps = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'MuiTypography',
  });

  const props = extendSxProp(themeProps);

  const {
    className,
    component,
    color, // does not use, declare here to prevent type error
    gutterBottom = false,
    noWrap = false,
    level = 'body1',
    levelMapping = {},
    ...other
  } = props;

  const ownerState = {
    ...props,
    level,
    className,
    component,
    gutterBottom,
    noWrap,
  };

  const Component = component || levelMapping[level] || defaultVariantMapping[level] || 'span';

  const classes = useUtilityClasses(ownerState);

  return (
    <TypographyRoot
      as={Component as React.ElementType}
      ref={ref}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
      {...other}
    />
  );
}) as OverridableComponent<TypographyTypeMap>;

Typography.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  color: PropTypes.oneOfType([
    PropTypes.oneOf([
      '-moz-initial',
      'ActiveBorder',
      'ActiveCaption',
      'aliceblue',
      'antiquewhite',
      'AppWorkspace',
      'aqua',
      'aquamarine',
      'azure',
      'Background',
      'beige',
      'bisque',
      'black',
      'blanchedalmond',
      'blue',
      'blueviolet',
      'brown',
      'burlywood',
      'ButtonFace',
      'ButtonHighlight',
      'ButtonShadow',
      'ButtonText',
      'cadetblue',
      'CaptionText',
      'chartreuse',
      'chocolate',
      'coral',
      'cornflowerblue',
      'cornsilk',
      'crimson',
      'currentcolor',
      'cyan',
      'darkblue',
      'darkcyan',
      'darkgoldenrod',
      'darkgray',
      'darkgreen',
      'darkgrey',
      'darkkhaki',
      'darkmagenta',
      'darkolivegreen',
      'darkorange',
      'darkorchid',
      'darkred',
      'darksalmon',
      'darkseagreen',
      'darkslateblue',
      'darkslategray',
      'darkslategrey',
      'darkturquoise',
      'darkviolet',
      'deeppink',
      'deepskyblue',
      'dimgray',
      'dimgrey',
      'dodgerblue',
      'firebrick',
      'floralwhite',
      'forestgreen',
      'fuchsia',
      'gainsboro',
      'ghostwhite',
      'gold',
      'goldenrod',
      'gray',
      'GrayText',
      'green',
      'greenyellow',
      'grey',
      'Highlight',
      'HighlightText',
      'honeydew',
      'hotpink',
      'InactiveBorder',
      'InactiveCaption',
      'InactiveCaptionText',
      'indianred',
      'indigo',
      'InfoBackground',
      'InfoText',
      'inherit',
      'initial',
      'ivory',
      'khaki',
      'lavender',
      'lavenderblush',
      'lawngreen',
      'lemonchiffon',
      'lightblue',
      'lightcoral',
      'lightcyan',
      'lightgoldenrodyellow',
      'lightgray',
      'lightgreen',
      'lightgrey',
      'lightpink',
      'lightsalmon',
      'lightseagreen',
      'lightskyblue',
      'lightslategray',
      'lightslategrey',
      'lightsteelblue',
      'lightyellow',
      'lime',
      'limegreen',
      'linen',
      'magenta',
      'maroon',
      'mediumaquamarine',
      'mediumblue',
      'mediumorchid',
      'mediumpurple',
      'mediumseagreen',
      'mediumslateblue',
      'mediumspringgreen',
      'mediumturquoise',
      'mediumvioletred',
      'Menu',
      'MenuText',
      'midnightblue',
      'mintcream',
      'mistyrose',
      'moccasin',
      'navajowhite',
      'navy',
      'oldlace',
      'olive',
      'olivedrab',
      'orange',
      'orangered',
      'orchid',
      'palegoldenrod',
      'palegreen',
      'paleturquoise',
      'palevioletred',
      'papayawhip',
      'peachpuff',
      'peru',
      'pink',
      'plum',
      'powderblue',
      'purple',
      'rebeccapurple',
      'red',
      'revert',
      'rosybrown',
      'royalblue',
      'saddlebrown',
      'salmon',
      'sandybrown',
      'Scrollbar',
      'seagreen',
      'seashell',
      'sienna',
      'silver',
      'skyblue',
      'slateblue',
      'slategray',
      'slategrey',
      'snow',
      'springgreen',
      'steelblue',
      'tan',
      'teal',
      'thistle',
      'ThreeDDarkShadow',
      'ThreeDFace',
      'ThreeDHighlight',
      'ThreeDLightShadow',
      'ThreeDShadow',
      'tomato',
      'transparent',
      'turquoise',
      'unset',
      'violet',
      'wheat',
      'white',
      'whitesmoke',
      'Window',
      'WindowFrame',
      'WindowText',
      'yellow',
      'yellowgreen',
    ]),
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.oneOf([
          '-moz-initial',
          'ActiveBorder',
          'ActiveCaption',
          'aliceblue',
          'antiquewhite',
          'AppWorkspace',
          'aqua',
          'aquamarine',
          'azure',
          'Background',
          'beige',
          'bisque',
          'black',
          'blanchedalmond',
          'blue',
          'blueviolet',
          'brown',
          'burlywood',
          'ButtonFace',
          'ButtonHighlight',
          'ButtonShadow',
          'ButtonText',
          'cadetblue',
          'CaptionText',
          'chartreuse',
          'chocolate',
          'coral',
          'cornflowerblue',
          'cornsilk',
          'crimson',
          'currentcolor',
          'cyan',
          'darkblue',
          'darkcyan',
          'darkgoldenrod',
          'darkgray',
          'darkgreen',
          'darkgrey',
          'darkkhaki',
          'darkmagenta',
          'darkolivegreen',
          'darkorange',
          'darkorchid',
          'darkred',
          'darksalmon',
          'darkseagreen',
          'darkslateblue',
          'darkslategray',
          'darkslategrey',
          'darkturquoise',
          'darkviolet',
          'deeppink',
          'deepskyblue',
          'dimgray',
          'dimgrey',
          'dodgerblue',
          'firebrick',
          'floralwhite',
          'forestgreen',
          'fuchsia',
          'gainsboro',
          'ghostwhite',
          'gold',
          'goldenrod',
          'gray',
          'GrayText',
          'green',
          'greenyellow',
          'grey',
          'Highlight',
          'HighlightText',
          'honeydew',
          'hotpink',
          'InactiveBorder',
          'InactiveCaption',
          'InactiveCaptionText',
          'indianred',
          'indigo',
          'InfoBackground',
          'InfoText',
          'inherit',
          'initial',
          'ivory',
          'khaki',
          'lavender',
          'lavenderblush',
          'lawngreen',
          'lemonchiffon',
          'lightblue',
          'lightcoral',
          'lightcyan',
          'lightgoldenrodyellow',
          'lightgray',
          'lightgreen',
          'lightgrey',
          'lightpink',
          'lightsalmon',
          'lightseagreen',
          'lightskyblue',
          'lightslategray',
          'lightslategrey',
          'lightsteelblue',
          'lightyellow',
          'lime',
          'limegreen',
          'linen',
          'magenta',
          'maroon',
          'mediumaquamarine',
          'mediumblue',
          'mediumorchid',
          'mediumpurple',
          'mediumseagreen',
          'mediumslateblue',
          'mediumspringgreen',
          'mediumturquoise',
          'mediumvioletred',
          'Menu',
          'MenuText',
          'midnightblue',
          'mintcream',
          'mistyrose',
          'moccasin',
          'navajowhite',
          'navy',
          'oldlace',
          'olive',
          'olivedrab',
          'orange',
          'orangered',
          'orchid',
          'palegoldenrod',
          'palegreen',
          'paleturquoise',
          'palevioletred',
          'papayawhip',
          'peachpuff',
          'peru',
          'pink',
          'plum',
          'powderblue',
          'purple',
          'rebeccapurple',
          'red',
          'revert',
          'rosybrown',
          'royalblue',
          'saddlebrown',
          'salmon',
          'sandybrown',
          'Scrollbar',
          'seagreen',
          'seashell',
          'sienna',
          'silver',
          'skyblue',
          'slateblue',
          'slategray',
          'slategrey',
          'snow',
          'springgreen',
          'steelblue',
          'tan',
          'teal',
          'thistle',
          'ThreeDDarkShadow',
          'ThreeDFace',
          'ThreeDHighlight',
          'ThreeDLightShadow',
          'ThreeDShadow',
          'tomato',
          'transparent',
          'turquoise',
          'unset',
          'violet',
          'wheat',
          'white',
          'whitesmoke',
          'Window',
          'WindowFrame',
          'WindowText',
          'yellow',
          'yellowgreen',
        ]),
        PropTypes.shape({
          '__@iterator@415': PropTypes.func.isRequired,
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
      ]).isRequired,
    ),
    PropTypes.func,
    PropTypes.object,
    PropTypes.shape({
      '__@iterator@415': PropTypes.func.isRequired,
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the text will have a bottom margin.
   * @default false
   */
  gutterBottom: PropTypes.bool,
  /**
   * Applies the theme typography styles.
   * @default 'body1'
   */
  level: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['body1', 'body2', 'body3', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'inherit']),
    PropTypes.string,
  ]),
  /**
   * The component maps the variant prop to a range of different HTML element types.
   * For instance, body1 to `<h6>`.
   * If you wish to change that mapping, you can provide your own.
   * Alternatively, you can use the `component` prop.
   * @default {
   *   h1: 'h1',
   *   h2: 'h2',
   *   h3: 'h3',
   *   h4: 'h4',
   *   h5: 'h5',
   *   h6: 'h6',
   *   body1: 'p',
   *   body2: 'p',
   *   body3: 'p',
   *   inherit: 'p',
   * }
   */
  levelMapping: PropTypes /* @typescript-to-proptypes-ignore */.object,
  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   *
   * Note that text overflow can only happen with block or inline-block level elements
   * (the element needs to have a width in order to overflow).
   * @default false
   */
  noWrap: PropTypes.bool,
} as any;

export default Typography;
