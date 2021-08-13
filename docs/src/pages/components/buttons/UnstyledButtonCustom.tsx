import * as React from 'react';
import ButtonUnstyled, {
  ButtonUnstyledProps,
  buttonUnstyledClasses,
} from '@material-ui/unstyled/ButtonUnstyled';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import { styled } from '@material-ui/system';

const ButtonRoot = React.forwardRef(function ButtonRoot(
  props: React.PropsWithChildren<{}>,
  ref: React.ForwardedRef<any>,
) {
  const { children, ...other } = props;

  return (
    <svg width="200" height="50" {...other} ref={ref}>
      <polygon points="0,50 20,0 200,0 180,50" />
      <foreignObject x="20" y="0" width="160" height="50">
        <div>{children}</div>
      </foreignObject>
    </svg>
  );
});

const StyledButtonRoot = styled(ButtonRoot)(`
  overflow: visible;
  cursor: pointer;
  
  & polygon {
    stroke: #0059b2;
    stroke-width: 2;
    stroke-dasharray: 600,600;
    stroke-dashoffset: -600;
    stroke-linecap: round;
    fill: #007fff;
    transition: all 700ms ease;
    pointer-events: none;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.25));
  }

  &:hover polygon {
    stroke-dashoffset: 0;
  }

  &:focus {
    outline: none;
  }

  &.${buttonUnstyledClasses.focusVisible} {
    outline: none;
    & polygon {
      stroke-dashoffset: 0;
    }
  }

  &.${buttonUnstyledClasses.active} polygon {
    fill: #004386;
  }

  & foreignObject {
    pointer-events: none;

    & > div {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    & svg {
      margin: 0 5px;
    }
  }
`);

const SvgButton = React.forwardRef(function SvgButton(
  props: ButtonUnstyledProps,
  ref: React.ForwardedRef<any>,
) {
  return <ButtonUnstyled {...props} component={StyledButtonRoot} ref={ref} />;
});

export default function UnstyledButtonCustom() {
  return (
    <SvgButton>
      <StarOutlineIcon />
      SVG Button
      <StarOutlineIcon />
    </SvgButton>
  );
}
