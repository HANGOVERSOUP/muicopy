import * as React from 'react';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import colors from '@mui/joy/colors';
import { extendTheme, THEME_ID } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import ToggleButtonGroup, { ToggleButtonGroupStaticProps } from '@mui/joy/ToggleButtonGroup';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListDivider from '@mui/joy/ListDivider';
import Tabs from '@mui/joy/Tabs';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import TabPanel from '@mui/joy/TabPanel';
import Sheet from '@mui/joy/Sheet';
import Select, { SelectStaticProps, selectClasses } from '@mui/joy/Select';
import SvgIcon from '@mui/joy/SvgIcon';
import Option from '@mui/joy/Option';
import Tooltip from '@mui/joy/Tooltip';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import Section from 'docs/src/layouts/Section';
import GradientText from 'docs/src/components/typography/GradientText';
import OrderDashboardApp from 'docs/data/joy/getting-started/templates/order-dashboard/App';
import ProfileDashboardApp from 'docs/data/joy/getting-started/templates/profile-dashboard/App';
import MessagesApp from 'docs/data/joy/getting-started/templates/messages/App';
import SignInApp from 'docs/data/joy/getting-started/templates/sign-in-side/App';
import RentalDashboardApp from 'docs/data/joy/getting-started/templates/rental-dashboard/App';

const tailwindColors = {
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  orange: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },
  amber: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  yellow: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308',
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
  },
  lime: {
    50: '#f7fee7',
    100: '#ecfccb',
    200: '#d9f99d',
    300: '#bef264',
    400: '#a3e635',
    500: '#84cc16',
    600: '#65a30d',
    700: '#4d7c0f',
    800: '#3f6212',
    900: '#365314',
  },
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  emerald: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },
  teal: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },
  cyan: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
  },
  sky: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  indigo: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },
  violet: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
  },
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
  },
  fuchsia: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef',
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
  },
  pink: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899',
    600: '#db2777',
    700: '#be185d',
    800: '#9d174d',
    900: '#831843',
  },
  rose: {
    50: '#fff1f2',
    100: '#ffe4e6',
    200: '#fecdd3',
    300: '#fda4af',
    400: '#fb7185',
    500: '#f43f5e',
    600: '#e11d48',
    700: '#be123c',
    800: '#9f1239',
    900: '#881337',
  },
} as const;

const tailwindNeutrals = {
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  zinc: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  stone: {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716c',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    900: '#1c1917',
  },
} as const;

const radiusOptions = {
  sharp: {
    xs: '0px',
    sm: '0px',
    md: '0px',
    lg: '0px',
    xl: '0px',
  },
  smooth: {
    xs: '3px',
    sm: '5px',
    md: '7px',
    lg: '11px',
    xl: '15px',
  },
  round: {
    xs: '20px',
    sm: '22px',
    md: '24px',
    lg: '26px',
    xl: '28px',
  },
};

const familyOptions = ['Inter', 'General Sans', 'IBM Plex Sans', 'Menlo, Consolas'];

function randomValue<T>(array: Array<T>) {
  return array[Math.floor(Math.random() * array.length)];
}

function PalettePreview({ range }: { range: Record<string | number, string> }) {
  return Object.entries(range).map(([key, value]) => (
    <Box
      key={key}
      sx={{
        width: 16,
        height: 16,
        borderRadius: '50%',
        bgcolor: value,
        mr: -1,
      }}
    />
  ));
}

function usePrimarySelector() {
  const [primary, setPrimary] = React.useState<keyof typeof tailwindColors | 'default'>('default');
  return {
    primary,
    setPrimary,
    randomValue: () =>
      setPrimary(randomValue(Object.keys(tailwindColors) as Array<keyof typeof tailwindColors>)),
    renderSelector: (props?: SelectStaticProps) => (
      <Select
        size="sm"
        placeholder="primary"
        value={primary}
        onChange={(event, newValue) => setPrimary(newValue as keyof typeof tailwindColors)}
        renderValue={(selectedOption) => (
          <React.Fragment>
            <Box
              component="span"
              sx={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                bgcolor: primary === 'default' ? colors.blue[500] : tailwindColors[primary][500],
                mr: 1,
              }}
            />
            {selectedOption?.value}
          </React.Fragment>
        )}
        {...props}
      >
        <Option value="default">
          <PalettePreview range={colors.blue} />
        </Option>
        {(Object.keys(tailwindColors) as Array<keyof typeof tailwindColors>).map((color) => (
          <Option key={color} value={color}>
            <PalettePreview range={tailwindColors[color]} />
          </Option>
        ))}
      </Select>
    ),
  };
}

