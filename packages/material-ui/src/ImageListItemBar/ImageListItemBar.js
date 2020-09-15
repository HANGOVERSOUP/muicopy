import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import deprecatedPropType from '../utils/deprecatedPropType';

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 48,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    fontFamily: theme.typography.fontFamily,
  },
  /* Styles applied to the root element if `position="bottom"`. */
  positionBottom: {
    bottom: 0,
  },
  /* Styles applied to the root element if `position="top"`. */
  positionTop: {
    top: 0,
  },
  /* Styles applied to the root element if a `subtitle` is provided. */
  rootSubtitle: {
    height: 68,
  },
  /* Styles applied to the title and subtitle container element. */
  titleWrap: {
    flexGrow: 1,
    marginLeft: 16,
    marginRight: 16,
    color: theme.palette.common.white,
    overflow: 'hidden',
  },
  /* Styles applied to the container element if `actionPosition="left"`. */
  titleWrapActionPosLeft: {
    marginLeft: 0,
  },
  /* Styles applied to the container element if `actionPosition="right"`. */
  titleWrapActionPosRight: {
    marginRight: 0,
  },
  /* Styles applied to the title container element. */
  title: {
    fontSize: theme.typography.pxToRem(16),
    lineHeight: '24px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  /* Styles applied to the subtitle container element. */
  subtitle: {
    fontSize: theme.typography.pxToRem(12),
    lineHeight: 1,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  /* Styles applied to the actionIcon if supplied. */
  actionIcon: {},
  /* Styles applied to the actionIcon if `actionPosition="left"`. */
  actionIconActionPosLeft: {
    order: -1,
  },
});

const ImageListItemBar = React.forwardRef(function ImageListItemBar(props, ref) {
  const {
    actionIcon,
    actionPosition = 'right',
    classes,
    className,
    subtitle,
    title,
    position: positionProp = 'bottom',
    titlePosition,
    ...other
  } = props;

  const position = titlePosition || positionProp;
  const actionPos = actionIcon && actionPosition;

  return (
    <div
      className={clsx(
        classes.root,
        {
          [classes.positionBottom]: position === 'bottom',
          [classes.positionTop]: position === 'top',
          [classes.rootSubtitle]: subtitle,
        },
        className,
      )}
      ref={ref}
      {...other}
    >
      <div
        className={clsx(classes.titleWrap, {
          [classes.titleWrapActionPosLeft]: actionPos === 'left',
          [classes.titleWrapActionPosRight]: actionPos === 'right',
        })}
      >
        <div className={classes.title}>{title}</div>
        {subtitle ? <div className={classes.subtitle}>{subtitle}</div> : null}
      </div>
      {actionIcon ? (
        <div
          className={clsx(classes.actionIcon, {
            [classes.actionIconActionPosLeft]: actionPos === 'left',
          })}
        >
          {actionIcon}
        </div>
      ) : null}
    </div>
  );
});

ImageListItemBar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * An IconButton element to be used as secondary action target
   * (primary action target is the item itself).
   */
  actionIcon: PropTypes.node,
  /**
   * Position of secondary action IconButton.
   */
  actionPosition: PropTypes.oneOf(['left', 'right']),
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Position of the title bar.
   */
  position: PropTypes.oneOf(['bottom', 'top']),
  /**
   * String or element serving as subtitle (support text).
   */
  subtitle: PropTypes.node,
  /**
   * Title to be displayed on item.
   */
  title: PropTypes.node,
  /**
   * @ignore
   */
  titlePosition: deprecatedPropType(
    PropTypes.oneOf(['bottom', 'top']),
    'Use the `position` prop instead.',
  ),
};

export default withStyles(styles, { name: 'MuiImageListItemBar' })(ImageListItemBar);
