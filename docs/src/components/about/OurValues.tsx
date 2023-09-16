import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import Link from 'docs/src/modules/components/Link';
import GradientText from 'docs/src/components/typography/GradientText';
import ROUTES from 'docs/src/route';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';

const values = [
  {
    icon: <StyleRoundedIcon color="primary" />,
    title: 'Put community first 💙',
    description: 'We never lose sight of who we’re serving and why.',
  },
  {
    icon: <StyleRoundedIcon color="primary" />,
    title: 'Avoid bureaucracy 🚫',
    description: 'We’re so not corporate — and we like it that way.',
  },
  {
    icon: <StyleRoundedIcon color="primary" />,
    title: 'Chase “better” 🌱',
    description: 'We’re driven by an unending desire to improve.',
  },
  {
    icon: <StyleRoundedIcon color="primary" />,
    title: 'Trust and deliver together 🚀',
    description: 'We choose to cultivate unity as the core of achievement.',
  },
];

export default function OurValues() {
  return (
    <Section cozy>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <SectionHeadline
          overline="Our values"
          title={
            <Typography variant="h2">
              The MUI <GradientText>team pact</GradientText>
            </Typography>
          }
          description="They explain the behaviors and mindsets we actively encourage, discourage, and why. They serve as a guide toward better decision-making, results, and experiences at work."
        />
        <Button
          component={Link}
          noLinkStyle
          href={ROUTES.handbook}
          endIcon={<KeyboardArrowRightRounded fontSize="small" />}
          variant="contained"
          size="medium"
          sx={{ width: { xs: '100%', sm: 'fit-content' } }}
        >
          View our handbook
        </Button>
      </Box>
      <Grid container spacing={3} sx={{ mt: { xs: 1, sm: 2 } }}>
        {values.map(({ icon, title, description }) => (
          <Grid key={title} item xs={12} md={3}>
            <Paper
              variant="outlined"
              sx={(theme) => ({
                p: 4,
                height: '100%',
                background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
                ...theme.applyDarkStyles({
                  bgcolor: 'primaryDark.900',
                  background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
                  borderColor: 'primaryDark.700',
                }),
              })}
            >
              <Box
                sx={(theme) => ({
                  width: 40,
                  height: 40,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'primary.200',
                  bgcolor: 'primary.50',
                  boxShadow:
                    '0px 1px 6px 0px rgba(194, 224, 255, 1), 0px 2px 30px 0px rgba(234, 237, 241, 0.3) inset',
                  ...theme.applyDarkStyles({
                    borderColor: 'primary.400',
                    bgcolor: 'primary.900',
                    boxShadow:
                      '0px 1px 6px 0px rgba(0, 89, 178, 1), 0px 2px 30px 0px rgba(0, 0, 0, 0.25) inset',
                  }),
                })}
              >
                {icon}
              </Box>
              <Typography
                fontWeight="bold"
                component="h3"
                color="text.primary"
                variant="body2"
                mt={2}
                mb={0.5}
              >
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Section>
  );
}
