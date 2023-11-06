import * as React from 'react';
import Stack from '@mui/system/Stack';
import { Transition } from 'react-transition-group';
import { Badge } from '@mui/base/Badge';
import { Button } from '@mui/base/Button';
import { Input } from '@mui/base/Input';
import { Menu } from '@mui/base/Menu';
import { MenuItem } from '@mui/base/MenuItem';
import { MenuButton } from '@mui/base/MenuButton';
import { Dropdown } from '@mui/base/Dropdown';
import { Popper } from '@mui/base/Popper';
import { Unstable_Popup as Popup } from '@mui/base/Unstable_Popup';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import { Select } from '@mui/base/Select';
import { Option } from '@mui/base/Option';
import { Slider } from '@mui/base/Slider';
import { Snackbar } from '@mui/base/Snackbar';
// TODO: re-export from the @mui/base/Snackbar, if developer only uses the component
// it is not intuitive to import required type from a different module
import { SnackbarCloseReason } from '@mui/base/useSnackbar';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseIcon from '@mui/icons-material/Close';
import { Switch } from '@mui/base/Switch';

// Snackbar demo
const positioningStyles = {
  entering: 'translateX(0)',
  entered: 'translateX(0)',
  exiting: 'translateX(500px)',
  exited: 'translateX(500px)',
  unmounted: 'translateX(500px)',
};