function useNeutralSelector() {
  const [neutral, setNeutral] = React.useState<keyof typeof tailwindNeutrals | 'default'>(
    'default',
  );
  return {
    neutral,
    setNeutral,
    randomValue: () =>
      setNeutral(
        randomValue(Object.keys(tailwindNeutrals) as Array<keyof typeof tailwindNeutrals>),
      ),
    renderSelector: (props?: SelectStaticProps) => (
      <Select
        size="sm"
        placeholder="neutral"
        value={neutral}
        onChange={(event, newValue) => setNeutral(newValue as keyof typeof tailwindNeutrals)}
        renderValue={(selectedOption) => (
          <React.Fragment>
            <Box
              component="span"
              sx={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                bgcolor: neutral === 'default' ? colors.grey[500] : tailwindNeutrals[neutral][500],
                mr: 1,
              }}
            />
            {selectedOption?.value}
          </React.Fragment>
        )}
        {...props}
      >
        <Option value="default">
          <PalettePreview range={colors.grey} />
        </Option>
        {(Object.keys(tailwindNeutrals) as Array<keyof typeof tailwindNeutrals>).map((color) => (
          <Option key={color} value={color}>
            <PalettePreview range={tailwindNeutrals[color]} />
          </Option>
        ))}
      </Select>
    ),
  };
}

function useBgSwap() {
  const [bgSwap, setBgSwap] = React.useState(false);
  return {
    bgSwap,
    setBgSwap,
    randomValue: () => setBgSwap(Math.random() > 0.5),
    renderSelector: ({ sx, ...props }: ToggleButtonGroupStaticProps = {}) => (
      <ToggleButtonGroup
        size="sm"
        value={bgSwap ? '1' : '0'}
        onChange={(event, newValue) => setBgSwap(Boolean(Number(newValue)))}
        {...props}
        sx={[{ bgcolor: 'background.surface' }, ...(Array.isArray(sx) ? sx : [])]}
      >
        <IconButton aria-label="use brighter surface" value="0">
          <SvgIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="8" y="8" width="8" height="8" rx="2" />
              <path d="M4 10a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2" />
              <path d="M14 20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2" />
            </svg>
          </SvgIcon>
        </IconButton>
        <IconButton aria-label="use black surface" value="1">
          <SvgIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="14" y="14" width="8" height="8" rx="2" />
              <rect x="2" y="2" width="8" height="8" rx="2" />
              <path d="M7 14v1a2 2 0 0 0 2 2h1" />
              <path d="M14 7h1a2 2 0 0 1 2 2v1" />
            </svg>
          </SvgIcon>
        </IconButton>
      </ToggleButtonGroup>
    ),
  };
}

function useRadiusSelector() {
  const [radius, setRadius] = React.useState<keyof typeof radiusOptions>('smooth');
  return {
    radius,
    setRadius,
    randomValue: () =>
      setRadius(randomValue(Object.keys(radiusOptions) as Array<keyof typeof radiusOptions>)),
    renderSelector: (props?: SelectStaticProps) => (
      <Select
        size="sm"
        placeholder="radius"
        value={radius}
        onChange={(event, newValue) => setRadius(newValue as keyof typeof radiusOptions)}
        renderValue={(selectedOption) => (
          <React.Fragment>
            <Box
              sx={{
                width: 16,
                height: 16,
                borderTop: '2px solid',
                borderLeft: '2px solid',
                borderColor: 'neutral.500',
                borderTopLeftRadius: radiusOptions[radius!].md,
                mr: 1,
                bgcolor: 'neutral.softBg',
              }}
            />
            {selectedOption?.label}
          </React.Fragment>
        )}
        {...props}
      >
        {Object.keys(radiusOptions).map((item) => (
          <Option key={item} value={item}>
            {item}
          </Option>
        ))}
      </Select>
    ),
  };
}

