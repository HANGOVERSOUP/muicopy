import * as React from 'react';
import { styled } from '@mui/system';
import SwitchUnstyled from '@mui/base/SwitchUnstyled';
import { ClassNameConfigurator } from '@mui/base';

const Root = styled('span')(
  ({ ownerState }) => `
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 32px;
  height: 20px;
  background: #b3c3d3;
  border-radius: 10px;
  margin: 10px;
  cursor: pointer;

  ${
    ownerState.disabled
      ? `opacity: 0.4;
         cursor: not-allowed;`
      : ''
  }

  ${ownerState.checked ? 'background: #007fff;' : ''}
`,
);

const Thumb = styled('span')(
  ({ ownerState }) => `
  display: block;
  width: 14px;
  height: 14px;
  top: 3px;
  left: 3px;
  border-radius: 16px;
  background-color: #fff;
  position: relative;
  transition: all 200ms ease;

  ${
    ownerState.focusVisible
      ? `background-color: rgba(255, 255, 255, 1);
         box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);`
      : ''
  }

  ${
    ownerState.checked
      ? `left: 14px;
         top: 3px;
         background-color: #fff;`
      : ''
  }
`,
);

const Input = styled('input')`
  cursor: inherit;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  margin: 0;
`;

export default function DisabledDefaultClasses() {
  const slots = { root: Root, thumb: Thumb, input: Input };
  const switch1A11yProps = {
    slotProps: { input: { 'aria-label': 'Switch with built-in classes' } },
  };
  const switch2A11yProps = {
    slotProps: { input: { 'aria-label': 'Switch without built-in classes' } },
  };

  return (
    <div>
      {/* The built-in classes (MuiSwitch-root, Mui-checked, etc.) are enabled by default, 
           even though they are not used */}
      <SwitchUnstyled slots={slots} {...switch1A11yProps} />
      <ClassNameConfigurator disableDefaultClasses>
        {/* ClassNameConfigurator removes the built-in classes,
             leaving only the one generated by Emotion */}
        <SwitchUnstyled slots={slots} {...switch2A11yProps} />
      </ClassNameConfigurator>
    </div>
  );
}
