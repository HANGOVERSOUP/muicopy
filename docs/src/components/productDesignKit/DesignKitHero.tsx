import * as React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowRightRounded from '@material-ui/icons/KeyboardArrowRightRounded';
import GradientText from 'docs/src/components/typography/GradientText';
import HeroContainer from 'docs/src/layouts/HeroContainer';
import IconImage from 'docs/src/components/icon/IconImage';
import Link from 'docs/src/modules/components/Link';
import ROUTES from 'docs/src/route';
import {
  DesignKitImagesSet1,
  DesignKitImagesSet2,
  DesignKitTools,
} from 'docs/src/components/home/DesignKits';

export default function TemplateHero() {
  return (
    <HeroContainer
      left={
        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography
            fontWeight="bold"
            variant="body2"
            color={(theme) => (theme.palette.mode === 'dark' ? 'primary.400' : 'primary.600')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              '& > *': { mr: 1, width: 28, height: 28 },
            }}
          >
            <IconImage name="product-designkits" /> Design Kits
          </Typography>
          <Typography variant="h1" sx={{ my: 2, maxWidth: 500 }}>
            MUI in your favorite
            <br /> <GradientText>design tool</GradientText>.
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 450 }}>
            For the designers out there, pick your favorite design tool to enjoy our components. Get
            the consistency right when working with developers.
          </Typography>
          <Button
            component={Link}
            href={ROUTES.store}
            noLinkStyle
            size="large"
            variant="contained"
            endIcon={<KeyboardArrowRightRounded />}
          >
            Buy now
          </Button>
        </Box>
      }
      right={
        <Box sx={{ position: 'relative', height: '100%' }}>
          <DesignKitTools
            disableLink
            sx={{ filter: 'drop-shadow(0px 4px 20px rgba(61, 71, 82, 0.25))' }}
          />
          <Box
            sx={{
              left: '36%',
              position: 'absolute',
              display: 'flex',
              transform: 'translateX(-40%) rotateZ(30deg) rotateX(8deg) rotateY(-8deg)',
              transformOrigin: 'center center',
            }}
          >
            <DesignKitImagesSet1
              keyframes={{
                '0%': {
                  transform: 'translateY(-300px)',
                },
                '100%': {
                  transform: 'translateY(0px)',
                },
              }}
            />
            <DesignKitImagesSet2 sx={{ ml: { xs: 2, sm: 4, md: 8 } }} />
          </Box>
        </Box>
      }
    />
  );
}