function useFamilySelector() {
  const [family, setFamily] = React.useState<string>(familyOptions[0]);
  return {
    family,
    setFamily,
    randomValue: () => setFamily(randomValue(familyOptions)),
    renderSelector: (props?: SelectStaticProps) => (
      <Select
        size="sm"
        placeholder="font family"
        value={family}
        onChange={(event, newValue) => setFamily(newValue as string)}
        renderValue={(selectedOption) => (
          <React.Fragment>
            <TextFieldsIcon sx={{ mr: 1 }} />
            <span style={{ fontFamily: family! }}>{selectedOption?.label}</span>
          </React.Fragment>
        )}
        {...props}
      >
        {familyOptions.map((item) => (
          <Option key={item} value={item} sx={{ fontFamily: item }}>
            {item}
          </Option>
        ))}
      </Select>
    ),
  };
}

export default function JoyUITemplates() {
  const {
    primary,
    renderSelector: renderPrimary,
    randomValue: randomPrimary,
  } = usePrimarySelector();
  const {
    neutral,
    renderSelector: renderNeutral,
    randomValue: randomNeutral,
  } = useNeutralSelector();
  const { bgSwap, renderSelector: renderBgSwap, randomValue: randomBgSwap } = useBgSwap();
  const { radius, renderSelector: renderRadius, randomValue: randomRadius } = useRadiusSelector();
  const { family, renderSelector: renderFamily, randomValue: randomFamily } = useFamilySelector();
  const customTheme = React.useMemo(
    () => ({
      [THEME_ID]: extendTheme({
        cssVarPrefix: 'template',
        colorSchemes: {
          light: {
            palette: {
              ...(primary &&
                primary !== 'default' && {
                  primary: tailwindColors[primary],
                }),
              ...(neutral &&
                neutral !== 'default' && {
                  neutral: tailwindNeutrals[neutral],
                }),
              ...(bgSwap && {
                background: {
                  body: 'var(--template-palette-common-white)',
                  surface: 'var(--template-palette-neutral-50)',
                },
              }),
            },
          },
          dark: {
            palette: {
              ...(primary &&
                primary !== 'default' && {
                  primary: tailwindColors[primary],
                }),
              ...(neutral &&
                neutral !== 'default' && {
                  neutral: tailwindNeutrals[neutral],
                }),
              ...(bgSwap && {
                background: {
                  body: 'var(--template-palette-neutral-900)',
                  surface: 'var(--template-palette-common-black)',
                },
              }),
            },
          },
        },
        ...(family && {
          fontFamily: {
            body: family,
            display: family,
          },
        }),
        ...(radius && {
          radius: radiusOptions[radius],
        }),
      }),
    }),
    [primary, neutral, radius, bgSwap, family],
  );
  return (
    <Section bg="comfort">
      <Box sx={{ textAlign: 'center' }}>
        <SectionHeadline
          alwaysCenter
          overline="Fresh look & feel"
          title={
            <Typography variant="h2" textAlign="center">
              Get started quickly with Joy UI
              <br />
              using <GradientText>free templates</GradientText>
            </Typography>
          }
        />
      </Box>
      <Box sx={{ my: 3, position: 'relative' }}>
        <Tabs sx={{ bgcolor: 'transparent' }}>
          <List
            variant="outlined"
            component="div"
            orientation="horizontal"
            sx={{
              borderRadius: 'xl',
              fontWeight: 'lg',
              px: 0,
              mx: 'auto',
              overflow: 'auto',
              maxWidth: '100%',
            }}
          >
            <TabList
              variant="plain"
              size="sm"
              disableUnderline
              sx={(theme) => ({
                alignSelf: 'center',
                p: 0.5,
                gap: 0.5,
                borderRadius: 'xl',
                flex: 'none',
                [`& .${tabClasses.root}[aria-selected="true"]`]: {
                  ...theme.variants.solid.neutral,
                  bgcolor: 'neutral.700',
                },
              })}
            >
              <Tab disableIndicator>Order</Tab>
              <Tab disableIndicator>Profile</Tab>
              <Tab disableIndicator>Messages</Tab>
              <Tab disableIndicator>Sign-in</Tab>
              <Tab disableIndicator>Rental</Tab>
            </TabList>
            <ListDivider />
            <ListItem>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link href="#" level="body-sm" endDecorator={<ArrowForwardIcon />}>
                View all
              </Link>
            </ListItem>
          </List>
          <Box
            sx={{
              // to workaround the Material UI icon color
              '--muidocs-palette-primary-main': 'var(--template-palette-primary-main)',
              '& [role="tabpanel"]': {
                '--_scale': '0.9',
                '--_preview-height': 'clamp(500px / var(--_scale), 80vh, 600px / var(--_scale))',
                boxShadow: '0 0 0 6px rgba(var(--joy-palette-neutral-mainChannel) / 0.32)',
                borderRadius: 'var(--template-radius-lg)',
                height: 'var(--_preview-height)',
                p: 0,
                transform: 'scale(var(--_scale))',
                transformOrigin: 'center 160px',
                overflow: 'auto hidden',
                backgroundColor: 'var(--template-palette-background-body)',
                '& > div': {
                  '--screen-height': 'var(--_preview-height)',
                },
              },
            }}
          >
            <TabPanel value={0}>
              <OrderDashboardApp
                attribute="data-mui-color-scheme"
                modeStorageKey="mui-mode"
                colorSchemeStorageKey="mui-color-scheme"
                theme={customTheme}
              />
            </TabPanel>
            <TabPanel value={1}>
              <ProfileDashboardApp
                attribute="data-mui-color-scheme"
                modeStorageKey="mui-mode"
                colorSchemeStorageKey="mui-color-scheme"
                theme={customTheme}
              />
            </TabPanel>
            <TabPanel value={2}>
              <MessagesApp
                attribute="data-mui-color-scheme"
                modeStorageKey="mui-mode"
                colorSchemeStorageKey="mui-color-scheme"
                theme={customTheme}
              />
            </TabPanel>
            <TabPanel
              value={3}
              sx={{
                '--Cover-width': '40%',
                '--Form-maxWidth': '768px',
                '& > div:first-of-type': {
                  width:
                    'clamp(100% - var(--Cover-width), (var(--Collapsed-breakpoint) - 100%) * 999, 100%)',
                },
                '& > div:last-of-type': {
                  left: 'clamp(0px, (100% - var(--Collapsed-breakpoint)) * 999, 100% - var(--Cover-width))',
                },
              }}
            >
              <SignInApp
                attribute="data-mui-color-scheme"
                modeStorageKey="mui-mode"
                colorSchemeStorageKey="mui-color-scheme"
                theme={customTheme}
              />
            </TabPanel>
            <TabPanel value={4}>
              <RentalDashboardApp
                attribute="data-mui-color-scheme"
                modeStorageKey="mui-mode"
                colorSchemeStorageKey="mui-color-scheme"
                theme={customTheme}
              />
            </TabPanel>
          </Box>
        </Tabs>
        <Sheet
          variant="outlined"
          sx={(theme) => ({
            maxWidth: '80vw',
            backdropFilter: 'blur(8px)',
            bgcolor: 'rgba(var(--template-palette-primary-mainChannel) / 0.12)',
            borderColor: 'rgba(var(--template-palette-primary-darkChannel) / 0.4)',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            right: '4rem',
            bottom: '1rem',
            zIndex: 1,
            borderRadius: 'lg',
            boxShadow: 'xl',
            p: 1,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.375rem 0.5rem',
            width: 'max-content',
            [theme.getColorSchemeSelector('dark')]: {
              bgcolor: 'rgba(var(--template-palette-primary-darkChannel) / 0.12)',
              borderColor: 'rgba(var(--template-palette-primary-lightChannel) / 0.4)',
            },
            [`& .${selectClasses.root}`]: {
              flex: 'auto',
            },
          })}
        >
          <Tooltip size="sm" title="Cast magic">
            <IconButton
              size="sm"
              variant="plain"
              onClick={() => {
                randomPrimary();
                randomNeutral();
                randomBgSwap();
                randomRadius();
                randomFamily();
              }}
            >
              <SvgIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z" />
                  <path d="m14 7 3 3" />
                  <path d="M5 6v4" />
                  <path d="M19 14v4" />
                  <path d="M10 2v2" />
                  <path d="M7 8H3" />
                  <path d="M21 16h-4" />
                  <path d="M11 3H9" />
                </svg>
              </SvgIcon>
            </IconButton>
          </Tooltip>

          {renderPrimary()}

          {renderNeutral()}

          {renderBgSwap()}

          {renderRadius()}

          {renderFamily()}
        </Sheet>
        <GlobalStyles
          styles={(theme) => ({
            body: {
              backgroundColor: theme.vars.palette.background.default,
              color: theme.vars.palette.text.primary,
              fontFamily: theme.typography.fontFamily,
              lineHeight: 1.5,
            },
          })}
        />
      </Box>
    </Section>
  );
}
