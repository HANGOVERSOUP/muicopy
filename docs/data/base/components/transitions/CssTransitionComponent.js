import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { Button as BaseButton } from '@mui/base/Button';
import { CssTransition } from '@mui/base/Transitions';

const styles = `
  .open {
    opacity: 1;
    transform: translateY(0) scale(1)
    filter: blur(0);
    transition: transform 0.2s cubic-bezier(0.345, 0.275, 0.505, 1.625), opacity 0.2s ease-out;
  }

  .close {
    opacity: 0;
    transform: translateY(-8px) scale(0.95);
    filter: blur(3px);
    transition: transform 0.4s ease-out, opacity 0.4s ease-out, filter 0.2s ease-out;
  }
`;

const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const Button = styled(BaseButton)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${blue[500]};
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${blue[500]};
  box-shadow: 0 2px 1px ${
    theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.2)'
  }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};

  &:hover {
    background-color: ${blue[600]};
  }

  &:active {
    background-color: ${blue[700]};
    box-shadow: none;
    transform: scale(0.99);
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }
`,
);

const StyledPopup = styled(BasePopup)`
  width: max-content;
`;

const PopupBody = styled('div')`
  padding: 16px;
  background-color: white;
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 0.05), 0 3px 2px -2px rgb(0 0 0 / 0.1);
  border-radius: 4px;
  font-family: var(--joy-fontFamily-body);
  font-size: var(--joy-fontSize-sm);
  z-index: 1;
`;

const Section = styled('div')`
  padding: 8px;
  width: 150px;
  display: flex;
`;

export default function CssTransitionComponent() {
  return (
    <div>
      <style>{styles}</style>
      {/* `keepMounted` is needed to trigger the enter animation (otherwise the popup just appears without transition) */}
      <PopupWithTrigger keepMounted>
        <CssTransition
          enterClassName="open"
          exitClassName="close"
          lastTransitionedPropertyOnExit="transform"
        >
          <PopupBody>This is an animated popup</PopupBody>
        </CssTransition>
      </PopupWithTrigger>
    </div>
  );
}

function PopupWithTrigger(props) {
  const [anchor, setAnchor] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const { children, ...other } = props;

  return (
    <Section>
      <Button ref={setAnchor} onClick={() => setOpen((o) => !o)} fullWidth>
        {open ? 'Hide popup' : 'Show popup'}
      </Button>
      <StyledPopup anchor={anchor} open={open} {...other}>
        {children}
      </StyledPopup>
    </Section>
  );
}

PopupWithTrigger.propTypes = {
  children: PropTypes.node,
};
