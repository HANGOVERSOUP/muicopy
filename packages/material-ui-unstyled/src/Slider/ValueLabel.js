import * as React from 'react';
import clsx from 'clsx';
import capitalize from '../utils/capitalize';

const getUtilityClass = (name) => {
  return `MuiSlider-valueLabel${capitalize(name)}`;
};

const useValueLabelClasses = (props) => {
  const { open, valueLabelDisplay } = props;

  const utilityClasses = {
    offset: clsx('MuiSlider-valueLabel', getUtilityClass('offset'), {
      [getUtilityClass('open')]: open || valueLabelDisplay === 'on',
    }),
    circle: getUtilityClass('circle'),
    label: getUtilityClass('label'),
  };

  return utilityClasses;
};

/**
 * @ignore - internal component.
 */
function ValueLabel(props) {
  /* eslint-disable react/prop-types */
  const { children, className, value, valueLabelDisplay, components = {}, theme } = props;
  const classes = useValueLabelClasses(props);

  if (valueLabelDisplay === 'off') {
    return children;
  }

  const Root = components.Root || 'span';

  return React.cloneElement(
    children,
    {
      className: clsx(children.props.className),
    },
    <Root className={clsx(classes.offset, className)} theme={theme}>
      <span className={classes.circle}>
        <span className={classes.label}>{value}</span>
      </span>
    </Root>,
  );
}

export default ValueLabel;
