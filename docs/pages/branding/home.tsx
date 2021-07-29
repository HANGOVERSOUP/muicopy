import * as React from 'react';
import ThemeProvider from 'docs/src/modules/ThemeContext';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import AppHeader from 'docs/src/layouts/AppHeader';
import Container from '@material-ui/core/Container';
import Hero from 'docs/src/components/home/Hero';
import References from 'docs/src/components/home/References';
import ProductSuite from 'docs/src/components/home/ProductSuite';
import ValueProposition from 'docs/src/components/home/ValueProposition';

export default function Home() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <AppHeader />
      <Hero />
      <Container sx={{ py: 8 }}>
        <References />
        <Typography
          color="grey.800"
          maxWidth={450}
          textAlign="center"
          mx="auto"
          mt={4}
          variant="body2"
        >
          From startups to Fortune 500s, the world&apos;s best product teams leverage MUI to build
          their UIs.
        </Typography>
      </Container>
      <ProductSuite />
      <ValueProposition />
    </ThemeProvider>
  );
}
