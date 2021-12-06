import * as React from 'react';
import { unstable_capitalize as capitalize } from '@mui/utils';
import Box from '@mui/joy/Box';
import { styled } from '@mui/joy/styles';
import { Button, Typography, FormLabel, Select, Tabs, FlashCode } from 'docs/src/joy/components';
import { KeyboardArrowDownRounded } from 'docs/src/joy/icons';
import {
  nodeMap,
  useDemoController,
  registerNode,
  DemoContext,
  DemoProps,
} from 'docs/src/joy/DemoController';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';

const FakeTabs = React.forwardRef<
  HTMLDivElement,
  DemoProps & Omit<JSX.IntrinsicElements['div'], 'ref'>
>(({ children, onMouseOver, onClick, onMouseLeave, ...props }, ref) => {
  return (
    <Box
      ref={ref}
      {...{ onMouseOver, onMouseLeave, onClick }}
      sx={{ px: { xs: 0, sm: 2 }, py: 2, position: 'relative' }}
    >
      <Tabs {...props}>{children}</Tabs>
    </Box>
  );
});

const Tabs1 = registerNode(FakeTabs, {
  id: 'Tabs1',
  displayName: 'Tabs',
  supportedProps: ['variant', 'color', 'roundness', 'elevation'],
  defaultProps: {
    variant: 'outlined',
    color: 'neutral',
    roundness: 'default',
    elevation: undefined,
  },
});

const Tab1 = registerNode(Button, {
  id: 'Tab1',
  displayName: 'Tab',
  supportedProps: ['variant', 'color', 'size', 'roundness', 'elevation'],
  defaultProps: {
    variant: 'light',
    color: 'primary',
    size: 'default',
    roundness: 'default',
  },
});

const Tab2 = registerNode(Button, {
  id: 'Tab2',
  displayName: 'Tab',
  supportedProps: ['variant', 'color', 'size', 'roundness', 'elevation'],
  defaultProps: {
    variant: 'text',
    color: 'neutral',
    size: 'default',
    roundness: 'default',
  },
});

const Tab3 = registerNode(Button, {
  id: 'Tab3',
  displayName: 'Tab',
  supportedProps: ['variant', 'color', 'size', 'roundness', 'elevation'],
  defaultProps: {
    variant: 'text',
    color: 'neutral',
    size: 'default',
    roundness: 'default',
  },
});

const ColorButton = styled('button', {
  shouldForwardProp: (prop) => prop !== 'selected' && prop !== 'value',
})<{ selected?: boolean; value: string }>(({ theme, value, selected }) => [
  {
    border: 'none',
    width: 24,
    height: 24,
    borderRadius: '50%',
    position: 'relative',
    cursor: 'pointer',
    backgroundColor: value,
    '&:focus-visible': theme.focus.default,
    '&:before': {
      display: 'block',
      content: '""',
      borderRadius: '50%',
      width: '100%',
      height: '100%',
      border: '2px solid',
      borderColor: value,
      position: 'absolute',
      opacity: selected ? 0.6 : 0,
      top: 0,
      left: 0,
      transform: selected ? 'scale(1.5)' : 'scale(0.8)',
      transition: 'transform 0.3s',
    },
  },
]);

const FlashingCode = ({
  startLine,
  flashing,
}: {
  startLine?: number;
  flashing: boolean | number;
}) => {
  const [transparent, setTransparent] = React.useState(true);
  React.useEffect(() => {
    if (flashing) {
      setTransparent(false);
      const timeout = setTimeout(() => {
        setTransparent(true);
      }, 300);
      return () => {
        clearTimeout(timeout);
      };
    }
    return () => {};
  }, [flashing]);
  return (
    <FlashCode startLine={startLine} lineHeight="19px" sx={{ opacity: transparent ? 0 : 1 }} />
  );
};

