import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import XComponentsSwitcher from 'docs/src/components/productX/XComponentsSwitcher';
import XGridFullDemo from 'docs/src/components/productX/XGridFullDemo';
import XDateRangeDemo from 'docs/src/components/productX/XDateRangeDemo';
import XTreeViewDemo from 'docs/src/components/productX/XTreeViewDemo';
import XChartsDemo from 'docs/src/components/productX/XChartsDemo';

export default function XComponents() {
  const [componentIndex, setComponentIndex] = React.useState(0);
  return (
    <Section bg="gradient">
      <Grid container spacing={2}>
        <Grid item md={6}>
          <SectionHeadline
            overline="Advanced React component library"
            title={
              <Typography variant="h2">
                Powerful components for <GradientText>advanced use-cases</GradientText>
              </Typography>
            }
            description="The MUI X packages enables applications to have complex use-cases, supported by several advanced components."
          />
          <XComponentsSwitcher
            componentIndex={componentIndex}
            setComponentIndex={setComponentIndex}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={componentIndex === 0 ? { minHeight: { xs: 777, sm: 757, md: 'unset' } } : {}}
        >
          <React.Fragment>
            {componentIndex === 0 && <XGridFullDemo />}
            {componentIndex === 1 && <XDateRangeDemo />}
            {componentIndex === 2 && <XChartsDemo />}
            {componentIndex === 3 && <XTreeViewDemo />}
          </React.Fragment>
        </Grid>
      </Grid>
    </Section>
  );
}
