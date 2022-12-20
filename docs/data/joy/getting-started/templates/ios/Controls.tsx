/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider, { DividerProps } from '@mui/joy/Divider';
import IconButton, { iconButtonClasses, IconButtonProps } from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import LinearProgress from '@mui/joy/LinearProgress';
import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemButton from '@mui/joy/ListItemButton';
import ListDivider from '@mui/joy/ListDivider';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import Typography from '@mui/joy/Typography';
import Switch from '@mui/joy/Switch';
import Slider from '@mui/joy/Slider';
import Sheet, { SheetProps } from '@mui/joy/Sheet';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import AddCircle from '@mui/icons-material/AddCircle';
import PlayArrow from '@mui/icons-material/PlayArrowRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import WbSunny from '@mui/icons-material/WbSunnyOutlined';
import LightMode from '@mui/icons-material/LightModeOutlined';
import CheckRounded from '@mui/icons-material/CheckRounded';
import MenuRounded from '@mui/icons-material/MenuRounded';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import CropFreeIcon from '@mui/icons-material/CropFree';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import UploadIcon from '@mui/icons-material/UploadOutlined';
import Frame from './Frame';

function Navbar({ sx, ...props }: SheetProps) {
  return (
    <Sheet
      {...props}
      sx={[{ bgcolor: 'background.primary' }, ...(Array.isArray(sx) ? sx : [sx])]}
    />
  );
}

