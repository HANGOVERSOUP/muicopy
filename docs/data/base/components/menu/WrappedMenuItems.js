import * as React from 'react';
import PropTypes from 'prop-types';
import Menu from '@mui/base/Menu';
import MenuItem, { menuItemClasses } from '@mui/base/MenuItem';
import Button, { buttonClasses } from '@mui/base/Button';
import Popper from '@mui/base/Popper';
import { styled } from '@mui/system';
import { ListActionTypes } from '@mui/base/useList';

function MenuSection({ children, label }) {
  return (
    <MenuSectionRoot>
      <MenuSectionLabel>{label}</MenuSectionLabel>
      <ul>{children}</ul>
    </MenuSectionRoot>
  );
}

MenuSection.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
};

export default function WrappedMenuItems() {
  const [buttonElement, setButtonElement] = React.useState(null);

  const [isOpen, setOpen] = React.useState(false);
  const menuActions = React.useRef(null);
  const preventReopen = React.useRef(false);

  const updateAnchor = React.useCallback((node) => {
    setButtonElement(node);
  }, []);

  const handleButtonClick = (event) => {
    if (preventReopen.current) {
      event.preventDefault();
      preventReopen.current = false;
      return;
    }

    setOpen((open) => !open);
  };

  const handleButtonMouseDown = () => {
    if (isOpen) {
      // Prevents the menu from reopening right after closing
      // when clicking the button.
      preventReopen.current = true;
    }
  };

  const handleButtonKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);
      if (event.key === 'ArrowUp') {
        // Focus the last item when pressing ArrowUp.
        menuActions.current?.dispatch({
          type: ListActionTypes.keyDown,
          key: event.key,
          event,
        });
      }
    }
  };

  const createHandleMenuClick = (menuItem) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
      setOpen(false);
      buttonElement?.focus();
    };
  };

  return (
    <div>
      <TriggerButton
        type="button"
        onClick={handleButtonClick}
        onKeyDown={handleButtonKeyDown}
        onMouseDown={handleButtonMouseDown}
        ref={updateAnchor}
        aria-controls={isOpen ? 'wrapped-menu' : undefined}
        aria-expanded={isOpen || undefined}
        aria-haspopup="menu"
      >
        Options
      </TriggerButton>
      <Menu
        actions={menuActions}
        open={isOpen}
        onOpenChange={(_, open) => {
          setOpen(open);
        }}
        anchorEl={buttonElement}
        slots={{ root: StyledPopper, listbox: StyledListbox }}
        slotProps={{ listbox: { id: 'simple-menu' } }}
      >
        <MenuSection label="Navigation">
          <StyledMenuItem onClick={createHandleMenuClick('Back')}>
            Back
          </StyledMenuItem>
          <StyledMenuItem onClick={createHandleMenuClick('Forward')} disabled>
            Forward
          </StyledMenuItem>
          <StyledMenuItem onClick={createHandleMenuClick('Refresh')}>
            Refresh
          </StyledMenuItem>
        </MenuSection>
        <MenuSection label="Page">
          <StyledMenuItem onClick={createHandleMenuClick('Save as...')}>
            Save as...
          </StyledMenuItem>
          <StyledMenuItem onClick={createHandleMenuClick('Print...')}>
            Print...
          </StyledMenuItem>
        </MenuSection>
        <MenuSection label="View">
          <StyledMenuItem onClick={createHandleMenuClick('Zoom in')}>
            Zoom in
          </StyledMenuItem>
          <StyledMenuItem onClick={createHandleMenuClick('Zoom out')}>
            Zoom out
          </StyledMenuItem>
        </MenuSection>
        <li className="helper">Current zoom level: 100%</li>
      </Menu>
    </div>
  );
}

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 2px 16px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  `,
);

const StyledMenuItem = styled(MenuItem)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &.${menuItemClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${menuItemClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
);

const TriggerButton = styled(Button)(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  border-radius: 12px;
  padding: 8px 14px;
  line-height: 1.5;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &.${buttonClasses.focusVisible} {
    border-color: ${blue[400]};
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }
  `,
);

const StyledPopper = styled(Popper)`
  z-index: 1;
`;

const MenuSectionRoot = styled('li')`
  list-style: none;

  & > ul {
    padding-left: 1em;
  }
`;

const MenuSectionLabel = styled('span')`
  display: block;
  padding: 10px 0 5px 10px;
  font-size: 0.75em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  color: ${grey[600]};
`;
