import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import GradientText from 'docs/src/components/typography/GradientText';

export default function HeroPricing() {
  return (
    <Container>
      <Box
        sx={{
          pt: { xs: 6, sm: 8, md: 12 },
          pb: { xs: 3, sm: 4, md: 8 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          component="h1"
          variant="body2"
          sx={(theme) => ({
            color: 'primary.600',
            ...theme.applyDarkStyles({
              color: 'primary.400',
            }),
          })}
          fontWeight="bold"
        >
          MUI Core
        </Typography>
        <Typography variant="h2" sx={{ maxWidth: 700, textAlign: 'center' }} gutterBottom>
          Ready to use components,
          <GradientText>free forever</GradientText>
        </Typography>
        <Typography color="text.secondary" textAlign="center" sx={{ maxWidth: 700 }}>
          Get a growing list of React components and utilities, ready-to-use, free forever, and with
          accessibility always in mind. We&apos;ve built the foundational UI blocks for your design
          system so you don&apos;t have to.
        </Typography>
      </Box>
    </Container>
  );
}