function VerticalSeparator({ sx, ...props }: DividerProps) {
  return (
    <Divider
      orientation="vertical"
      {...props}
      sx={[
        {
          my: 'calc(-1 * var(--List-item-paddingY))',
          mx: 2,
          [`.${iconButtonClasses.root} + &`]: {
            ml: 0,
          },
          [`& + .${iconButtonClasses.root}`]: {
            ml: -2,
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}

function ListItemRightAction({ sx, ...props }: IconButtonProps) {
  return (
    <IconButton
      {...props}
      sx={[
        {
          color: 'label.secondary',
          minHeight: 'var(--List-item-minHeight)',
          my: 'calc(-1 * var(--List-item-paddingY))',
          px: 2,
          borderRadius: 0,
          '--Icon-fontSize': '22px',
          '&:last-child': {
            mr: 'calc(-1 * var(--List-item-paddingRight))',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}

function ListItemLeftAction({ sx, ...props }: IconButtonProps) {
  return (
    <IconButton
      {...props}
      sx={[
        {
          color: '#fff',
          bgcolor: 'system.red',
          width: 72,
          minHeight: 'var(--List-item-minHeight)',
          my: 'calc(-1 * var(--List-item-paddingY))',
          borderRadius: 0,
          '--Icon-fontSize': '22px',
          '&:first-child': {
            ml: 'calc(-1 * var(--List-item-paddingRight))',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}

export default function Views() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'auto 393px 393px',
        gridTemplateRows: 'repeat(20, auto)',
        gap: 2,
        alignItems: 'flex-start',
        '& > .wrapper': {
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        },
      }}
    >
      <Box sx={{ gridRow: '1 / -1', gridColumn: '1 / 2' }}>
        <Frame
          name="Buttons"
          sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}
        >
          <Sheet>
            <Button variant="label">Button</Button>
          </Sheet>
          <Sheet>
            <IconButton>
              <InfoOutlined />
            </IconButton>
          </Sheet>
          <Sheet>
            <IconButton>
              <AddCircle />
            </IconButton>
          </Sheet>
          <Button size="lg" sx={{ minWidth: 300 }}>
            Label
          </Button>
        </Frame>

        <Box
          sx={{
            gridColumn: '1 / -1',
            display: 'flex',
            gap: 1,
          }}
        >
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <Frame
              key={size}
              name={{ sm: 'Small', md: 'Medium', lg: 'Large' }[size]}
              sx={{
                display: 'flex',
                gap: 2,
                flexDirection: 'column',
                alignItems: 'flex-start',
                p: 2,
                bgcolor: 'background.primary',
              }}
            >
              <Button
                size={size}
                variant="plain"
                color="primary"
                startDecorator={<PlayArrow />}
              >
                Play
              </Button>
              <Button
                size={size}
                variant="plain"
                color="primary"
                disabled
                startDecorator={<PlayArrow />}
              >
                Play
              </Button>
              <Button
                size={size}
                variant="soft"
                color="neutral"
                startDecorator={<PlayArrow />}
              >
                Play
              </Button>
              <Button
                size={size}
                variant="soft"
                color="neutral"
                disabled
                startDecorator={<PlayArrow />}
              >
                Play
              </Button>

              <IconButton size={size} variant="soft" color="neutral">
                <PlayArrow />
              </IconButton>
              <IconButton size={size} variant="soft" color="neutral" disabled>
                <PlayArrow />
              </IconButton>

              <Button
                size={size}
                variant="soft"
                color="primary"
                startDecorator={<PlayArrow />}
              >
                Play
              </Button>
              <Button
                size={size}
                variant="soft"
                color="primary"
                disabled
                startDecorator={<PlayArrow />}
              >
                Play
              </Button>

              <IconButton size={size} variant="soft" color="primary">
                <PlayArrow />
              </IconButton>
              <IconButton size={size} variant="soft" color="primary" disabled>
                <PlayArrow />
              </IconButton>

              <Button
                size={size}
                variant="solid"
                color="primary"
                startDecorator={<PlayArrow />}
              >
                Play
              </Button>
              <Button
                size={size}
                variant="solid"
                color="primary"
                disabled
                startDecorator={<PlayArrow />}
              >
                Play
              </Button>

              <IconButton size={size} variant="solid" color="primary">
                <PlayArrow />
              </IconButton>
              <IconButton size={size} variant="solid" color="primary" disabled>
                <PlayArrow />
              </IconButton>
            </Frame>
          ))}
        </Box>
      </Box>

      <Box className="wrapper">
        <Frame
          name="Segmented Control"
          sx={{ bgcolor: 'background.primary', px: 2, py: 1 }}
        >
          <Tabs defaultValue={0}>
            <TabList>
              <Tab>Label</Tab>
              <Tab>Label</Tab>
              <Tab>Label</Tab>
            </TabList>
          </Tabs>
        </Frame>
      </Box>

      <Box className="wrapper">
        <Frame name="Stepper" sx={{ bgcolor: 'background.primary', px: 2, py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>Title</Typography>
            <List
              row
              sx={{
                flex: 0,
                ml: 'auto',
                bgcolor: 'fill.tertiary',
                '--List-item-minHeight': '29px',
                '--List-radius': '7.92px',
                '--List-padding': '0px',
                '--Icon-color': 'currentColor',
              }}
            >
              <ListItemButton>
                <RemoveRoundedIcon />
              </ListItemButton>
              <ListDivider sx={{ borderRadius: '1px', my: 1 }} />
              <ListItemButton>
                <AddRoundedIcon />
              </ListItemButton>
            </List>
          </Box>
        </Frame>
      </Box>

      <Box className="wrapper">
        <Frame name="Switch">
          <Navbar sx={{ px: 2, py: 0.75 }}>
            <FormControl orientation="horizontal">
              <FormLabel sx={{ flexGrow: 1 }}>Title</FormLabel>
              <Switch />
            </FormControl>
          </Navbar>
        </Frame>
      </Box>

      <Box className="wrapper">
        <Frame name="Slider">
          <Navbar sx={{ px: 2, py: 0.75 }}>
            <Slider defaultValue={30} />
          </Navbar>
        </Frame>
        <Navbar
          sx={{ px: 2, py: 0.75, display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <WbSunny />
          <Slider defaultValue={30} />
          <LightMode />
        </Navbar>
      </Box>

      <Box className="wrapper">
        <Frame name="Progress indicators">
          <Navbar sx={{ px: 2, py: 0.75 }}>
            <LinearProgress sx={{ mb: 1 }} />
            <LinearProgress determinate value={50} />
          </Navbar>
        </Frame>
        <Navbar>
          <LinearProgress
            variant="plain"
            size="sm"
            thickness={2}
            determinate
            value={80}
            sx={{ '--LinearProgress-radius': '0px' }}
          />
          <Typography level="caption2" textAlign="center" sx={{ pt: 2, pb: 7 }}>
            Sending…
          </Typography>
        </Navbar>
      </Box>

      <Box className="wrapper">
        <Frame name="Text Field">
          <Navbar sx={{ px: 2, py: 0.75 }}>
            <FormControl orientation="horizontal">
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Placeholder Value"
                endDecorator={
                  <IconButton color="neutral">
                    <CancelRoundedIcon />
                  </IconButton>
                }
                sx={{ flex: 1, ml: '52px' }}
              />
            </FormControl>
          </Navbar>
        </Frame>
      </Box>

      <Box className="wrapper">
        <Frame name="Table View Rows">
          <Sheet>
            <List>
              <ListItem>Title</ListItem>
              <ListDivider />
              <ListItem>
                <ListItemContent>Title</ListItemContent>
                <CheckRounded sx={{ color: 'system.blue' }} />
              </ListItem>
              <ListDivider />
              <ListItem>
                <ListItemContent>Title</ListItemContent>
                <Typography textColor="label.secondary" sx={{ mr: 1 }}>
                  Detail
                </Typography>
                <CheckRounded sx={{ color: 'system.blue' }} />
              </ListItem>
              <ListDivider />
              <ListItem>
                <ListItemContent>Title</ListItemContent>
                <CheckRounded sx={{ color: 'system.blue' }} />
                <VerticalSeparator />
                <ListItemRightAction>
                  <MenuRounded />
                </ListItemRightAction>
              </ListItem>
              <ListDivider />
              <ListItem>
                <ListItemContent>Title</ListItemContent>
                <Button
                  variant="soft"
                  color="neutral"
                  sx={{ mr: 1, borderRadius: '8px' }}
                >
                  June 2020
                </Button>
                <Button variant="soft" color="neutral" sx={{ borderRadius: '8px' }}>
                  8:00 AM
                </Button>
              </ListItem>
              <ListDivider />
              <ListItem>
                <ListItemLeftAction>
                  <CropFreeIcon />
                </ListItemLeftAction>
                <ListItemContent sx={{ pl: 2 }}>Title</ListItemContent>
              </ListItem>
              <ListItem>
                <ListItemLeftAction sx={{ bgcolor: 'system.grey' }}>
                  <CropFreeIcon />
                </ListItemLeftAction>
                <ListItemLeftAction>
                  <CropFreeIcon />
                </ListItemLeftAction>
                <ListItemContent sx={{ pl: 2 }}>Title</ListItemContent>
              </ListItem>
              <ListItem>
                <ListItemLeftAction sx={{ bgcolor: 'system.orange' }}>
                  <CropFreeIcon />
                </ListItemLeftAction>
                <ListItemLeftAction sx={{ bgcolor: 'system.grey' }}>
                  <CropFreeIcon />
                </ListItemLeftAction>
                <ListItemLeftAction>
                  <CropFreeIcon />
                </ListItemLeftAction>
                <ListItemContent sx={{ pl: 2 }}>Title</ListItemContent>
              </ListItem>
            </List>
          </Sheet>
        </Frame>
        <Frame>
          <Sheet>
            <List>
              <ListItemButton color="primary">Label</ListItemButton>
              <ListItemButton color="danger">Destructive Action</ListItemButton>
              <ListItemButton disabled>Destructive Action</ListItemButton>
            </List>
          </Sheet>
        </Frame>
        <Frame>
          <Sheet>
            <List sx={{ '--List-item-minHeight': '60px' }}>
              <ListItem>
                <ListItemContent>
                  <Typography>Title</Typography>
                  <Typography level="body2" textColor="label.secondary">
                    Subtitle
                  </Typography>
                </ListItemContent>
              </ListItem>
              <ListDivider />
              <ListItem>
                <ListItemContent>
                  <Typography>Title</Typography>
                  <Typography level="body2" textColor="label.secondary">
                    Subtitle
                  </Typography>
                </ListItemContent>
                <Typography textColor="label.secondary" sx={{ mr: 1 }}>
                  Detail
                </Typography>
                <CheckRounded sx={{ color: 'system.blue' }} />
              </ListItem>
              <ListDivider />
              <ListItem>
                <ListItemContent>
                  <Typography>Title</Typography>
                  <Typography level="body2" textColor="label.secondary">
                    Subtitle
                  </Typography>
                </ListItemContent>
                <CheckRounded sx={{ color: 'system.blue' }} />
                <VerticalSeparator />
                <ListItemRightAction>
                  <MenuRounded />
                </ListItemRightAction>
              </ListItem>
              <ListDivider />
              <ListItem>
                <ListItemContent>
                  <Typography>Title</Typography>
                  <Typography level="body2" textColor="label.secondary">
                    Subtitle
                  </Typography>
                </ListItemContent>
                <Button
                  variant="soft"
                  color="neutral"
                  sx={{ mr: 1, borderRadius: '8px' }}
                >
                  June 2020
                </Button>
                <Button variant="soft" color="neutral" sx={{ borderRadius: '8px' }}>
                  8:00 AM
                </Button>
              </ListItem>
              <ListDivider />
              <ListItem>
                <ListItemLeftAction>
                  <CropFreeIcon />
                </ListItemLeftAction>
                <ListItemContent sx={{ pl: 2 }}>
                  <Typography>Title</Typography>
                  <Typography level="body2" textColor="label.secondary">
                    Subtitle
                  </Typography>
                </ListItemContent>
              </ListItem>
              <ListItem>
                <ListItemLeftAction sx={{ bgcolor: 'system.grey' }}>
                  <CropFreeIcon />
                </ListItemLeftAction>
                <ListItemLeftAction>
                  <CropFreeIcon />
                </ListItemLeftAction>
                <ListItemContent sx={{ pl: 2 }}>
                  <Typography>Title</Typography>
                  <Typography level="body2" textColor="label.secondary">
                    Subtitle
                  </Typography>
                </ListItemContent>
              </ListItem>
              <ListItem>
                <ListItemLeftAction sx={{ bgcolor: 'system.orange' }}>
                  <CropFreeIcon />
                </ListItemLeftAction>
                <ListItemLeftAction sx={{ bgcolor: 'system.grey' }}>
                  <CropFreeIcon />
                </ListItemLeftAction>
                <ListItemLeftAction>
                  <CropFreeIcon />
                </ListItemLeftAction>
                <ListItemContent sx={{ pl: 2 }}>
                  <Typography>Title</Typography>
                  <Typography level="body2" textColor="label.secondary">
                    Subtitle
                  </Typography>
                </ListItemContent>
              </ListItem>
            </List>
          </Sheet>
        </Frame>
      </Box>

      <Box className="wrapper">
        <Frame name="Grouped Table Views">
          <Box sx={{ py: 2, bgcolor: 'groupedBackground.primary' }}>
            <Sheet>
              <Divider />
              <List>
                <ListItemButton>
                  <ListItemContent>Title</ListItemContent>
                  <KeyboardArrowRightRounded />
                </ListItemButton>
                <ListDivider />
                <ListItemButton>
                  <ListItemContent>Title</ListItemContent>
                  <KeyboardArrowRightRounded />
                </ListItemButton>
                <ListDivider />
                <ListItemButton>
                  <ListItemContent>Title</ListItemContent>
                  <KeyboardArrowRightRounded />
                </ListItemButton>
              </List>
              <Divider />
            </Sheet>

            <Typography
              level="footnote"
              textTransform="uppercase"
              textColor="label.secondary"
              sx={{ mx: 2, mb: '7px', mt: 4 }}
            >
              Grouped table view header
            </Typography>
            <Sheet>
              <Divider />
              <List>
                <ListItemButton>
                  <ListItemContent>Title</ListItemContent>
                  <KeyboardArrowRightRounded />
                </ListItemButton>
                <ListDivider />
                <ListItemButton>
                  <ListItemContent>Title</ListItemContent>
                  <KeyboardArrowRightRounded />
                </ListItemButton>
                <ListDivider />
                <ListItemButton>
                  <ListItemContent>Title</ListItemContent>
                  <KeyboardArrowRightRounded />
                </ListItemButton>
              </List>
              <Divider />
            </Sheet>
            <Typography
              level="footnote"
              textTransform="uppercase"
              textColor="label.secondary"
              sx={{ mx: 2, mt: '7px', mb: 4 }}
            >
              Grouped table view footer
            </Typography>

            <Box sx={{ mt: 4, px: 2 }}>
              <List sx={{ bgcolor: 'background.primary', '--List-radius': '12px' }}>
                <ListItemButton>
                  <ListItemContent>Title</ListItemContent>
                  <KeyboardArrowRightRounded />
                </ListItemButton>
                <ListDivider />
                <ListItemButton>
                  <ListItemContent>Title</ListItemContent>
                  <KeyboardArrowRightRounded />
                </ListItemButton>
                <ListDivider />
                <ListItemButton>
                  <ListItemContent>Title</ListItemContent>
                  <KeyboardArrowRightRounded />
                </ListItemButton>
              </List>
            </Box>

            <Box sx={{ mt: 4, px: 2 }}>
              <Typography
                level="footnote"
                textTransform="uppercase"
                textColor="label.secondary"
                sx={{ mb: '7px', mt: 4 }}
              >
                Grouped table view header
              </Typography>
              <List sx={{ bgcolor: 'background.primary', '--List-radius': '12px' }}>
                <ListItemButton>
                  <ListItemContent>Title</ListItemContent>
                  <KeyboardArrowRightRounded />
                </ListItemButton>
                <ListDivider />
                <ListItemButton>
                  <ListItemContent>Title</ListItemContent>
                  <KeyboardArrowRightRounded />
                </ListItemButton>
                <ListDivider />
                <ListItemButton>
                  <ListItemContent>Title</ListItemContent>
                  <KeyboardArrowRightRounded />
                </ListItemButton>
              </List>
              <Typography
                level="footnote"
                textTransform="uppercase"
                textColor="label.secondary"
                sx={{ mt: '7px', mb: 4 }}
              >
                Grouped table view footer
              </Typography>
            </Box>
          </Box>
        </Frame>
      </Box>

      <Box className="wrapper">
        <Frame name="Table View Section Index">
          <Sheet>
            <List>
              <ListItem nested>
                <ListSubheader>A</ListSubheader>
                <List>
                  <ListItemButton>Alexander Valley</ListItemButton>
                  <ListDivider />
                  <ListItemButton>Anderson Valley</ListItemButton>
                  <ListDivider />
                  <ListItemButton>Atlas Peak</ListItemButton>
                </List>
              </ListItem>
              <ListItem nested>
                <ListSubheader>B</ListSubheader>
                <List>
                  <ListItemButton>Bennett Valley</ListItemButton>
                </List>
              </ListItem>
              <ListItem nested>
                <ListSubheader>C</ListSubheader>
                <List>
                  <ListItemButton>Calistoga</ListItemButton>
                  <ListDivider />
                  <ListItemButton>Chalk Hill</ListItemButton>
                </List>
              </ListItem>
              <ListItem nested>
                <ListSubheader>D</ListSubheader>
                <List>
                  <ListItemButton>Diamond Mountain</ListItemButton>
                  <ListDivider />
                  <ListItemButton>Dry Creek Vally</ListItemButton>
                </List>
              </ListItem>
              <ListItem nested>
                <ListSubheader>F</ListSubheader>
                <List>
                  <ListItemButton>Fort Ross / Seaview</ListItemButton>
                </List>
              </ListItem>
              <ListItem nested>
                <ListSubheader>G</ListSubheader>
                <List>
                  <ListItemButton>Green Valley</ListItemButton>
                </List>
              </ListItem>
              <ListItem nested>
                <ListSubheader>H</ListSubheader>
                <List>
                  <ListItemButton>Howell Mountain</ListItemButton>
                </List>
              </ListItem>
            </List>
            <List
              sx={{
                position: 'absolute',
                top: '50%',
                right: 0,
                transform: 'translateY(-50)',
                '--List-item-minHeight': '0px',
                '--List-item-paddingX': '5px',
              }}
            >
              {['#', 'A', 'B', 'C', 'D', 'F', 'G'].map((text) => (
                <ListItem
                  key={text}
                  color="primary"
                  sx={(theme) => ({
                    ...theme.typography.caption2,
                    lineHeight: '10px',
                    fontWeight: 'lg',
                  })}
                >
                  {text}
                </ListItem>
              ))}
            </List>
          </Sheet>
        </Frame>
      </Box>

      <Box className="wrapper">
        <Frame name="Menus">
          <List
            sx={{
              material: 'regular',
              '--List-radius': '12px',
              '& > [role="separator"]': {
                height: 8,
                marginInline: 0,
                backgroundColor: 'rgba(0 0 0 / 0.08)',
              },
            }}
          >
            <ListItem sx={{ py: '10px' }}>
              <AspectRatio
                ratio="1"
                sx={{
                  boxShadow: 'sm',
                  minWidth: 64,
                  '--AspectRatio-radius': '12px',
                }}
              >
                <img alt="" src="https://via.placeholder.com/128" />
              </AspectRatio>
              <ListItemContent sx={{ mx: 1.5 }}>
                <Typography>Label</Typography>
                <Typography level="body2" textColor="label.secondary">
                  Sublabel
                </Typography>
              </ListItemContent>
              <IconButton
                variant="soft"
                color="neutral"
                sx={{ color: 'label.primary', mr: '-4px' }}
              >
                <UploadIcon />
              </IconButton>
            </ListItem>
            <ListDivider />
            <ListItem nested>
              <List>
                <ListItemButton>
                  <ListItemContent>Action</ListItemContent>
                  <CropFreeIcon />
                </ListItemButton>
                <ListDivider />
                <ListItemButton>
                  <ListItemContent>Action</ListItemContent>
                  <CropFreeIcon />
                </ListItemButton>
                <ListDivider />
                <ListItemButton>
                  <ListItemContent>Action</ListItemContent>
                  <CropFreeIcon />
                </ListItemButton>
              </List>
            </ListItem>
            <ListDivider />
            <ListItem nested>
              <List>
                <ListItemButton>
                  <ListItemContent>Action</ListItemContent>
                  <CropFreeIcon />
                </ListItemButton>
                <ListDivider />
                <ListItemButton>
                  <ListItemContent>Action</ListItemContent>
                  <CropFreeIcon />
                </ListItemButton>
                <ListDivider />
                <ListItemButton>
                  <ListItemContent>Action</ListItemContent>
                  <CropFreeIcon />
                </ListItemButton>
                <ListDivider />
                <ListItemButton>
                  <ListItemContent>Action</ListItemContent>
                  <CropFreeIcon />
                </ListItemButton>
              </List>
            </ListItem>
            <ListDivider />
            <ListItem nested>
              <List>
                <ListItemButton>
                  <ListItemContent>Action</ListItemContent>
                  <CropFreeIcon />
                </ListItemButton>
                <ListDivider />
                <ListItemButton>
                  <ListItemContent>Action</ListItemContent>
                  <CropFreeIcon />
                </ListItemButton>
                <ListDivider />
                <ListItemButton>
                  <ListItemContent>Action</ListItemContent>
                  <CropFreeIcon />
                </ListItemButton>
                <ListDivider />
                <ListItemButton>
                  <ListItemContent>Action</ListItemContent>
                  <CropFreeIcon />
                </ListItemButton>
              </List>
            </ListItem>
          </List>
        </Frame>
      </Box>
    </Box>
  );
}
