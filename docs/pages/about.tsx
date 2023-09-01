import * as React from 'react';
import Divider from '@mui/material/Divider';
import AppHeader from 'docs/src/layouts/AppHeader';
import HeroEnd from 'docs/src/components/home/HeroEnd';
import AppFooter from 'docs/src/layouts/AppFooter';
import AboutHero from 'docs/src/components/about/AboutHero';
import OurValues from 'docs/src/components/about/OurValues';
import Team from 'docs/src/components/about/Team';
import HowToSupport from 'docs/src/components/about/HowToSupport';
import Head from 'docs/src/modules/components/Head';
import BrandingCssVarsProvider from 'docs/src/BrandingCssVarsProvider';
import AppHeaderBanner from 'docs/src/components/banner/AppHeaderBanner';

export default function About() {
  return (
    <BrandingCssVarsProvider>
      <Head
        title="About us - MUI"
        description="MUI is a 100% remote globally distributed team, supported by a community of thousands
        of developers all across the world."
      />
      <AppHeaderBanner />
      <AppHeader />
      <main id="main-content">
        <AboutHero />
        <Divider />
        <OurValues />
        <Divider />
        <Team />
        <Divider />
        <HowToSupport />
        <Divider />
        <HeroEnd />
        <Divider />
      </main>
      <AppFooter />
    </BrandingCssVarsProvider>
  );
}
