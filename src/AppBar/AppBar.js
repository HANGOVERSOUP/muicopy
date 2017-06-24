// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';
import { capitalizeFirstLetter } from '../utils/helpers';
import Paper from '../Paper';

export const styleSheet = createStyleSheet('MuiAppBar', theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    zIndex: theme.zIndex.appBar,
  },
  positionFixed: {
    position: 'fixed',
    top: 0,
    left: 'auto',
    right: 0,
  },
  positionAbsolute: {
    position: 'absolute',
    top: 0,
    left: 'auto',
    right: 0,
  },
  positionStatic: {
    position: 'static',
    flexShrink: 0,
  },
  colorDefault: {
    backgroundColor: theme.palette.background.appBar,
    color: theme.palette.getContrastText(theme.palette.background.appBar),
  },
  colorPrimary: {
    backgroundColor: theme.palette.primary[500],
    color: theme.palette.getContrastText(theme.palette.primary[500]),
  },
  colorAccent: {
    backgroundColor: theme.palette.accent.A200,
    color: theme.palette.getContrastText(theme.palette.accent.A200),
  },
}));

function AppBar(props) {
  const {
    children,
    classes,
    className: classNameProp,
    color,
    position, // eslint-disable-line no-unsed-vars
    ...other
  } = props;

  const className = classNames(
    classes.root,
    classes[`position${capitalizeFirstLetter(position)}`],
    {
      [classes[`color${capitalizeFirstLetter(color)}`]]: color !== 'inherit',
      'mui-fixed': position === 'fixed', // Useful for the Dialog
    },
    classNameProp,
  );

  return (
    <Paper square component="header" elevation={4} className={className} {...other}>
      {children}
    </Paper>
  );
}

AppBar.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It's using the theme palette when that makes sense.
   */
  color: PropTypes.oneOf(['inherit', 'primary', 'accent', 'default']),
  /**
   * The positioning type.
   */
  position: PropTypes.oneOf(['static', 'fixed', 'absolute']),
};

AppBar.defaultProps = {
  color: 'primary',
  position: 'fixed',
};

export default withStyles(styleSheet)(AppBar);
