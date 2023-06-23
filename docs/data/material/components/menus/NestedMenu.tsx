import * as React from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  Box,
  ClickAwayListener,
  Grow,
  Icon,
  MenuList,
  Paper,
  Popper,
  Typography,
} from '@mui/material';

const options = [
  {
    value: 'Food',
    menuLevel: 0,
  },
  {
    value: 'Drinks',
    menuLevel: 0,
    nestedOptions: [
      {
        value: 'Non-Alcoholic',
        menuLevel: 1,
        nestedOptions: [
          {
            value: 'Soda',
            menuLevel: 2,
          },
          {
            value: 'Iced Tea',
            menuLevel: 2,
          },
          {
            value: 'Lemonade',
            menuLevel: 2,
          },
        ],
      },
      {
        value: 'Alcoholic',
        menuLevel: 1,
      },
    ],
  },

  {
    value: 'Desserts',
    menuLevel: 0,
    nestedOptions: [
      {
        value: 'Cakes',
        menuLevel: 1,
      },
      {
        value: 'Ice Cream',
        menuLevel: 1,
      },
      {
        value: 'Pastries',
        menuLevel: 1,
      },
    ],
  },
];

export default function BasicMenu() {
  const MENU_LEVELS = 3;

  const [anchors, setAnchors] = React.useState<{
    elements: Array<null | HTMLElement>;
    options: Array<null | typeof options>;
  }>({
    elements: new Array(MENU_LEVELS).fill(null),
    options: new Array(MENU_LEVELS).fill(null),
  });

  const handleClick = (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    level = 0,
    nestedOptions = options,
  ) => {
    const target = event.currentTarget;

    setAnchors((prevAnchors) => ({
      elements: prevAnchors.elements.map((element, index) =>
        index === level ? target : element,
      ),
      options: prevAnchors.options.map((element, index) =>
        index === level ? nestedOptions : element,
      ),
    }));
  };
  const handleClose = (level: number) => {
    setAnchors((prevAnchors) => ({
      elements: prevAnchors.elements.map((element, index) =>
        index >= level ? null : element,
      ),
      options: prevAnchors.options.map((element, index) =>
        index >= level ? null : element,
      ),
    }));
  };

  return (
    <React.Fragment>
      <Button
        onClick={(event) => {
          handleClick(event);
        }}
      >
        Menu
      </Button>

      {anchors.elements.map((anchorElement, index) =>
        anchorElement ? (
          <Popper
            open={Boolean(anchorElement)}
            anchorEl={anchorElement}
            role={undefined}
            placement={index > 0 ? 'right-start' : 'bottom-start'}
            transition
          >
            {({ TransitionProps }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: 'right top',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={() => handleClose(0)}>
                    <MenuList
                      autoFocusItem={Boolean(anchorElement)}
                      id="nested-menu"
                      aria-labelledby="nested-button"
                    >
                      {(anchors.options[index] ?? []).map((option) => (
                        <MenuItem
                          key={option.value}
                          onClick={() => {
                            if (!option.nestedOptions) {
                              handleClose(0);
                            }
                          }}
                          onMouseEnter={(event) => {
                            if (!option.nestedOptions) {
                              handleClose(option.menuLevel + 1);
                            } else if (
                              option.nestedOptions &&
                              anchors.options[option.menuLevel + 1] &&
                              !option.nestedOptions.every(
                                (val, i) =>
                                  val.value ===
                                  anchors.options[option.menuLevel + 1]?.[i].value,
                              )
                            ) {
                              handleClose(option.menuLevel + 1);
                              handleClick(
                                event,
                                option.menuLevel + 1,
                                option.nestedOptions,
                              );
                            } else {
                              handleClick(
                                event,
                                option.menuLevel + 1,
                                option.nestedOptions,
                              );
                            }
                          }}
                          onKeyDown={(event) => {
                            if (option.nestedOptions) {
                              if (event.key === 'ArrowRight') {
                                handleClick(
                                  event,
                                  option.menuLevel + 1,
                                  option.nestedOptions,
                                );
                              }
                            }
                            if (event.key === 'ArrowLeft' && option.menuLevel > 0) {
                              handleClose(option.menuLevel);
                            }
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              width: '100%',
                            }}
                          >
                            <Typography>{option.value}</Typography>
                            {option.nestedOptions ? (
                              <Icon>
                                <ChevronRightIcon />
                              </Icon>
                            ) : null}
                          </Box>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        ) : null,
      )}
    </React.Fragment>
  );
}