export default function JoyDemo() {
  const variantOptions = ['text', 'outlined', 'light', 'contained'];
  const colorOptions = ['primary', 'neutral', 'danger', 'info', 'success', 'warning'] as const;
  const sizeOptions = ['small', 'default', 'large'];
  const roundnessOptions = ['default', 'xs', 'sm', 'md', 'lg', 'xl'];
  const elevationOptions = ['none', 'xs', 'sm', 'md', 'lg', 'xl'];

  const [open, setOpen] = React.useState(false);
  const [flash, setFlash] = React.useState<Record<string, number>>({});

  const { nodeData, hoveredId, selectedId, hoverNode, selectNode, leaveNode, updateNode } =
    useDemoController({
      Tabs1: {
        variant: 'outlined',
        color: 'neutral',
        roundness: 'default',
        elevation: undefined,
      },
    });

  const isNotContextColor = ['Tab1', 'Tab2', 'Tab3'].some(
    (id) => nodeData[id]?.color !== 'context',
  );
  const tabsVariant = nodeData.Tabs1?.variant;

  React.useEffect(() => {
    if (tabsVariant === 'contained') {
      if (!isNotContextColor) {
        const timeout = setTimeout(() => {
          setOpen(false);
        }, 500);
        return () => {
          clearTimeout(timeout);
        };
      }
      setOpen(true);
    }
    return () => {};
  }, [isNotContextColor, open, tabsVariant]);

  const getDisplayedProps = (id: string) => {
    return (
      nodeMap.get(id)?.supportedProps.map((prop) => {
        const result = nodeData[id]?.[prop] || nodeMap.get(id)?.defaultProps[prop];
        // @ts-ignore 'none' is exceptional
        return result && result !== 'default' && result !== 'none'
          ? { key: prop, value: result }
          : null;
      }) as Array<{ key: string; value: string }>
    )
      .filter((val) => !!val)
      .map(({ key, value }) => `${key}="${value}"`)
      .join(' ');
  };

  const renderSelect = (field: keyof DemoProps, options: Array<string>) =>
    nodeMap.get(selectedId)?.supportedProps?.includes(field) ? (
      <React.Fragment>
        <FormLabel htmlFor={field}>{capitalize(field)}</FormLabel>
        <Box sx={{ position: 'relative', mb: 2 }}>
          <Select
            id={field}
            value={nodeData[selectedId]?.[field] || 'none'}
            onChange={(event) => {
              setFlash((currentFlash) => ({
                ...currentFlash,
                [selectedId]: (currentFlash[selectedId] ?? 0) + 1,
              }));
              updateNode(selectedId, {
                [field]: event.target.value,
              });
            }}
          >
            {!options.includes('none') &&
              field !== 'variant' &&
              field !== 'color' &&
              field !== 'size' && (
                <option value="none" disabled>
                  none
                </option>
              )}
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
          <KeyboardArrowDownRounded
            sx={{ position: 'absolute', top: 8, right: 8, pointerEvents: 'none' }}
          />
        </Box>
      </React.Fragment>
    ) : null;

  return (
    <DemoContext.Provider
      value={{
        nodeData,
        hoveredId,
        selectedId,
        hoverNode,
        selectNode,
        leaveNode,
      }}
    >
      <Box
        sx={[
          {
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr min-content' },
            borderRadius: 1,
            overflow: 'hidden',
            mx: { xs: -2, sm: 0 },
          },
          (theme) => ({
            ...theme.variants.outlined.neutral,
          }),
        ]}
      >
        <Box
          sx={{
            p: 2,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
          onMouseOver={() => {
            hoverNode(null);
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: { xs: 160, sm: 200 },
            }}
          >
            <Tabs1>
              <Tab1>Popular</Tab1>
              <Tab2>New</Tab2>
              <Tab3>All</Tab3>
            </Tabs1>
          </Box>
          <Box
            sx={[
              {
                bottom: 16,
                left: 16,
                right: 16,
                opacity: open ? 1 : 0,
                visibility: open ? 'visible' : 'hidden',
                transition: '0.4s',
                py: 1,
                px: 1.5,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
                bgcolor: 'rgba(0 0 0 / 0.8)',
              },
              (theme) => ({
                borderRadius: theme.vars.borderRadius.xs,
                boxShadow: theme.vars.elevation.md,
                ...theme.variants.containedOverrides.neutral,
              }),
            ]}
          >
            <Typography color="context" level="body2" sx={{ display: 'flex' }}>
              `context` color adapts the component to high contrast background.
            </Typography>
            <Button
              size="small"
              color="context"
              variant="light"
              sx={{ flexShrink: 0 }}
              onClick={() => {
                updateNode('Tab1', {
                  color: 'context',
                });
                updateNode('Tab2', {
                  color: 'context',
                });
                updateNode('Tab3', {
                  color: 'context',
                });
                setFlash((currentFlash) => ({
                  ...currentFlash,
                  Tab1: (currentFlash.Tab1 ?? 0) + 1,
                  Tab2: (currentFlash.Tab2 ?? 0) + 1,
                  Tab3: (currentFlash.Tab3 ?? 0) + 1,
                }));
              }}
            >
              Try it out!
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            gridRow: 'span 2',
            p: 2,
            borderWidth: { xs: '1px 0 0 0', sm: '0 0 0 1px' },
            borderStyle: 'solid',
            borderColor: 'neutral.outlinedBorder',
            bgcolor: 'background.level1',
            display: 'flex',
            flexDirection: 'column',
            minWidth: 240,
          }}
        >
          <Typography level="h5" sx={{ mb: 2 }}>
            Playground
          </Typography>
          {renderSelect('variant', variantOptions)}
          <FormLabel htmlFor="color">Color</FormLabel>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              columnGap: 3,
              rowGap: 2,
              pt: 1,
              pb: 3,
              px: 1,
            }}
          >
            {colorOptions.map((color) => (
              <ColorButton
                aria-label={`color ${color}`}
                key={color}
                selected={color === nodeData[selectedId]?.color}
                value={`var(--joy-palette-${color}-500)`}
                onClick={() => {
                  setFlash((currentFlash) => ({
                    ...currentFlash,
                    [selectedId]: (currentFlash[selectedId] ?? 0) + 1,
                  }));
                  updateNode(selectedId, {
                    color,
                  });
                }}
              />
            ))}
          </Box>
          {renderSelect('size', sizeOptions)}
          {renderSelect('roundness', roundnessOptions)}
          {renderSelect('elevation', elevationOptions)}
        </Box>
        <Box
          sx={{
            p: 2,
            borderTop: '1px solid',
            borderColor: 'neutral.outlinedBorder',
            gridRowStart: 2,
            minHeight: 130,
            bgcolor: 'primary.900',
            position: 'relative',
            '& pre': {
              margin: 0,
              lineHeight: '19px',
              fontSize: '13px',
              '& *': {
                fontSize: '13px',
                lineHeight: '19px',
              },
            },
            '& code[class*="language-"]': {
              fontSize: '13px',
              lineHeight: '19px',
            },
          }}
        >
          <HighlightedCode
            component="div"
            language="jsx"
            code={`
<Tabs ${getDisplayedProps('Tabs1')}>
  <Tab ${getDisplayedProps('Tab1')}>
    Popular
  </Tab>
  <Tab ${getDisplayedProps('Tab2')}>
    New
  </Tab>
  <Tab ${getDisplayedProps('Tab3')}>
    All
  </Tab>
</Tabs>`}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: '1rem',
              pointerEvents: 'none',
            }}
          >
            <FlashingCode flashing={flash.Tabs1} />
            <FlashingCode startLine={1} flashing={flash.Tab1} />
            <FlashingCode startLine={4} flashing={flash.Tab2} />
            <FlashingCode startLine={7} flashing={flash.Tab3} />
          </Box>
        </Box>
      </Box>
    </DemoContext.Provider>
  );
}
