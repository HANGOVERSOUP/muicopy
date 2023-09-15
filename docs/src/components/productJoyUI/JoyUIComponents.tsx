import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import TableChartRounded from '@mui/icons-material/TableChartRounded';
import DateRangeRounded from '@mui/icons-material/DateRangeRounded';
import AccountTreeRounded from '@mui/icons-material/AccountTreeRounded';
import ShowChartRounded from '@mui/icons-material/ShowChartRounded';
import BarChartRounded from '@mui/icons-material/BarChartRounded';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import Section from 'docs/src/layouts/Section';
import Link from 'docs/src/modules/components/Link';
import Highlighter from 'docs/src/components/action/Highlighter';
import Item, { Group } from 'docs/src/components/action/Item';
import GradientText from 'docs/src/components/typography/GradientText';
import More from 'docs/src/components/action/More';
import TabsUsage from 'docs/data/joy/components/tabs/TabsUsage';
import RadioUsage from 'docs/data/joy/components/radio-button/RadioUsage';
import MenuUsage from 'docs/data/joy/components/menu/MenuUsage';
import InputUsage from 'docs/data/joy/components/input/InputUsage';
import SliderUsage from 'docs/data/joy/components/slider/SliderUsage';
import SelectUsage from 'docs/data/joy/components/select/SelectUsage';
import ButtonUsage from 'docs/data/joy/components/button/ButtonUsage';
import AlertUsage from 'docs/data/joy/components/alert/AlertUsage';
import Frame from 'docs/src/components/action/Frame';
import ROUTES from 'docs/src/route';

const DEMOS = ['Tabs', 'Radio', 'Menu', 'Input', 'Select', 'Slider', 'Button', 'Alert'] as const;
const icons = {
  [DEMOS[0]]: <TableChartRounded fontSize="small" />,
  [DEMOS[1]]: <DateRangeRounded fontSize="small" />,
  [DEMOS[2]]: <AccountTreeRounded fontSize="small" />,
  [DEMOS[3]]: <ShowChartRounded fontSize="small" />,
  [DEMOS[4]]: <BarChartRounded fontSize="small" />,
  [DEMOS[5]]: <BarChartRounded fontSize="small" />,
  [DEMOS[6]]: <BarChartRounded fontSize="small" />,
  [DEMOS[7]]: <BarChartRounded fontSize="small" />,
};

export default function JoyUIComponents() {
  const [demo, setDemo] = React.useState<(typeof DEMOS)[number]>(DEMOS[0]);
  return (
    <Section cozy>
      <Grid container spacing={2}>
        <Grid md={6} sx={{ minWidth: 0 }}>
          <Box maxWidth={500}>
            <SectionHeadline
              overline="Components"
              title={
                <Typography variant="h2">
                  Simple, <GradientText>good looking</GradientText>, and reliable components
                </Typography>
              }
              description="Foundational pre-built components that look beautiful by default, building off of years from the Material UI experience."
            />
          </Box>
          <Group desktopColumns={3} sx={{ my: 0 }}>
            {DEMOS.map((name) => (
              <Highlighter key={name} selected={name === demo} onClick={() => setDemo(name)}>
                <Item icon={React.cloneElement(icons[name])} title={name} />
              </Highlighter>
            ))}
            <More component={Link} href={ROUTES.joyComponents} noLinkStyle />
          </Group>
        </Grid>
        <Grid xs={12} md={6}>
          <Frame.Demo
            className="mui-default-theme"
            sx={{ flexGrow: 1, borderRadius: 1, overflow: 'auto' }}
          >
            {
              {
                [DEMOS[0]]: <TabsUsage />,
                [DEMOS[1]]: <RadioUsage />,
                [DEMOS[2]]: <MenuUsage />,
                [DEMOS[3]]: <InputUsage />,
                [DEMOS[4]]: <SelectUsage />,
                [DEMOS[5]]: <SliderUsage />,
                [DEMOS[6]]: <ButtonUsage />,
                [DEMOS[7]]: <AlertUsage />,
              }[demo]
            }
          </Frame.Demo>
        </Grid>
      </Grid>
    </Section>
  );
}
