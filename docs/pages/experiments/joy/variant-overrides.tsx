/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { GlobalStyles } from '@mui/system';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import IconButton from '@mui/joy/IconButton';
import TextField from '@mui/joy/TextField';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import { CssVarsProvider, ColorPaletteProp, VariantProp, useColorScheme } from '@mui/joy/styles';
import CodeRounded from '@mui/icons-material/CodeRounded';
import ScheduleRounded from '@mui/icons-material/ScheduleRounded';
import DeleteForeverRounded from '@mui/icons-material/DeleteForeverRounded';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import Sheet from '@mui/joy/Sheet';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import Explore from '@mui/icons-material/Explore';
import DocumentScanner from '@mui/icons-material/DocumentScanner';
import Settings from '@mui/icons-material/Settings';

const ColorSchemePicker = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
      sx={{ minWidth: 40, p: '0.25rem' }}
    >
      {mode === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
};

export default function JoyVariant() {
  const renderContent = (variant: VariantProp, color: ColorPaletteProp) => (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <ScheduleRounded fontSize="md" />
        <Typography level="body3" sx={{ ml: 0.5, mt: '1px', fontWeight: 500 }}>
          March 25th
        </Typography>
      </Box>
      <Box sx={{ my: 'auto' }}>
        <Sheet
          variant={variant === 'contained' ? 'contained' : 'light'}
          sx={{
            display: 'inline-flex',
            p: 0.75,
            borderRadius: '4px',
            boxShadow: 'md',
          }}
        >
          <CodeRounded />
        </Sheet>
        <Typography level="h6" component="div" sx={{ mt: 1.5, fontWeight: 500 }}>
          Check the docs for getting every component API
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Box
          component="img"
          aria-labelledby="demo-task-card-assigne-name"
          src="/static/images/avatar/1-sm.jpeg"
          sx={{ borderRadius: 'sm', width: 40, height: 40 }}
        />
        <Box>
          <Typography level="body2" sx={{ fontWeight: 500 }}>
            Assigned to
          </Typography>
          <Typography id="demo-task-card-assigne-name" sx={{ fontWeight: 500 }}>
            Michael Scott
          </Typography>
        </Box>
        <Button color={variant === 'contained' ? 'context' : color} sx={{ ml: 'auto' }}>
          Check
        </Button>
        <IconButton color={variant.match(/(contained)/) ? 'context' : color}>
          <DeleteForeverRounded />
        </IconButton>
      </Box>
    </React.Fragment>
  );
  const renderBanner = (enableVariantOverride = false) => (
    <Sheet
      variant="contained"
      color="primary"
      enableVariantOverride={enableVariantOverride}
      sx={{
        py: 10,
        px: 5,
        background: (theme) =>
          `linear-gradient(45deg, ${theme.vars.palette.primary[800]}, ${theme.vars.palette.primary[600]})`,
      }}
    >
      <Typography level="body2" sx={{ textTransform: 'uppercase', letterSpacing: 'md' }}>
        Benble home colony
      </Typography>
      <Typography level="h2">
        Now It&apos;s Easy To Find{' '}
        <Typography component="span" level="inherit" color="primary.300">
          Your Home
        </Typography>
      </Typography>
      <Typography sx={{ color: 'text.secondary' }}>
        There is an anti-aging revolbeficiary.dti-aging medicine are the breakthroughs and
        techadvancese exciting. The 6-step akthroughs and tecO.
      </Typography>
      <Box sx={{ height: '1rem' }} />
      <Button endIcon={<KeyboardArrowRight />} size="lg" sx={{ borderRadius: '0px' }}>
        Get Started
      </Button>
    </Sheet>
  );
  const renderNav = (enableVariantOverride = false, rightVariant?: VariantProp) => (
    <Box sx={{ display: 'grid', gridTemplateColumns: '72px 1fr' }}>
      <Sheet
        variant="contained"
        color="primary"
        enableVariantOverride={enableVariantOverride}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          py: 2,
          bgcolor: 'primary.700',
        }}
      >
        <IconButton variant="text">
          <Explore />
        </IconButton>
        <IconButton variant="contained">
          <DocumentScanner />
        </IconButton>
        <IconButton variant="text">
          <Settings />
        </IconButton>
      </Sheet>
      <Sheet variant={rightVariant} color="primary" enableVariantOverride={enableVariantOverride}>
        <List
          sx={{
            '--List-padding': '12px',
            '--List-radius': '8px',
            '--List-nestedInsetStart': '0px',
          }}
        >
          <ListItem>
            <ListItemButton>Policies</ListItemButton>
          </ListItem>
          <ListItem nested>
            <ListItemButton>
              Components <KeyboardArrowUp sx={{ ml: 'auto' }} />
            </ListItemButton>
            <List
              size="sm"
              sx={{
                pl: 'calc(var(--List-item-paddingLeft) * 2)',
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  width: '1px',
                  top: 0,
                  bottom: 0,
                  left: 'var(--List-item-paddingLeft)',
                  bgcolor: 'currentColor',
                  opacity: 0.32,
                },
              }}
            >
              <ListItem>
                <ListItemButton variant="light">Resources</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton variant="contained" selected>
                  Actions
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton variant="outlined">Users</ListItemButton>
              </ListItem>
            </List>
          </ListItem>
          <ListItem>
            <ListItemButton>Policy model</ListItemButton>
          </ListItem>
        </List>
      </Sheet>
    </Box>
  );
  const widgetSx = {
    minWidth: 280,
    maxWidth: 360,
    minHeight: 280,
    display: 'flex',
    flexDirection: 'column',
    p: 2.5,
    boxShadow: 'md',
    borderRadius: 'sm',
  };
  return (
    <CssVarsProvider>
      <GlobalStyles styles={{ body: { margin: 0 } }} />
      <Box sx={{ px: 3, py: 4 }}>
        <ColorSchemePicker />
      </Box>
      <Box
        sx={{
          maxWidth: { md: 1152, xl: 1536 },
          py: 3,
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 2,
        }}
      >
        <Typography
          level="h5"
          justifyContent="center"
          sx={{ bgcolor: 'background.body', position: 'sticky', top: 0, py: '0.25rem', zIndex: 1 }}
        >
          <b style={{ color: 'var(--joy-palette-danger-textColor)' }}>Without</b>&nbsp;variant
          overrides
        </Typography>
        <Typography
          level="h5"
          justifyContent="center"
          sx={{ bgcolor: 'background.body', position: 'sticky', top: 0, py: '0.25rem', zIndex: 1 }}
        >
          Variant overrides&nbsp;
          <b style={{ color: 'var(--joy-palette-success-textColor)' }}>enabled</b>
        </Typography>
        {renderBanner(false)}
        {renderBanner(true)}
        {renderNav(false, 'light')}
        {renderNav(true, 'light')}
        {renderNav(false, 'contained')}
        {renderNav(true, 'contained')}
      </Box>
      {(['contained', 'light'] as const).map((v) => (
        <Sheet
          key={v}
          variant={v}
          color="primary"
          enableVariantOverride
          sx={{
            maxWidth: { md: 1152, xl: 1536 },
            mx: 'auto',
            mt: 4,
            py: 3,
            px: 2,
            display: 'flex',
            gap: 3,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <Avatar variant="contained">SK</Avatar>
          <Avatar variant="light">SK</Avatar>
          <Avatar variant="outlined">SK</Avatar>
          <Button variant="contained">Contained</Button>
          <Button variant="light">Light</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="text">Text</Button>
          <IconButton variant="contained">
            <Explore />
          </IconButton>
          <IconButton variant="light">
            <Explore />
          </IconButton>
          <IconButton variant="outlined">
            <Explore />
          </IconButton>
          <IconButton variant="text">
            <Explore />
          </IconButton>
          <Checkbox variant="outlined" checked={false} />
          <Checkbox variant="light" checked={false} />
          <Checkbox variant="contained" checked={false} />
          <Checkbox variant="outlined" checked />
          <Checkbox variant="light" checked />
          <Checkbox variant="contained" checked />
          <TextField
            placeholder="Placeholder"
            variant="contained"
            label="Label"
            helperText="Helper text"
          />
          <TextField
            placeholder="Placeholder"
            variant="light"
            label="Label"
            helperText="Helper text"
          />
          <TextField
            placeholder="Placeholder"
            variant="outlined"
            label="Label"
            helperText="Helper text"
          />
          <TextField
            placeholder="Placeholder"
            variant="text"
            label="Label"
            helperText="Helper text"
          />
          <Link component="button">Link (default)</Link>
          <Link component="button" disabled>
            Link (default)
          </Link>
          <Link component="button" variant="contained">
            Link (contained)
          </Link>
          <Link component="button" variant="light">
            Link (light)
          </Link>
          <Link component="button" variant="outlined">
            Link (outlined)
          </Link>
          <Link component="button" variant="text">
            Link (text)
          </Link>
        </Sheet>
      ))}
      <Box
        sx={{
          maxWidth: { md: 1152, xl: 1536 },
          py: 3,
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 2,
        }}
      >
        <Sheet enableVariantOverride variant="contained" color="primary" sx={widgetSx}>
          {renderContent('contained', 'primary')}
        </Sheet>
        <Sheet variant="text" color="info" enableVariantOverride sx={widgetSx}>
          {renderContent('text', 'info')}
        </Sheet>
        <Sheet variant="outlined" color="neutral" enableVariantOverride sx={widgetSx}>
          {renderContent('outlined', 'neutral')}
        </Sheet>
        <Sheet variant="light" color="success" enableVariantOverride sx={widgetSx}>
          {renderContent('light', 'success')}
        </Sheet>
      </Box>
    </CssVarsProvider>
  );
}
