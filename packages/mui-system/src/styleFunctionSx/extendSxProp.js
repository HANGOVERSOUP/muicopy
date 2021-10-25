import { propToStyleFunction } from '../getThemeValue';

const splitProps = (props) => {
  const result = {
    systemProps: {},
    otherProps: {},
  };

  Object.keys(props).forEach((prop) => {
    if (propToStyleFunction[prop]) {
      result.systemProps[prop] = props[prop];
    } else {
      result.otherProps[prop] = props[prop];
    }
  });

  return result;
};

export default function extendSxProp(props) {
  const { sx: inSx, ...other } = props;
  const { systemProps, otherProps } = splitProps(other);

  let inSxStyles = inSx;
  if (inSx && typeof inSx === 'function') {
    inSxStyles = inSx();
  }

  return {
    ...otherProps,
    sx: { ...systemProps, ...inSxStyles },
  };
}