export default function ComponentsGallery() {
  // Popper demo
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  // Popup demo
  const [popupAnchor, setPopupAnchor] = React.useState<null | HTMLElement>(null);

  const popupButtonHandleClick = (event: React.MouseEvent<HTMLElement>) => {
    setPopupAnchor(popupAnchor ? null : event.currentTarget);
  };

  const popupOpen = Boolean(popupAnchor);
  const popupId = open ? 'simple-popup' : undefined;

  // Snackbar demo
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [exited, setExited] = React.useState(true);
  const nodeRef = React.useRef(null);

  const handleClose = (_: any, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleSnackbarButtonClick = () => {
    setSnackbarOpen(true);
  };

  const handleOnEnter = () => {
    setExited(false);
  };

  const handleOnExited = () => {
    setExited(true);
  };

  // switch demo
  const label = { 'aria-label': 'Demo switch' };

  return (
    <Stack gap={2} style={{ padding: '8px' }}>
      <div>
        <Badge
          slotProps={{
            root: { className: 'GalleryBadge' },
            badge: { className: 'GalleryBadge--badge' },
          }}
          badgeContent={5}
        >
          <span className="GalleryBadge--content" />
        </Badge>
      </div>
      <div>
        <Button className="GalleryButton">Button</Button>
        <Button className="GalleryButton" disabled>
          Disabled
        </Button>
      </div>
      <div>
        <Input placeholder="Write your name here" className="GalleryInput" />
      </div>
      <div>
        <Dropdown>
          <MenuButton className="GalleryButton">My account</MenuButton>
          <Menu
            className="GalleryMenu"
            slotProps={{
              listbox: { className: 'GalleryMenu--listbox' },
            }}
          >
            <MenuItem className="GalleryMenu--item">Profile</MenuItem>
            <MenuItem className="GalleryMenu--item">Language settings</MenuItem>
            <MenuItem className="GalleryMenu--item">Log out</MenuItem>
          </Menu>
        </Dropdown>
      </div>
      <div style={{ maxWidth: '350px' }}>
        <NumberInput
          slotProps={{
            root: { className: 'GalleryNumberInput' },
            input: { className: 'input' },
            decrementButton: { className: 'btn decrement', children: '▾' },
            incrementButton: { className: 'btn increment', children: '▴' },
          }}
          aria-label="Demo number input"
          placeholder="Type a number…"
        />
      </div>
      <div>
        <button type="button" aria-describedby={id} className="GalleryButton" onClick={handleClick}>
          Toggle Popper
        </button>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <div className="GalleryPopper">The content of the Popper.</div>
        </Popper>
      </div>
      <div>
        <button
          type="button"
          aria-describedby={id}
          className="GalleryButton"
          onClick={popupButtonHandleClick}
        >
          Toggle Popup
        </button>
        <Popup id={popupId} open={popupOpen} anchor={popupAnchor}>
          <div className="GalleryPopup">The content of the Popup.</div>
        </Popup>
      </div>
      <div>
        <Select
          className="GallerySelect"
          slots={{
            root: Button,
          }}
          slotProps={{
            listbox: { className: 'GallerySelect-listbox' },
            popper: { className: 'GallerySelect-popper' },
          }}
          defaultValue={10}
        >
          <Option className="GallerySelect-option" value={10}>
            Documentation
          </Option>
          <Option className="GallerySelect-option" value={20}>
            Components
          </Option>
          <Option className="GallerySelect-option" value={30}>
            Features
          </Option>
        </Select>
      </div>
      <div style={{ width: 320 }}>
        <Slider
          slotProps={{
            root: { className: 'GallerySlider' },
            rail: { className: 'GallerySlider-rail' },
            track: { className: 'GallerySlider-track' },
            thumb: { className: 'GallerySlider-thumb', tabIndex: 0 },
          }}
          defaultValue={50}
        />
        <Slider
          slotProps={{
            root: { className: 'GallerySlider' },
            rail: { className: 'GallerySlider-rail' },
            track: { className: 'GallerySlider-track' },
            thumb: { className: 'GallerySlider-thumb' },
          }}
          defaultValue={10}
          disabled
        />
      </div>
      <div>
        <button className="GalleryButton" type="button" onClick={handleSnackbarButtonClick}>
          Open snackbar
        </button>
        <Snackbar
          autoHideDuration={5000}
          open={snackbarOpen}
          onClose={handleClose}
          exited={exited}
          className="GallerySnackbar"
        >
          <Transition
            timeout={{ enter: 400, exit: 400 }}
            in={snackbarOpen}
            appear
            unmountOnExit
            onEnter={handleOnEnter}
            onExited={handleOnExited}
            nodeRef={nodeRef}
          >
            {(status) => (
              <div
                className="GallerySnackbar-content"
                style={{
                  transform: positioningStyles[status],
                  transition: 'transform 300ms ease',
                }}
                ref={nodeRef}
              >
                <CheckRoundedIcon
                  sx={{
                    color: 'success.main',
                    flexShrink: 0,
                    width: '1.25rem',
                    height: '1.5rem',
                  }}
                />
                <div className="snackbar-message">
                  <p className="snackbar-title">Notifications sent</p>
                  <p className="snackbar-description">
                    Everything was sent to the desired address.
                  </p>
                </div>
                <CloseIcon onClick={handleClose} className="snackbar-close-icon" />
              </div>
            )}
          </Transition>
        </Snackbar>
      </div>
      <div>
        <Switch
          slotProps={{
            root: { className: 'GallerySwitch' },
            input: { ...label, className: 'GallerySwitch-input' },
            thumb: { className: 'GallerySwitch-thumb' },
            track: { className: 'GallerySwitch-track' },
          }}
          defaultChecked
        />
        <Switch
          slotProps={{
            root: { className: 'GallerySwitch' },
            input: { ...label, className: 'GallerySwitch-input' },
            thumb: { className: 'GallerySwitch-thumb' },
            track: { className: 'GallerySwitch-track' },
          }}
        />
        <Switch
          slotProps={{
            root: { className: 'GallerySwitch' },
            input: { ...label, className: 'GallerySwitch-input' },
            thumb: { className: 'GallerySwitch-thumb' },
            track: { className: 'GallerySwitch-track' },
          }}
          defaultChecked
          disabled
        />
        <Switch
          slotProps={{
            root: { className: 'GallerySwitch' },
            input: { ...label, className: 'GallerySwitch-input' },
            thumb: { className: 'GallerySwitch-thumb' },
            track: { className: 'GallerySwitch-track' },
          }}
          disabled
        />
      </div>
    </Stack>
  );
}
