/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import Input from '@mui/joy/Input';
import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GitHub from '@mui/icons-material/GitHub';
import Send from '@mui/icons-material/Send';

export default function ColorInversionFooter() {
  return (
    <Sheet
      variant="solid"
      color="neutral"
      invertedColors
      sx={{
        bgcolor: 'neutral.800',
        flexGrow: 1,
        p: 2,
        mx: -3,
        my: -3,
        borderRadius: { xs: 0, sm: 'xs' },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AspectRatio
          ratio="1"
          variant="soft"
          objectFit="none"
          sx={{ minWidth: 32, '--AspectRatio-radius': '50%' }}
        >
          <img alt="" src="/static/branding/pricing/block-green.svg" />
        </AspectRatio>
        <Divider orientation="vertical" />
        <IconButton variant="plain">
          <FacebookRoundedIcon />
        </IconButton>
        <IconButton variant="plain">
          <GitHub />
        </IconButton>
        <Input
          variant="soft"
          placeholder="Your Email"
          type="email"
          name="email"
          endDecorator={
            <Button variant="soft" aria-label="subscribe">
              <Send />
            </Button>
          }
          sx={{ ml: 'auto', display: { xs: 'none', md: 'flex' } }}
        />
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { md: 'flex-start' },
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Card
          variant="soft"
          size="sm"
          sx={{
            flexDirection: { xs: 'row', md: 'column' },
            minWidth: { xs: '100%', md: 'auto' },
            gap: 1,
          }}
        >
          <AspectRatio
            ratio="21/9"
            minHeight={80}
            sx={{ flexBasis: { xs: 200, md: 'initial' } }}
          >
            <img alt="" src="/static/blog/mui-product-comparison/ecosystem.png" />
          </AspectRatio>
          <CardContent>
            <Typography level="body2">Intro to the MUI ecosystem</Typography>
            <Typography level="body3" sx={{ mb: 0.5 }}>
              MUI blog
            </Typography>
          </CardContent>
        </Card>
        <List size="sm" row wrap sx={{ flexGrow: 0 }}>
          <ListItem nested sx={{ width: { xs: '50%', md: 140 } }}>
            <ListSubheader>Sitemap</ListSubheader>
            <List>
              <ListItem>
                <ListItemButton>Services</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Blog</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Contact us</ListItemButton>
              </ListItem>
            </List>
          </ListItem>
          <ListItem nested sx={{ width: { xs: '50%', md: 180 } }}>
            <ListSubheader>Product</ListSubheader>
            <List sx={{ '--List-decorator-size': '32px' }}>
              <ListItem>
                <ListItemButton>
                  <ListItemDecorator>
                    <img
                      alt=""
                      src="/static/branding/product-core-dark.svg"
                      width="24"
                    />
                  </ListItemDecorator>
                  MUI Core
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemDecorator>
                    <img
                      alt=""
                      src="/static/branding/product-advanced-dark.svg"
                      width="24"
                    />
                  </ListItemDecorator>
                  MUI X
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemDecorator>
                    <img
                      alt=""
                      src="/static/branding/product-toolpad-dark.svg"
                      width="24"
                    />
                  </ListItemDecorator>
                  MUI Toolpad
                  <Chip
                    variant="soft"
                    size="sm"
                    sx={{ minHeight: 20, fontSize: 'xs2', ml: 'auto' }}
                  >
                    BETA
                  </Chip>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemDecorator>
                    <img
                      alt=""
                      src="/static/branding/product-designkits-dark.svg"
                      width="24"
                    />
                  </ListItemDecorator>
                  Design kits
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemDecorator>
                    <img
                      alt=""
                      src="/static/branding/product-templates-dark.svg"
                      width="24"
                    />
                  </ListItemDecorator>
                  Templates
                </ListItemButton>
              </ListItem>
            </List>
          </ListItem>
        </List>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography
          level="body2"
          startDecorator={<Typography textColor="text.tertiary">by</Typography>}
        >
          MUI
        </Typography>

        <Typography level="body3" sx={{ ml: 'auto' }}>
          Copyright 2022
        </Typography>
      </Box>
    </Sheet>
  );
}
