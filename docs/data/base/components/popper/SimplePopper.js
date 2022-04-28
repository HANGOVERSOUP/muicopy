import * as React from 'react';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';

const StyledPopperDiv = styled('div')(
  ({ theme }) => `
  padding: 0.5rem;
  border: 1px solid;
  background-color: ${theme.palette.background.paper};
  opacity: 1;
  margin: 0.25rem 0px;
`,
);

export default function SimplePopper() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div>
      <button aria-describedby={id} type="button" onClick={handleClick}>
        Toggle Popper
      </button>
      <PopperUnstyled id={id} open={open} anchorEl={anchorEl}>
        <StyledPopperDiv>The content of the Popper.</StyledPopperDiv>
      </PopperUnstyled>
    </div>
  );
}
